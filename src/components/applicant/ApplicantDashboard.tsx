import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, Scheme, DocumentType } from '../../types';
import { PipelineTracker } from '../common/PipelineTracker';
import { StatusBadge } from '../common/StatusBadge';
import { AIDocumentIntelligenceScreen } from '../ai-intelligence/AIDocumentIntelligenceScreen';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Upload, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  User, 
  GraduationCap, 
  Building, 
  Calendar, 
  FileCheck, 
  ShieldCheck, 
  Send, 
  Info,
  Clock,
  Layers,
  ChevronRight,
  Calculator,
  Search,
  Check,
  Award
} from 'lucide-react';

export const ApplicantDashboard: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    applications, 
    schemes, 
    currentApplicantId, 
    submitResubmission,
    submitNewApplication,
    notifications 
  } = useApp();

  // Find applicant's active application
  const myApp = applications.find(a => a.id === currentApplicantId) || applications[0];
  const pendingDeficiency = myApp?.deficiencies.find(d => d.status === 'pending_student');

  // Deficiency form state
  const [studentRemarks, setStudentRemarks] = useState('');
  const [uploadedCorrectionFile, setUploadedCorrectionFile] = useState('Rahul_Patil_Gazette_Clarification_2026.pdf');
  const [resubmittedSuccess, setResubmittedSuccess] = useState(false);

  // New Application Wizard state
  const [newAppForm, setNewAppForm] = useState({
    schemeId: 'SCH-NFST-01',
    applicantName: 'Rahul Patil',
    gender: 'Male' as const,
    dob: '1999-04-18',
    email: 'rahul.patil.scholar@gmail.com',
    phone: '+91 98450 12847',
    tribeCommunity: 'Gond',
    stateOfDomicile: 'Madhya Pradesh',
    district: 'Chhindwara',
    currentCourse: 'Ph.D. in Computational Genomics',
    institution: 'Indian Institute of Science (IISc), Bengaluru',
    institutionType: 'Institutes of National Importance (INI)' as const,
    annualFamilyIncome: 180000,
    academicScore: 84.5
  });
  const [applyStep, setApplyStep] = useState(1);
  const [applySuccessId, setApplySuccessId] = useState<string | null>(null);

  // Eligibility checker state
  const [calcCourse, setCalcCourse] = useState('Ph.D.');
  const [calcIncome, setCalcIncome] = useState(200000);
  const [calcPercentage, setCalcPercentage] = useState(75);

  const handleResubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingDeficiency) return;
    submitResubmission(
      myApp.id, 
      pendingDeficiency.id, 
      studentRemarks || 'Enclosed official SDM gazette declaration confirming Rahul Patil and Rahul P. represent the identical legal individual.',
      uploadedCorrectionFile
    );
    setResubmittedSuccess(true);
    setTimeout(() => {
      setResubmittedSuccess(false);
      setActiveTab('tracking');
    }, 2000);
  };

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const scheme = schemes.find(s => s.id === newAppForm.schemeId);
    const newId = submitNewApplication({
      ...newAppForm,
      schemeName: scheme ? scheme.name : 'National Fellowship for Higher Education of ST Students',
      documents: [
        {
          id: `DOC-${Date.now()}-1`,
          type: 'st_caste_certificate',
          title: 'Scheduled Tribe Community Certificate',
          fileName: 'ST_Certificate_Verified.pdf',
          fileSize: '1.2 MB',
          uploadDate: new Date().toISOString().slice(0, 10),
          status: 'verified',
          aiConfidence: 98.2,
          ocrExtracted: {
            'Name': newAppForm.applicantName,
            'Tribe': newAppForm.tribeCommunity,
            'State': newAppForm.stateOfDomicile
          }
        },
        {
          id: `DOC-${Date.now()}-2`,
          type: 'admission_offer_letter',
          title: 'Admission / Offer Letter',
          fileName: 'Admission_Confirmation.pdf',
          fileSize: '890 KB',
          uploadDate: new Date().toISOString().slice(0, 10),
          status: 'verified',
          aiConfidence: 99.0,
          ocrExtracted: {
            'Institution': newAppForm.institution,
            'Program': newAppForm.currentCourse
          }
        }
      ]
    });
    setApplySuccessId(newId);
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Module */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider block">
                  Candidate Portal · Scheduled Tribe Beneficiary
                </span>
                <h1 className="text-xl sm:text-2xl font-bold mt-1">
                  Welcome, {myApp.applicantName}
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
                  {myApp.currentCourse} · {myApp.institution}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-blue-200">
                  <span>Community: <strong>{myApp.tribeCommunity} (ST)</strong></span>
                  <span>·</span>
                  <span>Domicile: <strong>{myApp.stateOfDomicile}</strong></span>
                  <span>·</span>
                  <span>Aadhaar DBT: <strong className="text-emerald-300">Bank Seeded & Active</strong></span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20 shrink-0">
                <span className="text-[11px] uppercase tracking-wider text-blue-200 block font-medium">
                  Primary Application ID
                </span>
                <span className="text-lg font-mono font-bold text-white block mt-0.5">
                  {myApp.id}
                </span>
                <div className="mt-2">
                  <StatusBadge stage={myApp.stage} />
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Deficiency Callout if present */}
          {pendingDeficiency && (
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-200 rounded-lg text-amber-900 shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                        Officer Correction Notice Issued
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-200/80 text-amber-900 font-semibold">
                        Deadline: {pendingDeficiency.deadline}
                      </span>
                    </div>
                    <p className="text-xs text-amber-950 font-medium mt-1">
                      {pendingDeficiency.officerRemarks}
                    </p>
                    <p className="text-[11px] text-amber-800 mt-1">
                      Action: Upload the requested clarification before the grace period expires to resume verification.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('deficiency')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-md shadow-xs transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-center"
                >
                  <span>Resolve Deficiency Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* End-to-End Pipeline Tracker */}
          <PipelineTracker currentStage={myApp.stage} />

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wide block">Applied Scheme</span>
              <p className="text-sm font-bold text-slate-900 mt-1 truncate">{myApp.schemeName}</p>
              <span className="text-[11px] text-blue-700 font-semibold mt-1 block">NFST Higher Education</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wide block">AI Pre-Check Score</span>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xl font-bold text-slate-900 tabular-nums">{myApp.aiReviewScore}%</p>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">High Match</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">4 Documents OCR Analyzed</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wide block">Verification Desk</span>
              <p className="text-sm font-semibold text-slate-900 mt-1 truncate">{myApp.assignedOfficerName || 'Senior Officer Assigned'}</p>
              <span className="text-[11px] text-slate-500 mt-1 block">Regional Verification Cell</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wide block">Fellowship Grant</span>
              <p className="text-sm font-bold text-slate-900 mt-1">₹38,000 / month</p>
              <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">+ Contingency ₹25,000/yr</span>
            </div>
          </div>

          {/* Application Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Document Status */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Uploaded Certificates & AI Validation
                </h3>
                <button
                  onClick={() => setActiveTab('document-assistance')}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Deep AI Inspection</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {myApp.documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-2.5 rounded bg-slate-50 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">{doc.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500">{doc.aiConfidence}%</span>
                      {doc.status === 'potential_mismatch' ? (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800">
                          Mismatch Flagged
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-3 border-b border-slate-100">
                  Candidate Actions & Tools
                </h3>
                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => setActiveTab('deficiency')}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-amber-50 text-amber-700">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Deficiency Resolution</span>
                        <span className="text-[11px] text-slate-500 block">Respond to officer clarification queries</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => setActiveTab('document-assistance')}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-indigo-50 text-indigo-700">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">AI Document Assistance</span>
                        <span className="text-[11px] text-slate-500 block">Inspect OCR extracted data & seal checks</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    onClick={() => setActiveTab('schemes')}
                    className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-blue-50 text-blue-700">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Eligibility Calculator</span>
                        <span className="text-[11px] text-slate-500 block">Find ST fellowships matching your degree</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Helpdesk ST Toll-Free: 1800-11-7788 · Ministry of Tribal Affairs Direct Support
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Deficiency & Correction Module */}
      {activeTab === 'deficiency' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Deficiency & Correction Action Center
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Statutory correction window for resolving officer queries on application #{myApp.id}
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-300">
                Active Deficiency
              </span>
            </div>

            {/* Workflow Pipeline Graphic */}
            <div className="mt-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Correction Lifecycle:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
                  1. Deficiency Raised
                </div>
                <div className="p-2 rounded bg-blue-100 text-blue-900 font-semibold border border-blue-200">
                  2. Student Notified
                </div>
                <div className="p-2 rounded bg-indigo-600 text-white font-bold ring-2 ring-indigo-200">
                  3. Upload Corrected Doc (Active)
                </div>
                <div className="p-2 rounded bg-slate-200 text-slate-600 font-medium">
                  4. Resubmitted
                </div>
                <div className="p-2 rounded bg-slate-200 text-slate-600 font-medium">
                  5. Officer Re-Verification
                </div>
              </div>
            </div>

            {resubmittedSuccess ? (
              <div className="mt-6 p-6 bg-emerald-50 border border-emerald-300 rounded-lg text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-900">
                  Document Resubmitted Successfully!
                </h3>
                <p className="text-xs text-emerald-700">
                  Your corrected certificate and explanation have been transmitted to Officer Dr. Alok Choudhury. The application status has been returned to "Under Verification".
                </p>
              </div>
            ) : pendingDeficiency ? (
              <form onSubmit={handleResubmit} className="mt-6 space-y-5">
                
                {/* Officer Query Details Card */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Officer Query Statement
                    </span>
                    <span className="text-xs font-mono text-amber-800">
                      Ticket: {pendingDeficiency.id} · Issued: {pendingDeficiency.raisedDate}
                    </span>
                  </div>

                  <p className="text-xs text-amber-950 font-medium leading-relaxed bg-white p-3 rounded border border-amber-200">
                    "{pendingDeficiency.officerRemarks}"
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-amber-800 pt-1">
                    <span>Target Document: <strong>Scheduled Tribe Caste Certificate</strong></span>
                    <span>·</span>
                    <span>Issue Category: <strong>Name Mismatch / Initial Abbreviation</strong></span>
                    <span>·</span>
                    <span>Grace Period Deadline: <strong className="text-rose-700">{pendingDeficiency.deadline}</strong></span>
                  </div>
                </div>

                {/* Resubmission Input Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Upload Corrected Document / Gazetted Clarification Affidavit
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-5 text-center bg-slate-50 hover:bg-slate-100/60 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-slate-800">
                        {uploadedCorrectionFile}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        PDF or JPG up to 5MB · Sub-Divisional Magistrate Seal Verified
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Applicant's Explanation / Response to Verification Officer
                    </label>
                    <textarea
                      rows={3}
                      value={studentRemarks}
                      onChange={(e) => setStudentRemarks(e.target.value)}
                      placeholder="e.g. In my high school and ST certificate, my surname initial 'P.' was recorded. Enclosed is the official SDM Gazette Affidavit dated 22-Sep-2026 confirming that Rahul P. and Rahul Patil are the same person."
                      className="w-full text-xs p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Will trigger instant notification to Dr. Alok Choudhury
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-md shadow-xs transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Resubmission for Verification</span>
                  </button>
                </div>

              </form>
            ) : (
              <div className="mt-6 p-6 text-center text-slate-500 bg-slate-50 rounded-lg">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-800">No Pending Deficiencies</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  All your uploaded documents are in good standing with the verification cell.
                </p>
              </div>
            )}

            {/* Historical Correction Log */}
            <div className="mt-8 pt-5 border-t border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Correction & Communication Log
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-semibold text-slate-700">Dr. Alok Choudhury (Senior Verification Officer)</span>
                    <span className="font-mono">2026-09-20 14:15</span>
                  </div>
                  <p className="text-slate-800 mt-1">
                    "ST Caste Certificate name 'Rahul P.' differs from Aadhaar 'Rahul Patil'. Please submit clarifying affidavit."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* AI Document Assistance Module */}
      {activeTab === 'document-assistance' && (
        <AIDocumentIntelligenceScreen embeddedApp={myApp} />
      )}

      {/* Browse Schemes & Eligibility Calculator Module */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          
          {/* Eligibility Calculator Widget */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-blue-700" />
              <h3 className="text-sm font-bold text-slate-900">
                Interactive ST Fellowship Eligibility Calculator
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Enter your academic program and family income to instantly check which Scheduled Tribe fellowships you are qualified to apply for.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Degree</label>
                <select
                  value={calcCourse}
                  onChange={(e) => setCalcCourse(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded font-medium"
                >
                  <option value="Ph.D.">Ph.D. / M.Phil (Higher Education)</option>
                  <option value="Master of Science (MS)">Master's Abroad (NOS)</option>
                  <option value="B.Tech">B.Tech / MBBS / MBA (Top Class)</option>
                  <option value="B.A.">Post-Matric (B.A. / B.Sc / Diploma)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Annual Family Income</label>
                <select
                  value={calcIncome}
                  onChange={(e) => setCalcIncome(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-300 rounded font-medium"
                >
                  <option value={150000}>₹ 1,50,000 / year</option>
                  <option value={200000}>₹ 2,00,000 / year</option>
                  <option value={500000}>₹ 5,00,000 / year</option>
                  <option value={750000}>₹ 7,50,000 / year</option>
                  <option value={900000}>₹ 9,00,000 / year (Above Ceiling)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Graduation Percentage</label>
                <input
                  type="number"
                  value={calcPercentage}
                  onChange={(e) => setCalcPercentage(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-slate-300 rounded font-medium"
                  min={40}
                  max={100}
                />
              </div>
            </div>
          </div>

          {/* Schemes Catalog */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {schemes.map((scheme) => {
              const incomeEligible = calcIncome <= scheme.incomeCeiling;
              const marksEligible = calcPercentage >= scheme.minAcademicPercentage;
              const isEligible = incomeEligible && marksEligible;

              return (
                <div key={scheme.id} className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {scheme.code} · {scheme.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        Closes: {scheme.applicationDeadline}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mt-2">
                      {scheme.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {scheme.targetAudience}
                    </p>

                    <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Grant Value:</span>
                        <span className="font-bold text-slate-900">{scheme.annualAwardValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Annual Quota Slots:</span>
                        <span className="font-mono text-slate-900 tabular-nums">{scheme.totalSlots} Slots</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Income Limit:</span>
                        <span className="text-slate-900">Up to ₹{(scheme.incomeCeiling / 100000).toFixed(1)} Lakh/yr</span>
                      </div>
                    </div>

                    {/* Eligibility Match Card */}
                    <div className="mt-3 p-2.5 rounded text-xs flex items-center justify-between border">
                      {isEligible ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          You are fully eligible based on criteria
                        </span>
                      ) : (
                        <span className="text-amber-800 font-semibold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          Criteria not met (Income or % threshold)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Slots Allocated: <strong className="tabular-nums">{scheme.allocatedSlots}</strong> / {scheme.totalSlots}
                    </span>
                    <button
                      onClick={() => {
                        setNewAppForm(prev => ({ ...prev, schemeId: scheme.id }));
                        setActiveTab('apply');
                      }}
                      className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Apply for Scholarship Wizard */}
      {activeTab === 'apply' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-4xl mx-auto shadow-xs">
          
          <div className="pb-4 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">
              Apply for Scheduled Tribe Scholarship / Fellowship
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Integrated form with client-side OCR pre-validation and digital caste validation
            </p>
          </div>

          {applySuccessId ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Application Submitted Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your application has been assigned ID <span className="font-mono font-bold text-blue-700">{applySuccessId}</span> and queued for optical character recognition and officer assignment.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setApplySuccessId(null);
                    setActiveTab('tracking');
                  }}
                  className="px-4 py-2 bg-blue-700 text-white text-xs font-semibold rounded-md"
                >
                  Track Application Status
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateApplication} className="mt-5 space-y-6">
              
              {/* Wizard Step Indicators */}
              <div className="grid grid-cols-3 gap-2 pb-2">
                <button
                  type="button"
                  onClick={() => setApplyStep(1)}
                  className={`p-2 rounded text-xs font-semibold text-center border ${
                    applyStep === 1 ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  1. Scheme & Personal Details
                </button>
                <button
                  type="button"
                  onClick={() => setApplyStep(2)}
                  className={`p-2 rounded text-xs font-semibold text-center border ${
                    applyStep === 2 ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  2. Academic & ST Domicile
                </button>
                <button
                  type="button"
                  onClick={() => setApplyStep(3)}
                  className={`p-2 rounded text-xs font-semibold text-center border ${
                    applyStep === 3 ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  3. Documents & AI Pre-Check
                </button>
              </div>

              {applyStep === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Select Scheme</label>
                    <select
                      value={newAppForm.schemeId}
                      onChange={(e) => setNewAppForm({ ...newAppForm, schemeId: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600"
                    >
                      {schemes.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={newAppForm.applicantName}
                      onChange={(e) => setNewAppForm({ ...newAppForm, applicantName: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Gender</label>
                    <select
                      value={newAppForm.gender}
                      onChange={(e) => setNewAppForm({ ...newAppForm, gender: e.target.value as any })}
                      className="w-full p-2.5 border border-slate-300 rounded"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={newAppForm.dob}
                      onChange={(e) => setNewAppForm({ ...newAppForm, dob: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Annual Family Income (₹)</label>
                    <input
                      type="number"
                      value={newAppForm.annualFamilyIncome}
                      onChange={(e) => setNewAppForm({ ...newAppForm, annualFamilyIncome: Number(e.target.value) })}
                      className="w-full p-2.5 border border-slate-300 rounded"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setApplyStep(2)}
                      className="px-4 py-2 bg-blue-700 text-white font-semibold rounded"
                    >
                      Next: Academic Details
                    </button>
                  </div>
                </div>
              )}

              {applyStep === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Scheduled Tribe Community</label>
                    <input
                      type="text"
                      value={newAppForm.tribeCommunity}
                      onChange={(e) => setNewAppForm({ ...newAppForm, tribeCommunity: e.target.value })}
                      placeholder="e.g. Gond, Santhal, Bhil, Munda, Bodo"
                      className="w-full p-2.5 border border-slate-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">State of Domicile</label>
                    <input
                      type="text"
                      value={newAppForm.stateOfDomicile}
                      onChange={(e) => setNewAppForm({ ...newAppForm, stateOfDomicile: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Enrolled Course / Degree</label>
                    <input
                      type="text"
                      value={newAppForm.currentCourse}
                      onChange={(e) => setNewAppForm({ ...newAppForm, currentCourse: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 uppercase tracking-wider block mb-1">Higher Education Institution</label>
                    <input
                      type="text"
                      value={newAppForm.institution}
                      onChange={(e) => setNewAppForm({ ...newAppForm, institution: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setApplyStep(1)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setApplyStep(3)}
                      className="px-4 py-2 bg-blue-700 text-white font-semibold rounded"
                    >
                      Next: Document Pre-Validation
                    </button>
                  </div>
                </div>
              )}

              {applyStep === 3 && (
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-4 h-4 text-blue-700" />
                      <span>AI Pre-Submission Assistance Active</span>
                    </div>
                    <p className="text-[11px] text-blue-800 mt-0.5">
                      Uploaded certificates will be cross-referenced against your declared name ({newAppForm.applicantName}) and income limit (₹{newAppForm.annualFamilyIncome.toLocaleString()}) to identify mismatches prior to officer queueing.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="font-semibold text-slate-800">ST Caste Certificate (SDM / D.C. Issued)</p>
                          <span className="text-[11px] text-slate-500">ST_Certificate_Rahul.pdf · 1.4 MB</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px]">
                        AI Verified (98.2%)
                      </span>
                    </div>

                    <div className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="font-semibold text-slate-800">Income Certificate (Revenue Authority)</p>
                          <span className="text-[11px] text-slate-500">Income_Cert_2026.pdf · 890 KB</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px]">
                        AI Verified (97.8%)
                      </span>
                    </div>

                    <div className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="font-semibold text-slate-800">IISc Ph.D. Admission Offer Letter</p>
                          <span className="text-[11px] text-slate-500">IISc_Admission_Offer_2026.pdf · 1.1 MB</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px]">
                        AI Verified (99.1%)
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setApplyStep(2)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-700 text-white font-bold rounded shadow-xs hover:bg-blue-800"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>
      )}

      {/* My Applications List */}
      {activeTab === 'my-applications' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-base font-bold text-slate-900">My Submitted Applications</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review submission details, verification checkpoints, and official correspondence
            </p>
          </div>

          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-700">{app.id}</span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-semibold text-slate-700">{app.schemeName}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    {app.currentCourse} · {app.institution}
                  </h4>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span>Submitted: {app.submissionDate}</span>
                    <span>·</span>
                    <span>AI Review: <strong className="text-slate-800 tabular-nums">{app.aiReviewScore}%</strong></span>
                    <span>·</span>
                    <span>Documents: {app.documents.length}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <StatusBadge stage={app.stage} />
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-100"
                  >
                    Track Pipeline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Profile Module */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-3xl mx-auto shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Applicant Digital Profile</h2>
              <p className="text-xs text-slate-500">Scheduled Tribe Beneficiary Master Record</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Aadhaar Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-slate-500 block uppercase font-medium">Full Legal Name</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{myApp.applicantName}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-slate-500 block uppercase font-medium">Tribe / Community</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">{myApp.tribeCommunity} (Central ST List)</span>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-slate-500 block uppercase font-medium">State & District Domicile</span>
              <span className="text-sm font-semibold text-slate-900 mt-0.5 block">{myApp.district}, {myApp.stateOfDomicile}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100">
              <span className="text-slate-500 block uppercase font-medium">Annual Family Income</span>
              <span className="text-sm font-semibold text-slate-900 mt-0.5 block tabular-nums">₹ {myApp.annualFamilyIncome.toLocaleString()}</span>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-100 sm:col-span-2">
              <span className="text-slate-500 block uppercase font-medium">Direct Benefit Transfer (DBT) Readiness</span>
              <div className="mt-1 flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Bank Account Seeded with NPCI / Aadhaar Gateway for Direct Scholarship Credit</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Tracking Module */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          <PipelineTracker currentStage={myApp.stage} />

          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-3 border-b border-slate-100 mb-4">
              Lifecycle Milestone Audit for #{myApp.id}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Application Submitted Online</h4>
                  <p className="text-[11px] text-slate-500">{myApp.submissionDate} · All 4 statutory certificates attached</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">✓</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">AI Document Extraction Completed</h4>
                  <p className="text-[11px] text-slate-500">OCR Confidence: {myApp.aiReviewScore}% · Entity parsing verified</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  myApp.stage === 'deficient' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {myApp.stage === 'deficient' ? '!' : '✓'}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {myApp.stage === 'deficient' ? 'Officer Raised Deficiency Notice' : 'Verification Desk Clearance'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {myApp.assignedOfficerName || 'Senior Officer assigned'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Module */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Official System Notifications
          </h2>
          <div className="divide-y divide-slate-100 mt-2">
            {notifications.map(n => (
              <div key={n.id} className="py-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{n.title}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{n.timestamp}</span>
                </div>
                <p className="text-slate-600 mt-1">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
