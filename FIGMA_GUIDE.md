# FIGMA_GUIDE

**Arquivo:** https://www.figma.com/design/vloNwrcmD3NcEq32EWcpSG ("Helena Martins — Landing Page (Presença e Acolhimento)"), criado via Figma MCP na conta lucascamy74@gmail.com, plano Starter.

## Estado real (honesto)
| Item | Estado |
|---|---|
| Arquivo criado e editável | ✅ |
| Variáveis (coleção **Tokens**: 19 cores, 10 espaçamentos, 4 raios) | ✅ |
| Estilos de texto (**Type/** Display, H1, H2, H3, Body large, Body, Small, Caption, Button, Label) | ✅ |
| Capa, Brand, Design System (paleta e tipografia) | ✅ |
| Componentes com Auto Layout ligados às variáveis | ✅ (lista abaixo) |
| Landing Desktop 1440 (13 seções, usando instâncias dos componentes) | ✅ |
| Landing Mobile 390 (clone do desktop reorganizado em coluna) | ⚠ criado, mas o **ajuste final de alturas não foi conferido visualmente** (limite de chamadas atingido) |
| Protótipo navegável (fluxos) | ❌ **não criado** |
| Content and Assets / Archive | ❌ não criados como páginas |
| Variante "Selected" e Testimonial | ❌ não criados (depoimento só com autorização) |

**Por quê:** (1) o plano **Starter permite só 3 páginas**, então as 9 páginas pedidas foram agrupadas em 3; (2) o Figma MCP atingiu o **limite de chamadas do plano Starter** durante a verificação do mobile. O código foi implementado a partir do design e das decisões documentadas em [DESIGN.md](DESIGN.md), **não** por leitura automática do arquivo via `get_design_context`.

## Estrutura de páginas (3)
1. **Foundations (Cover · Brand · Design System · Content)**: frames "Cover", "Brand", "Design System".
2. **Components**: biblioteca de componentes.
3. **Landing Page (Desktop · Mobile · Prototype)**: frames `Desktop — 1440` e `Mobile — 390`.

Ao migrar para um plano com mais páginas, separe: Cover, Brand, Design System, Components, Desktop, Mobile, Prototype, Content and Assets, Archive.

## Componentes (página Components)
Button (conjunto de variantes: Type Primary/Secondary × State Default/Hover/Pressed/Focus/Disabled × Icon Without/With icon = 20), Navbar (Device Desktop/Mobile), Mobile Menu, Logo, Text Link, Badge, Availability Status, Section Header, Image Placeholder, Service Card, Process Step, FAQ Item (State Closed/Open), Profile Card, WhatsApp CTA, Contact Form (State Default/Loading/Success/Error), Footer.

## Variáveis e Auto Layout
Cores `color/*`, espaçamento `space/*`, raios `radius/*`. Todos os componentes usam Auto Layout; preenchimentos e traços das cores estão ligados às variáveis. (Espaçamentos/raios ainda estão como valores fixos nos componentes; ligar às variáveis `space/*` e `radius/*` é um próximo passo.)

## Breakpoints
360 · 768 · 1024 · 1280 · 1440. Frames: Desktop 1440 e Mobile 390.

## Protótipo a criar (manualmente)
- Navbar → âncoras de cada seção (Smart Animate, ease-out 300 ms).
- Botões do hero → Sobre mim / Contato.
- Menu mobile: ícone → Mobile Menu (overlay) → âncora.
- FAQ Item Closed ↔ Open (On click, Smart Animate).
- Contact Form Default → Loading → Success (After delay) e Default → Error.

## Como editar informações profissionais
Nome, CRP e contatos aparecem em Navbar, Logo, Profile Card, Footer e nas seções de Contato. Edite o texto no componente principal (propagam às instâncias) e depois no `src/content/site.ts`. Textos entre `[colchetes]` são lacunas a preencher.

## Como substituir imagens
Selecione o "Image Placeholder" → Fill → Image → envie a foto (luz natural, ver DESIGN.md). Exporte (2x, JPG/WebP) para `public/images/` e atualize `images` em `site.ts`.

## Como compartilhar
Share (canto superior direito) → adicione o e-mail da profissional como "can view" (ou "can edit") → copie o link. Na conta Starter, use link "Anyone with the link can view".
