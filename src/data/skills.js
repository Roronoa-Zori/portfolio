/**
 * Skills — transcribed from the supplied CV and certificates only.
 * No percentages, no invented proficiency levels. Each item links to its evidence.
 */
export const skillGroups = [
  {
    id: 'languages',
    index: '01',
    name: 'Languages',
    note: 'The languages listed on my CV. Coursework and practice, not a ranking.',
    items: [
      { name: 'C', evidence: 'CV — programming fundamentals' },
      { name: 'C++', evidence: 'CV — programming language' },
      { name: 'Java', evidence: 'CV — programming language' },
      { name: 'Python', evidence: 'CV — programming language' },
    ],
  },
  {
    id: 'web',
    index: '02',
    name: 'Web',
    note: 'Front-end foundations from the CV, plus the server stack documented for FrootDash.',
    items: [
      { name: 'HTML', evidence: 'CV — web technologies' },
      { name: 'CSS', evidence: 'CV — web technologies' },
      { name: 'PHP', evidence: 'FrootDash project report' },
      { name: 'MySQL', evidence: 'FrootDash project report' },
    ],
  },
  {
    id: 'foundations',
    index: '03',
    name: 'Foundations',
    note: 'Computer-science ground covered in coursework, as listed on my CV.',
    items: [
      { name: 'Problem solving', evidence: 'CV — computer science' },
      { name: 'Algorithms', evidence: 'CV — basic algorithms' },
      { name: 'Programming fundamentals', evidence: 'CV — computer science' },
      { name: 'Computer graphics', evidence: 'CV — coursework' },
    ],
  },
  {
    id: 'ai',
    index: '04',
    name: 'AI & Immersive',
    note: 'Training exposure through a 288-hour BDSET programme. Studied, not mastered.',
    items: [
      { name: 'Artificial intelligence', evidence: 'BDSET certificate — 288 hours' },
      { name: 'Machine learning', evidence: 'BDSET certificate — 288 hours' },
      { name: 'Deep learning', evidence: 'BDSET certificate — 288 hours' },
      { name: 'VR / AR / MR / XR', evidence: 'BDSET certificate — immersive tech' },
    ],
  },
  {
    id: 'practice',
    index: '05',
    name: 'Practice',
    note: 'Working habits and documents tools named in the CV.',
    items: [
      { name: 'Debugging', evidence: 'CV — other skills' },
      { name: 'Teamwork', evidence: 'CV — other skills' },
      { name: 'Presentation', evidence: 'CV — other skills' },
      { name: 'LaTeX (basic)', evidence: 'CV — document preparation' },
      { name: 'Quick learning', evidence: 'CV — strengths' },
    ],
  },
]
