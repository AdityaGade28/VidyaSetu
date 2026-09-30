import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, DocumentType } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { StatCard } from '../common/StatCard';
import { AIDocumentIntelligenceScreen } from '../ai-intelligence/AIDocumentIntelligenceScreen';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Sparkles, 
  Filter, 
  Search, 
  ClipboardCheck, 
  Eye, 
  Send, 
  ArrowRight, 
  History, 
  CheckSquare, 
  BrainCircuit, 
  FileSearch,
  Check,
  RotateCcw
} from 'lucide-react';

export const OfficerDashboard: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    applications, 
    selectedApplicationId, 
    setSelectedApplicationId,
    verifyApplication,
    raiseDeficiency,
    rejectApplication,
    auditLogs
  } = useApp();

  const selectedApp = applications.find(a => a.id === selectedApplicationId) || applications[0];

  // Officer action modal states
  const [officerNotes, setOfficerNotes] = useState('');
  const [showDeficiencyModal, setShowDeficiencyModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Deficiency form state
  const [defDocType, setDefDocType] = useState<DocumentType>('st_caste_certificate');
  const [defCategory, setDefCategory] = useState<'name_mismatch' | 'unclear_scan' | 'expired_document' | 'missing_stamp'>('name_mismatch');
  const [defRemarks, setDefRemarks] = useState('');
  const [defDays, setDefDays] = useState(15);

  // Rejection state
  const [rejectReason, setRejectReason] = useState('');

  // Queue filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.tribeCommunity.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'deficient') return matchesSearch && app.stage === 'deficient';
    if (statusFilter === 'verified') return matchesSearch && app.stage === 'verified';
    if (statusFilter === 'pending') return matchesSearch && (app.stage === 'under_verification' || app.stage === 'ai_review' || app.stage === 'submitted');
    return matchesSearch;
  });

  const handleVerify = () => {
    verifyApplication(selectedApp.id, officerNotes || 'All statutory Scheduled Tribe documents and income thresholds verified against state registries.');
    setActionSuccessMsg(`Application ${selectedApp.id} (${selectedApp.applicantName}) successfully verified and forwarded to Selection Committee.`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleRaiseDeficiency = (e: React.FormEvent) => {
    e.preventDefault();
    raiseDeficiency(
      selectedApp.id,
      defDocType,
      defCategory,
      defRemarks || 'The uploaded certificate has a spelling discrepancy compared with official identification. Please provide clarifying affidavit.',
      defDays
    );
    setShowDeficiencyModal(false);
    setDefRemarks('');
    setActionSuccessMsg(`Deficiency notice DEF issued to ${selectedApp.applicantName}. Grace period: ${defDays} days.`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    rejectApplication(selectedApp.id, rejectReason || 'Ineligible due to family income exceeding statutory ceiling.');
    setShowRejectModal(false);
    setRejectReason('');
    setActionSuccessMsg(`Application ${selectedApp.id} marked as Ineligible/Rejected.`);
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Officer Command Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-700 text-white rounded-lg shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900">
                Verification Command Center
              </h1>
              <span className="text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                Officer Desk #104
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Assigned to: <strong className="text-slate-800">Dr. Alok Choudhury (Senior Verification Officer)</strong> · Central ST Fellowship Cell
            </p>
          </div>
        </div>

        {/* Statutory Discretion Mandate Notice */}
        <div className="bg-blue-50 border border-blue-200 text-blue-900 px-3 py-2 rounded-md text-xs max-w-md">
          <div className="flex items-center gap-1.5 font-bold">
            <BrainCircuit className="w-4 h-4 text-blue-700" />
            <span>Statutory Decision Protocol</span>
          </div>
          <p className="text-[11px] text-blue-800 mt-0.5">
            “AI assists verification. Authorized officers make final decisions.”
          </p>
        </div>
      </div>

      {/* Action Success Toast Banner */}
      {actionSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-lg text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* KPIs & Queue Summary */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Assigned to Officer"
              value={128}
              subValue="Current Quarter Queue"
              indicatorColor="blue"
              icon={ClipboardCheck}
            />
            <StatCard
              label="Pending Verification"
              value={applications.filter(a => a.stage === 'under_verification' || a.stage === 'ai_review').length}
              subValue="Ready for Officer Action"
              indicatorColor="amber"
              icon={FileSearch}
            />
            <StatCard
              label="In Deficiency / Correction"
              value={applications.filter(a => a.stage === 'deficient').length}
              subValue="Awaiting Student Clarification"
              indicatorColor="rose"
              icon={AlertTriangle}
            />
            <StatCard
              label="Verified Today"
              value={applications.filter(a => a.stage === 'verified' || a.stage === 'selected').length}
              subValue="Cleared to Committee"
              indicatorColor="emerald"
              icon={CheckCircle2}
            />
          </div>

          {/* Quick Access to Active Verification Review */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Priority Verification Desk: Candidate {selectedApp.applicantName} (#{selectedApp.id})
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedApp.currentCourse} · {selectedApp.institution}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge stage={selectedApp.stage} />
                <button
                  onClick={() => setActiveTab('review')}
                  className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded transition-colors flex items-center gap-1"
                >
                  <span>Open Full Review Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Side-by-Side Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-500 block uppercase text-[10px]">Tribe & State</span>
                <span className="font-bold text-slate-900 mt-1 block">{selectedApp.tribeCommunity} · {selectedApp.stateOfDomicile}</span>
                <span className="text-[11px] text-slate-500 mt-1 block">District: {selectedApp.district}</span>
              </div>

              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-500 block uppercase text-[10px]">AI OCR Extraction Match</span>
                <span className="font-bold text-blue-700 mt-1 block tabular-nums">{selectedApp.aiReviewScore}% Confidence</span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {selectedApp.aiFlagsCount > 0 ? `${selectedApp.aiFlagsCount} Potential Discrepancy Flagged` : 'All Entities Cleanly Matched'}
                </span>
              </div>

              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-500 block uppercase text-[10px]">Income Ceiling Check</span>
                <span className="font-bold text-slate-900 mt-1 block tabular-nums">₹ {selectedApp.annualFamilyIncome.toLocaleString()} / year</span>
                <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Within ₹6.0L NFST Ceiling</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Queue Module */}
      {(activeTab === 'queue' || activeTab === 'overview') && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Assigned Applications Queue
              </h3>
              <p className="text-xs text-slate-500">
                Scheduled Tribe fellowship applications queued for statutory document clearance
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search name, ID, tribe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Officer Review</option>
                <option value="deficient">Deficient / In Correction</option>
                <option value="verified">Verified</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Application ID</th>
                  <th className="py-2.5 px-3">Applicant Name</th>
                  <th className="py-2.5 px-3">ST Community</th>
                  <th className="py-2.5 px-3">Scheme</th>
                  <th className="py-2.5 px-3">AI Confidence</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr 
                    key={app.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      selectedApp.id === app.id ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-mono font-bold text-blue-700">
                      {app.id}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-900">
                      {app.applicantName}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {app.tribeCommunity} ({app.stateOfDomicile})
                    </td>
                    <td className="py-3 px-3 text-slate-600 truncate max-w-[180px]">
                      {app.schemeName}
                    </td>
                    <td className="py-3 px-3 font-mono tabular-nums">
                      <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        app.aiReviewScore >= 95 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {app.aiReviewScore}%
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge stage={app.stage} size="sm" />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedApplicationId(app.id);
                          setActiveTab('review');
                        }}
                        className="px-2.5 py-1 bg-white border border-slate-300 hover:border-blue-600 text-blue-700 hover:text-blue-800 font-semibold rounded text-xs transition-colors"
                      >
                        Inspect & Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Document Intelligence Module */}
      {activeTab === 'ai-intelligence' && (
        <AIDocumentIntelligenceScreen embeddedApp={selectedApp} />
      )}

      {/* Full Application Review Desk */}
      {activeTab === 'review' && (
        <div className="space-y-6">
          
          {/* Top Review Header */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-blue-700">{selectedApp.id}</span>
                  <span className="text-slate-400">·</span>
                  <h2 className="text-base font-bold text-slate-900">
                    Application Review Desk: {selectedApp.applicantName}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedApp.currentCourse} · {selectedApp.institution} ({selectedApp.institutionType})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge stage={selectedApp.stage} />
                <span className="text-xs text-slate-500">Submitted: {selectedApp.submissionDate}</span>
              </div>
            </div>

            {/* Statutory Human Guarantee Banner */}
            <div className="mt-3 p-2.5 rounded bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
              <span className="font-semibold">
                “AI assists verification. Authorized officers make final decisions.”
              </span>
              <span className="text-[11px] text-blue-700 font-mono">
                Manual Confirmation Required for Sign-Off
              </span>
            </div>
          </div>

          {/* Split Pane: Document Intelligence + Verification Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left 7 Cols: Applicant Profile & Document Verification Analysis */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Applicant Dossier Table */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  1. Statutory Eligibility Profile
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-slate-500 text-[11px] block">Scheduled Tribe Name</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{selectedApp.tribeCommunity} (Central ST List)</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-slate-500 text-[11px] block">State of Domicile</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{selectedApp.stateOfDomicile} ({selectedApp.district})</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-slate-500 text-[11px] block">Declared Family Income</span>
                    <span className="font-bold text-slate-900 mt-0.5 block tabular-nums">₹ {selectedApp.annualFamilyIncome.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded">
                    <span className="text-slate-500 text-[11px] block">Prior Academic Score</span>
                    <span className="font-bold text-slate-900 mt-0.5 block tabular-nums">{selectedApp.academicScore}% (Eligible &gt; 55%)</span>
                  </div>
                </div>
              </div>

              {/* Submitted Documents & OCR Diff */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    2. Submitted Documents & OCR Analysis ({selectedApp.documents.length})
                  </h3>
                  <span className="text-[11px] text-blue-700 font-semibold">Optical Character Recognition</span>
                </div>

                <div className="space-y-3">
                  {selectedApp.documents.map((doc) => (
                    <div key={doc.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-bold text-slate-900 block">{doc.title}</span>
                          <span className="font-mono text-[11px] text-slate-500">{doc.fileName} · {doc.fileSize}</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-700 tabular-nums">
                          {doc.aiConfidence}% OCR
                        </span>
                      </div>

                      {/* Mismatch Alert Box */}
                      {doc.mismatchDetails ? (
                        <div className="mt-2.5 p-2.5 bg-amber-50 border border-amber-300 rounded text-amber-900 text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold">
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                              Potential Discrepancy Flagged
                            </span>
                            <span className="text-[10px] bg-amber-200 px-1.5 py-0.2 rounded uppercase">
                              Manual Review Required
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                            <div>Declared: <strong className="text-slate-900">{doc.mismatchDetails.applicationValue}</strong></div>
                            <div>Cert OCR: <strong className="text-amber-800">{doc.mismatchDetails.documentValue}</strong></div>
                          </div>
                          <p className="text-[11px] text-amber-800 pt-0.5">
                            {doc.mismatchDetails.explanation}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>All extracted entities match statutory requirements.</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Officer Checklist, Comments & Decision Actions */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Statutory Officer Verification Checklist */}
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-blue-700" />
                  <span>3. Statutory Verification Checklist</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <label className="flex items-start gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-600" />
                    <span>ST Certificate issued by competent Revenue Authority (SDM / Collector).</span>
                  </label>
                  <label className="flex items-start gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-600" />
                    <span>Family income is within the statutory ceiling of ₹6.00 Lakh.</span>
                  </label>
                  <label className="flex items-start gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-600" />
                    <span>Confirmed regular full-time Ph.D./M.Phil enrollment in recognized University.</span>
                  </label>
                  <label className="flex items-start gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-600" />
                    <span>Aadhaar number verified and bank account seeded for DBT.</span>
                  </label>
                </div>
              </div>

              {/* Officer Decision Box */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  4. Officer Remarks & Decision
                </h3>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Official Verification Notes
                  </label>
                  <textarea
                    rows={3}
                    value={officerNotes}
                    onChange={(e) => setOfficerNotes(e.target.value)}
                    placeholder="Enter formal verification clearance notes or justification for committee transmission..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                {/* 3 Core Actions Required in Prompt */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  
                  {/* Action 1: Verify */}
                  <button
                    onClick={handleVerify}
                    className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Application & Send to Committee</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Action 2: Request Correction / Raise Deficiency */}
                    <button
                      onClick={() => setShowDeficiencyModal(true)}
                      className="py-2 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Request Correction</span>
                    </button>

                    {/* Action 3: Reject with Reason */}
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="py-2 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject with Reason</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Deficiency Management Module */}
      {activeTab === 'deficiency-mgmt' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Active Deficiency Notices & Correction Tracking
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review candidates in correction mode, grace period countdowns, and student resubmissions
            </p>
          </div>

          <div className="space-y-4">
            {applications.flatMap(a => a.deficiencies.map(d => ({ ...d, app: a }))).map(def => (
              <div key={def.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-800">{def.id}</span>
                    <span className="text-slate-400">·</span>
                    <span className="font-semibold text-slate-800">{def.app.applicantName} ({def.applicationId})</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[11px]">
                    Status: {def.status === 'pending_student' ? 'Awaiting Student Action' : 'Resubmitted'}
                  </span>
                </div>

                <p className="text-slate-700 bg-white p-2.5 rounded border border-slate-200">
                  <strong>Officer Query:</strong> {def.officerRemarks}
                </p>

                {def.studentResponse && (
                  <p className="text-blue-900 bg-blue-50 p-2.5 rounded border border-blue-200">
                    <strong>Student Response:</strong> {def.studentResponse}
                  </p>
                )}

                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>Issued: {def.raisedDate} · Grace Deadline: <strong>{def.deadline}</strong></span>
                  <button
                    onClick={() => {
                      setSelectedApplicationId(def.applicationId);
                      setActiveTab('review');
                    }}
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    Open Review Desk
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decision History Module */}
      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Officer Clearance & Audit History
          </h2>
          <div className="mt-3 divide-y divide-slate-100">
            {auditLogs.filter(l => l.role === 'Verification Officer').map(log => (
              <div key={log.id} className="py-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <span className="font-mono text-slate-400 text-[11px]">{log.timestamp}</span>
                </div>
                <p className="text-slate-600 mt-0.5">{log.details}</p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                  <span>Actor: <strong>{log.actor}</strong></span>
                  {log.applicationId && <span>· App ID: <strong className="font-mono">{log.applicationId}</strong></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deficiency Modal */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 max-w-lg w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Issue Deficiency Notice ({selectedApp.applicantName})
                </h3>
              </div>
              <button onClick={() => setShowDeficiencyModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleRaiseDeficiency} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Document</label>
                <select
                  value={defDocType}
                  onChange={(e) => setDefDocType(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded"
                >
                  <option value="st_caste_certificate">Scheduled Tribe Caste Certificate</option>
                  <option value="income_certificate">Annual Income Certificate</option>
                  <option value="admission_offer_letter">Admission Offer Letter</option>
                  <option value="previous_marksheet">Previous Marksheet / Transcripts</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deficiency Category</label>
                <select
                  value={defCategory}
                  onChange={(e) => setDefCategory(e.target.value as any)}
                  className="w-full p-2 border border-slate-300 rounded"
                >
                  <option value="name_mismatch">Name / Spelling Mismatch (Initial Abbreviation)</option>
                  <option value="unclear_scan">Unclear Scan / Low Legibility Seal</option>
                  <option value="expired_document">Expired Income Certificate (Outside Financial Year)</option>
                  <option value="missing_stamp">Missing SDM / Competent Authority Rubber Seal</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Specific Officer Directions for Student</label>
                <textarea
                  rows={3}
                  value={defRemarks}
                  onChange={(e) => setDefRemarks(e.target.value)}
                  placeholder="Detail the exact document or gazette affidavit the candidate must upload to rectify the issue..."
                  className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Grace Period (Days)</label>
                <input
                  type="number"
                  value={defDays}
                  onChange={(e) => setDefDays(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded"
                  min={5}
                  max={30}
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowDeficiencyModal(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 text-white rounded font-bold hover:bg-amber-700"
                >
                  Transmit Deficiency Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 max-w-md w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-700">
                <XCircle className="w-5 h-5" />
                <h3 className="text-sm font-bold text-slate-900">
                  Reject Application ({selectedApp.applicantName})
                </h3>
              </div>
              <button onClick={() => setShowRejectModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleReject} className="space-y-3 text-xs">
              <p className="text-slate-600">
                Please enter the statutory justification for rejecting this application. This remark will be permanently logged in the audit trail.
              </p>
              <div>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Ineligible: Family income certificate shows ₹7,50,000, exceeding statutory ceiling of ₹6,00,000."
                  className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-rose-600"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-600 text-white rounded font-bold hover:bg-rose-700"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
