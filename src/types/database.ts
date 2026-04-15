export type UserProfile = 'admin' | 'secretaria' | 'contador' | 'paciente';

export type DemandaStatus =
  | 'aberta'
  | 'em_andamento'
  | 'aguardando_fabiana'
  | 'aguardando_paciente'
  | 'aguardando_externo'
  | 'concluida'
  | 'cancelada';

export type DemandaTipo =
  | 'receita'
  | 'laudo'
  | 'atestado'
  | 'agendamento'
  | 'orcamento_nf'
  | 'palestra'
  | 'operadora'
  | 'doc_retirada'
  | 'comunicacao'
  | 'outro';

export type DemandaOrigem =
  | 'whatsapp_clinica'
  | 'whatsapp_pessoal'
  | 'whatsapp_solveras'
  | 'google_forms'
  | 'memed_auto'
  | 'presencial'
  | 'telefone'
  | 'email'
  | 'interno';

export type DemandaPrioridade = 'urgente' | 'alta' | 'media' | 'baixa';

export type UsuarioRow = {
  id: string;
  email: string;
  nome: string;
  perfil: UserProfile;
  ativo: boolean;
};

export type DemandaRow = {
  id: string;
  codigo: string;
  titulo: string;
  descricao: string | null;
  tipo: DemandaTipo;
  origem: DemandaOrigem;
  status: DemandaStatus;
  prioridade: DemandaPrioridade;
  paciente_id: string | null;
  responsavel_id: string | null;
  criado_por: string | null;
  prazo: string | null;
  escalado: boolean;
  created_at: string;
  updated_at: string;
};
