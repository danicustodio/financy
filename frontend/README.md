# Financy Frontend

SPA React construído com Vite, TanStack Query, Zustand, Tailwind CSS v4 e Radix UI.

## Primeiros passos

```bash
cp .env.example .env        # defina VITE_BACKEND_URL
pnpm install
pnpm dev                    # servidor de desenvolvimento em http://localhost:5173
```

O backend precisa estar rodando antes. Consulte [`../backend/README.md`](../backend/README.md).

## Variáveis de ambiente

| Variável            | Exemplo                         | Descrição                                  |
|---------------------|---------------------------------|--------------------------------------------|
| `VITE_BACKEND_URL`  | `http://localhost:4000/graphql` | Endpoint GraphQL chamado pelo navegador    |

> O Vite incorpora as variáveis `VITE_*` no bundle em **tempo de build**. Alterar o valor após a compilação não tem efeito — é necessário recompilar.

## Scripts

| Script               | Descrição                                        |
|----------------------|--------------------------------------------------|
| `pnpm dev`           | Inicia o servidor Vite com HMR                   |
| `pnpm build`         | Verifica tipos e gera o build em `dist/`         |
| `pnpm preview`       | Serve o build de produção localmente             |
| `pnpm test`          | Executa os testes com Vitest                     |
| `pnpm test:watch`    | Executa o Vitest em modo watch                   |
| `pnpm test:ui`       | Abre a interface do Vitest                       |
| `pnpm test:coverage` | Gera o relatório de cobertura                    |
| `pnpm lint`          | Lint + correção automática com Biome             |

## Páginas

| Rota                        | Descrição                                          |
|-----------------------------|----------------------------------------------------|
| `/signin`                   | Login                                              |
| `/signup`                   | Cadastro                                           |
| `/forgot-password`          | Solicitação de token para redefinição de senha     |
| `/reset-password?token=...` | Definição de nova senha com o token recebido       |
| `/dashboard`                | Cards de resumo e transações recentes              |
| `/transactions`             | Listagem paginada de transações com filtros        |
| `/categories`               | Gerenciamento de categorias                        |
| `/profile`                  | Edição de nome e senha do perfil                   |

As rotas `/dashboard`, `/transactions`, `/categories` e `/profile` são protegidas — usuários não autenticados são redirecionados para `/signin`.
