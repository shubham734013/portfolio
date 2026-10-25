import test from 'node:test';
import assert from 'node:assert/strict';
import {
  stripHeaderInjections,
  escapeHtml,
  isHoneypotTriggered,
  buildMailtoUrl,
} from './sanitizer';
import { contactFormSchema } from '../schemas/contact';

test('stripHeaderInjections removes CR, LF and collapses whitespace', () => {
  const dirty = 'John Doe\r\nBcc: victim@example.com\nSubject: Injected';
  const clean = stripHeaderInjections(dirty);
  assert.equal(clean, 'John Doe Bcc: victim@example.com Subject: Injected');
  assert.ok(!clean.includes('\r'));
  assert.ok(!clean.includes('\n'));
});

test('escapeHtml prevents dangerous HTML character injection', () => {
  const dirty = '<script>alert("xss & hello")</script>';
  const clean = escapeHtml(dirty);
  assert.equal(clean, '&lt;script&gt;alert(&quot;xss &amp; hello&quot;)&lt;/script&gt;');
});

test('isHoneypotTriggered detects bot fill', () => {
  assert.equal(isHoneypotTriggered('http://spam.org'), true);
  assert.equal(isHoneypotTriggered('   '), false);
  assert.equal(isHoneypotTriggered(''), false);
  assert.equal(isHoneypotTriggered(undefined), false);
});

test('buildMailtoUrl produces well-formed encoded mailto link', () => {
  const url = buildMailtoUrl({
    recipient: 'shubhamvaishnav640@gmail.com',
    name: 'Alice Cooper',
    subject: 'Project Collaboration',
    message: 'Let us build together.',
  });
  assert.ok(url.startsWith('mailto:shubhamvaishnav640@gmail.com?subject='));
  assert.ok(url.includes('Project%20Collaboration'));
  assert.ok(url.includes('Alice%20Cooper'));
});

test('contactFormSchema validates valid and rejects invalid inputs', () => {
  const valid = contactFormSchema.safeParse({
    name: 'Shubham Fan',
    email: 'fan@example.com',
    subject: 'Internship Opportunity',
    message: 'We are impressed by ResQ 2.0 and your systems work at JECRC.',
    website: '',
  });
  assert.equal(valid.success, true);

  const invalidEmail = contactFormSchema.safeParse({
    name: 'Shubham Fan',
    email: 'not-an-email',
    subject: 'Internship Opportunity',
    message: 'Short message test here.',
    website: '',
  });
  assert.equal(invalidEmail.success, false);

  const shortMessage = contactFormSchema.safeParse({
    name: 'Shubham Fan',
    email: 'fan@example.com',
    subject: 'Hi',
    message: 'Too short',
    website: '',
  });
  assert.equal(shortMessage.success, false);
});
