import Link from 'next/link';
import { updateDemandaStatusAction } from '@/app/(clinica)/demandas/actions';
import { demandaStatuses } from '@/app/(clinica)/demandas/constants';
import type { DemandaRow } from '@/types/database';

type DemandaListProps = {
  demandas: DemandaRow[];
};

export function DemandaList({ demandas }: DemandaListProps) {
  if (demandas.length === 0) {
    return <p className="rounded-lg border border-dashed border-sage/40 p-4 text-sm">Nenhuma demanda encontrada.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-sage/15 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="px-3 py-2">Código</th>
            <th className="px-3 py-2">Título</th>
            <th className="px-3 py-2">Tipo</th>
            <th className="px-3 py-2">Prioridade</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {demandas.map((demanda) => (
            <tr key={demanda.id} className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">{demanda.codigo}</td>
              <td className="px-3 py-2">{demanda.titulo}</td>
              <td className="px-3 py-2">{demanda.tipo}</td>
              <td className="px-3 py-2">{demanda.prioridade}</td>
              <td className="px-3 py-2">
                <form action={updateDemandaStatusAction} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={demanda.id} />
                  <select name="status" defaultValue={demanda.status} className="rounded border px-2 py-1">
                    {demandaStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="rounded border border-sage px-2 py-1 text-xs text-sage-dark">
                    Salvar
                  </button>
                </form>
              </td>
              <td className="px-3 py-2">
                <Link href={`/demandas/${demanda.id}`} className="text-sage-dark underline">
                  Detalhes
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
