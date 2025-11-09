'use client';

import Image from 'next/image';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/shared/components/ui/card';
import { useTicketStore } from '@/src/modules/tickets/store/useTicketStore';

export function TicketStats() {
  const tickets = useTicketStore((state) => state.tickets);

  const stats = {
    open: tickets.filter((t) => t.status === 'Aberto').length,
    inProgress: tickets.filter((t) => t.status === 'Em andamento').length,
    resolvedToday: tickets.filter(
      (t) =>
        t.status === 'Resolvido' &&
        new Date(t.createdAt!).toDateString() === new Date().toDateString(),
    ).length,
    avgTime: '2.5h',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-[#161c30] rounded-3xl border-2 border-slate-700/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Tickets Abertos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between pb-2">
          <div className="text-2xl font-bold">{stats.open}</div>
          <Image
            src="/assets/ticket-icon.png"
            alt="Titkets Abertos"
            priority
            width={32}
            height={32}
            style={{
              objectFit: 'cover',
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-[#161c30] rounded-3xl border-2 border-slate-700/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Em andamento
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between pb-2">
          <div className="text-2xl font-bold">{stats.inProgress}</div>
          <Image
            src="/assets/chat-icon.png"
            alt="Em andamento"
            priority
            width={32}
            height={32}
            style={{
              objectFit: 'cover',
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-[#161c30] rounded-3xl border-2 border-slate-700/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Resolvidos hoje
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between pb-2">
          <div className="text-2xl font-bold">{stats.resolvedToday}</div>
          <Image
            src="/assets/confi-icon.png"
            alt="Resolvidos hoje"
            priority
            width={32}
            height={32}
            style={{
              objectFit: 'cover',
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-[#161c30] rounded-3xl border-2 border-slate-700/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Tempo Médio
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between pb-2">
          <div className="text-2xl font-bold">{stats.avgTime}</div>
          <Image
            src="/assets/clock-icon.png"
            alt="Tempo Médio Icon"
            priority
            width={32}
            height={32}
            style={{
              objectFit: 'cover',
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
