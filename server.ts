import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { contactFormSchema } from './src/schemas/contact.ts';
import { stripHeaderInjections, escapeHtml, buildMailtoUrl } from './src/utils/sanitizer.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

// Security Headers & Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Vite inline scripts & dev server compatibility
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));

// Optional MongoDB Connection with Graceful Degradation
let isMongoConnected = false;

interface IContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

let ContactSubmissionModel: mongoose.Model<IContactSubmission> | null = null;

const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI && !MONGODB_URI.includes('YOUR_MONGODB_URI')) {
  mongoose
    .connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
    .then(() => {
      isMongoConnected = true;
      const schema = new mongoose.Schema<IContactSubmission>({
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        ip: { type: String },
        userAgent: { type: String },
        createdAt: { type: Date, default: Date.now },
      });
      ContactSubmissionModel = mongoose.model<IContactSubmission>('ContactSubmission', schema);
      console.log('MongoDB connected successfully for contact submissions.');
    })
    .catch((err) => {
      console.warn('MongoDB connection unavailable (operating in standalone memory mode):', err.message);
      isMongoConnected = false;
    });
} else {
  console.log('MongoDB URI not specified. Operating in standalone mode (graceful degradation active).');
}

// In-memory submissions fallback for dev and standalone audit
const localSubmissionsLog: Array<{
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}> = [];

// Rate Limiting on Contact Endpoint
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 submissions per 15 mins
  message: {
    error: 'Too many contact inquiries from this IP address. Please try again after 15 minutes or email directly.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  const mailConfigured = Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    !process.env.SMTP_HOST.includes('example.com')
  );

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: isMongoConnected ? 'connected' : 'standalone_mode',
    mailConfigured,
    submissionsLogged: localSubmissionsLog.length,
  });
});

// Contact dispatch endpoint
app.post('/api/contact', contactRateLimiter, async (req: Request, res: Response) => {
  try {
    // 1. Zod Validation
    const parseResult = contactFormSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Validation failed.',
        issues: parseResult.error.issues.map((i) => ({ path: i.path, message: i.message })),
      });
    }

    const { name, email, subject, message, website } = parseResult.data;

    // 2. Honeypot Check (Bot Trap)
    if (website && website.trim().length > 0) {
      // Silently return 200 OK to drop the spam bot without wasting resources
      return res.status(200).json({
        success: true,
        mode: 'honeypot_trapped',
      });
    }

    // 3. Sanitization
    const sanitizedName = stripHeaderInjections(name);
    const sanitizedSubject = stripHeaderInjections(subject);
    const sanitizedEmail = stripHeaderInjections(email);
    const escapedMessage = escapeHtml(message);

    // 4. Persistence (Mongo or Memory fallback)
    const timestamp = new Date().toISOString();
    localSubmissionsLog.push({
      id: `sub_${Date.now()}`,
      timestamp,
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message,
    });

    if (isMongoConnected && ContactSubmissionModel) {
      try {
        await ContactSubmissionModel.create({
          name: sanitizedName,
          email: sanitizedEmail,
          subject: sanitizedSubject,
          message,
          ip: req.ip,
          userAgent: req.get('user-agent'),
          createdAt: new Date(),
        });
      } catch (err: any) {
        console.warn('Failed to persist to MongoDB (continuing flow):', err.message);
      }
    }

    // 5. Email Dispatch via Nodemailer (with Dev Fallback)
    const targetEmail = process.env.CONTACT_TO_EMAIL || 'shubhamvaishnav640@gmail.com';
    const isSmtpConfigured = Boolean(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      !process.env.SMTP_HOST.includes('example.com')
    );

    if (isSmtpConfigured) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"${sanitizedName}" <${process.env.SMTP_USER}>`,
          replyTo: sanitizedEmail,
          to: targetEmail,
          subject: `[Portfolio Inquiry] ${sanitizedSubject}`,
          text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nSubject: ${sanitizedSubject}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #DCD7CD; background: #F6F3EC; color: #141413;">
              <h2 style="margin-top: 0; color: #D84A27; font-size: 18px;">[Portfolio Dispatch] ${sanitizedSubject}</h2>
              <p><strong>From:</strong> ${sanitizedName} (&lt;${sanitizedEmail}&gt;)</p>
              <p><strong>Time:</strong> ${timestamp}</p>
              <hr style="border: none; border-top: 1px solid #DCD7CD; margin: 15px 0;" />
              <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${escapedMessage}</div>
              <hr style="border: none; border-top: 1px solid #DCD7CD; margin: 15px 0;" />
              <p style="font-size: 11px; color: #8A867E;">Transmitted from Shubham Vaishnav Engineering Monograph Portfolio.</p>
            </div>
          `,
        });

        return res.status(200).json({
          success: true,
          mode: 'sent',
          message: 'Message delivered directly to mailbox.',
        });
      } catch (mailError: any) {
        console.warn('SMTP dispatch failed:', mailError.message);
        const mailtoFallback = buildMailtoUrl({
          recipient: targetEmail,
          name: sanitizedName,
          subject: sanitizedSubject,
          message,
        });

        const isAuthError =
          mailError.message.includes('534') ||
          mailError.message.includes('535') ||
          mailError.message.includes('Application-specific password required') ||
          mailError.message.includes('Username and Password not accepted');
        const userNotice = isAuthError
          ? 'Gmail requires a 16-character Google App Password (2-Step Verification is active on this account). Submission logged on server; click below to send directly via your email client.'
          : `Email delivery notice: ${mailError.message}. Submission logged on server; click below to dispatch directly via your email client.`;

        return res.status(200).json({
          success: true,
          mode: 'dev_fallback',
          message: userNotice,
          mailtoFallback,
        });
      }
    } else {
      // Truthful dev fallback response
      console.log(`[Contact Dev Log] Submission received from ${sanitizedName} <${sanitizedEmail}>: "${sanitizedSubject}"`);
      const mailtoFallback = buildMailtoUrl({
        recipient: targetEmail,
        name: sanitizedName,
        subject: sanitizedSubject,
        message,
      });

      return res.status(200).json({
        success: true,
        mode: 'dev_fallback',
        message: 'Inquiry successfully registered on server. Local dev fallback active.',
        mailtoFallback,
      });
    }
  } catch (error: any) {
    console.error('Contact handler error:', error);
    return res.status(500).json({
      error: 'Internal server error processing contact request.',
      details: error.message,
    });
  }
});

// Serve Frontend (Vite in dev, static files in production)
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Editorial Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
