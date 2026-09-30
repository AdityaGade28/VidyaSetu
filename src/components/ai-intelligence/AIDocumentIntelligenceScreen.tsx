import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, DocumentItem } from '../../types';
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  BrainCircuit, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  AlertCircle,
  FileCheck,
  Search,
  Check
} from 'lucide-react';

interface Props {
  embeddedApp?: Application;
}

export const AIDocumentIntelligenceScreen: React.FC<Props> = ({ embeddedApp }) => {
  const { applications, selectedApplicationId, setSelectedApplicationId } = useApp();

  const activeApp = embeddedApp || applications.find(a => a.id === selectedApplicationId) || applications[0];
  const [selectedDocId, setSelectedDocId] = useState<string>(activeApp?.documents[0]?.id || '');

  const activeDoc: DocumentItem | undefined = activeApp?.documents.find(d => d.id === selectedDocId) || activeApp?.documents[0];

  return (
    <div className="space-y-5">
      {/* GovTech AI Assurance Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 shrink-0">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  AI Document Intelligence & Entity Extraction Engine
                </h2>
                <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  Human-in-the-Loop Mode
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl">
                Automated optical character recognition (OCR), document classification, and entity cross-referencing for Scheduled Tribe scholarship certificates.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 max-w-sm shrink-0">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Statutory Decision Protocol</span>
            </div>
            <p className="text-[11px] text-amber-800 mt-0.5 leading-snug">
              “AI assists verification. Authorized officers make final decisions. Discrepancies are flagged for clarification, never labeled as fraud.”
            </p>
          </div>
        </div>

        {/* Application Selector (if not embedded) */}
        {!embeddedApp && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Select Candidate:
            </span>
            <div className="flex flex-wrap gap-2">
              {applications.map(app => (
                <button
                  key={app.id}
                  onClick={() => {
                    setSelectedApplicationId(app.id);
                    setSelectedDocId(app.documents[0]?.id || '');
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeApp.id === app.id
                      ? 'bg-blue-700 text-white font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {app.applicantName} ({app.id})
                  {app.aiFlagsCount > 0 && (
                    <span className="ml-1.5 px-1 py-0.2 bg-amber-400 text-slate-950 font-bold text-[10px] rounded">
                      {app.aiFlagsCount} Flag
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Document Checklist & Overview (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Candidate Dossier Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Application Dossier
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-semibold text-slate-900">{activeApp.applicantName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">ST Tribe / Domicile:</span>
                <span className="font-medium text-slate-900">{activeApp.tribeCommunity} · {activeApp.stateOfDomicile}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Scheme:</span>
                <span className="font-medium text-slate-900 text-right truncate max-w-[200px]">{activeApp.schemeName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Enrolled Course:</span>
                <span className="font-medium text-slate-900 text-right truncate max-w-[200px]">{activeApp.currentCourse}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Overall AI Match Score:</span>
                <span className="font-bold text-blue-700 tabular-nums">{activeApp.aiReviewScore}%</span>
              </div>
            </div>
          </div>

          {/* Document Classification & Checklist */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Submitted Documents ({activeApp.documents.length})
              </h3>
              <span className="text-[11px] text-slate-400">Click to inspect</span>
            </div>

            <div className="space-y-2">
              {activeApp.documents.map((doc) => {
                const isSelected = doc.id === (activeDoc?.id || '');
                const hasMismatch = doc.status === 'potential_mismatch';
                const isUnclear = doc.status === 'unclear';

                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className={`w-4 h-4 shrink-0 ${isSelected ? 'text-blue-700' : 'text-slate-500'}`} />
                        <span className="text-xs font-semibold text-slate-900 truncate">
                          {doc.title}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 shrink-0 tabular-nums">
                        {doc.aiConfidence}%
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 truncate max-w-[170px]">{doc.fileName}</span>
                      
                      {hasMismatch && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-300">
                          Potential Mismatch
                        </span>
                      )}
                      {isUnclear && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold border border-rose-300">
                          Low Legibility
                        </span>
                      )}
                      {!hasMismatch && !isUnclear && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Verified Match
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Required Documents Completeness Check */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Required Document Completeness</span>
                <span className="font-bold text-emerald-700 tabular-nums">100% (4 of 4 Submitted)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Deep OCR Inspection & Side-by-Side Comparison (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {activeDoc ? (
            <>
              {/* Document Overview Bar */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {activeDoc.title}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-600 border border-slate-200">
                      {activeDoc.fileSize}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    File: <span className="font-mono text-slate-700">{activeDoc.fileName}</span> · Uploaded: {activeDoc.uploadDate}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block uppercase font-medium">
                      OCR Confidence
                    </span>
                    <span className="text-lg font-bold text-slate-900 tabular-nums">
                      {activeDoc.aiConfidence}%
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-700 border border-blue-200">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Potential Mismatch Flag (If any) */}
              {activeDoc.mismatchDetails && (
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div className="space-y-2 w-full">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                          Potential Entity Mismatch Detected — Manual Review Required
                        </h4>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">
                          Severity: {activeDoc.mismatchDetails.severity.toUpperCase()}
                        </span>
                      </div>

                      {/* Side by side comparison callout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <div className="bg-white p-2.5 rounded border border-amber-200">
                          <span className="text-[11px] text-slate-500 block">Application Form Declaration</span>
                          <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                            {activeDoc.mismatchDetails.applicationValue}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded border border-amber-200">
                          <span className="text-[11px] text-slate-500 block">OCR Extracted from Document</span>
                          <span className="text-sm font-bold text-amber-800 mt-0.5 block">
                            {activeDoc.mismatchDetails.documentValue}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-amber-900 pt-1">
                        <span className="font-semibold">Contextual Analysis:</span> {activeDoc.mismatchDetails.explanation}
                      </div>

                      <div className="text-[11px] text-amber-800 italic pt-1 border-t border-amber-200/60">
                        * Note: Discrepancies in tribal names (abbreviations, honorifics, phonetics) are standard administrative variations and must be resolved through deficiency clarification.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Side-by-Side: Document Simulation Preview & Extracted OCR Entities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Visual Document Scan Simulation */}
                <div className="bg-slate-900 text-slate-100 rounded-lg p-4 border border-slate-800 flex flex-col justify-between min-h-[360px]">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-semibold text-slate-200">Document Scan Visualizer</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Simulated View</span>
                    </div>

                    <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                      <div className="text-center font-bold text-slate-200 border-b border-slate-800 pb-2">
                        OFFICE OF THE SUB-DIVISIONAL MAGISTRATE
                      </div>
                      <div className="text-[11px] text-slate-400 text-center">
                        SCHEDULED TRIBE VERIFICATION REGISTER
                      </div>
                      <div className="pt-2 text-slate-300 space-y-1">
                        <p><span className="text-slate-500">Ref:</span> {activeDoc.ocrExtracted['Certificate ID'] || 'SDM/GOV/2021/4891'}</p>
                        <p><span className="text-slate-500">Subject:</span> This is to certify that {activeDoc.ocrExtracted['Applicant Name on Cert'] || activeDoc.ocrExtracted['Name'] || activeApp.applicantName} son/daughter of {activeDoc.ocrExtracted['Father Name'] || 'Ramdas Patil'} belongs to the {activeDoc.ocrExtracted['Community/Tribe'] || activeApp.tribeCommunity} Community, recognized as Scheduled Tribe under the Constitution (Scheduled Tribes) Order.</p>
                      </div>
                      <div className="pt-4 flex justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
                        <span>Place: Chhindwara</span>
                        <span className="font-semibold text-blue-400">[Digital Signature Verified]</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Scan Resolution: 300 DPI</span>
                    <span className="text-emerald-400">Digital Seal Valid</span>
                  </div>
                </div>

                {/* Structured OCR Extracted Entities */}
                <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4 text-indigo-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Structured OCR Entities
                        </h4>
                      </div>
                      <span className="text-[11px] text-indigo-600 font-semibold">100% Parsed</span>
                    </div>

                    <div className="space-y-2.5">
                      {Object.entries(activeDoc.ocrExtracted).map(([key, value]) => (
                        <div key={key} className="p-2.5 rounded bg-slate-50 border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                            {key}
                          </span>
                          <span className="text-xs font-mono font-medium text-slate-900 mt-0.5 block break-all">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Authority Verification:</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> State ST Registry Cross-Referenced
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400 bg-white border border-slate-200 rounded-lg">
              No document selected
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
