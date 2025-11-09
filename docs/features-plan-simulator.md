# Guia de Funcionalidade — Simulador de Planos

História: Como consultor, personalizar um plano de seguro com atualização de preço em tempo real.

Critérios implementados/planejados:
- Seleção de planos: Básico, Intermediário, Premium.
- Sliders: valor do veículo, idade do cliente.
- Opções adicionais com preço atualizado em tempo real.

Componentes principais:
- Página: src/app/[locale]/plan-simulator/page.tsx
- UI compartilhada: src/shared/ui/* (slider/select/input etc.)

Fluxo sugerido:
- Estado local com cálculo reativo do preço conforme inputs.
- Comportamento pronto para integração com motor de precificação do backend.
