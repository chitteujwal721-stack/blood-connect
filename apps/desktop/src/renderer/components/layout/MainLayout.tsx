import React from 'react';
import type { NavigationRoute } from '@blood-connect/shared';
import { TitleBar } from './TitleBar';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StatusBar } from './StatusBar';

interface MainLayoutProps {
  currentRoute: NavigationRoute;
  onNavigate: (route: NavigationRoute) => void;
  children: React.ReactNode;
}

export function MainLayout({
  currentRoute,
  onNavigate,
  children,
}: MainLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden font-sans">
      {/* Frameless Top Window Bar */}
      <TitleBar />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar currentRoute={currentRoute} onNavigate={onNavigate} />

        {/* Workstation Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/40">
          <Header currentRoute={currentRoute} />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">{children}</div>
          </main>

          <StatusBar />
        </div>
      </div>
    </div>
  );
}

