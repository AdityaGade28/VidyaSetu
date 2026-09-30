import React from 'react';
import { ApplicationStage } from '../../types';
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileSearch, 
  Award, 
  XCircle, 
  Sparkles, 
  Users 
} from 'lucide-react';

interface StatusBadgeProps {
  stage: ApplicationStage;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ stage, className = '', size = 'md' }) => {
  const getStageConfig = () => {
    switch (stage) {
      case 'draft':
        return {
          label: 'Draft',
          icon: Clock,
          color: 'text-slate-600 bg-slate-100 border-slate-200'
        };
      case 'submitted':
        return {
          label: 'Submitted',
          icon: Clock,
          color: 'text-sky-700 bg-sky-50 border-sky-200'
        };
      case 'ai_review':
        return {
          label: 'AI Pre-Check',
          icon: Sparkles,
          color: 'text-indigo-700 bg-indigo-50 border-indigo-200'
        };
      case 'deficient':
        return {
          label: 'Deficiency / Action Required',
          icon: AlertTriangle,
          color: 'text-amber-800 bg-amber-50 border-amber-300'
        };
      case 'under_verification':
        return {
          label: 'Under Verification',
          icon: FileSearch,
          color: 'text-blue-700 bg-blue-50 border-blue-200'
        };
      case 'verified':
        return {
          label: 'Verified by Officer',
          icon: CheckCircle2,
          color: 'text-emerald-700 bg-emerald-50 border-emerald-300'
        };
      case 'under_selection':
        return {
          label: 'Under Committee Selection',
          icon: Users,
          color: 'text-purple-700 bg-purple-50 border-purple-200'
        };
      case 'selected':
        return {
          label: 'Selected / Awarded',
          icon: Award,
          color: 'text-emerald-800 bg-emerald-100 border-emerald-400 font-semibold'
        };
      case 'rejected':
        return {
          label: 'Ineligible / Rejected',
          icon: XCircle,
          color: 'text-rose-700 bg-rose-50 border-rose-200'
        };
      default:
        return {
          label: stage,
          icon: Clock,
          color: 'text-slate-600 bg-slate-100 border-slate-200'
        };
    }
  };

  const { label, icon: Icon, color } = getStageConfig();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-medium rounded border ${color} ${sizeClasses} ${className}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3 shrink-0' : 'w-3.5 h-3.5 shrink-0'} />
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
};
