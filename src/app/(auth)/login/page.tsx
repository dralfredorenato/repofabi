export const dynamic = 'force-dynamic';

import { LoginForm } from '@/components/auth/login-form';

type LoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const errorCode = typeof searchParams?.error === 'string' ? searchParams.error : undefined;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <h1 className="mb-2 text-2xl font-semibold text-sage-dark">Login profissional</h1>
      <p className="mb-6 text-sm text-ink/75">Use seu acesso da clínica para continuar.</p>
      <LoginForm errorCode={errorCode} />
    </main>
  );
}
