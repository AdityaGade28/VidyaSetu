import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { StatCard } from '../common/StatCard';
import { 
  Award, 
  Users, 
  Scale, 
  FileCheck2, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ThumbsUp, 
  PauseCircle, 
  XCircle, 
  Search, 
  ChevronRight, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const CommitteeDashboard: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    applications, 
    selectedApplicationId, 
    setSelectedApplicationId,
    committeeDecision,
    auditLogs
  } = useApp();

  // Eligible applications are verified applications ready for selection
  const eligibleApps = applications.filter(a => 
    a.stage === 'verified' || a.stage === 'under_selection' || a.stage === 'selected'
  );

  const [currentCandidateId, setCurrentCandidateId] = useState<string>(
    eligibleApps[0]?.id || applications[0]?.id || ''
  );

  const activeCandidate: Application | undefined = applications.find(a => a.id === currentCandidateId) || applications[0];

  // Scoring rubric state
  const [academicScore, setAcademicScore] = useState<number>(45); // out of 50
  const [researchScore, setResearchScore] = useState<number>(28); // out of 30
  const [socioEconomicScore, setSocioEconomicScore] = useState<number>(18); // out of 20
  const [committeeRemarks, setCommitteeRemarks] = useState<string>('');
  const [decisionSuccessMsg, setDecisionSuccessMsg] = useState<string | null>(null);

  const totalCalculatedScore = academicScore + researchScore + socioEconomicScore;

  const handleDecision = (decision: 'recommended' | 'waitlisted' | 'held' | 'rejected') => {
    if (!activeCandidate) return;
    committeeDecision(
      activeCandidate.id,
      decision,
      committeeRemarks || `Candidate evaluated under transparent merit rubric. Total Score: ${totalCalculatedScore}/100. NIRF Rank & research feasibility substantiated.`,
      totalCalculatedScore
    );
    setDecisionSuccessMsg(`Decision for candidate ${activeCandidate.applicantName} recorded as: ${decision.toUpperCase()}`);
    setTimeout(() => setDecisionSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Committee Command Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-700 text-white rounded-lg shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900">
                Selection Committee Bench
              </h1>
              <span className="text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                National ST Fellowship Bench
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Chairperson: <strong className="text-slate-800">Prof. Meenakshi Toppo</strong> · National Evaluation Committee
            </p>
          </div>
        </div>

        {/* Mandatory Committee Authority Callout */}
        <div className="bg-purple-50 border border-purple-200 text-purple-900 px-3.5 py-2.5 rounded-md text-xs max-w-md">
          <div className="flex items-center gap-1.5 font-bold">
            <Scale className="w-4 h-4 text-purple-700" />
            <span>Transparent Merit Governance</span>
          </div>
          <p className="text-[11px] text-purple-800 mt-0.5">
            “Final selection is made by the authorized committee. The system provides transparent criteria scoring without opaque AI algorithmic ranking.”
          </p>
        </div>
      </div>

      {decisionSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-lg text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{decisionSuccessMsg}</span>
          </div>
          <button onClick={() => setDecisionSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* KPI Cards */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Sanctioned Quota Slots"
              value="750 Slots"
              subValue="NFST Annual Sanction"
              indicatorColor="purple"
              icon={Award}
            />
            <StatCard
              label="Verified Candidates"
              value={eligibleApps.length}
              subValue="Cleared by Officer Desk"
              indicatorColor="blue"
              icon={Users}
            />
            <StatCard
              label="Selected for Award"
              value={applications.filter(a => a.stage === 'selected').length}
              subValue="Fellowships Sanctioned"
              indicatorColor="emerald"
              icon={CheckCircle2}
            />
            <StatCard
              label="Merit Cutoff Threshold"
              value="82.5 / 100"
              subValue="Statutory Composite Cutoff"
              indicatorColor="amber"
              icon={Scale}
            />
          </div>

          {/* Candidates Evaluation Queue Preview */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Verified Candidates Ready for Committee Bench
                </h3>
                <p className="text-xs text-slate-500">
                  Select candidate to evaluate against research merit and academic credentials
                </p>
              </div>
              <button
                onClick={() => setActiveTab('review')}
                className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
              >
                <span>Open Full Evaluation Rubric</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {eligibleApps.map((cand) => (
                <div 
                  key={cand.id}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-purple-700 text-xs">{cand.id}</span>
                      <span className="text-slate-400">·</span>
                      <span className="font-bold text-slate-900 text-xs">{cand.applicantName}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-xs text-slate-600">{cand.tribeCommunity} ({cand.stateOfDomicile})</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1">
                      <strong>Course:</strong> {cand.currentCourse} · <strong>Institution:</strong> {cand.institution} ({cand.institutionType})
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                      <span>Prior Score: <strong>{cand.academicScore}%</strong></span>
                      <span>·</span>
                      <span>Officer Clearance: <strong className="text-emerald-700">{cand.assignedOfficerName?.split('(')[0] || 'Dr. Alok Choudhury'}</strong></span>
                      <span>·</span>
                      <span>Income: <strong>₹ {cand.annualFamilyIncome.toLocaleString()}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <StatusBadge stage={cand.stage} />
                    <button
                      onClick={() => {
                        setCurrentCandidateId(cand.id);
                        setActiveTab('review');
                      }}
                      className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded transition-colors"
                    >
                      Evaluate Candidate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Candidate Review Bench & Rubric */}
      {(activeTab === 'review' || activeTab === 'criteria') && (
        <div className="space-y-6">
          
          {/* Candidate Selector Bar */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Candidate:
              </span>
              <div className="flex flex-wrap gap-2">
                {eligibleApps.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCurrentCandidateId(c.id)}
                    className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                      activeCandidate?.id === c.id
                        ? 'bg-purple-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {c.applicantName} ({c.id})
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Composite Score: <strong className="text-purple-700 text-sm tabular-nums">{totalCalculatedScore}/100</strong>
            </div>
          </div>

          {activeCandidate ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left 7 Cols: Transparent Academic Profile & Research Synopsis */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Academic Dossier */}
                <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      1. Academic & Institute Credentials
                    </h3>
                    <span className="text-xs font-mono text-purple-700 font-bold">{activeCandidate.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block uppercase text-[10px]">Candidate Full Name</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">{activeCandidate.applicantName}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block uppercase text-[10px]">Tribal Identity & State</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">{activeCandidate.tribeCommunity} · {activeCandidate.stateOfDomicile}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block uppercase text-[10px]">Institution Standing</span>
                      <span className="font-bold text-slate-900 mt-0.5 block">{activeCandidate.institution}</span>
                      <span className="text-[11px] text-blue-700 font-semibold">{activeCandidate.institutionType}</span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 block uppercase text-[10px]">Qualifying Degree Score</span>
                      <span className="font-bold text-slate-900 mt-0.5 block tabular-nums">{activeCandidate.academicScore}% CGPA Equivalent</span>
                    </div>
                  </div>
                </div>

                {/* Research Synopsis / Fellowship Proposal */}
                <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-purple-700" />
                      <span>2. Research Proposal & National Priority Alignment</span>
                    </h3>
                    <span className="text-[11px] text-emerald-700 font-bold">SDG & Tribal Health Focus</span>
                  </div>

                  <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-md text-xs space-y-2">
                    <h4 className="font-bold text-purple-950">
                      Proposal: Targeted Therapeutic Pathways for Sickle Cell Disease & Hereditary Anemia in Central Tribal Highlands
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      The research addresses the endemic Sickle Cell gene variant prevalent across Gond and Baiga communities. Methodologies combine molecular biology with community clinical trials at AIIMS New Delhi.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-white border border-purple-200 font-semibold text-purple-800">
                        Guide: Prof. Rajeshwar Rao, AIIMS
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white border border-purple-200 font-semibold text-purple-800">
                        Tenure: 5 Years Full-Time Doctoral
                      </span>
                    </div>
                  </div>
                </div>

                {/* Statutory Officer Verification Audit Trail */}
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100 mb-2">
                    3. Verification Desk Audit Certificate
                  </h3>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Statutory Officer Clearance Confirmed</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Cleared by: <strong>{activeCandidate.assignedOfficerName || 'Dr. Alok Choudhury'}</strong> · All ST certificates, domicile seals, and income under ₹6.0L statutory ceiling substantiated.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right 5 Cols: Configurable Criteria Rubric & Decision Actions */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Scoring Rubric */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-purple-700" />
                      <span>Transparent Evaluation Rubric</span>
                    </h3>
                    <span className="text-xs font-bold text-purple-700 tabular-nums">
                      {totalCalculatedScore} / 100
                    </span>
                  </div>

                  <div className="space-y-4 text-xs">
                    {/* Criterion 1: Academic & Institution Rank */}
                    <div>
                      <div className="flex justify-between font-semibold text-slate-800 mb-1">
                        <span>1. Academic Merit & NIRF Ranking (Max 50)</span>
                        <span className="font-mono tabular-nums text-purple-700 font-bold">{academicScore} pts</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={50}
                        value={academicScore}
                        onChange={(e) => setAcademicScore(Number(e.target.value))}
                        className="w-full accent-purple-700"
                      />
                      <span className="text-[11px] text-slate-500">Based on qualifying percentage ({activeCandidate.academicScore}%) and INI Tier.</span>
                    </div>

                    {/* Criterion 2: Research Proposal & Methodology */}
                    <div>
                      <div className="flex justify-between font-semibold text-slate-800 mb-1">
                        <span>2. Research Proposal & Societal Impact (Max 30)</span>
                        <span className="font-mono tabular-nums text-purple-700 font-bold">{researchScore} pts</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={30}
                        value={researchScore}
                        onChange={(e) => setResearchScore(Number(e.target.value))}
                        className="w-full accent-purple-700"
                      />
                      <span className="text-[11px] text-slate-500">Evaluates relevance to Scheduled Tribe healthcare, folklore, or engineering.</span>
                    </div>

                    {/* Criterion 3: Socio-Economic Context */}
                    <div>
                      <div className="flex justify-between font-semibold text-slate-800 mb-1">
                        <span>3. Socio-Economic Weightage (Max 20)</span>
                        <span className="font-mono tabular-nums text-purple-700 font-bold">{socioEconomicScore} pts</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={20}
                        value={socioEconomicScore}
                        onChange={(e) => setSocioEconomicScore(Number(e.target.value))}
                        className="w-full accent-purple-700"
                      />
                      <span className="text-[11px] text-slate-500">Prioritizes remote aspirational tribal districts and low-income brackets.</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Official Committee Deliberation Remarks
                    </label>
                    <textarea
                      rows={3}
                      value={committeeRemarks}
                      onChange={(e) => setCommitteeRemarks(e.target.value)}
                      placeholder="e.g. Unanimously recommended. High social relevance addressing Sickle Cell disease in Bastar division. Full fellowship grant approved."
                      className="w-full text-xs p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>

                  {/* Decision Actions */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <button
                      onClick={() => handleDecision('recommended')}
                      className="w-full py-2.5 px-3 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Recommend for Fellowship Sanction</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleDecision('waitlisted')}
                        className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded border border-slate-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Place on Waitlist</span>
                      </button>

                      <button
                        onClick={() => handleDecision('held')}
                        className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded border border-slate-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <PauseCircle className="w-3.5 h-3.5" />
                        <span>Keep on Hold</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 bg-white border border-slate-200 rounded-lg">
              No eligible candidates currently in queue.
            </div>
          )}

        </div>
      )}

      {/* Award Recommendations Module */}
      {activeTab === 'awards' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-base font-bold text-slate-900">
              Fellowship Award Sanctions & Roll of Honor
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Scheduled Tribe scholars formally sanctioned by the Selection Committee
            </p>
          </div>

          <div className="space-y-4">
            {applications.filter(a => a.stage === 'selected').map((sel) => (
              <div key={sel.id} className="p-4 rounded-lg border border-emerald-300 bg-emerald-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-800">{sel.id}</span>
                    <span className="text-emerald-700 font-bold">· {sel.applicantName}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-950 font-bold text-[10px]">
                      SANCTIONED
                    </span>
                  </div>
                  <p className="text-slate-800 font-semibold mt-1">
                    {sel.currentCourse} · {sel.institution}
                  </p>
                  <p className="text-slate-600 mt-1 italic">
                    "{sel.committeeRemarks || 'Selected under merit quota.'}"
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Award Sanction</span>
                  <span className="text-sm font-bold text-emerald-800 block">
                    {sel.sanctionAmount ? `₹ ${(sel.sanctionAmount / 100000).toFixed(2)} Lakh / yr` : '₹ 38,000 / month'}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Score: {sel.committeeScore || 96}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Committee Notes Module */}
      {activeTab === 'notes' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Selection Committee Deliberation Minutes
          </h2>
          <div className="mt-4 space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-500 font-mono text-[11px] block">2026-09-28 17:15 · Bench B</span>
              <p className="font-semibold text-slate-800 mt-1">
                Resolution NFST-2026-R2: 14 candidates cleared with composite score &gt; 85. Special consideration accorded to candidates hailing from Particularly Vulnerable Tribal Groups (PVTGs).
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
