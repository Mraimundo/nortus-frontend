'use client';

import { useState, useCallback, useMemo } from 'react';
import { Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/src/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/components/ui/select';
import { Input } from '@/src/shared/components/ui/input';
import { Label } from '@/src/shared/components/ui/label';
import { Textarea } from '@/src/shared/components/ui/textarea';

import { useTicketStore } from '@/src/modules/tickets/store/useTicketStore';
import { createTicketSchema } from '../../utils/schema';

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;

const PRIORITY_OPTIONS = [
  { value: 'Baixa', label: 'Baixa' },
  { value: 'Média', label: 'Média' },
  { value: 'Alta', label: 'Alta' },
  { value: 'Urgente', label: 'Urgente' },
] as const;

const RESPONSIBLE_OPTIONS = [
  { value: 'Ana Silva', label: 'Ana Silva' },
  { value: 'João Costa', label: 'João Costa' },
  { value: 'Carlos Lima', label: 'Carlos Lima' },
  { value: 'Anderson Freitas', label: 'Anderson Freitas' },
] as const;

export function CreateNewTicketForm() {
  const [isOpen, setIsOpen] = useState(false);
  const addTicket = useTicketStore((state) => state.addTicket);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      clientName: '',
      email: '',
      priority: undefined,
      responsible: '',
      subject: '',
    },
  });

  const priorityValue = watch('priority');
  const responsibleValue = watch('responsible');

  const handleCreateTicket = useCallback(
    async (data: CreateTicketFormData) => {
      try {
        addTicket({
          title: data.subject,
          description: data.subject,
          priority: data.priority,
          assignedTo: data.responsible,
          clientName: data.clientName,
          clientEmail: data.email,
        });

        reset();
        setIsOpen(false);
        toast.success('Ticket criado com sucesso!', {
          description: 'O ticket foi criado e já está na sua lista.',
        });
      } catch (error) {
        toast.error(`Erro ao criar ticket: ${(error as Error).message}`);
      }
    },
    [addTicket, reset],
  );

  const handleCancel = useCallback(() => {
    reset();
    setIsOpen(false);
  }, [reset]);

  const renderSelectItems = useMemo(
    () => (options: readonly { value: string; label: string }[]) =>
      options.map((opt) => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      )),
    [],
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1876D2] hover:bg-[#1876D2]/50 rounded-3xl flex items-center py-2.5 px-3 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Novo Ticket
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] border-0 bg-[#0b1225] rounded-3xl text-[#F6F8FC]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-normal">Novo Ticket</DialogTitle>
          <Button
            variant="ghost"
            className="h-10 w-10 p-0 rounded-full border-2 border-slate-700 bg-[#0b1225]"
            onClick={handleCancel}
            aria-label="Fechar modal de criação de ticket"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateTicket)} noValidate>
          <div className="mt-6 space-y-6">
            <p className="text-sm font-normal text-[#F6F8FC]">
              Preencha os dados abaixo para registrar um novo ticket na
              plataforma.
            </p>

            <div className="space-y-4">
              <Field
                id="client-name"
                label="Nome do cliente"
                error={errors.clientName?.message}
              >
                <Input
                  id="client-name"
                  placeholder="Nome da pessoa ou empresa solicitante"
                  className="bg-[#161c30] border-slate-600 rounded-3xl py-6 placeholder:text-slate-400"
                  {...register('clientName')}
                />
              </Field>

              <Field id="email" label="Email" error={errors.email?.message}>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail de contato"
                  className="bg-[#161c30] border-slate-600 rounded-3xl py-6 placeholder:text-slate-400"
                  {...register('email')}
                />
              </Field>

              <Field
                id="priority"
                label="Prioridade"
                error={errors.priority?.message}
              >
                <Select
                  value={priorityValue}
                  onValueChange={(value) =>
                    setValue(
                      'priority',
                      value as CreateTicketFormData['priority'],
                    )
                  }
                >
                  <SelectTrigger className="bg-[#161c30] py-6 rounded-3xl w-full border-slate-600 text-[#F6F8FC]">
                    <SelectValue placeholder="Selecione o nível de urgência" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#161c30] border-slate-600 text-[#F6F8FC]">
                    {renderSelectItems(PRIORITY_OPTIONS)}
                  </SelectContent>
                </Select>
              </Field>

              <Field
                id="responsible"
                label="Responsável"
                error={errors.responsible?.message}
              >
                <Select
                  value={responsibleValue}
                  onValueChange={(value: string) =>
                    setValue('responsible', value)
                  }
                >
                  <SelectTrigger className="bg-[#161c30] py-6 rounded-3xl w-full border-slate-600 text-[#F6F8FC]">
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#161c30] border-slate-600 text-[#F6F8FC]">
                    {renderSelectItems(RESPONSIBLE_OPTIONS)}
                  </SelectContent>
                </Select>
              </Field>

              {/* Campo substituído por Textarea */}
              <Field
                id="subject"
                label="Resumo do problema ou solicitação"
                error={errors.subject?.message}
              >
                <Textarea
                  id="subject"
                  placeholder="Descreva resumidamente o problema ou solicitação"
                  className="bg-[#161c30] border-slate-600 rounded-3xl text-[#F6F8FC] placeholder:text-slate-400 min-h-[120px] resize-none py-4 px-4"
                  {...register('subject')}
                />
              </Field>
            </div>

            <div className="flex justify-center space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="border-slate-600 text-[#F6F8FC] hover:bg-slate-700 py-6 rounded-xl px-6"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#1876D2] hover:bg-[#1876D2]/50 text-white py-6 rounded-xl px-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Criando...' : 'Criar Ticket'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-base text-[#F6F8FC] font-medium">
        {label}
      </Label>
      {children}
      {error && (
        <span className="text-red-400 text-sm mt-1 block" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
