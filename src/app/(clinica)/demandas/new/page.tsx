export const dynamic = 'force-dynamic';

import { DemandaForm } from '@/components/demandas/demanda-form';

type NewDemandaPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function NewDemandaPage({ searchParams }: NewDemandaPageProps) {
  const errorCode = typeof searchParams?.error === 'string' ? searchParams.error : undefined;

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-sage-dark">Nova demanda</h1>
        <p className="text-sm text-ink/70">Preencha os dados para criar uma nova demanda operacional.</p>
      </div>
      <DemandaForm errorCode={errorCode} />
    </section>
  );
}
