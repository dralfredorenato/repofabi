import { logoutAction } from '@/app/(auth)/login/actions';
import type { UsuarioRow } from '@/types/database';

type TopbarProps = {
  profile: UsuarioRow;
};

export function Topbar({ profile }: TopbarProps) {
  return (
    <header className="mb-6 flex items-center justify-between rounded-lg border border-sage/15 bg-white p-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-ink/60">Perfil</p>
        <h1 className="text-base font-semibold text-sage-dark">{profile.nome}</h1>
        <p className="text-xs text-ink/70">{profile.perfil}</p>
      </div>
      <form action={logoutAction}>
        <button type="submit" className="rounded-md border border-sage px-3 py-2 text-sm text-sage-dark">
          Sair
        </button>
      </form>
    </header>
  );
}
