'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChatStore } from '@/src/modules/chat-assistant/store/useChatStore';
import { SendIcon } from 'lucide-react';
import {
  messageSchema,
  type MessageFormData,
} from '@/src/modules/chat-assistant/utils/messageSchema';
import { Button } from '@/src/shared/components/ui/button';
import { Input } from '@/src/shared/components/ui/input';

export function ChatForm() {
  const { addClientMessage } = useChatStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: MessageFormData) => {
    setIsSubmitting(true);
    addClientMessage(data.message);
    reset();
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 bg-[#24283a] border border-slate-400 rounded-full p-2"
    >
      <Input
        {...register('message')}
        placeholder="Escreva aqui..."
        className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-slate-400"
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="text-blue-400 hover:text-blue-300"
        disabled={isSubmitting}
      >
        <SendIcon size={20} />
      </Button>
      {errors.message && (
        <span className="text-xs text-red-400 absolute bottom-8 left-2">
          {errors.message.message}
        </span>
      )}
    </form>
  );
}
