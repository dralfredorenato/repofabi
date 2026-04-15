import { cache } from 'react';
import { getSupabaseServerClient } from '@/lib/supabase';
import type { UserProfile, UsuarioRow } from '@/types/database';

export const getCurrentProfile = cache(async (): Promise<UsuarioRow | null> => {
  const supabase = await getSupabaseServerClient();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    return null;
  }

  const { data, error } = await supabase
    .from('usuarios')
    .select('id, email, nome, perfil, ativo')
    .eq('id', authData.user.id)
    .maybeSingle<UsuarioRow>();

  if (error || !data || !data.ativo) {
    return {
      id: authData.user.id,
      email: authData.user.email ?? 'sem-email@local',
      nome: authData.user.user_metadata.nome ?? 'Profissional',
      perfil: (authData.user.user_metadata.perfil as UserProfile | undefined) ?? 'secretaria',
      ativo: true,
    };
  }

  return data;
});
