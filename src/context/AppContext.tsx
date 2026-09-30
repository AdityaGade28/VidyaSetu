import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Application, 
  Scheme, 
  AuditLogEntry, 
  NotificationItem, 
  SystemMetrics, 
  DocumentType,
  ApplicationStage,
  DeficiencyNotice
} from '../types';
import { 
  INITIAL_APPLICATIONS, 
  INITIAL_SCHEMES, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS, 
  SYSTEM_METRICS 
} from '../data/mockData';

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  applications: Application[];
  selectedApplicationId: string;
  setSelectedApplicationId: (id: string) => void;
  currentApplicantId: string;
  setCurrentApplicantId: (id: string) => void;
  schemes: Scheme[];
  auditLogs: AuditLogEntry[];
  notifications: NotificationItem[];
  systemMetrics: SystemMetrics;
  guidedTourStep: number | null;
  startGuidedTour: () => void;
  nextGuidedTourStep: () => void;
  prevGuidedTourStep: () => void;
  exitGuidedTour: () => void;
  jumpToTourStep: (step: number) => void;
  submitNewApplication: (data: Partial<Application>) => string;
  submitResubmission: (applicationId: string, deficiencyId: string, studentResponse: string, fileName: string) => void;
  verifyApplication: (applicationId: string, officerNotes: string) => void;
  raiseDeficiency: (applicationId: string, docType: DocumentType, issueCategory: any, remarks: string, deadlineDays?: number) => void;
  rejectApplication: (applicationId: string, reason: string) => void;
  committeeDecision: (applicationId: string, decision: 'recommended' | 'waitlisted' | 'held' | 'rejected', remarks: string, score: number) => void;
  updateScheme: (scheme: Scheme) => void;
  addScheme: (scheme: Scheme) => void;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('applicant');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>('VS-2026-ST-8901');
  const [currentApplicantId, setCurrentApplicantId] = useState<string>('VS-2026-ST-8901');
  const [schemes, setSchemes] = useState<Scheme[]>(INITIAL_SCHEMES);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(SYSTEM_METRICS);
  const [guidedTourStep, setGuidedTourStep] = useState<number | null>(null);

  // Sync role change default tab
  const handleSetRole = (role: UserRole) => {
    setCurrentRole(role);
    setActiveTab('overview');
  };

  const addAuditLog = (
    actor: string,
    role: AuditLogEntry['role'],
    action: string,
    applicationId: string | undefined,
    details: string,
    status: AuditLogEntry['status'] = 'Success'
  ) => {
    const newEntry: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor,
      role,
      action,
      applicationId,
      details,
      status
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // 1. Submit New Application
  const submitNewApplication = (data: Partial<Application>): string => {
    const newId = `VS-2026-ST-${Math.floor(8900 + Math.random() * 1000)}`;
    const newApp: Application = {
      id: newId,
      schemeId: data.schemeId || 'SCH-NFST-01',
      schemeName: data.schemeName || 'National Fellowship for Higher Education of ST Students',
      applicantName: data.applicantName || 'Sunil Tirkey',
      gender: data.gender || 'Male',
      dob: data.dob || '2001-06-15',
      email: data.email || 'sunil.tirkey@gmail.com',
      phone: data.phone || '+91 98320 54129',
      tribeCommunity: data.tribeCommunity || 'Oraon',
      stateOfDomicile: data.stateOfDomicile || 'Jharkhand',
      district: data.district || 'Ranchi',
      currentCourse: data.currentCourse || 'Ph.D. in Environmental Science',
      institution: data.institution || 'Central University of Jharkhand',
      institutionType: data.institutionType || 'Central University',
      annualFamilyIncome: data.annualFamilyIncome || 175000,
      academicScore: data.academicScore || 85.5,
      stage: 'ai_review',
      submissionDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16),
      aiReviewScore: 94.8,
      aiFlagsCount: 0,
      documents: data.documents || [],
      deficiencies: [],
      assignedOfficerName: 'Dr. Alok Choudhury (Senior Verification Officer)',
      assignedOfficerId: 'VO-CHOUDHURY-104'
    };

    setApplications(prev => [newApp, ...prev]);
    setSelectedApplicationId(newId);
    setCurrentApplicantId(newId);

    addAuditLog(
      newApp.applicantName,
      'Applicant',
      'Application Submitted',
      newId,
      `Submitted scholarship application for ${newApp.schemeName}. Documents verified via client-side OCR.`
    );

    addNotification({
      recipientRole: 'officer',
      title: 'New Application Submitted for Verification',
      message: `${newApp.applicantName} submitted application ${newId} for ${newApp.schemeName}.`,
      priority: 'normal',
      relatedApplicationId: newId
    });

    return newId;
  };

  // 2. Submit Resubmission for a deficiency
  const submitResubmission = (
    applicationId: string, 
    deficiencyId: string, 
    studentResponse: string, 
    fileName: string
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;

      const updatedDeficiencies = app.deficiencies.map(def => {
        if (def.id !== deficiencyId) return def;
        return {
          ...def,
          status: 'resubmitted' as const,
          studentResponse,
          resubmittedDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
          resubmittedFileName: fileName
        };
      });

      // Update the document status to pending officer re-verification
      const updatedDocs = app.documents.map(doc => {
        if (doc.type === 'st_caste_certificate') {
          return {
            ...doc,
            fileName: fileName || 'Corrected_ST_Certificate_SDM_Signed.pdf',
            status: 'verified' as const,
            aiConfidence: 97.4,
            ocrExtracted: {
              ...doc.ocrExtracted,
              'Applicant Name on Cert': app.applicantName,
              'Clarification Attached': 'SDM Gazette Affidavit Verified'
            },
            mismatchDetails: undefined
          };
        }
        return doc;
      });

      return {
        ...app,
        stage: 'under_verification' as ApplicationStage,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16),
        aiFlagsCount: 0,
        deficiencies: updatedDeficiencies,
        documents: updatedDocs
      };
    }));

    addAuditLog(
      'Applicant (Rahul Patil)',
      'Applicant',
      'Student Resubmitted Document',
      applicationId,
      `Corrected ST certificate attached with official SDM name expansion clarification. Ticket ${deficiencyId}.`,
      'Action Required'
    );

    addNotification({
      recipientRole: 'officer',
      title: 'Deficiency Resubmission Received',
      message: `Applicant Rahul Patil resubmitted corrected ST Certificate for ${applicationId}. Ready for re-verification.`,
      priority: 'urgent',
      relatedApplicationId: applicationId
    });
  };

  // 3. Officer Verifies Application
  const verifyApplication = (applicationId: string, officerNotes: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;
      return {
        ...app,
        stage: 'verified' as ApplicationStage,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16),
        officerNotes: officerNotes || 'All documents verified by Officer against state digital repository.',
        committeeRecommendation: 'pending' as const,
        committeeScore: Math.round(app.academicScore * 0.95 + 10)
      };
    }));

    addAuditLog(
      'Dr. Alok Choudhury',
      'Verification Officer',
      'Verification Completed',
      applicationId,
      `All statutory ST documents, income ceilings, and enrollment criteria verified. Forwarded to Selection Committee.`
    );

    addNotification({
      recipientRole: 'committee',
      title: 'New Verified Candidate Ready for Selection',
      message: `Application ${applicationId} has cleared Verification and is now in the Committee Review Bench queue.`,
      priority: 'normal',
      relatedApplicationId: applicationId
    });

    addNotification({
      recipientRole: 'applicant',
      title: 'Application Documents Verified',
      message: `Your application ${applicationId} has been successfully verified by the Officer and forwarded to the Selection Committee.`,
      priority: 'normal',
      relatedApplicationId: applicationId
    });
  };

  // 4. Officer Raises Deficiency
  const raiseDeficiency = (
    applicationId: string, 
    docType: DocumentType, 
    issueCategory: any, 
    remarks: string,
    deadlineDays: number = 15
  ) => {
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + deadlineDays);
    const deadlineStr = deadlineDate.toISOString().slice(0, 10);

    const newDef: DeficiencyNotice = {
      id: `DEF-${Math.floor(1000 + Math.random() * 9000)}`,
      applicationId,
      documentType: docType,
      issueCategory,
      officerRemarks: remarks,
      raisedDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      deadline: deadlineStr,
      status: 'pending_student'
    };

    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;
      return {
        ...app,
        stage: 'deficient' as ApplicationStage,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16),
        deficiencies: [newDef, ...app.deficiencies]
      };
    }));

    addAuditLog(
      'Dr. Alok Choudhury',
      'Verification Officer',
      'Deficiency Raised',
      applicationId,
      `Deficiency issued for ${docType}: "${remarks}". Grace deadline: ${deadlineStr}.`,
      'Action Required'
    );

    addNotification({
      recipientRole: 'applicant',
      title: 'Deficiency Notice Issued - Action Required',
      message: `A correction notice has been issued for your application ${applicationId}. Please check the Deficiency & Correction module.`,
      priority: 'urgent',
      relatedApplicationId: applicationId
    });
  };

  // 5. Officer Rejects Application
  const rejectApplication = (applicationId: string, reason: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;
      return {
        ...app,
        stage: 'rejected' as ApplicationStage,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16),
        officerNotes: reason
      };
    }));

    addAuditLog(
      'Dr. Alok Choudhury',
      'Verification Officer',
      'Application Ineligible / Rejected',
      applicationId,
      `Reason: ${reason}`,
      'Flagged'
    );

    addNotification({
      recipientRole: 'applicant',
      title: 'Application Decision Recorded',
      message: `Your application ${applicationId} could not be approved due to statutory eligibility criteria: ${reason}`,
      priority: 'normal',
      relatedApplicationId: applicationId
    });
  };

  // 6. Committee Decision
  const committeeDecision = (
    applicationId: string, 
    decision: 'recommended' | 'waitlisted' | 'held' | 'rejected', 
    remarks: string, 
    score: number
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== applicationId) return app;
      const newStage: ApplicationStage = decision === 'recommended' ? 'selected' : (decision === 'rejected' ? 'rejected' : 'under_selection');
      const sanction = decision === 'recommended' ? 380000 : undefined;
      return {
        ...app,
        stage: newStage,
        lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 16),
        committeeRecommendation: decision,
        committeeRemarks: remarks,
        committeeScore: score,
        sanctionAmount: sanction
      };
    }));

    addAuditLog(
      'Selection Committee Bench',
      'Selection Committee',
      `Committee Decision Recorded: ${decision.toUpperCase()}`,
      applicationId,
      `Score awarded: ${score}/100. Remarks: "${remarks}".`
    );

    addNotification({
      recipientRole: 'applicant',
      title: decision === 'recommended' ? 'Congratulations! Fellowship Sanctioned' : 'Selection Committee Status Update',
      message: `Selection Committee evaluated application ${applicationId}: ${decision.toUpperCase()}. ${remarks}`,
      priority: decision === 'recommended' ? 'urgent' : 'normal',
      relatedApplicationId: applicationId
    });
  };

  // 7. Schemes management
  const updateScheme = (updated: Scheme) => {
    setSchemes(prev => prev.map(s => s.id === updated.id ? updated : s));
    addAuditLog(
      'Ministry Administrator',
      'Ministry Admin',
      'Scheme Configuration Updated',
      undefined,
      `Updated rules and eligibility parameters for ${updated.name} (${updated.code}).`
    );
  };

  const addScheme = (newScheme: Scheme) => {
    setSchemes(prev => [newScheme, ...prev]);
    addAuditLog(
      'Ministry Administrator',
      'Ministry Admin',
      'New Scheme Created',
      undefined,
      `Added scheme ${newScheme.name} (${newScheme.code}) with ${newScheme.totalSlots} quota slots.`
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const resetDemoData = () => {
    setApplications(INITIAL_APPLICATIONS);
    setSchemes(INITIAL_SCHEMES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSystemMetrics(SYSTEM_METRICS);
    setCurrentRole('applicant');
    setActiveTab('overview');
    setSelectedApplicationId('VS-2026-ST-8901');
    setCurrentApplicantId('VS-2026-ST-8901');
  };

  // Guided Tour Control
  const tourStages = [
    { role: 'applicant', tab: 'overview', desc: '1. Applicant views dashboard & notices deficiency alert.' },
    { role: 'applicant', tab: 'deficiency', desc: '2. Student reviews officer query and submits corrected document.' },
    { role: 'officer', tab: 'review', desc: '3. Verification Officer inspects side-by-side AI document extraction.' },
    { role: 'officer', tab: 'queue', desc: '4. Officer verifies application and clears candidate.' },
    { role: 'committee', tab: 'review', desc: '5. Selection Committee evaluates transparent merit & research rubric.' },
    { role: 'admin', tab: 'overview', desc: '6. Ministry Administration monitors national quotas & SLA analytics.' },
    { role: 'admin', tab: 'schemes', desc: '7. Configurable scheme rules & eligibility settings.' }
  ];

  const startGuidedTour = () => {
    setGuidedTourStep(0);
    setCurrentRole('applicant');
    setActiveTab('overview');
  };

  const jumpToTourStep = (step: number) => {
    if (step >= 0 && step < tourStages.length) {
      setGuidedTourStep(step);
      const stage = tourStages[step];
      setCurrentRole(stage.role as UserRole);
      setActiveTab(stage.tab);
    }
  };

  const nextGuidedTourStep = () => {
    if (guidedTourStep !== null && guidedTourStep < tourStages.length - 1) {
      jumpToTourStep(guidedTourStep + 1);
    } else {
      setGuidedTourStep(null);
    }
  };

  const prevGuidedTourStep = () => {
    if (guidedTourStep !== null && guidedTourStep > 0) {
      jumpToTourStep(guidedTourStep - 1);
    }
  };

  const exitGuidedTour = () => {
    setGuidedTourStep(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole: handleSetRole,
        activeTab,
        setActiveTab,
        applications,
        selectedApplicationId,
        setSelectedApplicationId,
        currentApplicantId,
        setCurrentApplicantId,
        schemes,
        auditLogs,
        notifications,
        systemMetrics,
        guidedTourStep,
        startGuidedTour,
        nextGuidedTourStep,
        prevGuidedTourStep,
        exitGuidedTour,
        jumpToTourStep,
        submitNewApplication,
        submitResubmission,
        verifyApplication,
        raiseDeficiency,
        rejectApplication,
        committeeDecision,
        updateScheme,
        addScheme,
        markNotificationRead,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
