export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { z } from 'zod';
import { DemandaFilters } from '@/components/demandas/demanda-filters';
import { DemandaList } from '@/components/demandas/demanda-list';
import { getSupabaseServerClient } from '@/lib/supabase';
import type { DemandaRow } from '@/types/database';

type DemandasPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const filterSchema = z.object({
  status: z.string().optional(),
  tipo: z.string().optional(),
  prioridade: z.string().optional(),
});

export default async function DemandasPage({ searchParams }: DemandasPageProps) {
  const parsed = filterSchema.parse({
    status: typeof searchParams?.status === 'string' ? searchParams.status : undefined,
    tipo: typeof searchParams?.tipo === 'string' ? searchParams.tipo : undefined,
    prioridade: typeof searchParams?.prioridade === 'string' ? searchParams.prioridade : undefined,
  });

  const supabase = await getSupabaseServerClient();
  let query = supabase
    .from('demandas')
    .select('id, codigo, titulo, descricao, tipo, origem, status, prioridade, paciente_id, responsavel_id, criado_por, prazo, escalado, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (parsed.status) {
    query = query.eq('status', parsed.status);
  }

  if (parsed.tipo) {
    query = query.eq('tipo', parsed.tipo);
  }

  if (parsed.prioridade) {
    query = query.eq('prioridade', parsed.prioridade);
  }

  const { data, error } = await query;
  const demandas = (data ?? []) as DemandaRow[];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-sage-dark">Demandas</h1>
          <p className="text-sm text-ink/70">CRUD completo com filtros, atualização de status e detalhes.</p>
        </div>
        <Link href="/demandas/new" className="rounded-md bg-sage px-4 py-2 text-sm text-white">
          Nova demanda
        </Link>
      </div>

      <DemandaFilters
        currentStatus={parsed.status}
        currentTipo={parsed.tipo}
        currentPrioridade={parsed.prioridade}
      />

      {error ? (
        <p className="rounded-lg border border-coral/40 bg-coral/10 p-3 text-sm text-coral">
          Erro ao carregar demandas: {error.message}
        </p>
      ) : (
        <DemandaList demandas={demandas} />
      )}
    </section>
  );
}
