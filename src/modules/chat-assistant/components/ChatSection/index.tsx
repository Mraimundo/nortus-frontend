'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useChatStore } from '../../store/useChatStore';
import { DesktopHeaderChat } from '../DesktopHeaderChat';
import { Sidebar } from '@/src/shared/components/Sidebar';
import { ScrollArea } from '@/src/shared/components/ui/scroll-area';
import Image from 'next/image';
import { Button } from '@/src/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/shared/components/ui/card';
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/avatar';
import { Separator } from '@/src/shared/components/Separator';
import { Badge } from '@/src/shared/components/ui/badge';
import {
  CheckIcon,
  MailIcon,
  MoreHorizontalIcon,
  PhoneIcon,
  SendIcon,
} from 'lucide-react';
import { ChatForm } from '../ChatForm';

export function ChatSection() {
  const { messages, client, iaSuggestion } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen text-white bg-[#0f121a] flex flex-col">
      <DesktopHeaderChat />
      <Sidebar />

      <div className="py-20 md:py-28 px-2 md:px-6 flex-1 flex flex-col">
        <div className="flex flex-col lg:flex-row overflow-hidden h-full gap-6">
          <div className="flex-1 flex flex-col rounded-lg overflow-hidden bg-[#1b1f2e]">
            <ScrollArea className="flex-1 p-4 sm:p-6">
              <div className="space-y-4">
                {messages.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${
                      item.sender === 'client' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] p-3 rounded-lg ${
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
                        {item.sender === 'client' && item.read && <CheckIcon />}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-slate-700 bg-[#181b29]">
              <ChatForm />
            </div>
          </div>

          <aside className="lg:w-[350px] xl:w-[420px] flex lg:flex-row flex-col gap-6">
            <div className="flex flex-col gap-6">
              <Card className="bg-[#22283b]">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 flex-col justify-center text-center">
                    <Avatar className="h-12 w-12 bg-blue-600">
                      <AvatarFallback className="text-white font-bold">
                        {client.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg font-bold mt-2">
                      {client.name}
                    </CardTitle>
                    <p className="text-sm text-slate-400">{client.type}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-4 flex-wrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex flex-col items-center text-slate-300 hover:text-white"
                    >
                      <PhoneIcon size={16} className="mr-1 text-[#1876D2]" />
                      Telefona
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex flex-col items-center text-slate-300 hover:text-white"
                    >
                      <MailIcon size={16} className="mr-1 text-[#1876D2]" />
                      E-mail
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-300 flex flex-col items-center hover:text-white"
                    >
                      <MoreHorizontalIcon
                        size={16}
                        className="text-[#1876D2]"
                      />
                      Ver mais
                    </Button>
                  </div>

                  <Separator />

                  <div className="mb-4 mt-4">
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

                  <div className="mb-4 mt-4">
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

                  <div className="mt-4">
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

              <Card className="bg-slate-800">
                <div className="space-y-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Sugestão da IA</CardTitle>
                  </CardHeader>
                  <p className="ml-6">Interação detectada:</p>
                  <div className="flex items-start flex-col sm:flex-row sm:items-center">
                    <CardContent>
                      <p className="text-sm text-slate-300 w-full max-w-60 leading-relaxed">
                        {iaSuggestion.text}
                      </p>
                    </CardContent>
                    <div className="hidden sm:block">
                      <Image
                        src="/assets/brilho.png"
                        alt="Ilustração"
                        width={87}
                        height={131}
                        priority
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <Button className="py-4 ml-6 text-center px-5 text-white rounded-3xl bg-[#237bd5]">
                    Utilizar Sugestão
                  </Button>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
