# Guia de Funcionalidade — Dashboard de KPIs

História: Como gestor, acompanhar KPIs (ARPU, Retenção, Churn, Conversão) e mapa por região.

Componentes principais:
- Página/Layout: src/app/[locale]/dashboard
- Módulo: src/modules/dashboard/components/
  - KPICard, KPIGrid
  - KPIChartSection (React ApexCharts)
  - CustomerMap, CustomerMapCard (OpenLayers ou Google Maps conforme implementação)
  - SegmentImpact
- Config/Tipos:
  - src/modules/dashboard/config/chartDashboardConfig.ts
  - src/modules/dashboard/config/dashboardData.ts
  - src/modules/dashboard/types/dashboard.ts

Fluxo:
- Os dados do dashboard são mockados via dashboardData.ts.
- KPIChartSection lê config de chartDashboardConfig.ts e renderiza gráficos.
- CustomerMap exibe distribuição de clientes por região.
- SegmentImpact apresenta mapa de impacto por tipo/segmento.

Considerações:
- Responsividade com grid e componentes compartilhados de UI.
- Temas e cores conforme tokens dos componentes de UI.
