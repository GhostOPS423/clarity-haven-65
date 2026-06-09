## Rebrand: Sovereign Ledger → Gerson Gomes Advocacia

Variação completa do sistema com nova identidade visual. Funcionalidades (processos, financeiro, agenda, prazos, exportação Excel, persistência LocalStorage) ficam **intactas** — apenas a camada visual e os textos de marca mudam.

### 1. Identidade visual — tema híbrido

**Paleta global** (preto/branco/dourado):
- Background: branco puro `#ffffff`
- Foreground / Preto profundo: `#0d0d0d`
- Sidebar: preto `#0d0d0d` com texto off-white
- Dourado principal: `#c9a84c` (botões, bordas de destaque, ativo)
- Dourado claro: `#f0d78c` (hover, brilhos)
- Cards: branco com bordas sutis em cinza claro

Reescrita completa de `src/index.css` substituindo os tokens HSL atuais (verde-escuro + âmbar) pelos novos valores. Tokens `--sidebar-bg`, `--primary`, `--accent`, `--amber-accent`, `--ring`, `--border` recalibrados para o novo tema. `tailwind.config.ts` não precisa mudar — usa as variáveis.

**Tipografia**: mantém Noto Serif (títulos) + Public Sans (corpo) — já têm aspecto sóbrio e corporativo adequado à marca.

### 2. Logo e monograma

- Upload do PNG enviado via `lovable-assets` → `src/assets/gerson-gomes-logo.png.asset.json`
- Remoção do `src/assets/angeline-logo.png` antigo
- Reescrita do `src/components/Logo.tsx`:
  - Importa o novo asset
  - `alt="Gerson Gomes — Advocacia e Consultoria Jurídica"`
  - Remove o filtro `invert` (o logo já é dourado sobre transparente, fica perfeito sobre fundo preto da sidebar e branco do login)
- Avatar do TopBar: troca o círculo `JR` por monograma `GG` em dourado sobre fundo preto

### 3. Substituição de textos "Angeline" → "Gerson Gomes"

Arquivos afetados:
- `index.html`: `<title>` → "Gerson Gomes — Gestão Jurídica"; meta description atualizada
- `src/lib/exportExcel.ts`: constante `BRAND` e nome do arquivo `.xlsx` (`gerson-gomes-relatorio-{data}.xlsx`)
- `src/components/Logo.tsx`: alt text e comentário
- `README.md`: título, descrição e referências de marca
- `src/components/AppSidebar.tsx`: subtítulo "Gestão Financeira Jurídica" mantido (genérico)
- `src/pages/Login.tsx`: subtítulo mantido; logo já reflete a marca

Busca final por `grep -ri "angeline"` para garantir zero ocorrências remanescentes.

### 4. Ajustes visuais pontuais (presentation only)

- `MetricCards`: card destaque ganha borda esquerda dourada (`border-accent` agora resolve para dourado)
- `TopBar`: avatar circular dourado com "GG" preto
- `AppSidebar`: linha ativa em dourado já funcionará via novo `--amber-accent`
- Gradiente decorativo em `AppLayout` continua, agora em tom dourado translúcido

### 5. Validação

- `grep -ri angeline` retorna vazio
- Visita das 4 rotas (Dashboard, Processos, Financeiro, Agenda) + Login para conferir contraste
- Exportar Excel para confirmar nome do arquivo e cabeçalho da marca

### Arquivos que NÃO mudam
Toda a lógica em `src/lib/store.ts`, `src/lib/exportExcel.ts` (apenas constantes de marca), páginas de CRUD, modais, hooks, roteamento — preservados integralmente.
