# Padrões de Código e Arquitetura

Tecnologias:
- Next.js App Router, React 18, TypeScript 5
- Zustand para estado local por módulo e sessão
- UI compartilhada em src/shared/ui seguindo composição e acessibilidade

Padrões:
- Componentes funcionais com tipagem explícita (Props), evitar any.
- CSS: utilizar classes utilitárias e estilos globais em src/app/globals.css.
- Pastas index.tsx por componente, export default/local conforme necessidade.
- Stores: imutabilidade com immer (quando necessário) e separação de ações/estado.
- Utilitários puros em src/shared/lib/utils.ts.

Boas práticas:
- Evitar lógica complexa dentro do JSX; extrair para hooks/utilitários.
- Componentes desacoplados com props claras e controladas.
- Testes de unidade para stores e utilitários; testes de componentes essenciais.
- Respeitar ESLint/Prettier: npm run lint:fix e npm run format.
