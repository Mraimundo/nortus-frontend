import { Suspense } from 'react';
import { LoadingSpinner } from '@/src/shared/components/LoadingSpinner';

export default function PlanSimulatorPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={<LoadingSpinner />}>
        <h1 className="Bold text-white text-2xl">
          Bem Vindo á Pagina Simulador de Planos
        </h1>
      </Suspense>
    </div>
  );
}
