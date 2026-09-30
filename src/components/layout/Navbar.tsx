import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Bell, 
  RotateCcw, 
  PlayCircle, 
  ShieldCheck, 
  User, 
  GraduationCap, 
  Award, 
  Building2, 
  Check, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    setRole, 
    notifications, 
    markNotificationRead, 
    startGuidedTour, 
    resetDemoData,
    guidedTourStep
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read && (n.recipientRole === currentRole || n.recipientRole === 'admin'));

  const roleMeta: Record<UserRole, { label: string; icon: React.ElementType; persona: string; dept: string }> = {
    applicant: {
      label: 'Applicant',
      icon: GraduationCap,
      persona: 'Rahul Patil',
      dept: 'IISc Bengaluru (Ph.D. Scholar)'
    },
    officer: {
      label: 'Verification Officer',
      icon: ShieldCheck,
      persona: 'Dr. Alok Choudhury',
      dept: 'Senior Verification Officer'
    },
    committee: {
      label: 'Selection Committee',
      icon: Award,
      persona: 'Prof. Meenakshi Toppo',
      dept: 'National Evaluation Bench'
    },
    admin: {
      label: 'Ministry Admin',
      icon: Building2,
      persona: 'K. S. Ramanathan, IAS',
      dept: 'Directorate of ST Scholarships'
    }
  };

  const currentRoleInfo = roleMeta[currentRole];
  const CurrentIcon = currentRoleInfo.icon;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-700 text-white font-bold text-lg shadow-xs">
            V
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
              VidyaSetu
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-normal block">
              ST Scholarship & Fellowship Portal · Demo Prototype
            </span>
          </div>
        </div>

        {/* Zone 2: Role Switcher (Segmented Control) */}
        <div className="hidden lg:flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
          {(Object.keys(roleMeta) as UserRole[]).map((r) => {
            const info = roleMeta[r];
            const Icon = info.icon;
            const isActive = currentRole === r;
            return (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  isActive 
                    ? 'bg-blue-700 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                title={`Switch to ${info.label} view`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{info.label}</span>
              </button>
            );
          })}
        </div>

        {/* Zone 3: Interactive Controls & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Mobile Role Dropdown */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md border border-slate-200"
            >
              <CurrentIcon className="w-3.5 h-3.5 text-blue-700" />
              <span>{currentRoleInfo.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                {(Object.keys(roleMeta) as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between ${
                      currentRole === r ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{roleMeta[r].label}</span>
                    {currentRole === r && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guided Tour Trigger Button */}
          <button
            onClick={startGuidedTour}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              guidedTourStep !== null
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs animate-pulse'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
            }`}
            title="Start End-to-End Guided Prototype Tour"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Guided Demo Tour</span>
            <span className="sm:hidden">Tour</span>
          </button>

          {/* Reset State Button */}
          <button
            onClick={resetDemoData}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
            title="Reset Simulated Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white tabular-nums">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Notifications ({unreadNotifications.length} Unread)
                  </span>
                  <span className="text-[11px] text-blue-600 font-medium">Real-Time Alerts</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-xs text-slate-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 text-xs transition-colors hover:bg-slate-50 cursor-pointer ${
                          !notif.read ? 'bg-blue-50/50' : ''
                        }`}
                        onClick={() => markNotificationRead(notif.id)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-slate-900">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                            {notif.timestamp.slice(11, 16)}
                          </span>
                        </div>
                        <p className="mt-1 text-slate-600 line-clamp-2">{notif.message}</p>
                        {notif.priority === 'urgent' && (
                          <span className="mt-1.5 inline-block text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            Urgent Action Required
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Persona Profile Pill */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold border border-slate-300">
              {currentRoleInfo.persona.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold text-slate-900 block leading-tight">
                {currentRoleInfo.persona}
              </span>
              <span className="text-[11px] text-slate-500 block truncate max-w-[130px]">
                {currentRoleInfo.dept}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
