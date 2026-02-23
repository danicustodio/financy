# Financy

Aplicação full stack para controle de finanças pessoais (frontend React + backend GraphQL).

## Início rápido (Docker)

```bash
docker compose up --build
```

Serviços disponíveis:

- Frontend: `http://localhost`
- Backend (GraphQL): `http://localhost:4000/graphql`


### Credenciais de demonstração

- `demo@financy.local` / `12345678`
- `second@financy.local` / `12345678`

## Funcionalidades implementadas

- Cadastro, login e logout
- Recuperação e redefinição de senha
- Dashboard com resumo financeiro e transações recentes
- CRUD de categorias
- CRUD de transações
- Paginação e filtros em transações
- Isolamento de dados por usuário autenticado
- Edição de perfil


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
