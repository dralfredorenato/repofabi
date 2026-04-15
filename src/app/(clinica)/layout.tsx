import { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';

type ClinicaLayoutProps = {
  children: ReactNode;
};

export default function ClinicaLayout({ children }: ClinicaLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
