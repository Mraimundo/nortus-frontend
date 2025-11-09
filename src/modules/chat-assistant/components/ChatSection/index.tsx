'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { Button } from '@/src/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/shared/components/ui/card';
import { ScrollArea } from '@/src/shared/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/avatar';
import { Sidebar } from '@/src/shared/components/Sidebar';
import { Separator } from '@/src/shared/components/Separator';
import { DesktopHeaderChat } from '@/src/modules/chat-assistant/components/DesktopHeaderChat';
import {
  SendIcon,
  PhoneIcon,
  MailIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { Badge } from '@/src/shared/components/ui/badge';
import { useChatStore } from '@/src/modules/chat-assistant/store/useChatStore';
import { ChatForm } from '../ChatForm.tsx';
import { groupMessagesByDate } from '@/src/modules/chat-assistant/utils/groupMessagesByDate';
export function ChatSection() {
  const { messages, client, iaSuggestion, toggleMinimizeIASuggestion } =
    useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleActionClick = (action: string) => {
    alert(`Ação "${action}" acionada`);
  };

  const messagesWithDate = groupMessagesByDate(messages);

  return (
    <div className="h-screen text-white">
      <DesktopHeaderChat />
      <Sidebar />
      <div className="py-28">
        <div className="flex overflow-hidden">
          <div className="flex-1 flex flex-col rounded-lg overflow-hidden">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messagesWithDate.map((item) => {
                  if (item.dateLabel) {
                    return (
                      <div key={item.id} className="flex justify-center">
                        <span className="text-xs text-slate-500 px-3 py-1">
                          {item.dateLabel}
                        </span>

                        <span className="text-xs text-slate-500 px-3 py-1">
                          {item.time}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${item.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          item.sender === 'client'
                            ? 'bg-blue-600 text-white'
                            : item.sender === 'ai'
                              ? 'bg-slate-800 border border-slate-700'
                              : 'bg-slate-800'
                        }`}
                      >
                        {item.sender === 'ai' && (
                          <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
                            <SendIcon size={14} />
                            Sugestão da IA
                          </div>
                        )}
                        <div className="text-sm">{item.text}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-400">
                            {item.time}
                          </span>
                          {item.sender === 'client' && item.read && (
                            <CheckIcon />
                          )}
                        </div>
                        {item.actions && (
                          <div className="flex gap-2 mt-3">
                            {item.actions.map((action) => (
                              <Button
                                key={action}
                                variant="outline"
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                                onClick={() => handleActionClick(action)}
                              >
                                {action}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4">
              <ChatForm />
            </div>
          </div>

          <div className="w-130 p-16 bg-[#22283b] flex flex-col gap-6">
            <Card className="bg-[#0f1629]">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3 flex-col justify-center">
                  <Avatar className="h-12 w-12 bg-blue-600">
                    <AvatarFallback className="text-white font-bold">
                      {client.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <CardTitle className="text-lg font-bold">
                      {client.name}
                    </CardTitle>
                    <p className="text-sm text-slate-400">{client.type}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex flex-col items-center text-slate-300 hover:text-white"
                  >
                    <PhoneIcon size={16} className="mr-1 text-[#1876D2]" />{' '}
                    Telefona
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex flex-col items-center text-slate-300 hover:text-white"
                  >
                    <MailIcon size={16} className="mr-1 text-[#1876D2]" />{' '}
                    Enviar e-mail
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 flex flex-col items-center hover:text-white"
                  >
                    <MoreHorizontalIcon size={16} className="text-[#1876D2]" />
                    Ver mais
                  </Button>
                </div>
                <Separator />
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Produtos</h3>
                  {client.products.map((p, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            p.status === 'active'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        />
                        <span className="text-sm">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{p.price}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-slate-400"
                        >
                          <SendIcon size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Perfil</h3>
                  <div className="flex gap-2 flex-wrap">
                    {client.profileTags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-blue-600 text-white text-xs px-2 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Ações no app</h3>
                  <div className="space-y-3">
                    {client.actions.map((action, i) => (
                      <div key={i} className="text-xs">
                        <div className="text-slate-400">{action.time}</div>
                        <div className="text-white">{action.label}</div>
                        {action.duration && (
                          <div className="text-slate-500">
                            {action.duration}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className=" bg-slate-800">
              <div className="space-y-2">
                <CardHeader>
                  <CardTitle className="text-lg">Sugestão da IA</CardTitle>
                </CardHeader>
                <p className="ml-6">Interação detectada:</p>
                <div className="flex items-start">
                  <CardContent>
                    <p className="text-sm text-slate-300 w-full max-w-[220px] leading-relaxed">
                      {iaSuggestion.text}
                    </p>
                  </CardContent>
                  <div>
                    <Image
                      src="/assets/brilho.png"
                      alt="Ilustração de login Nortus"
                      priority
                      width={87}
                      height={131}
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                </div>
                <Button className="py-4 ml-6 text-center px-5 text-white rounded-3xl bg-[#237bd5]">
                  Utilizar Sugestão
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19l12-12-1.41-1.41z" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
