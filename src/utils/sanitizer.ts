/**
 * Pure string sanitization and security functions.
 * Protects against email header injection, XSS vectors, and excessive whitespace.
 */

export function stripHeaderInjections(input: string): string {
  if (typeof input !== 'string') return '';
  // Strip carriage return and line feed to prevent SMTP header injection
  return input.replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function escapeHtml(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizePlainText(input: string): string {
  if (typeof input !== 'string') return '';
  return input.trim();
}

export function isHoneypotTriggered(websiteValue?: string | null): boolean {
  return typeof websiteValue === 'string' && websiteValue.trim().length > 0;
}

export function buildMailtoUrl(params: {
  recipient: string;
  subject: string;
  name: string;
  message: string;
}): string {
  const cleanSubject = encodeURIComponent(`[Portfolio Inquiry] ${stripHeaderInjections(params.subject)}`);
  const bodyText = `Hi Shubham,\n\n${params.message.trim()}\n\nBest regards,\n${stripHeaderInjections(params.name)}`;
  const cleanBody = encodeURIComponent(bodyText);
  return `mailto:${params.recipient}?subject=${cleanSubject}&body=${cleanBody}`;
}
