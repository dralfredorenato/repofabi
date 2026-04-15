export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updateDemandaStatusAction } from '@/app/(clinica)/demandas/actions';
import { demandaStatuses } from '@/app/(clinica)/demandas/constants';
import { getSupabaseServerClient } from '@/lib/supabase';
import type { DemandaRow } from '@/types/database';

type DemandaDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function DemandaDetailPage({ params }: DemandaDetailPageProps) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from('demandas')
    .select('id, codigo, titulo, descricao, tipo, origem, status, prioridade, paciente_id, responsavel_id, criado_por, prazo, escalado, created_at, updated_at')
    .eq('id', params.id)
    .maybeSingle<DemandaRow>();

  if (error || !data) {
    notFound();
  }

  return (
    <section className="space-y-4 rounded-lg border border-sage/15 bg-white p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-sage-dark">{data.codigo}</h1>
        <Link href="/demandas" className="text-sm text-sage-dark underline">
          Voltar para lista
        </Link>
      </div>

      <div className="grid gap-3 text-sm md:grid-cols-2">
        <p>
          <strong>Título:</strong> {data.titulo}
        </p>
        <p>
          <strong>Tipo:</strong> {data.tipo}
        </p>
        <p>
          <strong>Origem:</strong> {data.origem}
        </p>
        <p>
          <strong>Prioridade:</strong> {data.prioridade}
        </p>
        <p>
          <strong>Escalado:</strong> {data.escalado ? 'Sim' : 'Não'}
        </p>
        <p>
          <strong>Prazo:</strong> {data.prazo ? new Date(data.prazo).toLocaleString('pt-BR') : 'Sem prazo'}
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-base font-semibold text-sage-dark">Descrição</h2>
        <p className="rounded border border-slate-200 p-3 text-sm">{data.descricao ?? 'Sem descrição.'}</p>
      </div>

      <form action={updateDemandaStatusAction} className="flex max-w-sm items-end gap-2">
        <input type="hidden" name="id" value={data.id} />
        <div className="flex-1">
          <label htmlFor="status" className="mb-1 block text-xs uppercase tracking-wide text-ink/70">
            Atualizar status
          </label>
          <select id="status" name="status" defaultValue={data.status} className="w-full rounded border px-3 py-2 text-sm">
            {demandaStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded bg-sage px-3 py-2 text-sm text-white">
          Salvar
        </button>
      </form>
    </section>
  );
}
