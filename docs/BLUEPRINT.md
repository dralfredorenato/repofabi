# BLUEPRINT

## Sprint 1 — Fundação

1. Bootstrap Next.js 14 (App Router) + TypeScript + Tailwind.
2. Estrutura inicial de rotas para App Clínica e App Paciente.
3. Middleware de proteção de rota para área da clínica.
4. Helpers Supabase para client/server.

## Sprint 2 — CRUD Core (implementado neste commit)

1. Autenticação Supabase real (login + logout + proteção de sessão em middleware).
2. CRUD de demandas com:
   - criação validada com Zod;
   - listagem com filtros (status, tipo, prioridade);
   - atualização de status em linha;
   - página de detalhe por demanda.
3. Dashboard adaptativo por perfil (`admin`, `secretaria`, `contador`, `paciente`) com métricas operacionais.

## Backlog macro

- Sprint 3: app paciente completo + PWA.
- Sprint 4: integrações Memed, Google Sheets, WhatsApp API.
- Sprint 5: RLS, LGPD, domínio, testes de cenários.
