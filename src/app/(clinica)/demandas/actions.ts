'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getCurrentProfile } from '@/lib/auth/profile';
import { getSupabaseServerClient } from '@/lib/supabase';
import { demandaOrigens, demandaPrioridades, demandaStatuses, demandaTipos } from './constants';

const createDemandaSchema = z.object({
  titulo: z.string().min(5, 'Título deve ter ao menos 5 caracteres.').max(120),
  descricao: z.string().max(3000).optional(),
  tipo: z.enum(demandaTipos),
  origem: z.enum(demandaOrigens),
  prioridade: z.enum(demandaPrioridades),
  prazo: z.string().optional(),
  paciente_id: z.string().uuid().optional(),
  responsavel_id: z.string().uuid().optional(),
});

const updateStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(demandaStatuses),
});

function toOptionalString(value: FormDataEntryValue | null): string | undefined {
  if (!value || typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export async function createDemandaAction(formData: FormData) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect('/login');
  }

  const parsed = createDemandaSchema.safeParse({
    titulo: formData.get('titulo'),
    descricao: toOptionalString(formData.get('descricao')),
    tipo: formData.get('tipo'),
    origem: formData.get('origem'),
    prioridade: formData.get('prioridade'),
    prazo: toOptionalString(formData.get('prazo')),
    paciente_id: toOptionalString(formData.get('paciente_id')),
    responsavel_id: toOptionalString(formData.get('responsavel_id')),
  });

  if (!parsed.success) {
    redirect('/demandas/new?error=invalid_input');
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.from('demandas').insert({
    titulo: parsed.data.titulo,
    descricao: parsed.data.descricao ?? null,
    tipo: parsed.data.tipo,
    origem: parsed.data.origem,
    prioridade: parsed.data.prioridade,
    prazo: parsed.data.prazo ?? null,
    paciente_id: parsed.data.paciente_id ?? null,
    responsavel_id: parsed.data.responsavel_id ?? profile.id,
    criado_por: profile.id,
  });

  if (error) {
    redirect('/demandas/new?error=create_failed');
  }

  revalidatePath('/demandas');
  revalidatePath('/dashboard');
  redirect('/demandas');
}

export async function updateDemandaStatusAction(formData: FormData) {
  const parsed = updateStatusSchema.safeParse({
    id: formData.get('id'),
    status: formData.get('status'),
  });

  if (!parsed.success) {
    return;
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase
    .from('demandas')
    .update({ status: parsed.data.status })
    .eq('id', parsed.data.id);

  if (error) {
    return;
  }

  revalidatePath('/demandas');
  revalidatePath(`/demandas/${parsed.data.id}`);
  revalidatePath('/dashboard');
}

