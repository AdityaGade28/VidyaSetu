import { Scheme, Application, AuditLogEntry, NotificationItem, SystemMetrics } from '../types';

export const INITIAL_SCHEMES: Scheme[] = [
  {
    id: 'SCH-NFST-01',
    code: 'NFST',
    name: 'National Fellowship for Higher Education of ST Students',
    category: 'Higher Education Fellowship',
    targetAudience: 'ST scholars pursuing regular full-time M.Phil / Ph.D. degrees in recognized Universities',
    totalSlots: 750,
    allocatedSlots: 542,
    annualAwardValue: '₹38,000/mo + HRA + Contingency ₹25,000/yr',
    incomeCeiling: 600000,
    minAcademicPercentage: 55,
    eligibleCourses: ['Ph.D.', 'M.Phil', 'Integrated Ph.D.'],
    requiredDocuments: [
      'st_caste_certificate',
      'income_certificate',
      'aadhaar_card',
      'previous_marksheet',
      'admission_offer_letter',
      'research_synopsis'
    ],
    applicationDeadline: '2026-11-15',
    status: 'Active',
    verificationWorkflow: 'Two-Tier Verification',
    deficiencyGraceDays: 15,
    selectionCriteria: {
      academicWeight: 45,
      researchWeight: 35,
      socioEconomicWeight: 20,
    }
  },
  {
    id: 'SCH-NOS-02',
    code: 'NOS-ST',
    name: 'National Overseas Scholarship for ST Candidates',
    category: 'Overseas Scholarship',
    targetAudience: 'ST students pursuing Master’s, Ph.D. & Post-Doctoral studies in premier foreign universities',
    totalSlots: 100,
    allocatedSlots: 68,
    annualAwardValue: 'Full Tuition + £11,100 / $18,000 Annual Maintenance Allowance + Airfare',
    incomeCeiling: 800000,
    minAcademicPercentage: 60,
    eligibleCourses: ['Master of Science (MS)', 'Ph.D. Abroad', 'Post-Doctoral Fellowship'],
    requiredDocuments: [
      'st_caste_certificate',
      'income_certificate',
      'aadhaar_card',
      'previous_marksheet',
      'admission_offer_letter',
      'research_synopsis',
      'caste_validity_certificate'
    ],
    applicationDeadline: '2026-10-31',
    status: 'Closing Soon',
    verificationWorkflow: 'Two-Tier Verification',
    deficiencyGraceDays: 10,
    selectionCriteria: {
      academicWeight: 50,
      researchWeight: 30,
      socioEconomicWeight: 20,
    }
  },
  {
    id: 'SCH-TOPCLASS-03',
    code: 'TOP-CLASS-ST',
    name: 'Top Class Education for Scheduled Tribe Students',
    category: 'Post-Graduate',
    targetAudience: 'ST students securing admissions into IITs, NITs, IIMs, AIIMS, NLUs & premier institutes',
    totalSlots: 1000,
    allocatedSlots: 780,
    annualAwardValue: 'Full Tuition Fee + ₹3,000/mo Living Allowance + ₹50,000 Computer Grant',
    incomeCeiling: 600000,
    minAcademicPercentage: 60,
    eligibleCourses: ['B.Tech', 'MBBS', 'MBA', 'Integrated M.Sc', 'B.Arch'],
    requiredDocuments: [
      'st_caste_certificate',
      'income_certificate',
      'aadhaar_card',
      'previous_marksheet',
      'admission_offer_letter'
    ],
    applicationDeadline: '2026-12-10',
    status: 'Active',
    verificationWorkflow: 'Single Officer',
    deficiencyGraceDays: 15,
    selectionCriteria: {
      academicWeight: 60,
      researchWeight: 10,
      socioEconomicWeight: 30,
    }
  },
  {
    id: 'SCH-POSTMATRIC-04',
    code: 'POST-MATRIC-ST',
    name: 'Centrally Sponsored Post-Matric Scholarship for ST Students',
    category: 'Pre/Post-Matric',
    targetAudience: 'ST students studying at post-matriculation or post-secondary stage across all states/UTs',
    totalSlots: 25000,
    allocatedSlots: 18450,
    annualAwardValue: 'Mandatory Non-Refundable Course Fees + Maintenance Allowance up to ₹1,200/mo',
    incomeCeiling: 250000,
    minAcademicPercentage: 50,
    eligibleCourses: ['Diploma', 'B.A.', 'B.Sc.', 'B.Com.', 'B.Ed.'],
    requiredDocuments: [
      'st_caste_certificate',
      'income_certificate',
      'aadhaar_card',
      'previous_marksheet'
    ],
    applicationDeadline: '2026-12-31',
    status: 'Active',
    verificationWorkflow: 'Single Officer',
    deficiencyGraceDays: 20,
    selectionCriteria: {
      academicWeight: 40,
      researchWeight: 0,
      socioEconomicWeight: 60,
    }
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'VS-2026-ST-8901',
    schemeId: 'SCH-NFST-01',
    schemeName: 'National Fellowship for Higher Education of ST Students',
    applicantName: 'Rahul Patil',
    gender: 'Male',
    dob: '1999-04-18',
    email: 'rahul.patil.scholar@gmail.com',
    phone: '+91 98450 12847',
    tribeCommunity: 'Gond',
    stateOfDomicile: 'Madhya Pradesh',
    district: 'Chhindwara',
    currentCourse: 'Ph.D. in Computational Genomics',
    institution: 'Indian Institute of Science (IISc), Bengaluru',
    institutionType: 'Institutes of National Importance (INI)',
    annualFamilyIncome: 180000,
    academicScore: 84.5,
    stage: 'deficient',
    submissionDate: '2026-09-12 11:24',
    lastUpdated: '2026-09-24 15:40',
    aiReviewScore: 91.2,
    aiFlagsCount: 1,
    assignedOfficerId: 'VO-CHOUDHURY-104',
    assignedOfficerName: 'Dr. Alok Choudhury (Senior Verification Officer)',
    documents: [
      {
        id: 'DOC-8901-01',
        type: 'st_caste_certificate',
        title: 'Scheduled Tribe Community Certificate',
        fileName: 'Rahul_ST_Certificate_2023.pdf',
        fileSize: '1.4 MB',
        uploadDate: '2026-09-12',
        status: 'potential_mismatch',
        aiConfidence: 89.4,
        ocrExtracted: {
          'Applicant Name on Cert': 'Rahul P.',
          'Father Name': 'Ramdas Patil',
          'Community/Tribe': 'Gond (ST No. 16)',
          'Issuing Authority': 'Sub-Divisional Magistrate, Chhindwara',
          'Certificate ID': 'SDM/CHH/ST/2021/4891',
          'Issue Date': '14-Aug-2021'
        },
        mismatchDetails: {
          field: 'Applicant Name',
          applicationValue: 'Rahul Patil',
          documentValue: 'Rahul P.',
          severity: 'medium',
          explanation: 'Initial abbreviation detected in certificate ("Rahul P." vs "Rahul Patil"). Manual verification or Gazetted affidavit/expanded caste certificate required to verify identity integrity.'
        }
      },
      {
        id: 'DOC-8901-02',
        type: 'income_certificate',
        title: 'Annual Income Certificate from Revenue Authority',
        fileName: 'Income_Certificate_2025_26.pdf',
        fileSize: '890 KB',
        uploadDate: '2026-09-12',
        status: 'verified',
        aiConfidence: 97.8,
        ocrExtracted: {
          'Annual Income': '₹ 1,80,000 (Rupees One Lakh Eighty Thousand)',
          'Financial Year': '2025-2026',
          'Tehsildar Office': 'Tehsil Office Sausar, Chhindwara',
          'Issuing Officer': 'Tehsildar S. K. Verma'
        }
      },
      {
        id: 'DOC-8901-03',
        type: 'aadhaar_card',
        title: 'UIDAI Aadhaar Card',
        fileName: 'Aadhaar_Masked_2026.pdf',
        fileSize: '620 KB',
        uploadDate: '2026-09-12',
        status: 'verified',
        aiConfidence: 98.6,
        ocrExtracted: {
          'Name': 'Rahul Patil',
          'DOB': '18/04/1999',
          'Gender': 'Male',
          'Aadhaar Number': 'XXXX-XXXX-4918',
          'State': 'Madhya Pradesh'
        }
      },
      {
        id: 'DOC-8901-04',
        type: 'admission_offer_letter',
        title: 'IISc Ph.D. Regular Admission Confirmation',
        fileName: 'IISc_Admission_Offer_2026.pdf',
        fileSize: '1.1 MB',
        uploadDate: '2026-09-12',
        status: 'verified',
        aiConfidence: 99.1,
        ocrExtracted: {
          'Institute': 'Indian Institute of Science, Bengaluru',
          'Program': 'Doctor of Philosophy (Bioinformatics & Genomics)',
          'Roll Number': 'IISc/BIO/2026/812',
          'Enrollment Status': 'Regular Full-Time'
        }
      }
    ],
    deficiencies: [
      {
        id: 'DEF-8901-01',
        applicationId: 'VS-2026-ST-8901',
        documentType: 'st_caste_certificate',
        issueCategory: 'name_mismatch',
        officerRemarks: 'The uploaded ST Caste Certificate records your name as "Rahul P." whereas your Aadhaar and admission record states "Rahul Patil". Please upload an updated certificate with full legal name or a notarized Sub-Divisional Magistrate declaration for name expansion.',
        raisedDate: '2026-09-20 14:15',
        deadline: '2026-10-05',
        status: 'pending_student'
      }
    ],
    officerNotes: 'Candidate is enrolled in IISc Bengaluru (Top INI). High academic merit. Only ST certificate name expansion required before clearance.'
  },
  {
    id: 'VS-2026-ST-8902',
    schemeId: 'SCH-NFST-01',
    schemeName: 'National Fellowship for Higher Education of ST Students',
    applicantName: 'Anjali Gond',
    gender: 'Female',
    dob: '1998-11-05',
    email: 'anjali.gond.phd@aiims.edu',
    phone: '+91 97110 54921',
    tribeCommunity: 'Gond',
    stateOfDomicile: 'Chhattisgarh',
    district: 'Bastar',
    currentCourse: 'Ph.D. in Cellular Immunology',
    institution: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
    institutionType: 'Institutes of National Importance (INI)',
    annualFamilyIncome: 145000,
    academicScore: 92.4,
    stage: 'verified',
    submissionDate: '2026-08-28 09:15',
    lastUpdated: '2026-09-18 16:30',
    aiReviewScore: 98.5,
    aiFlagsCount: 0,
    assignedOfficerId: 'VO-CHOUDHURY-104',
    assignedOfficerName: 'Dr. Alok Choudhury (Senior Verification Officer)',
    documents: [
      {
        id: 'DOC-8902-01',
        type: 'st_caste_certificate',
        title: 'ST Domicile & Caste Certificate',
        fileName: 'Anjali_Gond_ST_Bastar.pdf',
        fileSize: '1.2 MB',
        uploadDate: '2026-08-28',
        status: 'verified',
        aiConfidence: 99.4,
        ocrExtracted: {
          'Name': 'Anjali Gond',
          'Tribe': 'Gond (ST Entry 12)',
          'District': 'Bastar',
          'Certificate ID': 'CG/BST/ST/2020/9912'
        }
      },
      {
        id: 'DOC-8902-02',
        type: 'income_certificate',
        title: 'Income Certificate',
        fileName: 'Income_Certificate_Anjali.pdf',
        fileSize: '750 KB',
        uploadDate: '2026-08-28',
        status: 'verified',
        aiConfidence: 98.9,
        ocrExtracted: {
          'Annual Family Income': '₹ 1,45,000',
          'Authority': 'SDM Jagdalpur'
        }
      },
      {
        id: 'DOC-8902-03',
        type: 'research_synopsis',
        title: 'Ph.D. Research Proposal in Sickle Cell Anemia Interventions',
        fileName: 'Sickle_Cell_AIIMS_Synopsis.pdf',
        fileSize: '2.4 MB',
        uploadDate: '2026-08-28',
        status: 'verified',
        aiConfidence: 97.2,
        ocrExtracted: {
          'Title': 'Targeted Therapeutic Pathways for Sickle Cell Disease in Tribal Belts',
          'Supervisor': 'Prof. Rajeshwar Rao, AIIMS Delhi'
        }
      }
    ],
    deficiencies: [],
    officerNotes: 'All documents verified against State digital repository. High priority research addressing Sickle Cell trait in central tribal regions. Recommended to Committee.',
    committeeScore: 94,
    committeeRecommendation: 'pending'
  },
  {
    id: 'VS-2026-ST-8903',
    schemeId: 'SCH-NOS-02',
    schemeName: 'National Overseas Scholarship for ST Candidates',
    applicantName: 'Birsa Munda',
    gender: 'Male',
    dob: '1997-07-22',
    email: 'birsa.munda.edinburgh@outlook.com',
    phone: '+91 94311 88201',
    tribeCommunity: 'Munda',
    stateOfDomicile: 'Jharkhand',
    district: 'Khunti',
    currentCourse: 'Master of Science in Carbon Management & Energy Transitions',
    institution: 'University of Edinburgh, United Kingdom (QS Rank #27)',
    institutionType: 'Top 100 NIRF',
    annualFamilyIncome: 320000,
    academicScore: 88.0,
    stage: 'under_verification',
    submissionDate: '2026-09-08 14:02',
    lastUpdated: '2026-09-22 11:15',
    aiReviewScore: 93.8,
    aiFlagsCount: 0,
    assignedOfficerId: 'VO-PRIYA-209',
    assignedOfficerName: 'Ms. Priya Soren (Verification Officer)',
    documents: [
      {
        id: 'DOC-8903-01',
        type: 'st_caste_certificate',
        title: 'Caste Certificate with Scanned Digital Barcode',
        fileName: 'Birsa_Munda_Caste_Jharkhand.pdf',
        fileSize: '1.6 MB',
        uploadDate: '2026-09-08',
        status: 'verified',
        aiConfidence: 97.6,
        ocrExtracted: {
          'Name': 'Birsa Munda',
          'Community': 'Munda (Scheduled Tribe)',
          'District': 'Khunti',
          'Issue Date': '05-May-2022'
        }
      },
      {
        id: 'DOC-8903-02',
        type: 'admission_offer_letter',
        title: 'Unconditional Admission Offer - University of Edinburgh',
        fileName: 'Edinburgh_Unconditional_Offer_2026.pdf',
        fileSize: '950 KB',
        uploadDate: '2026-09-08',
        status: 'verified',
        aiConfidence: 99.0,
        ocrExtracted: {
          'University': 'The University of Edinburgh',
          'Offer Type': 'Unconditional Firm Offer',
          'Course': 'MSc Carbon Management',
          'Session': '2026-2027 Academic Year'
        }
      }
    ],
    deficiencies: [],
    officerNotes: 'Unconditional offer from QS Top 30 world university. Family income well within ₹8.0 Lakh limit. Under final officer sign-off.'
  },
  {
    id: 'VS-2026-ST-8904',
    schemeId: 'SCH-TOPCLASS-03',
    schemeName: 'Top Class Education for Scheduled Tribe Students',
    applicantName: 'Arjun Meena',
    gender: 'Male',
    dob: '2004-03-12',
    email: 'arjun.meena.iitb@cse.iitb.ac.in',
    phone: '+91 96102 77412',
    tribeCommunity: 'Meena',
    stateOfDomicile: 'Rajasthan',
    district: 'Sawai Madhopur',
    currentCourse: 'B.Tech in Computer Science and Engineering',
    institution: 'Indian Institute of Technology (IIT) Bombay',
    institutionType: 'Institutes of National Importance (INI)',
    annualFamilyIncome: 240000,
    academicScore: 96.2,
    stage: 'selected',
    submissionDate: '2026-08-15 10:10',
    lastUpdated: '2026-09-25 18:00',
    aiReviewScore: 99.2,
    aiFlagsCount: 0,
    assignedOfficerId: 'VO-CHOUDHURY-104',
    assignedOfficerName: 'Dr. Alok Choudhury (Senior Verification Officer)',
    documents: [
      {
        id: 'DOC-8904-01',
        type: 'st_caste_certificate',
        title: 'Scheduled Tribe Certificate',
        fileName: 'Arjun_Meena_ST_Cert.pdf',
        fileSize: '1.1 MB',
        uploadDate: '2026-08-15',
        status: 'verified',
        aiConfidence: 99.5,
        ocrExtracted: {
          'Name': 'Arjun Meena',
          'Tribe': 'Meena',
          'District': 'Sawai Madhopur'
        }
      }
    ],
    deficiencies: [],
    committeeScore: 97,
    committeeRecommendation: 'recommended',
    committeeRemarks: 'Exceptional JEE Advanced Rank (AIR ST-04). Full tuition scholarship sanctioned along with IT hardware allowance.',
    sanctionAmount: 285000
  },
  {
    id: 'VS-2026-ST-8905',
    schemeId: 'SCH-NFST-01',
    schemeName: 'National Fellowship for Higher Education of ST Students',
    applicantName: 'Deepika Oraon',
    gender: 'Female',
    dob: '1999-09-14',
    email: 'deepika.oraon@jnu.ac.in',
    phone: '+91 98188 34910',
    tribeCommunity: 'Oraon',
    stateOfDomicile: 'Jharkhand',
    district: 'Ranchi',
    currentCourse: 'Ph.D. in Tribal Folklore and Linguistic Heritage',
    institution: 'Jawaharlal Nehru University (JNU), New Delhi',
    institutionType: 'Central University',
    annualFamilyIncome: 195000,
    academicScore: 86.8,
    stage: 'under_selection',
    submissionDate: '2026-08-30 16:45',
    lastUpdated: '2026-09-26 12:30',
    aiReviewScore: 96.0,
    aiFlagsCount: 0,
    assignedOfficerId: 'VO-PRIYA-209',
    assignedOfficerName: 'Ms. Priya Soren (Verification Officer)',
    documents: [
      {
        id: 'DOC-8905-01',
        type: 'st_caste_certificate',
        title: 'ST Certificate Oraon Community',
        fileName: 'Deepika_Oraon_ST_Ranchi.pdf',
        fileSize: '1.3 MB',
        uploadDate: '2026-08-30',
        status: 'verified',
        aiConfidence: 98.4,
        ocrExtracted: {
          'Name': 'Deepika Oraon',
          'Tribe': 'Oraon / Kurukh'
        }
      }
    ],
    deficiencies: [],
    officerNotes: 'Verification complete. Candidate research focuses on the preservation of unwritten tribal indigenous dialects.',
    committeeScore: 91,
    committeeRecommendation: 'pending'
  },
  {
    id: 'VS-2026-ST-8906',
    schemeId: 'SCH-POSTMATRIC-04',
    schemeName: 'Centrally Sponsored Post-Matric Scholarship for ST Students',
    applicantName: 'Sunita Boro',
    gender: 'Female',
    dob: '2003-01-20',
    email: 'sunita.boro.eng@assam.gov.in',
    phone: '+91 93650 91823',
    tribeCommunity: 'Bodo',
    stateOfDomicile: 'Assam',
    district: 'Kokrajhar (BTR)',
    currentCourse: 'B.Tech in Civil Engineering',
    institution: 'Assam Engineering College, Jalukbari, Guwahati',
    institutionType: 'State University',
    annualFamilyIncome: 110000,
    academicScore: 82.0,
    stage: 'under_verification',
    submissionDate: '2026-09-18 10:40',
    lastUpdated: '2026-09-25 14:10',
    aiReviewScore: 92.5,
    aiFlagsCount: 1,
    assignedOfficerId: 'VO-CHOUDHURY-104',
    assignedOfficerName: 'Dr. Alok Choudhury (Senior Verification Officer)',
    documents: [
      {
        id: 'DOC-8906-01',
        type: 'st_caste_certificate',
        title: 'BTR Scheduled Tribe Certificate',
        fileName: 'Sunita_Boro_Caste_Kokrajhar.pdf',
        fileSize: '1.2 MB',
        uploadDate: '2026-09-18',
        status: 'verified',
        aiConfidence: 98.0,
        ocrExtracted: {
          'Name': 'Sunita Boro',
          'Tribe': 'Bodo (Plains ST of Assam)',
          'District': 'Kokrajhar'
        }
      },
      {
        id: 'DOC-8906-02',
        type: 'income_certificate',
        title: 'Circle Officer Income Certificate',
        fileName: 'Kokrajhar_Income_Cert_2026.pdf',
        fileSize: '650 KB',
        uploadDate: '2026-09-18',
        status: 'unclear',
        aiConfidence: 74.2,
        ocrExtracted: {
          'Income Field': '₹ 1,10,000 [Partially Faded]',
          'Official Seal': 'Official Stamp Blur Detected (Low Contrast)'
        },
        mismatchDetails: {
          field: 'Document Legibility',
          applicationValue: '₹ 1,10,000',
          documentValue: '₹ 1,10,000 (Blurred seal)',
          severity: 'low',
          explanation: 'Rubber stamp of Circle Officer has low scanning contrast. OCR recognized text with 74% confidence. Officer visual check recommended.'
        }
      }
    ],
    deficiencies: [],
    officerNotes: 'Reviewing Circle Officer income certificate stamp readability.'
  },
  {
    id: 'VS-2026-ST-8907',
    schemeId: 'SCH-NOS-02',
    schemeName: 'National Overseas Scholarship for ST Candidates',
    applicantName: 'Mangal Murmu',
    gender: 'Male',
    dob: '1996-05-10',
    email: 'mangal.murmu@oxford.ac.uk',
    phone: '+91 94711 02845',
    tribeCommunity: 'Santhal',
    stateOfDomicile: 'Odisha',
    district: 'Mayurbhanj',
    currentCourse: 'Ph.D. in Water Resources Engineering',
    institution: 'University of Oxford, United Kingdom',
    institutionType: 'Top 100 NIRF',
    annualFamilyIncome: 280000,
    academicScore: 91.5,
    stage: 'verified',
    submissionDate: '2026-08-20 11:30',
    lastUpdated: '2026-09-20 17:15',
    aiReviewScore: 97.4,
    aiFlagsCount: 0,
    assignedOfficerId: 'VO-PRIYA-209',
    assignedOfficerName: 'Ms. Priya Soren (Verification Officer)',
    documents: [
      {
        id: 'DOC-8907-01',
        type: 'st_caste_certificate',
        title: 'Santhal ST Certificate',
        fileName: 'Mangal_Murmu_Mayurbhanj.pdf',
        fileSize: '1.4 MB',
        uploadDate: '2026-08-20',
        status: 'verified',
        aiConfidence: 99.2,
        ocrExtracted: {
          'Name': 'Mangal Murmu',
          'Community': 'Santhal (Scheduled Tribe)'
        }
      }
    ],
    deficiencies: [],
    committeeScore: 95,
    committeeRecommendation: 'recommended',
    committeeRemarks: 'Candidate selected for prestigious Oxford doctoral program. Clear research mandate on rainwater harvesting in tribal highlands.',
    sanctionAmount: 4200000
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'LOG-2026-904',
    timestamp: '2026-09-29 09:30:15',
    actor: 'Dr. Alok Choudhury',
    role: 'Verification Officer',
    action: 'Application Verified',
    applicationId: 'VS-2026-ST-8902',
    details: 'Verified all 4 documents. Cleared for Selection Committee review.',
    status: 'Success'
  },
  {
    id: 'LOG-2026-903',
    timestamp: '2026-09-28 17:12:44',
    actor: 'Selection Committee Bench B',
    role: 'Selection Committee',
    action: 'Committee Decision Recorded',
    applicationId: 'VS-2026-ST-8904',
    details: 'Sanction approved for Top Class ST Fellowship. Score: 97/100.',
    status: 'Success'
  },
  {
    id: 'LOG-2026-902',
    timestamp: '2026-09-26 14:05:02',
    actor: 'AI Intelligence Service',
    role: 'AI Intelligence Service',
    action: 'AI Document Analysis Completed',
    applicationId: 'VS-2026-ST-8906',
    details: 'OCR completed with 92.5% confidence. Flagged low contrast stamp on income certificate for human officer review.',
    status: 'Flagged'
  },
  {
    id: 'LOG-2026-901',
    timestamp: '2026-09-20 14:15:30',
    actor: 'Dr. Alok Choudhury',
    role: 'Verification Officer',
    action: 'Deficiency Raised',
    applicationId: 'VS-2026-ST-8901',
    details: 'Raised deficiency ticket DEF-8901-01 for name expansion on ST certificate ("Rahul P." vs "Rahul Patil"). Grace period: 15 days.',
    status: 'Action Required'
  },
  {
    id: 'LOG-2026-900',
    timestamp: '2026-09-12 11:24:19',
    actor: 'Rahul Patil',
    role: 'Applicant',
    action: 'Application Submitted',
    applicationId: 'VS-2026-ST-8901',
    details: 'Candidate submitted application for National Fellowship (NFST). 4 documents attached.',
    status: 'Informational'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    recipientRole: 'applicant',
    applicantId: 'VS-2026-ST-8901',
    title: 'Deficiency Notice Issued - Action Required',
    message: 'Verification Officer Dr. Alok Choudhury has requested clarification on your ST Caste Certificate (Name mismatch: "Rahul P."). Please submit corrected document before Oct 5, 2026.',
    timestamp: '2026-09-20 14:16',
    read: false,
    priority: 'urgent',
    relatedApplicationId: 'VS-2026-ST-8901'
  },
  {
    id: 'NOTIF-02',
    recipientRole: 'officer',
    title: 'New High-Merit Application Assigned',
    message: 'Application VS-2026-ST-8903 (Birsa Munda, Univ of Edinburgh) assigned to your queue for urgent verification.',
    timestamp: '2026-09-22 11:15',
    read: false,
    priority: 'normal',
    relatedApplicationId: 'VS-2026-ST-8903'
  },
  {
    id: 'NOTIF-03',
    recipientRole: 'committee',
    title: 'Selection Bench Meeting Scheduled',
    message: 'Selection Committee meeting for NFST Round 2 awards convenes tomorrow at 11:00 AM IST. 18 verified candidates ready for final deliberation.',
    timestamp: '2026-09-28 16:00',
    read: true,
    priority: 'normal'
  },
  {
    id: 'NOTIF-04',
    recipientRole: 'admin',
    title: 'Quarterly ST Fellowship Allocation Target',
    message: 'Current national slot allocation reaches 72.2%. 2,140 applications pending officer verification across Eastern zone states.',
    timestamp: '2026-09-29 08:00',
    read: false,
    priority: 'normal'
  }
];

