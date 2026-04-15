import { demandaPrioridades, demandaStatuses, demandaTipos } from '@/app/(clinica)/demandas/constants';

type DemandasFilterProps = {
  currentStatus?: string;
  currentTipo?: string;
  currentPrioridade?: string;
};

export function DemandaFilters({ currentStatus, currentTipo, currentPrioridade }: DemandasFilterProps) {
  return (
    <form className="grid gap-3 rounded-lg border border-sage/15 bg-white p-4 md:grid-cols-4">
      <div>
        <label htmlFor="status" className="mb-1 block text-xs uppercase tracking-wide text-ink/70">
          Status
        </label>
        <select id="status" name="status" defaultValue={currentStatus ?? ''} className="w-full rounded border px-2 py-2 text-sm">
          <option value="">Todos</option>
          {demandaStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="tipo" className="mb-1 block text-xs uppercase tracking-wide text-ink/70">
          Tipo
        </label>
        <select id="tipo" name="tipo" defaultValue={currentTipo ?? ''} className="w-full rounded border px-2 py-2 text-sm">
          <option value="">Todos</option>
          {demandaTipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="prioridade" className="mb-1 block text-xs uppercase tracking-wide text-ink/70">
          Prioridade
        </label>
        <select
          id="prioridade"
          name="prioridade"
          defaultValue={currentPrioridade ?? ''}
          className="w-full rounded border px-2 py-2 text-sm"
        >
          <option value="">Todas</option>
          {demandaPrioridades.map((prioridade) => (
            <option key={prioridade} value={prioridade}>
              {prioridade}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-end gap-2">
        <button type="submit" className="rounded bg-sage px-3 py-2 text-sm text-white">
          Filtrar
        </button>
        <a href="/demandas" className="rounded border border-sage px-3 py-2 text-sm text-sage-dark">
          Limpar
        </a>
      </div>
    </form>
  );
}
