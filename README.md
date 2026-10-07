# Landing page — Helena Martins, Psicóloga (modelo demonstrativo)

Perfil profissional pessoal e acolhedor, com a direção visual **"Presença e Acolhimento"**.

> ⚠ **ATENÇÃO — DADOS DEMONSTRATIVOS.** Nome, CRP, contatos (WhatsApp, e-mail, Instagram), textos, horários e imagens são **placeholders** e **devem ser substituídos pela profissional antes da publicação**. Nenhuma informação sobre formação, abordagem, resultados ou certificações foi inventada: o que falta está marcado com `[colchetes]`. Veja [CONTENT_REVIEW.md](CONTENT_REVIEW.md).

## Stack
React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · Lucide React · fontes locais (Fraunces + DM Sans via Fontsource).

## Como executar
```bash
npm install
npm run dev        # desenvolvimento em http://localhost:5173
npm run build      # build de produção em dist/
npm run typecheck
npm run lint
npm test           # testes de conteúdo (frases proibidas, CRP, avisos)
```

## Como editar o conteúdo
Tudo fica em **`src/content/site.ts`**: dados da profissional, contatos, links, textos de cada seção, FAQ, horários e imagens. Os componentes só leem esse arquivo.

- Para publicar de verdade: troque os dados, preencha os `[colchetes]` e mude `demoMode` para `false` (remove a faixa de aviso e o texto "dados demonstrativos" do rodapé).
- **Modo de demonstração (estado atual):** o site está completo, com textos fictícios preenchidos (história, abordagem, FAQ, horários, valores a combinar) e **4 ilustrações próprias em SVG** em `public/images/` (`retrato-hero`, `retrato-sobre`, `consultorio`, `detalhe`), sem direitos de terceiros. Os textos preenchidos são exemplos, **não** informações reais da profissional.
- Imagens: troque os arquivos em `public/images/` (ou aponte novos caminhos em `images`, em `site.ts`, com o texto alternativo e a legenda). Com `src: null` aparece um placeholder identificado. **A substituir antes de publicar:** as 4 ilustrações por fotografias reais da profissional e do consultório.
- Cores e fontes: variáveis CSS em `src/index.css` (espelham as variáveis do Figma).
- Formulário: o envio é **simulado**. Conecte um serviço real em `src/lib/submitContact.ts` e atualize [PRIVACY.md](PRIVACY.md).
- Política de privacidade: texto-modelo em `privacy` (acessível em `#/privacidade`).

## Figma
Arquivo: https://www.figma.com/design/vloNwrcmD3NcEq32EWcpSG — veja o estado real e as pendências em [FIGMA_GUIDE.md](FIGMA_GUIDE.md).

## Documentação
[DESIGN.md](DESIGN.md) · [FIGMA_GUIDE.md](FIGMA_GUIDE.md) · [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) · [CONTENT_REVIEW.md](CONTENT_REVIEW.md) · [PRIVACY.md](PRIVACY.md)

## Skills de design instaladas
`.agents/skills` e `.claude/skills` contêm skills de terceiros (taste-skill, ui-ux-pro-max, design-motion-principles). Não fazem parte do site publicado.
