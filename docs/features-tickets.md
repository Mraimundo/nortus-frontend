# Guia de Funcionalidade — Gestão de Tickets

História: Como operador, gerenciar tickets em uma única tela com filtros, ações e criação.

Critérios implementados:
- Listagem com prioridades e status (Urgente, Média, Baixa).
- Filtros por status, prioridade e responsável.
- Ações rápidas: editar e visualizar detalhes (handlers prontos para integração).
- Criação de ticket com validação de todos os campos obrigatórios e atualização da tabela.

Componentes principais:
- Página: src/app/[locale]/tickets/page.tsx
- Módulo: src/modules/tickets/components/
  - TicketSection
  - TicketTable
  - TicketStats
  - TicketDesktopHeader
  - CreateNewTicketForm
- Store: src/modules/tickets/store/useTicketStore.ts (testes em useTicketStore.spec.ts)
- Utilitários: src/modules/tickets/utils/constants.ts, schema.ts

Fluxo:
- Store armazena tickets e filtros.
- TicketTable reflete estado filtrado; criação insere no store e atualiza listagem.
- Validações via schema.ts (zod/resolvers se aplicável) e react-hook-form no form.
