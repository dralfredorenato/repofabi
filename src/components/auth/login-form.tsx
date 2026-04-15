import { loginAction } from '@/app/(auth)/login/actions';

type LoginFormProps = {
  errorCode?: string;
};

const errorMessages: Record<string, string> = {
  invalid_input: 'Dados inválidos. Verifique e tente novamente.',
  invalid_credentials: 'Credenciais inválidas. Verifique e tente novamente.',
};

export function LoginForm({ errorCode }: LoginFormProps) {
  return (
    <form action={loginAction} className="space-y-4 rounded-lg border border-sage/20 bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-slate-200 px-3 py-2"
          autoComplete="email"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="w-full rounded-md border border-slate-200 px-3 py-2"
          autoComplete="current-password"
        />
      </div>
      {errorCode ? <p className="text-sm text-coral">{errorMessages[errorCode] ?? 'Falha de autenticação.'}</p> : null}
      <button type="submit" className="w-full rounded-md bg-sage px-4 py-2 text-white">
        Entrar
      </button>
    </form>
  );
}
