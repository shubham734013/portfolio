import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '../schemas/contact';
import { buildMailtoUrl } from '../utils/sanitizer';
import { PROFILE_DATA } from '../data/profile';
import { Copy, Check, Send, Mail, MapPin, Clock, ArrowUpRight, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RollingIndex } from './RollingIndex';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submissionState, setSubmissionState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'dev_fallback' | 'error';
    message?: string;
    mailtoUrl?: string;
  }>({ status: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      website: '',
    },
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState({ status: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.mode === 'sent') {
        setSubmissionState({
          status: 'success',
          message: 'Your message was transmitted and dispatched directly to Shubham.',
        });
        reset();
      } else if (response.ok || result.mode === 'dev_fallback') {
        const fallbackUrl = buildMailtoUrl({
          recipient: PROFILE_DATA.email,
          name: data.name,
          subject: data.subject,
          message: data.message,
        });

        setSubmissionState({
          status: 'dev_fallback',
          message:
            result.message ||
            'Inquiry registered locally. SMTP mail credentials are in local dev mode.',
          mailtoUrl: fallbackUrl,
        });
      } else {
        const fallbackUrl = buildMailtoUrl({
          recipient: PROFILE_DATA.email,
          name: data.name,
          subject: data.subject,
          message: data.message,
        });

        setSubmissionState({
          status: 'error',
          message: result.error || 'Server dispatch error. Use direct email fallback below.',
          mailtoUrl: fallbackUrl,
        });
      }
    } catch (err: any) {
      const currentValues = getValues();
      const fallbackUrl = buildMailtoUrl({
        recipient: PROFILE_DATA.email,
        name: currentValues.name || 'Visitor',
        subject: currentValues.subject || 'Portfolio Inquiry',
        message: currentValues.message || 'Hello Shubham,',
      });

      setSubmissionState({
        status: 'error',
        message: 'Network connection error. Use direct email fallback below.',
        mailtoUrl: fallbackUrl,
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-[#DCD7CD] bg-[#F6F3EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-[#DCD7CD] pb-4 flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <RollingIndex numberStr="06" />
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413] tracking-tight">
              INITIATE CONTACT & COLLABORATION
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8A867E]">
            VALIDATED DISPATCH PIPELINE · DIRECT COMMUNICATION · JAIPUR
          </div>
        </div>

        {/* Split Screen 2-Column Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Side: Contact Proposition & Direct Email Actions */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#141413] leading-tight">
              Have an interesting problem to solve?
            </h3>
            <p className="text-sm sm:text-base text-[#575550] leading-relaxed">
              Tell me what you're building, what you're exploring, or how we could work together. Whether it's full-stack web applications, resilient backend architectures, or university collaboration, my inbox is open.
            </p>

            {/* Direct Email Card with One-Click Copy */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-[#EFECE4] border border-[#141413] p-4 sm:p-5 space-y-3 font-mono text-xs shadow-xs"
            >
              <div className="text-[11px] text-[#8A867E] uppercase flex justify-between">
                <span>Verified Direct Address</span>
                <span className="text-[#3F5E45] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3F5E45] animate-ping"></span>
                  Primary Mailbox
                </span>
              </div>

              <div className="p-3 bg-[#F6F3EC] border border-[#DCD7CD] flex items-center justify-between gap-2">
                <span className="font-semibold text-xs sm:text-sm text-[#141413] truncate">
                  {PROFILE_DATA.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] text-[11px] transition-colors flex items-center gap-1.5 shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#3F5E45]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px]">
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="text-[#D84A27] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Mail className="w-3 h-3" />
                  <span>Launch Default Mail Client ↗</span>
                </a>
                <span className="text-[#8A867E]">Response: &lt; 24h</span>
              </div>
            </motion.div>

            {/* Location & Academic Coordinates */}
            <div className="border border-[#DCD7CD] p-4 bg-[#EFECE4] space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#575550]">
                <MapPin className="w-3.5 h-3.5 text-[#D84A27]" />
                <span>Jaipur, Rajasthan, India · {PROFILE_DATA.timezone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#575550]">
                <Clock className="w-3.5 h-3.5 text-[#D84A27]" />
                <span>B.Tech CSE Class of 2028 · Open to Internships</span>
              </div>
            </div>
          </div>

          {/* Right Side: The Real Validated Contact Form */}
          <div className="lg:col-span-7 bg-[#EFECE4] border border-[#141413] p-6 sm:p-8">
            <div className="border-b border-[#DCD7CD] pb-3 mb-6 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#141413]">
                DISPATCH INQUIRY FORM
              </span>
              <span className="font-mono text-[10px] text-[#8A867E]">
                POST // API/CONTACT
              </span>
            </div>

            {/* Animated Status Banners with AnimatePresence */}
            <AnimatePresence mode="wait">
              {submissionState.status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-6 p-4 bg-[#3F5E45]/15 border border-[#3F5E45] font-mono text-xs text-[#141413] space-y-2"
                >
                  <div className="flex items-center gap-2 font-bold text-[#3F5E45]">
                    <Check className="w-4 h-4" />
                    TRANSMISSION CONFIRMED
                  </div>
                  <p>{submissionState.message}</p>
                  <button
                    type="button"
                    onClick={() => setSubmissionState({ status: 'idle' })}
                    className="mt-2 text-[#141413] underline font-semibold"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              )}

              {(submissionState.status === 'dev_fallback' ||
                submissionState.status === 'error') && (
                <motion.div
                  key="fallback"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-6 p-4 bg-[#C87D20]/15 border border-[#C87D20] font-mono text-xs text-[#141413] space-y-3"
                >
                  <div className="flex items-center gap-2 font-bold text-[#C87D20]">
                    <AlertCircle className="w-4 h-4" />
                    {submissionState.status === 'dev_fallback'
                      ? 'INQUIRY LOGGED (LOCAL SERVER)'
                      : 'TRANSMISSION FALLBACK'}
                  </div>
                  <p>{submissionState.message}</p>
                  {submissionState.mailtoUrl && (
                    <div className="pt-1">
                      <motion.a
                        href={submissionState.mailtoUrl}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-3 py-2 bg-[#141413] text-[#F6F3EC] hover:bg-[#D84A27] transition-colors inline-flex items-center gap-2 uppercase tracking-wider text-[11px] font-semibold"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Dispatch via Email App (Pre-filled) ↗</span>
                      </motion.a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Honeypot field (hidden from legitimate users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website (Leave empty)</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="block font-mono text-xs text-[#141413] font-semibold"
                  >
                    Your Name <span className="text-[#D84A27]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Elena Rostova"
                    className={`w-full bg-[#F6F3EC] border p-2.5 text-xs text-[#141413] focus:outline-none transition-colors ${
                      errors.name ? 'border-[#D84A27]' : 'border-[#DCD7CD] focus:border-[#141413]'
                    }`}
                    {...register('name')}
                  />
                  {errors.name && (
                    <span className="font-mono text-[10px] text-[#D84A27] block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block font-mono text-xs text-[#141413] font-semibold"
                  >
                    Email Address <span className="text-[#D84A27]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. elena@company.com"
                    className={`w-full bg-[#F6F3EC] border p-2.5 text-xs text-[#141413] focus:outline-none transition-colors ${
                      errors.email ? 'border-[#D84A27]' : 'border-[#DCD7CD] focus:border-[#141413]'
                    }`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="font-mono text-[10px] text-[#D84A27] block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label
                  htmlFor="subject"
                  className="block font-mono text-xs text-[#141413] font-semibold"
                >
                  Subject / Topic <span className="text-[#D84A27]">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. Full-Stack Internship / Project Collaboration"
                  className={`w-full bg-[#F6F3EC] border p-2.5 text-xs text-[#141413] focus:outline-none transition-colors ${
                    errors.subject ? 'border-[#D84A27]' : 'border-[#DCD7CD] focus:border-[#141413]'
                  }`}
                  {...register('subject')}
                />
                {errors.subject && (
                  <span className="font-mono text-[10px] text-[#D84A27] block">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block font-mono text-xs text-[#141413] font-semibold"
                >
                  Message <span className="text-[#D84A27]">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Outline your problem, timeline, or engineering inquiry..."
                  className={`w-full bg-[#F6F3EC] border p-2.5 text-xs text-[#141413] focus:outline-none transition-colors ${
                    errors.message ? 'border-[#D84A27]' : 'border-[#DCD7CD] focus:border-[#141413]'
                  }`}
                  {...register('message')}
                />
                {errors.message && (
                  <span className="font-mono text-[10px] text-[#D84A27] block">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button with Spring Press State */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submissionState.status === 'submitting'}
                className="w-full py-3 bg-[#141413] hover:bg-[#D84A27] text-[#F6F3EC] font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-xs"
              >
                {submissionState.status === 'submitting' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting Payload...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Shubham</span>
                  </>
                )}
              </motion.button>

              <div className="text-[11px] font-mono text-[#8A867E] text-center pt-1">
                Protected by rate limiting & honeypot spam detection. Direct mail to shubhamvaishnav640@gmail.com.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
