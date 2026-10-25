import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(80, { message: 'Name must be 80 characters or fewer.' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .max(120, { message: 'Email must be 120 characters or fewer.' }),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(120, { message: 'Subject must be 120 characters or fewer.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(2000, { message: 'Message must be 2000 characters or fewer.' }),
  // Honeypot field: must be empty for human submissions
  website: z.string().max(0, { message: 'Spam detected.' }).optional().or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
