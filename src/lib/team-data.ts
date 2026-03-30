export interface TeamMember {
  slug: string;
  name: string;
  initials: string;
  role: string;
  category: "Board" | "Management";
  tagline: string;      // 1 sentence teaser for home page card
  bio: string;          // Full bio paragraph(s)
  credentials?: string[]; // Key qualifications
  photo?: string;       // Path to headshot in /public/images/team/
}

export const TEAM: TeamMember[] = [
  {
    slug: "dr-oluwaseun-akinbobola",
    name: "Dr. Oluwaseun Akinbobola",
    initials: "OA",
    role: "Chairman, Zithelo Group",
    category: "Board",
    photo: "/images/team/Dr. Akinbobola Oluwaseun (Board Executive Chairman).jpg",
    tagline:
      "Healthcare entrepreneur and strategic investor providing governance and long-term direction across the Zithelo Group.",
    bio: "Dr. Oluwaseun Akinbobola is a healthcare entrepreneur, business strategist, and investor with a proven track record of building and scaling multi-sector businesses across healthcare, real estate, and consumer markets. As Chairman, he provides strategic direction and governance oversight, ensuring the Group's growth is anchored in disciplined execution, structured expansion, and long-term value creation. He is the Co-Founder of Beaconhill Smile Group and leads Zithelo Homes USA, a property acquisition and management company based in Atlanta. He has undertaken executive education at the Wharton School and Strathmore Business School, and is an alumnus of the Owner-Manager Programme at Lagos Business School.",
    credentials: [
      "Wharton School Executive Education",
      "Strathmore Business School",
      "Lagos Business School — Owner-Manager Programme",
      "Co-Founder, Beaconhill Smile Group",
      "Founder, Zithelo Homes USA (Atlanta)",
    ],
  },
  {
    slug: "mrs-ibitayo-akinbobola",
    name: "Mrs. Ibitayo Akinbobola",
    initials: "IA",
    role: "Chief Executive Officer",
    category: "Board",
    photo: "/images/team/Mrs. Ibitayo Akinbobola (CEO).jpg",
    tagline:
      "Business leader driving execution across Zithelo's operations, development portfolio, and commercial strategy.",
    bio: "Mrs. Ibitayo Akinbobola is a healthcare entrepreneur and business leader responsible for driving execution across Zithelo Group's operations and development portfolio. As CEO, she leads the translation of strategy into results, overseeing operations, product development, sales, and market positioning, with a focus on efficiency, scalability, and commercial viability. She holds a BSc in Biomedical Science from the University of Staffordshire and an MSc in Pharmaceutical Science from the University of Greenwich. She is the Co-Founder of Beaconhill Smile Group and Zithelo Homes USA, and plays a leadership role in Beaconhill Foundation. Her early experience with Peabody Trust in the UK provided foundational exposure to property management systems, shaping her approach to real estate development. Her leadership is defined by process discipline, execution consistency, and scalable systems.",
    credentials: [
      "BSc Biomedical Science — University of Staffordshire",
      "MSc Pharmaceutical Science — University of Greenwich",
      "Co-Founder, Beaconhill Smile Group",
      "Co-Founder, Zithelo Homes USA",
      "Peabody Trust, UK (Property Management)",
    ],
  },
  {
    slug: "arc-odunayo-lawani",
    name: "Arc. Odunayo Lawani",
    initials: "OL",
    role: "Board Advisor — Technical & Development",
    category: "Board",
    photo: "/images/team/Odunayo Lawani (Board Advisory).jpeg",
    tagline:
      "Architect and project leader with over two decades of experience delivering complex, high-value developments across Nigeria.",
    bio: "Arc. Odunayo Lawani is an accomplished architect and project leader with over two decades of experience delivering complex construction and development projects across Nigeria. As Board Advisor, he provides independent technical oversight and strategic guidance across the Group's developments, ensuring alignment with global standards in design, engineering integrity, and project execution. He holds an MBA in Strategy from Heriot-Watt University, alongside Bachelor's and Master's degrees in Architecture from the Federal University of Technology, Akure. He is a certified PMP, PMI-RMP, and PMI-PBA. He serves as Project Director at ArchVision Workgroup Limited, leading major developments exceeding $20 million in value, including the Deeper Life Bible Church 30,000-capacity auditorium and the Releaf Africa PKO Refinery.",
    credentials: [
      "MBA Strategy — Heriot-Watt University",
      "BArch & MArch — FUTA",
      "PMP · PMI-RMP · PMI-PBA (Certified)",
      "MNIOB Member",
      "Project Director, ArchVision Workgroup Limited",
    ],
  },
  {
    slug: "ibikunle-iwalewa",
    name: "Mr. Ibikunle Iwalewa",
    initials: "II",
    role: "Group Head, Human Resources & Administration",
    category: "Management",
    photo: "/images/team/Mr Ibikunle Iwalewa.png",
    tagline:
      "Human capital leader with over three decades of experience building institutional people frameworks across telecoms, banking, and real estate.",
    bio: "Mr. Ibikunle Iwalewa is a highly experienced human capital and corporate services leader with over three decades of professional experience across telecommunications, banking, real estate, and multinational organizations. He leads Human Resources and Administration at Zithelo, responsible for building strong institutional frameworks, aligning people strategy with business objectives, and driving operational efficiency across the Group. His career includes senior roles at Laplace Technologies, Pentagon Real Estate, City Express Bank, and SGS Inspection Services Nigeria. He holds an MBA in Human Resource Management and a Bachelor's degree in English Studies, and is a member of SHRM.",
    credentials: [
      "MBA Human Resource Management",
      "BA English Studies",
      "SHRM Member",
      "Former: Laplace Technologies, Pentagon Real Estate, City Express Bank",
    ],
  },
  {
    slug: "builder-filusi-toyin-diya",
    name: "Builder Filusi Toyin Diya",
    initials: "FD",
    role: "Head, Projects",
    category: "Management",
    photo: "/images/team/toyin-filusi.jpeg",
    tagline:
      "Construction professional and Quantity Surveyor leading project delivery with a focus on execution excellence and cost efficiency.",
    bio: "Builder Filusi Toyin Diya is an accomplished construction professional and Quantity Surveyor with over two decades of experience delivering high-value residential, commercial, and industrial developments across Nigeria. Trained in both Building Technology and Quantity Surveying, he brings technical delivery and cost engineering expertise across the full project lifecycle — from feasibility and cost planning to construction management and final delivery. At Zithelo, he leads the Projects function with a focus on execution excellence, cost efficiency, and risk-managed delivery. He is a member of the Nigerian Institute of Building (MNIOB).",
    credentials: [
      "Building Technology (Certified)",
      "Quantity Surveying (Certified)",
      "MNIOB Member",
      "20+ years construction & development delivery",
    ],
  },
  {
    slug: "gabriel-akintayo",
    name: "Mr. Gabriel Akintayo",
    initials: "GA",
    role: "Head, Customer Experience",
    category: "Management",
    photo: "/images/team/Gabriel Akintayo (Head, Customer Experience).jpeg",
    tagline:
      "Customer experience professional overseeing service delivery, client engagement, and satisfaction standards across the Zithelo Group.",
    bio: "Gabriel Akintayo is a customer experience professional with an MBA and a strong track record in service delivery, client engagement, and operational excellence. At Zithelo, he leads the Group's Customer Experience function, overseeing the design and implementation of systems that enhance client journeys, improve service delivery standards, and drive customer satisfaction across all subsidiaries. He works closely with operational and leadership teams to embed a customer-centric culture across the organization, ensuring that Zithelo's growth is supported by consistent, high-quality client experiences.",
    credentials: [
      "MBA",
      "Customer Experience Management",
      "Operational Excellence",
    ],
  },
];

// Featured order follows seniority/hierarchy — not photo availability
// Dr. OA (Chairman), Mrs. IA (CEO), Mr. Ibikunle (HR Head), Builder Filusi (Projects Head)
export const FEATURED_TEAM = [TEAM[0], TEAM[1], TEAM[3], TEAM[4]];
