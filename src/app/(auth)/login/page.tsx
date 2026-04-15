export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <h1 className="mb-2 text-2xl font-semibold text-sage-dark">Login profissional</h1>
      <p className="mb-6 text-sm text-ink/75">Autenticação Supabase será conectada na próxima etapa.</p>
      <form className="space-y-4 rounded-lg border border-sage/20 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            E-mail
          </label>
          <input id="email" type="email" className="w-full rounded-md border border-slate-200 px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="password">
            Senha
          </label>
          <input id="password" type="password" className="w-full rounded-md border border-slate-200 px-3 py-2" />
        </div>
        <button type="submit" className="w-full rounded-md bg-sage px-4 py-2 text-white">
          Entrar
        </button>
      </form>
    </main>
  );
}
