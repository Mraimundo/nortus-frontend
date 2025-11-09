import { create } from 'zustand';

export type Sender = 'client' | 'agent' | 'ai';

export interface ChatMessage {
  id: string;
  sender: Sender;
  name: string;
  text: string;
  time: string;
  read?: boolean;
  actions?: string[];
}

export interface ClientData {
  name: string;
  type: string;
  avatar: string;
  products: { name: string; price: string; status: 'active' | 'inactive' }[];
  profileTags: string[];
  actions: { label: string; time: string; duration?: string }[];
}

export interface IASuggestion {
  title: string;
  text: string;
}

interface ChatState {
  messages: ChatMessage[];
  client: ClientData;
  iaSuggestion: IASuggestion;
  minimizeIASuggestion: boolean; // ← novo
  addMessage: (message: Omit<ChatMessage, 'id'>) => void;
  addClientMessage: (text: string) => void;
  toggleMinimizeIASuggestion: () => void; // ← novo
}

const mockClientData: ClientData = {
  name: 'Ricardo Leite',
  type: 'Cliente Intermediário',
  avatar: 'RL',
  products: [
    { name: 'Seguro automóvel', price: 'R$ 185,90/mês', status: 'active' },
    { name: 'Seguro Residencial', price: 'R$ 89,90/mês', status: 'active' },
    { name: 'Seguro Viagem', price: 'R$ 230,00/mês', status: 'inactive' },
  ],
  profileTags: ['Família com filhos', 'Profissional liberal', 'Investidor'],
  actions: [
    {
      label: 'Consultou página de planos de saúde',
      time: '45 min atrás',
      duration: '3min e 42 seg',
    },
    { label: 'Iniciou simulação de seguro auto', time: '1 dia atrás' },
  ],
};

const mockIASuggestion: IASuggestion = {
  title: 'Interação detectada:',
  text: 'Boa pergunta! Sim, a gente tem sim. Muita gente começa pelos eletrônicos e depois vai descobrindo outras formas de se proteger. Me diz uma coisa: tem alguma situação ou motivo específico que te fez pensar nisso agora?',
};

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'client',
    name: 'Ricardo Leite - Seguro Automóvel',
    text: 'Oi! Tudo certo? Gostaria de saber sobre o seguro automóvel',
    time: '12:23',
    read: true,
  },
  {
    id: '2',
    sender: 'agent',
    name: 'Assistente',
    text: 'Oi, Ricardo! Tudo ótimo e com você? Claro que sim, posso te ajudar com o que precisar. Vi aqui que você tá com a gente há 6 meses com o seguro de automóvel, é isso mesmo?',
    time: '12:23',
  },
  {
    id: '3',
    sender: 'client',
    name: 'Ricardo Leite - Seguro Automóvel',
    text: 'Isso! Mas agora fiquei pensando... tem alguma coisa além disso? Tipo, pros meus equipamentos',
    time: '12:23',
    read: true,
  },
  {
    id: '4',
    sender: 'ai',
    name: 'Sugestão da IA',
    text: 'Baseado no perfil do cliente, recomendo a oferta Premium com desconto de 15%. Cliente tem histórico positivo.',
    time: '12:23',
    actions: ['Enviar proposta', 'Fazer ligação', 'Ver histórico'],
  },
];

export const useChatStore = create<ChatState>((set) => ({
  messages: initialMessages,
  client: mockClientData,
  iaSuggestion: mockIASuggestion,
  minimizeIASuggestion: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, id: Date.now().toString() }],
    })),
  addClientMessage: (text) =>
    set((state) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'client',
        name: 'Você',
        text,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        read: false,
      };
      return { messages: [...state.messages, newMessage] };
    }),
  toggleMinimizeIASuggestion: () =>
    set((state) => ({ minimizeIASuggestion: !state.minimizeIASuggestion })),
}));