export const SYSTEM_METRICS: SystemMetrics = {
  totalApplications: 48290,
  underVerification: 12410,
  deficient: 4120,
  verified: 19850,
  underSelection: 6400,
  selected: 5510,
  rejected: 1210,
  avgProcessingDays: 8.4,
  totalDisbursedBudgetCr: 384.6,
  aiAssistanceRate: 98.7,
  stateWiseDistribution: [
    { state: 'Madhya Pradesh', count: 9420, verified: 4820 },
    { state: 'Odisha', count: 8140, verified: 4190 },
    { state: 'Jharkhand', count: 7650, verified: 3950 },
    { state: 'Chhattisgarh', count: 6820, verified: 3510 },
    { state: 'Maharashtra', count: 5410, verified: 2840 },
    { state: 'Assam & NE', count: 6120, verified: 3120 },
    { state: 'Rajasthan', count: 4730, verified: 2420 }
  ],
  schemeWiseDistribution: [
    { scheme: 'NFST Fellowship', count: 18450, slots: 750 },
    { scheme: 'Top Class ST', count: 12180, slots: 1000 },
    { scheme: 'NOS Overseas', count: 3410, slots: 100 },
    { scheme: 'Post-Matric ST', count: 14250, slots: 25000 }
  ],
  deficiencyCategories: [
    { category: 'Name / Spelling Abbreviation', count: 1840 },
    { category: 'Income Certificate Expired', count: 1210 },
    { category: 'Unclear Stamp / Seal', count: 640 },
    { category: 'Missing Marksheet / Backlog', count: 430 }
  ],
  monthlyTrends: [
    { month: 'Apr', applications: 2400, verified: 1200, selected: 450 },
    { month: 'May', applications: 4800, verified: 2900, selected: 980 },
    { month: 'Jun', applications: 8900, verified: 5400, selected: 1850 },
    { month: 'Jul', applications: 13200, verified: 9100, selected: 3100 },
    { month: 'Aug', applications: 11400, verified: 8600, selected: 4200 },
    { month: 'Sep (Current)', applications: 7590, verified: 6850, selected: 5510 }
  ]
};
