export interface Service {
  id: number;
  title: string;
  desc: string;
  index: string;
  tag: string;
  section: 'core' | 'peripheral';
}

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'AI & MACHINE LEARNING',
    desc: 'RAG Systems, AI/ML Infrastructure, Custom Model Training.',
    index: '01',
    tag: 'INTELLIGENCE',
    section: 'core',
  },
  {
    id: 2,
    title: 'SYSTEMIC BACKEND & DB',
    desc: 'Python, C++, C#, SQL, NoSQL, MariaDB, and Access Architectures.',
    index: '02',
    tag: 'ARCHITECTURE',
    section: 'core',
  },
  {
    id: 3,
    title: 'FULL-STACK & WEB ENG',
    desc: 'React, JavaScript, HTML5/CSS3, Landing Pages, and Responsive Web Design.',
    index: '03',
    tag: 'ENGINEERING',
    section: 'core',
  },
  {
    id: 4,
    title: 'NATIVE APP ECOSYSTEMS',
    desc: 'Flutter, Android App Development, and High-Performance Mobile UI.',
    index: '04',
    tag: 'DEPLOYMENT',
    section: 'core',
  },
  {
    id: 5,
    title: 'ELITE SECURITY & DEBUG',
    desc: 'Ethical Hacking, App Debugging, and System Fortification.',
    index: '05',
    tag: 'SECURITY',
    section: 'core',
  },
  {
    id: 6,
    title: '3D & BRUTALIST UI',
    desc: '3D Figure Designing, Website Customization, and UI Implementation.',
    index: '06',
    tag: 'DESIGN',
    section: 'core',
  },
  {
    id: 7,
    title: 'PRODUCT ARCHITECTURE',
    desc: 'Scalable Systems, End-to-end Project Management, Agile Delivery.',
    index: '07',
    tag: 'STRATEGY',
    section: 'core',
  },
  // Peripheral services (searchable)
  {
    id: 8,
    title: 'VISUAL CREATIVE STUDIO',
    desc: 'Picture Design & Editing, Canva Design, and Basic Branding Kits.',
    index: 'A',
    tag: 'CREATIVE',
    section: 'peripheral',
  },
  {
    id: 9,
    title: 'DIGITAL ASSETS & DECK',
    desc: 'Thumbnails, Posters, Social Media/IG Stories, PowerPoint, and Word.',
    index: 'B',
    tag: 'ASSETS',
    section: 'peripheral',
  },
  {
    id: 10,
    title: 'SEARCH & CONTENT OPS',
    desc: 'SEO Basics, Keyword Research, and Content Formatting.',
    index: 'C',
    tag: 'SEO',
    section: 'peripheral',
  },
  {
    id: 11,
    title: 'DATA & VIRTUAL ADMIN',
    desc: 'Data Entry, Web Research, File Conversion (PDF ↔ Word/Excel), and Copy-Paste.',
    index: 'D',
    tag: 'ADMIN',
    section: 'peripheral',
  },
  {
    id: 12,
    title: 'CLIENT & E-COM OPS',
    desc: 'Product Listing (Amazon/Daraz), Chat/Customer Support, and Email Handling.',
    index: 'E',
    tag: 'COMMERCE',
    section: 'peripheral',
  },
];
