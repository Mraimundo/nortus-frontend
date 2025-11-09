# Guia de Funcionalidade — Login

História: Como usuário, quero acessar minha conta com email e senha.

Critérios implementados:
- Validação de email via react-hook-form + resolvers.
- Campo de senha com alternância de visibilidade.

Componentes principais:
- src/modules/auth/components/LoginForm
- src/modules/auth/components/LoginFormSection
- src/modules/auth/components/IllustrationSection
- Página: src/app/[locale]/auth/login/page.tsx

Fluxo:
- Usuário insere email e senha.
- Validação client-side (email format, required).
- Ao submeter, atualiza store de autenticação em src/shared/store/authStore.ts e redireciona.

Estados/Stores:
- authStore.ts: mantém informações de sessão (token mockado via jsonwebtoken, quando aplicável).

Internacionalização:
- Textos via messages/*.json conforme locale.
