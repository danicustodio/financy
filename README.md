# Financy

Aplicação full stack para controle de finanças pessoais (frontend React + backend GraphQL).

## Deploy

Atualize este link antes da submissão final:

- `https://SEU-DEPLOY-AQUI`

## Início rápido (Docker - caminho oficial da avaliação)

```bash
docker compose up --build
```

Serviços disponíveis:

- Frontend: `http://localhost`
- Backend (GraphQL): `http://localhost:4000/graphql`

Notas:

- Na primeira inicialização, o backend executa `prisma migrate deploy` e `prisma db seed`.
- O banco SQLite persiste no volume Docker `db_data`.

### Credenciais de demonstração

- `demo@financy.local` / `12345678`
- `second@financy.local` / `12345678`

### Encerrar e resetar

```bash
# para os containers (mantém dados)
docker compose down

# para e remove o volume do banco
docker compose down -v
```

## Verificação rápida para o avaliador

Depois de subir com Docker:

1. Acesse `http://localhost` e faça login com o usuário demo.
2. Acesse `http://localhost:4000/graphql` e valide que a API responde.
3. Faça um CRUD simples de categorias e transações.
4. Reinicie com `docker compose down && docker compose up` e confirme persistência.

## Troubleshooting (Docker)

- Porta `80` ocupada:
  - altere `frontend` em `docker-compose.yml` para outra porta, ex.: `"8080:80"`.
- Porta `4000` ocupada:
  - altere `backend` em `docker-compose.yml`, ex.: `"4001:4000"`.
- Dados antigos atrapalhando testes:
  - execute `docker compose down -v` para reset completo.
- Mudou variável `VITE_*` e não refletiu no frontend:
  - faça rebuild: `docker compose up --build`.

## Funcionalidades implementadas

- Cadastro, login e logout
- Recuperação e redefinição de senha
- Dashboard com resumo financeiro e transações recentes
- CRUD de categorias
- CRUD de transações
- Paginação e filtros em transações
- Isolamento de dados por usuário autenticado
- Edição de perfil

## Qualidade e validação local

Backend:

```bash
pnpm -C backend lint:check
pnpm -C backend test
pnpm -C backend typecheck
pnpm -C backend build
```

Frontend:

```bash
pnpm -C frontend exec biome check .
pnpm -C frontend test
pnpm -C frontend build
```

## Desenvolvimento local (sem Docker)

Backend:

```bash
cd backend
cp .env.example .env
pnpm install
pnpm prisma:migrate
pnpm prisma:seed
pnpm dev
```

Frontend:

```bash
cd frontend
cp .env.example .env
pnpm install
pnpm dev
```

## Mapeamento de documentação

- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Visão geral e arquitetura: `docs/01-visao-geral.md`, `docs/02-arquitetura.md`
- Rastreabilidade dos requisitos: `docs/03-requirements-traceability.md`
- Evidências de teste: `docs/04-test-and-quality-evidence.md`
- Roteiro de demonstração: `docs/05-demo-script.md`
- Limitações: `docs/06-limitacoes.md`

## Checklist de entrega (Fase 3)

- [ ] Repositório público no GitHub
- [ ] Repositório destacado no perfil
- [ ] Link de deploy no README
- [ ] Docker `up --build` funcionando
- [ ] Testes backend e frontend passando
- [ ] Lint backend e frontend passando
