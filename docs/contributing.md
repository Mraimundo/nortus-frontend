# Contribuindo

Fluxo de trabalho sugerido:
- Branches: feature/<escopo>, fix/<escopo>, chore/<escopo>
- Commits: Conventional Commits (feat, fix, refactor, docs, test, chore)

Exemplos:
- feat(tickets): adicionar filtro por responsável
- fix(chat): corrigir agrupamento por data

PRs:
- Descrever escopo, motivação e screenshots (quando UI).
- Incluir checklist: testes, lint, docs atualizadas.

Qualidade:
- Executar npm run lint:fix e npm run test antes de abrir PR.
- Atualizar docs/ quando a mudança impactar comportamento do usuário.
