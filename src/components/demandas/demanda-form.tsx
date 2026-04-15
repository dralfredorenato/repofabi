import { createDemandaAction } from '@/app/(clinica)/demandas/actions';
import { demandaOrigens, demandaPrioridades, demandaTipos } from '@/app/(clinica)/demandas/constants';

type DemandaFormProps = {
  errorCode?: string;
};

const errorMessages: Record<string, string> = {
  invalid_input: 'Dados inválidos. Revise o formulário.',
  create_failed: 'Não foi possível criar a demanda. Tente novamente.',
};

export function DemandaForm({ errorCode }: DemandaFormProps) {
  return (
    <form action={createDemandaAction} className="grid gap-4 rounded-lg border border-sage/15 bg-white p-6">
      <div>
        <label htmlFor="titulo" className="mb-1 block text-sm font-medium">
          Título
        </label>
        <input id="titulo" name="titulo" required minLength={5} className="w-full rounded border px-3 py-2" />
      </div>

      <div>
        <label htmlFor="descricao" className="mb-1 block text-sm font-medium">
          Descrição
        </label>
        <textarea id="descricao" name="descricao" rows={4} className="w-full rounded border px-3 py-2" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="tipo" className="mb-1 block text-sm font-medium">
            Tipo
          </label>
          <select id="tipo" name="tipo" className="w-full rounded border px-3 py-2" defaultValue="receita">
            {demandaTipos.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="origem" className="mb-1 block text-sm font-medium">
            Origem
          </label>
          <select id="origem" name="origem" className="w-full rounded border px-3 py-2" defaultValue="whatsapp_clinica">
            {demandaOrigens.map((origem) => (
              <option key={origem} value={origem}>
                {origem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="prioridade" className="mb-1 block text-sm font-medium">
            Prioridade
          </label>
          <select id="prioridade" name="prioridade" className="w-full rounded border px-3 py-2" defaultValue="media">
            {demandaPrioridades.map((prioridade) => (
              <option key={prioridade} value={prioridade}>
                {prioridade}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="prazo" className="mb-1 block text-sm font-medium">
            Prazo
          </label>
          <input id="prazo" name="prazo" type="datetime-local" className="w-full rounded border px-3 py-2" />
        </div>

        <div>
          <label htmlFor="paciente_id" className="mb-1 block text-sm font-medium">
            Paciente ID (UUID)
          </label>
          <input id="paciente_id" name="paciente_id" className="w-full rounded border px-3 py-2" />
        </div>

        <div>
          <label htmlFor="responsavel_id" className="mb-1 block text-sm font-medium">
            Responsável ID (UUID)
          </label>
          <input id="responsavel_id" name="responsavel_id" className="w-full rounded border px-3 py-2" />
        </div>
      </div>

      {errorCode ? <p className="text-sm text-coral">{errorMessages[errorCode] ?? 'Falha ao criar demanda.'}</p> : null}
      <button type="submit" className="rounded-md bg-sage px-4 py-2 text-white">
        Criar demanda
      </button>
    </form>
  );
}
