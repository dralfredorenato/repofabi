export const dynamic = 'force-dynamic';

import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { getCurrentProfile } from '@/lib/auth/profile';

type ClinicaLayoutProps = {
  children: ReactNode;
};

export default async function ClinicaLayout({ children }: ClinicaLayoutProps) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Topbar profile={profile} />
        {children}
      </main>
    </div>
  );
}
