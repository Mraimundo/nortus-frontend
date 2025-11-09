'use client';

import { useState } from 'react';
import { PencilLine, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/src/shared/components/ui/button';
import { Badge } from '@/src/shared/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/shared/components/ui/dropdown-menu';
import { useTicketStore } from '@/src/modules/tickets/store/useTicketStore';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function TicketTable() {
  const { getFilteredTickets, setFilters, filters } = useTicketStore();
  const tickets = getFilteredTickets();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const paginatedTickets = tickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSearch = (searchTerm: string) => {
    setFilters({ searchTerm });
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberto':
        return 'bg-[#43D2CB]/20 text-white';
      case 'Em andamento':
        return 'bg-[#D2B843]/20 text-white';
      case 'Resolvido':
        return 'bg-[#6b7280]/20 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgente':
        return 'bg-[#BA1A1A] text-white';
      case 'Alta':
        return 'bg-[#BA1A1A] text-white';
      case 'Média':
        return 'bg-[#B5EDFF] text-[#0B1125]';
      case 'Baixa':
        return 'bg-[#E0F7FF] text-[#0B1125]';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getShortId = (id: string) => {
    return id.substring(0, 8) + '...';
  };

  const QuickActions = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-secondary/20"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-[#1e2438] border-slate-700/30 text-foreground"
        >
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-secondary/20 focus:bg-secondary/20">
            <Eye className="h-4 w-4 text-[#1876D2]" />
            <span>Visualizar detalhes</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-secondary/20 focus:bg-secondary/20">
            <PencilLine className="h-4 w-4 text-[#1876D2]" />
            <span>Editar ticket</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="bg-[#161c30] space-y-3 rounded-3xl border-2 border-slate-700/30 p-6">
      <h1 className="text-xl font-bold text-foreground">Lista de Tickets</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative grow">
          <input
            type="text"
            placeholder="Buscar por ID, cliente ou assunto..."
            className="w-full bg-[#0B1125] text-[#F6F8FC] placeholder:text-sm placeholder:text-[#F6F8FC] placeholder:font-normal rounded-3xl px-4 py-2 pl-10 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={filters.searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <select
          value={filters.status}
          onChange={(e) => {
            setFilters({ status: e.target.value });
            setCurrentPage(1);
          }}
          className="bg-[#0B1125] text-[#F6F8FC] rounded-3xl text-sm font-normal px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option>Todos os status</option>
          <option>Aberto</option>
          <option>Em andamento</option>
          <option>Resolvido</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => {
            setFilters({ priority: e.target.value });
            setCurrentPage(1);
          }}
          className="bg-[#0B1125] text-[#F6F8FC] rounded-3xl text-sm font-normal px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option>Todas as prioridades</option>
          <option>Urgente</option>
          <option>Alta</option>
          <option>Média</option>
          <option>Baixa</option>
        </select>

        <select
          value={filters.assignedTo}
          onChange={(e) => {
            setFilters({ assignedTo: e.target.value });
            setCurrentPage(1);
          }}
          className="bg-[#0B1125] text-[#F6F8FC] rounded-3xl text-sm font-normal px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option>Todos os responsáveis</option>
          <option>Ana Silva</option>
          <option>João Costa</option>
          <option>Carlos Lima</option>
          <option>Anderson Freitas</option>
        </select>
      </div>

      <div className="bg-[#24283a] rounded-3xl border-2 border-slate-700/30 p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase text-muted-foreground border-b border-border">
              <th className="py-3 px-4 font-medium text-left">ID</th>
              <th className="py-3 px-4 font-medium text-left">Prioridade</th>
              <th className="py-3 px-4 font-medium text-left">Cliente</th>
              <th className="py-3 px-4 font-medium text-left">Assunto</th>
              <th className="py-3 px-4 font-medium text-left">Status</th>
              <th className="py-3 px-4 font-medium text-left">Criado em</th>
              <th className="py-3 px-4 font-medium text-left">Responsável</th>
              <th className="py-3 px-4 font-medium text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedTickets.length > 0 ? (
              paginatedTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-secondary/10 transition-colors"
                >
                  <td className="py-4 px-4 font-medium" title={ticket.id}>
                    {getShortId(ticket.id)}
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div>{ticket.clientName}</div>
                    <div className="text-xs text-muted-foreground">
                      {ticket.clientEmail}
                    </div>
                  </td>
                  <td className="truncate w-full max-w-[200px] py-4 px-4">
                    {ticket.title}
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    {format(new Date(ticket.createdAt), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}
                  </td>
                  <td className="py-4 px-4">{ticket.assignedTo}</td>
                  <td className="py-4 px-4">
                    <QuickActions />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="py-8 px-4 text-center text-muted-foreground"
                >
                  Nenhum ticket encontrado com os filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paginatedTickets.length > 0 && (
        <div className="flex justify-center lg:justify-end mt-6 space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <span className="flex items-center px-4">
            {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
