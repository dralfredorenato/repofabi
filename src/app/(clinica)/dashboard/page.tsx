export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getCurrentProfile } from '@/lib/auth/profile';
import { getSupabaseServerClient } from '@/lib/supabase';
import type { DemandaRow } from '@/types/database';

type DashboardMetric = {
  label: string;
  value: number;
};

async function getDemandasMetrics(userId: string) {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from('demandas')
    .select('id, status, escalado, responsavel_id, tipo')
    .order('created_at', { ascending: false })
    .returns<Pick<DemandaRow, 'id' | 'status' | 'escalado' | 'responsavel_id' | 'tipo'>[]>();

  const demandas = data ?? [];

  const total = demandas.length;
  const abertas = demandas.filter((d) => d.status === 'aberta').length;
  const emAndamento = demandas.filter((d) => d.status === 'em_andamento').length;
  const concluidas = demandas.filter((d) => d.status === 'concluida').length;
  const escaladas = demandas.filter((d) => d.escalado).length;
  const minhas = demandas.filter((d) => d.responsavel_id === userId).length;
  const orcamentos = demandas.filter((d) => d.tipo === 'orcamento_nf').length;

  return {
    total,
    abertas,
    emAndamento,
    concluidas,
    escaladas,
    minhas,
    orcamentos,
  };
}

function MetricsGrid({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-lg border border-sage/20 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-ink/60">{metric.label}</p>
          <p className="mt-2 text-3xl font-semibold text-sage-dark">{metric.value}</p>
        </article>
      ))}
    </div>
  );
}

export default async function DashboardPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return null;
  }

  const metrics = await getDemandasMetrics(profile.id);

  const byProfile: Record<typeof profile.perfil, DashboardMetric[]> = {
    admin: [
      { label: 'Demandas totais', value: metrics.total },
      { label: 'Abertas', value: metrics.abertas },
      { label: 'Escaladas', value: metrics.escaladas },
      { label: 'Concluídas', value: metrics.concluidas },
    ],
    secretaria: [
      { label: 'Minhas demandas', value: metrics.minhas },
      { label: 'Abertas', value: metrics.abertas },
      { label: 'Em andamento', value: metrics.emAndamento },
      { label: 'Concluídas', value: metrics.concluidas },
    ],
    contador: [
      { label: 'Orçamentos/NF', value: metrics.orcamentos },
      { label: 'Abertas', value: metrics.abertas },
      { label: 'Concluídas', value: metrics.concluidas },
      { label: 'Total', value: metrics.total },
    ],
    paciente: [
      { label: 'Solicitações', value: metrics.minhas },
      { label: 'Em andamento', value: metrics.emAndamento },
      { label: 'Concluídas', value: metrics.concluidas },
      { label: 'Total', value: metrics.total },
    ],
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-sage-dark">Dashboard adaptativo</h1>
          <p className="text-sm text-ink/70">Visão operacional ajustada ao perfil: {profile.perfil}.</p>
        </div>
        <Link href="/demandas/new" className="rounded-md bg-sage px-4 py-2 text-sm text-white">
          Criar demanda
        </Link>
      </div>
      <MetricsGrid metrics={byProfile[profile.perfil]} />
    </section>
  );
}
