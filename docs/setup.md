# Configuração e Execução

Requisitos:
- Node.js 20+
- PNPM ou NPM (exemplos com npm)

Instalação:
- npm install

Variáveis de ambiente:
- Copie .env.exemplo para .env e ajuste conforme necessário.
- Exemplos comuns:
  - NEXT_PUBLIC_APP_NAME=Nortus
  - NEXT_PUBLIC_DEFAULT_LOCALE=pt-BR

Scripts úteis:
- Desenvolvimento: npm run dev
- Build: npm run build
- Produção: npm run start
- Lint: npm run lint (ou lint:fix)
- Format: npm run format
- Testes:
  - Unitários: npm run test
  - Watch: npm run test:watch
  - UI dos testes: npm run test:ui
  - Cobertura: npm run coverage

Estrutura de rotas por locale:
- /[locale]/auth/login
- /[locale]/chat-assistant
- /[locale]/dashboard
- /[locale]/tickets
- /[locale]/plan-simulator

Problemas comuns:
- Erros de tipo: execute npm run lint e verifique tsconfig.json.
- Import de estilos: globals.css já é carregado por src/app.
- i18n: verifique messages/*.json e src/i18n/routing.ts para locais suportados.
