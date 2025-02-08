import React from 'react';
import BasicAppShell from '@/components/Dashboard/appshell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BasicAppShell comp={children as React.ReactElement} />
      <main>
        {/* All children elements inside of about dir, will have the main css styling applied to them as well since children is nested inside of main */}
        {children}
      </main>
    </>
  );
}
