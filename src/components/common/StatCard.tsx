import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: LucideIcon;
  indicatorColor?: 'blue' | 'emerald' | 'amber' | 'indigo' | 'purple' | 'rose';
  trend?: {
    text: string;
    positive?: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  indicatorColor = 'blue',
  trend
}) => {
  const colorMap = {
    blue: 'border-l-blue-600 text-blue-600 bg-blue-50',
    emerald: 'border-l-emerald-600 text-emerald-600 bg-emerald-50',
    amber: 'border-l-amber-500 text-amber-600 bg-amber-50',
    indigo: 'border-l-indigo-600 text-indigo-600 bg-indigo-50',
    purple: 'border-l-purple-600 text-purple-600 bg-purple-50',
    rose: 'border-l-rose-500 text-rose-600 bg-rose-50',
  };

  return (
    <div className={`bg-white border border-slate-200 border-l-4 rounded-lg p-4 shadow-xs ${colorMap[indicatorColor]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 tracking-wide uppercase">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        {Icon && (
          <div className="p-2 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {(subValue || trend) && (
        <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
          {trend && (
            <span className={trend.positive ? 'text-emerald-600 font-medium' : 'text-slate-600'}>
              {trend.text}
            </span>
          )}
          {subValue && <span>{subValue}</span>}
        </div>
      )}
    </div>
  );
};
