import { ChatMessage } from '@/src/modules/chat-assistant/store/useChatStore';

export type MessageWithDateLabel = ChatMessage & { dateLabel?: string };

export function groupMessagesByDate(
  messages: ChatMessage[],
): MessageWithDateLabel[] {
  if (messages.length === 0) return [];

  const result: MessageWithDateLabel[] = [];
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  let lastDate = '';

  for (const msg of messages) {
    const msgDate = msg.time ? new Date(msg.time) : new Date();
    const dateStr = msgDate.toDateString();

    if (dateStr !== lastDate) {
      let label: string;

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
        sender: 'system' as ChatMessage['sender'],
        name: 'system',
        text: '',
        time: msg.time || '',
        dateLabel: label,
      });

      lastDate = dateStr;
    }

    result.push(msg);
  }

  return result;
}
