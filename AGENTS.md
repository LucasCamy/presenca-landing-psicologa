# AGENTS.md

## Propósito e stack
Landing page de perfil profissional para uma psicóloga clínica (pt-BR). Projeto "Presença".
Stack: Vite 8 + React 19 + TypeScript (strict) + Tailwind CSS v4 (`@tailwindcss/vite`) + Motion (`motion/react`) + Lenis (scroll suave) + Lucide React + fontes self-hosted (Fontsource: Montserrat, DM Sans, Dancing Script). Sem backend.

## Organização
- `src/content/site.ts`: **fonte única** de dados, textos, links, imagens e horários. Componentes não têm texto fixo de conteúdo.
- `src/styles/tokens.css`: tokens (CSS variables) expostos ao Tailwind via `@theme inline`. Não use hex solto em componentes.
- `src/styles/globals.css`: base, utilitários (`.btn`, `.field`), keyframes, reduced motion.
- `src/components/`: uma seção por arquivo; `Lotus.tsx` é o elemento-assinatura (desenha e desabrocha); `ScrollWords.tsx` e `ScrollImage.tsx` são os efeitos ligados ao scroll.
- `src/lib/`: `submitContact.ts` (envio **simulado**), `useMotionAllowed.ts`, `motion.ts` (tokens e preferência de movimento), `smoothScroll.ts` (Lenis + navegação por âncora), `useActiveSection.ts`, `useScrolled.ts`.
- `scripts/motion-check.mjs`: conferência de motion e navegação nas duas preferências de movimento.
- `public/images/`: ilustrações SVG próprias (não são retratos reais).
- `tests/content.test.ts`: guarda de conteúdo (frases proibidas, CRP, avisos).

## Comandos (executados neste ambiente)
`npm run dev` · `npm run build` · `npm run typecheck` · `npm run lint` · `npm test` · `npm run check:motion` (Playwright com o Edge instalado; exige o dev server rodando)

## Convenções
- Uma única cor de acento (cobre). Pêssego e areia são decorativos: nunca para texto pequeno.
- Contraste AA calculado para cada texto em cada superfície (ver DESIGN.md).
- Copy: sem travessão longo em texto visível; sem promessa de resultado, diagnóstico, urgência ou comparação; eyebrow em no máximo 1 a cada 3 seções.
- Motion: só `transform`/`opacity`/`filter`/`clip-path`/`pathLength`; `MotionConfig reducedMotion="user"` e `useReducedMotionConfig` (respeita `?movimento=1`); sem `window.addEventListener('scroll')` (use `useScroll` ou IntersectionObserver); ação iniciada pelo teclado não anima.
- Efeitos ligados ao scroll (`useScroll` + `useTransform`) precisam checar `useMotionAllowed()` e mostrar o estado final estático com movimento reduzido.
- CSS próprio sempre dentro de `@layer base` ou `@layer components`: CSS fora de camada vence os utilitários do Tailwind v4.
- Links `#secao` passam por `bindAnchorNavigation` (não use `scroll-behavior: smooth`); diálogos novos devem chamar `stopScroll()`/`startScroll()`.
- Alvos de toque ≥ 44 px; um único `h1`; skip link; foco visível.

## Validação
Para UI: estruturar no Figma antes do código (arquivo abaixo) e conferir no navegador em 375, 390, 768, 1024, 1280, 1440 px, com teclado, estados do formulário e reduced motion. `typecheck`, `lint`, `test` e `build` precisam passar.

## Deploy
- Destino: Cloudlane Homelab (k3s na VM 200), regras em https://github.com/LucasCamy/homelab-docs (`agent.md`).
- `Dockerfile` (Node build → Nginx unprivileged, usuário 101, porta 8080, `/healthz`), `docker/nginx.conf` + `docker/security-headers.conf` (CSP e cabeçalhos repetidos em cada `location`).
- `.github/workflows/deploy.yml`: lint, testes e build antes de publicar `ghcr.io/lucascamy/presenca-landing-psicologa:latest`.
- `k8s/`: Deployment `presenca-psicologa` (Keel, `imagePullPolicy: Always`, raiz somente leitura, `/tmp` em memória) e Service LoadBalancer na porta **8212** (namespace `landingpages`).
- Nova dependência externa (CDN, analytics, embed) exige ajustar a CSP em `docker/security-headers.conf`.

## Figma
https://www.figma.com/design/vloNwrcmD3NcEq32EWcpSG (plano Starter: 3 páginas e cota baixa de chamadas MCP). Estado em `FIGMA_GUIDE.md`.

## Segurança, dados e publicação
- Não inventar dados da profissional (CRP, formação, abordagem, valores, prazos). Campo ausente fica **pendente visível** e bloqueia a publicação (ver CONTENT_REVIEW.md).
- O formulário não pede dados clínicos e o envio é simulado; antes de publicar, conectar serviço real via HTTPS e atualizar PRIVACY.md.
- Nada de rastreadores ou CDNs de terceiros sem atualizar a política.
- Publicar, fazer deploy ou push só com pedido explícito.

## Documentação e decisões
Mantenha a documentação alinhada ao comportamento implementado e identifique propostas como propostas. README para execução; DESIGN.md para o sistema visual; CONTENT_REVIEW.md e PRIVACY.md para conteúdo e dados (minutas para revisão profissional/jurídica). Registre decisões duráveis em `docs/adr/NNNN-titulo-curto.md` quando surgirem; não crie ADR para alterações triviais. Use caminhos e comandos reais e diga se foram executados.
