import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  UserCheck, 
  FileText, 
  PlusCircle, 
  Files, 
  UploadCloud, 
  Sparkles, 
  AlertCircle, 
  Compass, 
  Bell, 
  ClipboardCheck, 
  FileSpreadsheet, 
  BrainCircuit, 
  Layers, 
  CheckSquare, 
  Sliders, 
  History, 
  Users, 
  Scale, 
  Award, 
  FileBarChart, 
  Settings, 
  ShieldAlert, 
  Database,
  BarChart3,
  BadgeCheck
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  alert?: boolean;
}

export const Sidebar: React.FC = () => {
  const { currentRole, activeTab, setActiveTab, applications } = useApp();

  // Find counts for badges
  const deficientCount = applications.filter(a => a.stage === 'deficient').length;
  const pendingOfficerCount = applications.filter(a => a.stage === 'under_verification' || a.stage === 'ai_review' || a.stage === 'deficient').length;
  const verifiedCount = applications.filter(a => a.stage === 'verified' || a.stage === 'under_selection').length;

  const applicantNav: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: UserCheck },
    { id: 'schemes', label: 'Browse Schemes', icon: Compass },
    { id: 'apply', label: 'Apply for Fellowship', icon: PlusCircle },
    { id: 'my-applications', label: 'My Applications', icon: Files, badge: applications.length },
    { id: 'document-assistance', label: 'AI Document Assistance', icon: Sparkles },
    { id: 'deficiency', label: 'Deficiency & Correction', icon: AlertCircle, alert: deficientCount > 0, badge: deficientCount },
    { id: 'tracking', label: 'Status Tracking', icon: Layers },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const officerNav: NavItem[] = [
    { id: 'overview', label: 'Command Overview', icon: LayoutDashboard },
    { id: 'queue', label: 'Assigned Applications', icon: ClipboardCheck, badge: pendingOfficerCount },
    { id: 'ai-intelligence', label: 'AI Document Intelligence', icon: BrainCircuit },
    { id: 'eligibility', label: 'Eligibility Verification', icon: CheckSquare },
    { id: 'deficiency-mgmt', label: 'Deficiency Management', icon: AlertCircle, badge: deficientCount },
    { id: 'review', label: 'Application Review', icon: FileSpreadsheet },
    { id: 'history', label: 'Decision History', icon: History }
  ];

  const committeeNav: NavItem[] = [
    { id: 'overview', label: 'Selection Overview', icon: LayoutDashboard },
    { id: 'eligible', label: 'Eligible Applications', icon: BadgeCheck, badge: verifiedCount },
    { id: 'review', label: 'Candidate Review Bench', icon: Users },
    { id: 'criteria', label: 'Criteria Evaluation', icon: Scale },
    { id: 'notes', label: 'Committee Notes', icon: FileText },
    { id: 'awards', label: 'Award Recommendations', icon: Award }
  ];

  const adminNav: NavItem[] = [
    { id: 'overview', label: 'Overall Overview', icon: LayoutDashboard },
    { id: 'schemes', label: 'Scheme Management', icon: Sliders },
    { id: 'app-monitoring', label: 'Application Monitoring', icon: Files },
    { id: 'verif-monitoring', label: 'Verification Monitoring', icon: ClipboardCheck },
    { id: 'selection-monitoring', label: 'Selection Monitoring', icon: Award },
    { id: 'users', label: 'User & Role Management', icon: Users },
    { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'audit', label: 'Audit Trail', icon: ShieldAlert },
    { id: 'config', label: 'System Configuration', icon: Settings }
  ];

  const navItems = 
    currentRole === 'applicant' ? applicantNav :
    currentRole === 'officer' ? officerNav :
    currentRole === 'committee' ? committeeNav : adminNav;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between border-r border-slate-800 select-none">
      <div className="py-4">
        
        {/* Role Header Indicator */}
        <div className="px-4 mb-4">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Active Portal
          </div>
          <div className="text-sm font-bold text-white capitalize mt-0.5">
            {currentRole === 'applicant' && 'Applicant Dashboard'}
            {currentRole === 'officer' && 'Verification Command'}
            {currentRole === 'committee' && 'Selection Committee'}
            {currentRole === 'admin' && 'Ministry Administration'}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-full tabular-nums ${
                      item.alert
                        ? 'bg-amber-400 text-slate-950 font-black animate-pulse'
                        : isActive
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Note */}
      <div className="p-3 m-2 rounded-md bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
          <Database className="w-3 h-3" />
          <span>Synthetic Demo Data</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-normal">
          Non-governmental prototype. All records, Aadhaar numbers, and institutions are generated for workflow demonstration.
        </p>
      </div>
    </aside>
  );
};
