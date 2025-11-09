# Testes

Ferramentas:
- Vitest (unit/integration)
- @testing-library/react para componentes
- jsdom para ambiente de testes

Config:
- vitest.config.ts, vitest.setup.ts

Comandos:
- Todos os testes: npm run test
- Com interface: npm run test:ui
- Watch: npm run test:watch
- Cobertura: npm run coverage

Alvos prioritários:
- Stores: src/modules/*/store/*.ts (ex.: useTicketStore com spec existente)
- Utilitários puros: src/modules/*/utils/*.ts, src/shared/lib/utils.ts
- Componentes críticos de UI e formulários (validações e interações)
