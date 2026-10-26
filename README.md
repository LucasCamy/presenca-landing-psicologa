# Presença: landing page de Elainy Karoliny R M Genova, psicóloga clínica

Perfil profissional on-line, com identidade baseada no material de divulgação da profissional: branco quente, cobre e pêssego, nome em caixa alta, lótus em traço fino e o @ do Instagram em manuscrito.

> ⚠ **Versão para apresentação.** Antes de publicar, resolva os itens de `publishBlockers` em `src/content/site.ts`: **CRP**, confirmação do WhatsApp, foto real, aprovação dos textos e formulário real. Veja [CONTENT_REVIEW.md](CONTENT_REVIEW.md). Nenhum dado além dos informados (nome, título, telefone, e-mail, Instagram, atendimento on-line) foi inventado.

## Stack
Vite · React 19 · TypeScript strict · Tailwind CSS v4 · Motion · Lucide · fontes self-hosted (Montserrat, DM Sans, Dancing Script).

## Executar
```bash
npm install
npm run dev
```
Também existem `npm run build`, `npm run typecheck`, `npm run lint` e `npm test`.

Com o dev server rodando, `npm run check:motion` confere scroll, âncoras e transições no Edge instalado (desktop e celular, com e sem "reduzir movimento"). Para ver as animações numa máquina com "reduzir movimento" ligado, abra `http://localhost:5173/?movimento=1`.

## Editar conteúdo
- **Tudo** em `src/content/site.ts`: dados, textos, FAQ, imagens, pendências.
- CRP: troque `crp: 'CRP pendente'` por `'CRP 14/00000'` (formato real) e remova "Número do CRP" de `publishBlockers`.
- Imagens: substitua os SVGs em `public/images/` por fotos (com autorização de uso de imagem) e ajuste `alt` e `caption` em `images`.
- Cores e fontes: `src/styles/tokens.css`.
- Formulário: o envio é **simulado**. Conecte um serviço real em `src/lib/submitContact.ts` e atualize [PRIVACY.md](PRIVACY.md).
- Para tirar a faixa de aviso: esvazie `publishBlockers` e mude `demoMode` para `false` (o teste impede desligar com pendências).

## Deploy no Cloudlane Homelab (k3s + Keel)
Segue o [homelab-docs](https://github.com/LucasCamy/homelab-docs) (`agent.md` e guia 06), no mesmo padrão da `vidracaria-landing`.

| Item | Valor |
|---|---|
| Imagem | `ghcr.io/lucascamy/presenca-landing-psicologa:latest` (+ `sha-<curto>`), `linux/amd64` |
| Container | Nginx unprivileged, usuário 101, porta 8080, raiz somente leitura, `/healthz` |
| Kubernetes | Deployment + Service `presenca-psicologa` no namespace `landingpages` |
| Porta LoadBalancer | **8212** em `192.168.15.19` (próxima livre do catálogo) |
| CI | `.github/workflows/deploy.yml`: lint, testes e build; depois publica no GHCR |

**Primeira vez:**
1. `git push` na `main` → o GitHub Actions publica a imagem.
2. No GitHub: **Packages** → `presenca-landing-psicologa` → **Package settings** → visibilidade **Public** (para o Keel puxar sem credencial).
3. No nó k3s (`ssh` na VM 200, com o repositório clonado):
   ```bash
   kubectl apply --dry-run=server -f k8s/
   kubectl apply -f k8s/
   kubectl -n landingpages rollout status deploy/presenca-psicologa
   curl -fsS http://192.168.15.19:8212/healthz
   ```
4. Cloudflare Zero Trust → **Cloudlane Tunnel** → **Public Hostname**: subdomínio escolhido (ex.: `psicologa.cloudlane.com.br`) → `HTTP` → `192.168.15.19:8212`.
5. Uptime Kuma: monitor HTTP(s) em `https://<subdomínio>/healthz`, intervalo 60 s.
6. Registrar a porta 8212 em `04_CATALOGO_DE_APLICACOES_K3S.md` do homelab-docs.

**Depois:** cada push na `main` que passar no lint/testes gera imagem nova, e o Keel faz o rollout em até 1 minuto, sem comando no servidor.

**Testar a imagem localmente:**
```bash
docker build --target production -t presenca-landing-psicologa:local .
docker run --rm -p 127.0.0.1:8212:8080 --read-only --tmpfs /tmp --cap-drop ALL presenca-landing-psicologa:local
```

## Documentação
[AGENTS.md](AGENTS.md) · [DESIGN.md](DESIGN.md) · [FIGMA_GUIDE.md](FIGMA_GUIDE.md) · [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) · [CONTENT_REVIEW.md](CONTENT_REVIEW.md) · [PRIVACY.md](PRIVACY.md)

Processo de trabalho baseado no [agent-project-kit](https://github.com/LucasCamy/agent-project-kit) (project-workflow, frontend-figma-playwright, prompt de landing page, conformidade legal).

Figma: https://www.figma.com/design/vloNwrcmD3NcEq32EWcpSG
