/**
 * SINGLE SOURCE OF TRUTH — personal details.
 * Only information present in the supplied CV and certificates is used.
 *
 * ✏️  TO UPDATE LINKS: fill in `github` and `linkedin` below with full URLs.
 *     While they are empty the site shows a clearly labelled "LINK NOT SUPPLIED"
 *     state instead of inventing an address.
 */
export const profile = {
  name: 'Md Mominur Rahman',
  displayName: 'MOMINUR RAHMAN',
  firstName: 'Mominur',
  initials: 'MR',
  role: 'CSE Student & Aspiring Software Developer',
  kicker: 'Welcome to my',
  issue: 'Issue 01 — 2026',
  location: 'Rajshahi, Bangladesh',
  status: 'Open to industrial attachment',
  email: 'ratulblaster004@gmail.com',
  university: 'Varendra University',
  department: 'Computer Science & Engineering',
  studyYear: 'Fourth year, ongoing',
  languages: 'English (fluent) · Bangla (fluent)',
  links: {
    // Add e.g. 'https://github.com/your-username'
    github: '',
    // Add e.g. 'https://www.linkedin.com/in/your-profile'
    linkedin: '',
  },
  cv: {
    // The original CV is intentionally NOT published. See README.
    public: false,
    note: 'CV available on request',
  },
}

export const navItems = [
  { id: 'index', label: 'Index', number: '00' },
  { id: 'about', label: 'About', number: '01' },
  { id: 'skills', label: 'Toolkit', number: '02' },
  { id: 'work', label: 'Work', number: '03' },
  { id: 'credentials', label: 'Credentials', number: '04' },
  { id: 'route', label: 'Route', number: '05' },
  { id: 'arcade', label: 'Arcade', number: '06' },
  { id: 'contact', label: 'Contact', number: '07' },
]

export const sectionLabels = {
  about: { number: '01', eyebrow: 'About' },
  skills: { number: '02', eyebrow: 'Toolkit' },
  work: { number: '03', eyebrow: 'Selected work' },
  credentials: { number: '04', eyebrow: 'Credentials' },
  route: { number: '05', eyebrow: 'The route' },
  arcade: { number: '06', eyebrow: 'Arcade' },
  contact: { number: '07', eyebrow: 'Contact' },
}
