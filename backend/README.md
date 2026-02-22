# Financy Backend

Servidor GraphQL construído com Fastify, Mercurius, Prisma e SQLite.

## Primeiros passos

```bash
cp .env.example .env   # preencha DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN
pnpm install
pnpm prisma:migrate    # executa as migrações
pnpm prisma:seed       # popula usuários, categorias e transações de demonstração
pnpm dev               # inicia o servidor de desenvolvimento com hot reload
```

O playground GraphQL fica disponível em `http://localhost:4000/graphql`.

## Variáveis de ambiente

| Variável         | Exemplo                  | Descrição                                        |
|------------------|--------------------------|--------------------------------------------------|
| `DATABASE_URL`   | `file:./prisma/dev.db`   | Caminho para o arquivo do banco de dados SQLite  |
| `JWT_SECRET`     | `supersecret`            | Segredo usado para assinar os tokens JWT         |
| `JWT_EXPIRES_IN` | `7d`                     | Expiração do token (ex.: `1h`, `7d`, `30d`)     |

Copie `.env.example` para `.env` e preencha os valores antes de rodar localmente.

## Scripts

| Script                          | Descrição                                              |
|---------------------------------|--------------------------------------------------------|
| `pnpm dev`                      | Inicia o servidor de desenvolvimento (hot reload)      |
| `pnpm build`                    | Compila o TypeScript para `dist/`                      |
| `pnpm start`                    | Executa o servidor compilado (`node dist/server.js`)   |
| `pnpm test`                     | Executa os testes com Vitest                           |
| `pnpm typecheck`                | Verificação de tipos com TypeScript                    |
| `pnpm lint`                     | Lint + correção automática com Biome                   |
| `pnpm prisma:migrate`           | Executa migrações pendentes (`migrate dev`)            |
| `pnpm prisma:seed`              | Seed determinístico de base                            |
| `pnpm prisma:seed:transactions` | Seed em massa com dados falsos (veja abaixo)           |
| `pnpm prisma:reset`             | Reseta o banco e reexecuta o seed de base              |
| `pnpm prisma:studio`            | Abre o Prisma Studio                                   |

## Contas de demonstração (após o seed)

| E-mail                  | Senha      |
|-------------------------|------------|
| `demo@financy.local`    | `12345678` |
| `second@financy.local`  | `12345678` |

## Recuperação de senha (desenvolvimento)

O fluxo de recuperação de senha está implementado de ponta a ponta, mas o envio de e-mail não está integrado a um serviço externo (ex.: SendGrid, Resend). Em desenvolvimento, o token é exibido no log do servidor:

```
[DEV] Password reset token for user@example.com: <token>
```

Para testar o fluxo completo: acesse `/forgot-password`, envie um e-mail cadastrado, copie o token do log e abra `/reset-password?token=<token>` no frontend.

## Seed em massa de transações

Use `prisma:seed:transactions` para popular um grande volume de transações falsas e testar paginação e filtros.

**Pré-requisito:** execute o seed de base pelo menos uma vez para que os usuários e categorias de demonstração existam.

```bash
pnpm prisma:seed
```

**Padrão — 50 transações no modo substituição:**

```bash
pnpm prisma:seed:transactions
```

Remove todas as transações existentes de `demo@financy.local` e insere 50 novas distribuídas nos últimos 12 meses.

**Opções:**

| Flag              | Padrão                | Descrição                                              |
|-------------------|-----------------------|--------------------------------------------------------|
| `--count <n>`     | `50`                  | Quantidade de transações a inserir (1–1000)            |
| `--email <email>` | `demo@financy.local`  | Usuário alvo pelo e-mail                               |
| `--append`        | desativado            | Adiciona às transações existentes em vez de substituir |

**Exemplos:**

```bash
# Inserir 75 transações no modo substituição
pnpm prisma:seed:transactions -- --count 75

# Adicionar 20 sem apagar os dados existentes
pnpm prisma:seed:transactions -- --append --count 20

# Seed em outro usuário com 30 transações
pnpm prisma:seed:transactions -- --email second@financy.local --count 30
```

> O separador `--` é necessário para que o pnpm repasse os argumentos ao script.
