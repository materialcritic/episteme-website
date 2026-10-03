// Site-wide settings. Edit here to change the name, email or social links everywhere.
export const SITE = {
  name: 'Episteme',
  tagline: 'The Political Science Magazine of Jamia Millia Islamia',
  dept: 'Department of Political Science · Jamia Millia Islamia',
  email: 'editor@epistemejamia.in',
  url: 'https://epistemejamia.in',
  // Newsletter signup. Until `action` is set, the box shows a "Subscribe by email" button instead.
  // To go live: create a free list at Buttondown/MailerLite/Brevo and paste its form URL below.
  // Buttondown: https://buttondown.com/api/emails/embed-subscribe/YOUR-USERNAME (field name "email").
  newsletter: { action: '', emailField: 'email' },
  // Philosopher cursor (desktop only): a small portrait trails the mouse pointer. One is picked at random
  // per visit. To add one: save a square, circular-cropped image in public/cursors/ and add a line here.
  cursorThinkers: [
    { name: 'Immanuel Kant', src: '/cursors/kant.webp' },
  ],
  // Replace each "#" with the real profile URL. Entries left as "#" are hidden.
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'X', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
};
