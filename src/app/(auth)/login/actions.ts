'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getSupabaseServerClient } from '@/lib/supabase';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(8, 'A senha deve ter ao menos 8 caracteres.'),
});

export async function loginAction(formData: FormData) {
  const payload = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!payload.success) {
    redirect('/login?error=invalid_input');
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(payload.data);

  if (error) {
    redirect('/login?error=invalid_credentials');
  }

  redirect('/dashboard');
}

export async function logoutAction() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/login');
}
