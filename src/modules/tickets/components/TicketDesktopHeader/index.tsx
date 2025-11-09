import { CreateNewTicketForm } from '../CreateNewTicketForm';

export function TicketDesktopHeader() {
  return (
    <div className="hidden lg:flex flex-1 fixed left-30 top-0 right-0 h-20 bg-[#20273E] backdrop-blur-xl border-b border-slate-700/50 z-20">
      <div className="flex items-center justify-between w-full px-8">
        <h1 className="text-xl font-semibold text-[#F6F8FC]">
          Gestão de Tickets
        </h1>
        <CreateNewTicketForm />
      </div>
    </div>
  );
}
