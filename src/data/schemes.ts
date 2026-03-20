export interface Scheme {
  id: string;
  title: string;
  category: "education" | "financial" | "employment";
  description: string;
  eligibility: string;
  benefits: string[];
  howToApply: string;
  website: string;
  ministry: string;
}

export const schemes: Scheme[] = [
  {
    id: "s1",
    title: "Scholarships for Students with Disabilities",
    category: "education",
    description: "Pre-matric and post-matric scholarships for students with disabilities pursuing education from Class 9 onwards.",
    eligibility: "Students with 40%+ disability, family income below ₹2.5 lakh/year",
    benefits: [
      "Full tuition fee coverage",
      "Monthly maintenance allowance",
      "Book and stationery allowance",
      "Disability-specific equipment allowance",
    ],
    howToApply: "Apply online through the National Scholarship Portal (NSP) during the application window.",
    website: "https://scholarships.gov.in",
    ministry: "Ministry of Social Justice & Empowerment",
  },
  {
    id: "s2",
    title: "ADIP Scheme — Assistive Devices",
    category: "financial",
    description: "Assistance for purchase of aids and appliances to persons with disabilities (ADIP Scheme).",
    eligibility: "Persons with 40%+ disability, monthly income below ₹20,000",
    benefits: [
      "Free assistive devices (wheelchairs, hearing aids, etc.)",
      "Modern aids and appliances",
      "Replacement of old devices",
      "Travel expenses for fitting camps",
    ],
    howToApply: "Contact nearest District Disability Rehabilitation Centre or apply through implementing agencies.",
    website: "https://disabilityaffairs.gov.in",
    ministry: "Department of Empowerment of Persons with Disabilities",
  },
  {
    id: "s3",
    title: "National Trust Schemes",
    category: "financial",
    description: "Multiple schemes under the National Trust for welfare of persons with autism, cerebral palsy, mental retardation, and multiple disabilities.",
    eligibility: "Persons with disabilities covered under the National Trust Act",
    benefits: [
      "Niramaya — Health Insurance up to ₹1 lakh",
      "Sahyogi — Caregiver training",
      "Gharaunda — Group housing",
      "Badhte Kadam — Awareness & community participation",
    ],
    howToApply: "Register at the National Trust website and apply for specific schemes.",
    website: "https://thenationaltrust.gov.in",
    ministry: "National Trust",
  },
  {
    id: "s4",
    title: "Reservation in Government Jobs",
    category: "employment",
    description: "4% reservation in government jobs for persons with benchmark disabilities under the RPWD Act, 2016.",
    eligibility: "Persons with 40%+ benchmark disability with valid UDID card",
    benefits: [
      "4% reservation in all government posts",
      "Age relaxation of 10 years",
      "Relaxation in qualification for direct recruitment",
      "Exemption from exam fees",
    ],
    howToApply: "Apply through respective government job portals. Ensure you have a valid disability certificate and UDID.",
    website: "https://disabilityaffairs.gov.in",
    ministry: "Department of Personnel & Training",
  },
  {
    id: "s5",
    title: "Sugamya Bharat Abhiyan (Accessible India Campaign)",
    category: "employment",
    description: "Campaign to make built environment, transport, and ICT accessible to persons with disabilities.",
    eligibility: "All persons with disabilities in India",
    benefits: [
      "Accessible government buildings",
      "Accessible public transport",
      "Accessible websites and documents",
      "Sign language interpretation in government offices",
    ],
    howToApply: "Report accessibility issues or request accommodations through the campaign portal.",
    website: "https://sugamyabharat.gov.in",
    ministry: "Department of Empowerment of Persons with Disabilities",
  },
  {
    id: "s6",
    title: "Skill Training for Persons with Disabilities",
    category: "education",
    description: "Free skill development training under PMKVY and other schemes specifically designed for persons with disabilities.",
    eligibility: "Persons with disabilities aged 15-59 years",
    benefits: [
      "Free skill training in 40+ sectors",
      "Certification recognized by industry",
      "Placement assistance after training",
      "Stipend during training period",
    ],
    howToApply: "Enroll at nearest Skill Development Centre or Vocational Rehabilitation Centre.",
    website: "https://pmkvyofficial.org",
    ministry: "Ministry of Skill Development & Entrepreneurship",
  },
  {
    id: "s7",
    title: "UDID — Unique Disability ID Card",
    category: "financial",
    description: "A single document for identification and availing benefits for persons with disabilities across India.",
    eligibility: "All persons with disabilities in India",
    benefits: [
      "Single document for all benefits",
      "Valid across all states",
      "Digital access to disability certificate",
      "Streamlined access to government schemes",
    ],
    howToApply: "Apply online at swavlambancard.gov.in or visit nearest District Hospital.",
    website: "https://swavlambancard.gov.in",
    ministry: "Department of Empowerment of Persons with Disabilities",
  },
  {
    id: "s8",
    title: "NHFDC Loan Schemes",
    category: "financial",
    description: "Concessional loans from National Handicapped Finance and Development Corporation for self-employment and education.",
    eligibility: "Persons with 40%+ disability, aged 18+, family income below ₹3 lakh/year",
    benefits: [
      "Loans up to ₹25 lakh for business",
      "Education loans for professional courses",
      "Low interest rate (5-6%)",
      "Longer repayment period",
    ],
    howToApply: "Apply through State Channelising Agency or directly to NHFDC.",
    website: "https://nhfdc.nic.in",
    ministry: "Department of Empowerment of Persons with Disabilities",
  },
];
