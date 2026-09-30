/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { GuidedTourBanner } from './components/demo/GuidedTourBanner';
import { ApplicantDashboard } from './components/applicant/ApplicantDashboard';
import { OfficerDashboard } from './components/officer/OfficerDashboard';
import { CommitteeDashboard } from './components/committee/CommitteeDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Building2, 
  ArrowRight,
  Database,
  Sparkles
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRole, setRole, startGuidedTour } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900">
      
      {/* Top Guided Tour Banner */}
      <GuidedTourBanner />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Core Workspace Canvas: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Role-Specific Navigation Sidebar */}
        <Sidebar />

        {/* Dynamic Main Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Quick Role Switcher Banner (Compact GovTech ribbon) */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  Role-Based Workspace:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setRole('applicant')}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      currentRole === 'applicant'
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    1. Applicant
                  </button>
                  <button
                    onClick={() => setRole('officer')}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      currentRole === 'officer'
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    2. Verification Officer
                  </button>
                  <button
                    onClick={() => setRole('committee')}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      currentRole === 'committee'
                        ? 'bg-purple-700 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    3. Selection Committee
                  </button>
                  <button
                    onClick={() => setRole('admin')}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      currentRole === 'admin'
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    4. Ministry Admin
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500">
                <button
                  onClick={startGuidedTour}
                  className="text-blue-700 hover:text-blue-800 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Guided Walkthrough</span>
                </button>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Database className="w-3 h-3 text-slate-400" />
                  <span>Demo Mode</span>
                </span>
              </div>
            </div>

            {/* Role Dashboards */}
            {currentRole === 'applicant' && <ApplicantDashboard />}
            {currentRole === 'officer' && <OfficerDashboard />}
            {currentRole === 'committee' && <CommitteeDashboard />}
            {currentRole === 'admin' && <AdminDashboard />}

          </div>
        </main>

      </div>

      {/* GovTech Enterprise Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">VidyaSetu</span>
          <span>·</span>
          <span>AI-Enabled ST Scholarship & Fellowship Management System</span>
          <span>·</span>
          <span className="text-slate-400 font-mono">Prototype v2.4</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span>“Applicant applies → AI assists → Officer verifies → Committee decides → Ministry monitors”</span>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
