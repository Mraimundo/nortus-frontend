import { ChatMessage } from '@/src/modules/chat-assistant/store/useChatStore';

export type MessageWithDateLabel = ChatMessage & { dateLabel?: string };

export function groupMessagesByDate(
  messages: ChatMessage[],
): MessageWithDateLabel[] {
  if (messages.length === 0) return [];

  const result: MessageWithDateLabel[] = [];
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  let lastDate = '';

  for (const msg of messages) {
    // Supomos que `msg.time` é HH:mm, mas precisamos de data completa
    // Como seu mock não tem data, vamos simular com base no índice ou adicionar no store
    // Para este exemplo, vamos assumir que todas as mensagens são de HOJE (como no layout)
    // Mas deixamos a lógica pronta para datas reais.

    const msgDate = new Date(); // ← substitua com `msg.timestamp` no futuro
    const dateStr = msgDate.toDateString();

    if (dateStr !== lastDate) {
      let label = '';

      if (dateStr === today.toDateString()) {
        label = 'Hoje';
      } else if (dateStr === yesterday.toDateString()) {
        label = 'Ontem';
      } else {
        const weekdays = [
          'Domingo',
          'Segunda-feira',
          'Terça-feira',
          'Quarta-feira',
          'Quinta-feira',
          'Sexta-feira',
          'Sábado',
        ];
        label = weekdays[msgDate.getDay()];
      }

      result.push({
        id: `date-${dateStr}`,
        sender: 'system',
        name: 'system',
        text: '',
        time: '',
        dateLabel: label,
      });
      lastDate = dateStr;
    }

    result.push(msg);
  }

  return result;
}
