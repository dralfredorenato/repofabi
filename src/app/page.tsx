import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold text-sage-dark">Clínica Dra. Fabiana Mugnol</h1>
      <p className="text-sm text-ink/80">Fundação do projeto concluída. Escolha um fluxo para continuar.</p>
      <div className="flex gap-3">
        <Link className="rounded-md bg-sage px-4 py-2 text-white" href="/login">
          Entrar na Clínica
        </Link>
        <Link className="rounded-md border border-sage px-4 py-2 text-sage-dark" href="/paciente">
          App Paciente
        </Link>
      </div>
    </main>
  );
}
