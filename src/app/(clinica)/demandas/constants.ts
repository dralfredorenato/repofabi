export const demandaTipos = [
  'receita',
  'laudo',
  'atestado',
  'agendamento',
  'orcamento_nf',
  'palestra',
  'operadora',
  'doc_retirada',
  'comunicacao',
  'outro',
] as const;

export const demandaOrigens = [
  'whatsapp_clinica',
  'whatsapp_pessoal',
  'whatsapp_solveras',
  'google_forms',
  'memed_auto',
  'presencial',
  'telefone',
  'email',
  'interno',
] as const;

export const demandaPrioridades = ['urgente', 'alta', 'media', 'baixa'] as const;

export const demandaStatuses = [
  'aberta',
  'em_andamento',
  'aguardando_fabiana',
  'aguardando_paciente',
  'aguardando_externo',
  'concluida',
  'cancelada',
] as const;
