import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scheme, AuditLogEntry, UserRole } from '../../types';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Building2, 
  Sliders, 
  BarChart3, 
  ShieldAlert, 
  Users, 
  Files, 
  ClipboardCheck, 
  Award, 
  Settings, 
  Download, 
  PlusCircle, 
  Check, 
  Search, 
  Filter, 
  Sparkles, 
  FileText, 
  Layers,
  Database,
  ExternalLink,
  Edit2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    schemes, 
    updateScheme, 
    addScheme, 
    applications, 
    auditLogs, 
    systemMetrics 
  } = useApp();

  // Audit log filters
  const [auditSearch, setAuditSearch] = useState('');
  const [auditRoleFilter, setAuditRoleFilter] = useState('All');

  // Scheme Editing state
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [showNewSchemeModal, setShowNewSchemeModal] = useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  // New Scheme Form
  const [newSchemeData, setNewSchemeData] = useState<Partial<Scheme>>({
    code: 'NEW-ST-SCHEME',
    name: 'National Doctoral Research Fellowship for ST Scholars',
    category: 'Higher Education Fellowship',
    targetAudience: 'ST scholars pursuing interdisciplinary scientific research',
    totalSlots: 200,
    allocatedSlots: 0,
    annualAwardValue: '₹42,000/mo + ₹30,000 Contingency',
    incomeCeiling: 650000,
    minAcademicPercentage: 60,
    applicationDeadline: '2026-12-31',
    status: 'Active',
    verificationWorkflow: 'Two-Tier Verification',
    deficiencyGraceDays: 15,
    selectionCriteria: {
      academicWeight: 50,
      researchWeight: 30,
      socioEconomicWeight: 20
    },
    requiredDocuments: ['st_caste_certificate', 'income_certificate', 'aadhaar_card', 'admission_offer_letter']
  });

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.actor.toLowerCase().includes(auditSearch.toLowerCase()) ||
                          log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
                          (log.applicationId && log.applicationId.toLowerCase().includes(auditSearch.toLowerCase())) ||
                          log.details.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesRole = auditRoleFilter === 'All' || log.role === auditRoleFilter;
    return matchesSearch && matchesRole;
  });

  const handleSaveScheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScheme) return;
    updateScheme(editingScheme);
    setEditingScheme(null);
    setSavedSuccessMsg(`Scheme configuration for ${editingScheme.code} updated successfully.`);
    setTimeout(() => setSavedSuccessMsg(null), 3000);
  };

  const handleCreateScheme = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `SCH-CUSTOM-${Date.now().toString().slice(-4)}`;
    const created: Scheme = {
      ...(newSchemeData as Scheme),
      id: newId,
      eligibleCourses: ['Ph.D.', 'M.Tech', 'MS']
    };
    addScheme(created);
    setShowNewSchemeModal(false);
    setSavedSuccessMsg(`New Scheme ${created.name} registered.`);
    setTimeout(() => setSavedSuccessMsg(null), 3000);
  };

  // Recharts Colors
  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

  return (
    <div className="space-y-6">
      
      {/* Ministry Executive Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-900 text-white rounded-lg shadow-xs">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900">
                Ministry Administration Command Center
              </h1>
              <span className="text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                Apex Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              National Scholarship Monitoring · Scheduled Tribe Higher Education Directorate
            </p>
          </div>
        </div>

        {/* Mandatory Demo Data Assurance Badge */}
        <div className="bg-slate-100 border border-slate-300 text-slate-800 px-3.5 py-2 rounded-md text-xs">
          <div className="flex items-center gap-1.5 font-bold text-blue-800">
            <Database className="w-4 h-4" />
            <span>Synthetic Demonstration Data</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-0.5">
            All figures, quotas, and state allocations are simulated demo datasets.
          </p>
        </div>
      </div>

      {savedSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-lg text-xs font-semibold flex items-center justify-between">
          <span>{savedSuccessMsg}</span>
          <button onClick={() => setSavedSuccessMsg(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Overview Module (National Summary Metrics & Analytics Charts) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Synthetic Dashboard Metrics requested in Prompt:
              Total Applications, Under Verification, Deficient, Verified, Under Selection, Selected, Processing Time */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <StatCard
              label="Total Applications"
              value={systemMetrics.totalApplications}
              subValue="Demo Data"
              indicatorColor="blue"
            />
            <StatCard
              label="Under Verification"
              value={systemMetrics.underVerification}
              subValue="Officer Desks"
              indicatorColor="blue"
            />
            <StatCard
              label="Deficient"
              value={systemMetrics.deficient}
              subValue="In Correction"
              indicatorColor="amber"
            />
            <StatCard
              label="Verified"
              value={systemMetrics.verified}
              subValue="Statutory Pass"
              indicatorColor="emerald"
            />
            <StatCard
              label="Under Selection"
              value={systemMetrics.underSelection}
              subValue="Committee Bench"
              indicatorColor="purple"
            />
            <StatCard
              label="Selected"
              value={systemMetrics.selected}
              subValue="Awarded"
              indicatorColor="emerald"
            />
            <StatCard
              label="Processing Time"
              value={`${systemMetrics.avgProcessingDays} Days`}
              subValue="Average Turnaround"
              indicatorColor="indigo"
            />
          </div>

          {/* Charts Row 1: Application Trends & Verification Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Chart 1: Application & Selection Trends */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Application & Clearance Trends (FY 2026-27)
                  </h3>
                  <span className="text-[11px] text-slate-400">Monthly intake vs verified vs selected · Demo Data</span>
                </div>
                <span className="text-xs font-bold text-blue-700">Recharts Active</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={systemMetrics.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="applications" name="Intake" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="verified" name="Verified" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="selected" name="Awarded" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Scheme-Wise Application Volume vs Allocated Slots */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Scheme-Wise Application Volume (Demo Data)
                  </h3>
                  <span className="text-[11px] text-slate-400">Total applicants competing per fellowship scheme</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={systemMetrics.schemeWiseDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="scheme" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                    <Bar dataKey="count" name="Applications" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Charts Row 2: State-Wise Distribution & Deficiency Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Chart 3: State-Wise Scheduled Tribe Applications */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    State-Wise Applications & Verification Clearance
                  </h3>
                  <span className="text-[11px] text-slate-400">Major tribal belt states · Demo Data</span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={systemMetrics.stateWiseDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="state" type="category" tick={{ fontSize: 10 }} width={90} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="count" name="Applications" fill="#6366f1" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="verified" name="Verified" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Deficiency Categories Breakdown */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Deficiency Root Causes (Demo Data)
                  </h3>
                  <span className="text-[11px] text-slate-400">Categories flagged by AI & verified by officers</span>
                </div>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={systemMetrics.deficiencyCategories}
                      dataKey="count"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {systemMetrics.deficiencyCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Scheme Management & Configuration Module */}
      {activeTab === 'schemes' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Configurable Scheme Management Interface
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure eligibility rules, required documents, workflows, grace periods, and selection criteria. (All marked as Demo / Configurable Data).
                </p>
              </div>

              <button
                onClick={() => setShowNewSchemeModal(true)}
                className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Configure New Scheme</span>
              </button>
            </div>

            {/* Schemes List */}
            <div className="space-y-4">
              {schemes.map((sch) => (
                <div key={sch.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {sch.code}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm">{sch.name}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {sch.status}
                      </span>
                    </div>

                    <button
                      onClick={() => setEditingScheme({ ...sch })}
                      className="px-3 py-1 bg-white border border-slate-300 text-slate-700 hover:text-blue-700 hover:border-blue-600 font-semibold rounded text-xs transition-colors flex items-center gap-1 shrink-0 self-start sm:self-center"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Configuration</span>
                    </button>
                  </div>

                  <p className="text-slate-600 text-[11px]">{sch.targetAudience}</p>

                  {/* Configured Parameters Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200 text-slate-700 text-[11px]">
                    <div>
                      <span className="text-slate-400 block uppercase text-[10px]">Income Ceiling</span>
                      <span className="font-bold text-slate-900">₹ {(sch.incomeCeiling / 100000).toFixed(1)} Lakh / yr</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase text-[10px]">Quota Slots</span>
                      <span className="font-bold text-slate-900 tabular-nums">{sch.totalSlots} Slots</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase text-[10px]">Workflow Model</span>
                      <span className="font-bold text-blue-700">{sch.verificationWorkflow}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase text-[10px]">Deficiency Grace</span>
                      <span className="font-bold text-amber-700">{sch.deficiencyGraceDays} Days</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] text-slate-500">
                    <span className="font-semibold text-slate-700">Required Documents:</span>
                    {sch.requiredDocuments.map(doc => (
                      <span key={doc} className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono">
                        {doc.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Application Monitoring Module */}
      {activeTab === 'app-monitoring' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-base font-bold text-slate-900">National Application Monitoring</h2>
            <p className="text-xs text-slate-500">Real-time status drilldown across all Scheduled Tribe applicants</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Application ID</th>
                  <th className="py-2.5 px-3">Applicant Name</th>
                  <th className="py-2.5 px-3">Community / Domicile</th>
                  <th className="py-2.5 px-3">Scheme</th>
                  <th className="py-2.5 px-3">Enrolled Course</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono font-bold text-blue-700">{app.id}</td>
                    <td className="py-3 px-3 font-medium text-slate-900">{app.applicantName}</td>
                    <td className="py-3 px-3 text-slate-600">{app.tribeCommunity} · {app.stateOfDomicile}</td>
                    <td className="py-3 px-3 text-slate-600 truncate max-w-[180px]">{app.schemeName}</td>
                    <td className="py-3 px-3 text-slate-600">{app.currentCourse}</td>
                    <td className="py-3 px-3"><StatusBadge stage={app.stage} size="sm" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports & Analytics Module */}
      {activeTab === 'analytics' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Ministry Analytics & MIS Reports</h2>
              <p className="text-xs text-slate-500">Detailed statistical reporting on ST fellowship disbursal and clearance SLAs</p>
            </div>
            <button className="px-3 py-1.5 bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Export MIS Report (PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-500 uppercase font-semibold text-[10px] block">Disbursed Budget (FY 26-27)</span>
              <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">₹ 384.60 Cr</p>
              <span className="text-emerald-700 font-semibold text-[11px] block mt-1">98.4% DBT Direct Seeded</span>
            </div>
            <div className="p-4 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-500 uppercase font-semibold text-[10px] block">AI OCR Assistance Rate</span>
              <p className="text-2xl font-bold text-blue-700 mt-1 tabular-nums">98.7%</p>
              <span className="text-slate-500 text-[11px] block mt-1">Zero False Rejections Mandate</span>
            </div>
            <div className="p-4 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-500 uppercase font-semibold text-[10px] block">Average Resolution SLA</span>
              <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">8.4 Days</p>
              <span className="text-slate-500 text-[11px] block mt-1">Down from 45 days in legacy workflow</span>
            </div>
          </div>
        </div>
      )}

      {/* Audit Trail Module requested in Prompt */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                System-Wide Immutable Audit Trail
              </h2>
              <p className="text-xs text-slate-500">
                Statutory transaction log tracking all actions across Applicants, AI Services, Officers, and Selection Bench
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  className="pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none"
                />
              </div>

              <select
                value={auditRoleFilter}
                onChange={(e) => setAuditRoleFilter(e.target.value)}
                className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded font-medium"
              >
                <option value="All">All Roles</option>
                <option value="Applicant">Applicant</option>
                <option value="Verification Officer">Verification Officer</option>
                <option value="Selection Committee">Selection Committee</option>
                <option value="Ministry Admin">Ministry Admin</option>
                <option value="AI Intelligence Service">AI Intelligence Service</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Actor & Role</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Application ID</th>
                  <th className="py-2.5 px-3">Details</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-2.5 px-3 font-sans">
                      <span className="font-semibold text-slate-900 block">{log.actor}</span>
                      <span className="text-[10px] text-slate-400 block">{log.role}</span>
                    </td>
                    <td className="py-2.5 px-3 font-sans font-bold text-slate-800">{log.action}</td>
                    <td className="py-2.5 px-3 text-blue-700 font-bold">{log.applicationId || '—'}</td>
                    <td className="py-2.5 px-3 font-sans text-slate-600 max-w-xs truncate">{log.details}</td>
                    <td className="py-2.5 px-3 text-right font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'Success' ? 'bg-emerald-50 text-emerald-700' :
                        log.status === 'Action Required' ? 'bg-amber-50 text-amber-800' :
                        log.status === 'Flagged' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User & Role Management Module */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            User & Role Management
          </h2>
          <div className="mt-4 space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Dr. Alok Choudhury</p>
                <span className="text-slate-500">Senior Verification Officer · Regional Desk Central</span>
              </div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-semibold rounded text-[11px]">Active</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Prof. Meenakshi Toppo</p>
                <span className="text-slate-500">Selection Committee Chairperson · National Evaluation Bench</span>
              </div>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 font-semibold rounded text-[11px]">Active</span>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">K. S. Ramanathan, IAS</p>
                <span className="text-slate-500">Directorate of Scheduled Tribe Scholarships · Super Admin</span>
              </div>
              <span className="px-2 py-0.5 bg-slate-200 text-slate-800 font-semibold rounded text-[11px]">Super Admin</span>
            </div>
          </div>
        </div>
      )}

      {/* System Configuration Module */}
      {activeTab === 'config' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 max-w-3xl space-y-4 text-xs">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Platform System Configuration
          </h2>

          <div className="space-y-3">
            <div className="p-3 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">AI Confidence Alert Threshold</p>
                <span className="text-slate-500">Triggers mandatory officer inspection if document OCR score falls below threshold</span>
              </div>
              <span className="font-mono font-bold text-blue-700 text-sm">85%</span>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Default Deficiency Grace Period</p>
                <span className="text-slate-500">Number of calendar days granted to ST candidates to resolve clarification notices</span>
              </div>
              <span className="font-mono font-bold text-amber-700 text-sm">15 Days</span>
            </div>

            <div className="p-3 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Direct Benefit Transfer (DBT) Validation Gateway</p>
                <span className="text-slate-500">Aadhaar-NPCI automated mapper for sanction release</span>
              </div>
              <span className="font-semibold text-emerald-700">Enabled (Simulation)</span>
            </div>
          </div>
        </div>
      )}

      {/* Edit Scheme Modal */}
      {editingScheme && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 max-w-xl w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Edit Scheme Configuration: {editingScheme.name} ({editingScheme.code})
              </h3>
              <button onClick={() => setEditingScheme(null)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveScheme} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Income Ceiling (₹)</label>
                  <input
                    type="number"
                    value={editingScheme.incomeCeiling}
                    onChange={(e) => setEditingScheme({ ...editingScheme, incomeCeiling: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Total Quota Slots</label>
                  <input
                    type="number"
                    value={editingScheme.totalSlots}
                    onChange={(e) => setEditingScheme({ ...editingScheme, totalSlots: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Deficiency Grace Days</label>
                  <input
                    type="number"
                    value={editingScheme.deficiencyGraceDays}
                    onChange={(e) => setEditingScheme({ ...editingScheme, deficiencyGraceDays: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Verification Model</label>
                  <select
                    value={editingScheme.verificationWorkflow}
                    onChange={(e) => setEditingScheme({ ...editingScheme, verificationWorkflow: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded font-medium"
                  >
                    <option value="Single Officer">Single Officer</option>
                    <option value="Two-Tier Verification">Two-Tier Verification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Grant Description</label>
                <input
                  type="text"
                  value={editingScheme.annualAwardValue}
                  onChange={(e) => setEditingScheme({ ...editingScheme, annualAwardValue: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded"
                  required
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingScheme(null)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 text-white rounded font-bold hover:bg-blue-800"
                >
                  Save Scheme Rules
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Scheme Modal */}
      {showNewSchemeModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 max-w-xl w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Configure New Scheduled Tribe Scheme</h3>
              <button onClick={() => setShowNewSchemeModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateScheme} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Scheme Code</label>
                <input
                  type="text"
                  value={newSchemeData.code}
                  onChange={(e) => setNewSchemeData({ ...newSchemeData, code: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Scheme Name</label>
                <input
                  type="text"
                  value={newSchemeData.name}
                  onChange={(e) => setNewSchemeData({ ...newSchemeData, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Income Ceiling (₹)</label>
                  <input
                    type="number"
                    value={newSchemeData.incomeCeiling}
                    onChange={(e) => setNewSchemeData({ ...newSchemeData, incomeCeiling: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Total Quota Slots</label>
                  <input
                    type="number"
                    value={newSchemeData.totalSlots}
                    onChange={(e) => setNewSchemeData({ ...newSchemeData, totalSlots: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewSchemeModal(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 text-white rounded font-bold hover:bg-blue-800"
                >
                  Create & Activate Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
