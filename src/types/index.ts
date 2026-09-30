export type UserRole = 'applicant' | 'officer' | 'committee' | 'admin';

export type ApplicationStage = 
  | 'draft'
  | 'submitted'
  | 'ai_review'
  | 'under_verification'
  | 'deficient'
  | 'verified'
  | 'under_selection'
  | 'selected'
  | 'rejected';

export type DocumentType = 
  | 'st_caste_certificate'
  | 'income_certificate'
  | 'aadhaar_card'
  | 'previous_marksheet'
  | 'admission_offer_letter'
  | 'research_synopsis'
  | 'bank_passbook'
  | 'caste_validity_certificate';

export interface DocumentItem {
  id: string;
  type: DocumentType;
  title: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: 'verified' | 'potential_mismatch' | 'unclear' | 'missing' | 'pending';
  aiConfidence: number; // e.g. 96.5%
  ocrExtracted: Record<string, string>;
  mismatchDetails?: {
    field: string;
    applicationValue: string;
    documentValue: string;
    severity: 'low' | 'medium' | 'high';
    explanation: string;
  };
  fileUrl?: string;
}

export interface DeficiencyNotice {
  id: string;
  applicationId: string;
  documentType: DocumentType;
  issueCategory: 'name_mismatch' | 'unclear_scan' | 'expired_document' | 'missing_stamp' | 'invalid_authority' | 'other';
  officerRemarks: string;
  raisedDate: string;
  deadline: string;
  status: 'pending_student' | 'resubmitted' | 'resolved' | 'escalated';
  studentResponse?: string;
  resubmittedDate?: string;
  resubmittedFileName?: string;
}

export interface Application {
  id: string; // e.g. "VS-2026-ST-8901"
  schemeId: string;
  schemeName: string;
  applicantName: string;
  gender: 'Female' | 'Male' | 'Other';
  dob: string;
  email: string;
  phone: string;
  tribeCommunity: string; // e.g. "Santhal", "Gond", "Bhil", "Munda", "Bodo"
  stateOfDomicile: string;
  district: string;
  currentCourse: string; // e.g. "Ph.D. in Biotechnology", "M.Tech in CSE", "MBBS", "B.Tech"
  institution: string; // e.g. "IIT Bombay", "AIIMS Delhi", "JNU New Delhi", "NIT Rourkela"
  institutionType: 'Institutes of National Importance (INI)' | 'Central University' | 'State University' | 'Top 100 NIRF';
  annualFamilyIncome: number; // e.g. 180000
  academicScore: number; // e.g. 88.5%
  stage: ApplicationStage;
  submissionDate: string;
  lastUpdated: string;
  aiReviewScore: number; // e.g. 94.2%
  aiFlagsCount: number;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  documents: DocumentItem[];
  deficiencies: DeficiencyNotice[];
  officerNotes?: string;
  committeeScore?: number;
  committeeRecommendation?: 'recommended' | 'waitlisted' | 'held' | 'rejected' | 'pending';
  committeeRemarks?: string;
  sanctionAmount?: number;
}

export interface Scheme {
  id: string;
  code: string;
  name: string;
  category: 'Higher Education Fellowship' | 'Overseas Scholarship' | 'Post-Graduate' | 'Pre/Post-Matric';
  targetAudience: string;
  totalSlots: number;
  allocatedSlots: number;
  annualAwardValue: string;
  incomeCeiling: number; // e.g. 600000 for ₹6.0 Lakh
  minAcademicPercentage: number;
  eligibleCourses: string[];
  requiredDocuments: DocumentType[];
  applicationDeadline: string;
  status: 'Active' | 'Closing Soon' | 'Review Phase' | 'Draft';
  verificationWorkflow: 'Single Officer' | 'Two-Tier Verification';
  deficiencyGraceDays: number;
  selectionCriteria: {
    academicWeight: number; // percentage e.g. 50
    researchWeight: number; // 30
    socioEconomicWeight: number; // 20
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: 'Applicant' | 'Verification Officer' | 'Selection Committee' | 'Ministry Admin' | 'AI Intelligence Service';
  action: string;
  applicationId?: string;
  details: string;
  status: 'Success' | 'Flagged' | 'Action Required' | 'Informational';
}

export interface NotificationItem {
  id: string;
  recipientRole: UserRole;
  applicantId?: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'normal' | 'urgent';
  relatedApplicationId?: string;
}

export interface SystemMetrics {
  totalApplications: number;
  underVerification: number;
  deficient: number;
  verified: number;
  underSelection: number;
  selected: number;
  rejected: number;
  avgProcessingDays: number;
  totalDisbursedBudgetCr: number;
  aiAssistanceRate: number; // e.g. 98.4%
  stateWiseDistribution: { state: string; count: number; verified: number }[];
  schemeWiseDistribution: { scheme: string; count: number; slots: number }[];
  deficiencyCategories: { category: string; count: number }[];
  monthlyTrends: { month: string; applications: number; verified: number; selected: number }[];
}
