# Guia de Funcionalidade — Chat com Assistente Virtual

História: Como atendente, visualizar recomendações automáticas da IA e acionar rapidamente propostas, ligações e histórico.

Critérios implementados:
- Sugestões contextuais da IA exibidas no painel do chat.
- Ações rápidas: enviar proposta, fazer ligação, ver histórico.

Componentes principais:
- Página: src/app/[locale]/chat-assistant/page.tsx
- Layout: src/app/[locale]/chat-assistant/layout.tsx
- Módulo: src/modules/chat-assistant/components
  - ChatSection
  - ChatForm
  - DesktopHeaderChat

Estado e lógica:
- Store: src/modules/chat-assistant/store/useChatStore.ts
- Schema: src/modules/chat-assistant/utils/messageSchema.ts
- Utilitário: groupMessagesByDate.ts para agrupamento por data.

Fluxo:
- As mensagens do usuário e assistente são armazenadas no Zustand.
- Sugestões do assistente são renderizadas com destaque e botões de ação.
- Ações disparam handlers que podem integrar com backends ou mocks.

Internacionalização:
- Mensagens e labels via messages/*.json.
