# Visão Geral

Nortus é uma aplicação frontend construída com Next.js (App Router) e TypeScript, orientada a módulos funcionais para suportar uma jornada de atendimento com IA.

Principais objetivos (do briefing):
- Autenticação (Login) com validação e visibilidade de senha.
- Chat com Assistente Virtual com sugestões contextuais e ações rápidas.
- Dashboard com KPIs chave (ARPU, Retenção, Churn, Conversão) + mapa de clientes e impacto por segmento.
- Gestão de Tickets com filtros, edição, criação e validação.
- Simulador de Planos com atualização de preços em tempo real.
- Visão 360° do Cliente (insights, histórico e indicadores inteligentes).

Stack e bibliotecas:
- Next.js 14 (App Router) + React 18 + TypeScript
- State Management: Zustand (useChatStore, useTicketStore, authStore)
- UI: componentes em src/shared/ui (inspirado em Radix/Shadcn), ícones customizados em src/shared/icon-components
- i18n: organiza��ão por locale em src/app/[locale] com helpers em src/i18n
- Testes: Vitest + Testing Library (config em vitest.config.ts e vitest.setup.ts)
- Lint/Format: ESLint + Prettier

Estrutura de pastas relevante:
- src/app/[locale]/...: Rotas por localidade (pt-BR, en-US) incluindo páginas de login, chat-assistant, dashboard, tickets, plan-simulator
- src/modules/*: Feature modules (auth, chat-assistant, dashboard, tickets)
- src/shared/*: Componentes compartilhados, UI base, stores e utilitários
- public/data: mock de dados (ex.: user-profile.json)
- messages/*.json: mensagens de tradução

Fluxo alto nível:
- Usuário acessa via rota localizada (ex.: /pt-BR/auth/login).
- Após login, stores de sessão são atualizadas em src/shared/store/authStore.ts.
- Navegação para módulos: chat-assistant, dashboard, tickets, plan-simulator.
- Estados locais por módulo em stores dedicadas (ex.: useChatStore, useTicketStore).
- Componentes consomem dados do store e utilitários (schemas, formatadores) e renderizam com UI compartilhada.
