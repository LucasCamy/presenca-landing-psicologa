# IMPLEMENTATION_PLAN

## Stack e decisões
Vite + React 19 + TypeScript + Tailwind v4 + Motion + Lucide. Single-page com rotas por âncora; a política de privacidade usa hash (`#/privacidade`) para dispensar roteador e funcionar em hospedagem estática. Fontes locais (Fontsource): sem requisições a terceiros, melhor privacidade e performance.

## Estrutura
```
src/content/site.ts        conteúdo único (dados, textos, imagens, horários)
src/lib/submitContact.ts   envio SIMULADO do formulário (ponto de integração)
src/components/*           Navbar, HeroProfile, WelcomeBlock, AboutSection, AudienceSection,
                           ProcessSteps, ModalitySection, ApproachSection, PrinciplesSection,
                           FAQ, ContactSection, FinalCta, WhatsAppButton, Footer, PrivacyPage
tests/content.test.ts      guarda de conteúdo (frases proibidas, CRP, avisos)
```

## Etapas executadas
1. Inspeção: projeto vazio, sem git; Node 24; Figma MCP disponível.
2. Skills de design instaladas (taste-skill, ui-ux-pro-max, design-motion-principles + `uipro`).
3. Figma: tokens, estilos, componentes, frames desktop e mobile (ver FIGMA_GUIDE.md para pendências).
4. Implementação completa das 13 seções.
5. Validação: typecheck, lint, testes, build, navegador (links, headings, teclado, formulário, overflow).
6. Revisão ética do texto (CONTENT_REVIEW.md).

## Próximos passos
1. Profissional preenche `site.ts`, troca imagens, define `demoMode = false`.
2. Conectar o formulário real (HTTPS, sem armazenar mais que o necessário) e revisar PRIVACY.md.
3. Revisão ética/jurídica (CRP) e aprovação do texto.
4. Concluir protótipo e mobile no Figma.
5. Publicar em hospedagem estática (Netlify/Vercel/Cloudflare Pages), com domínio e HTTPS; adicionar `og:image`, `sitemap`/`robots` e, se desejado, analytics com consentimento.
