# DESIGN — "Presença e Acolhimento"

## Direção visual
Entrar em um consultório tranquilo, claro e organizado. Estética editorial, natural e contemporânea: fundo claro e quente, muito espaço em branco, serifa humanista, linhas finas, textura de papel muito discreta (pontilhado a 3,5% de opacidade), formas orgânicas com moderação (círculos suaves em sálvia e blush), composição levemente assimétrica, arco como moldura de retrato (referência a janela/porta). Sofisticado sem luxo; acolhedor sem ser infantil; profissional sem ser frio.

**Evitar:** aparência hospitalar, ícones médicos/cérebro, rosa genérico, excesso de elementos flutuantes, sorrisos de banco de imagens, frases motivacionais vazias, visual sombrio.

## Paleta (tokens em `src/index.css` e na coleção "Tokens" do Figma)
| Token | Hex | Uso |
|---|---|---|
| background | #F7F3EE | fundo principal |
| background-alt | #EEE8E0 | seções alternadas |
| surface | #FFFDF9 | cartões, formulário |
| surface-elevated | #FFFFFF | sobreposições |
| text-primary | #3E3935 | texto principal |
| text-secondary | #675F58 | texto de apoio (ajustado de #756D66 para AA em fundo alt) |
| text-muted | #756D66 | só textos grandes/decorativos (4,6:1 no fundo principal) |
| accent | #4F665A | botões, links (verde profundo) |
| accent-hover | #3D5247 | hover/pressed |
| sage / blue-gray / terracotta / highlight | #A8B5A2 / #9EAFB5 / #C98E76 / #D9B9A5 | **decorativos**, nunca para texto pequeno |
| terracotta-text | #8C4E37 | eyebrows e avisos (ajustado de #9A5B43 para AA em fundo alt) |
| border | #D9D0C6 | linhas finas |
| success / error | #3F6B4F / #A5412F | estados (sempre com ícone/texto) |
| focus-ring | #2F5E8E | anel de foco de 3 px |

**Contrastes medidos (WCAG):** texto/fundo 10,3:1 · secundário/fundo 5,7:1 · secundário/alt 5,1:1 · botão (claro sobre accent) 6,1:1 · terracotta-text/alt 5,3:1 · erro 6,1:1 · foco 6,1:1. Estados nunca dependem só de cor (ícone ⚠, texto, borda mais espessa).

## Tipografia
Títulos: **Fraunces** (serifa humanista, Light/Regular). Texto/UI: **DM Sans**. Sem caixa alta em blocos.

| Estilo | Fonte | Tamanho/linha |
|---|---|---|
| Display | Fraunces Light | 72/78 |
| H1 | Fraunces Light | 56/62 (mobile 36–40) |
| H2 | Fraunces | 40/48 (mobile 30) |
| H3 | Fraunces | 28/36 (cards 20–22) |
| Body large | DM Sans | 20/32 |
| Body | DM Sans | 17/28 |
| Small | DM Sans | 15/24 |
| Caption | DM Sans Medium | 14/20 |
| Button | DM Sans SemiBold | 16/24 |
| Label | DM Sans SemiBold | 14/20 |

## Espaçamento e forma
Escala 4·8·12·16·24·32·48·64·96·128. Raios 8/16/28/pílula. Conteúdo até 1280 px; gutters 20 px (mobile) / 40 px; seções com 80–112 px de respiro vertical. Fio de 1 px como separador.

## Componentes
Navbar (discreta, ganha borda/blur ao rolar, menu mobile), Logo tipográfico, Button (primário/secundário; Default, Hover, Pressed, Focus, Disabled; com/sem ícone), Text Link, Badge, Section Header, Profile/Service Card, Process Step, FAQ Item (aberto/fechado), WhatsApp CTA (flutuante compacto), Contact Form (padrão, carregando, sucesso, erro), Footer, Image Placeholder, Availability Status. Depoimentos **não** foram criados (exigem autorização).

## Fotografia
Luz natural, consultório claro, plantas, livros, madeira, tecidos, janelas, mãos, caderno; retrato com expressão natural. Sem imagens de banco, sofrimento explícito, cérebro, ambiente hospitalar ou fotos sem licença. Sem fotos reais, usar o placeholder identificado em arco ("SUBSTITUIR IMAGEM").

## Motion
Contemplativo: aparição suave (opacidade + 12 px, 0,7 s), hover de 250 ms nos botões, FAQ com altura animada (0,35 s), círculo orgânico com deriva lenta de 26 s (só ≥ md), navbar muda de estado no scroll. Sem bounce, parallax, confete ou movimento constante. `MotionConfig reducedMotion="user"` + `prefers-reduced-motion` no CSS. Só `transform`/`opacity`: sem layout shift.

## Responsividade
Testado em 360, 768, 1024 e 1440 px (sem overflow horizontal). Mobile: hero em coluna, CTAs em largura total, menu funcional, accordions com área de toque ≥ 56 px, campos ≥ 48 px, WhatsApp como botão circular compacto que some na seção de contato, decorações ocultas.

## Acessibilidade
HTML semântico, um `h1`, hierarquia h2/h3, link "Pular para o conteúdo", `aria-expanded`/`aria-controls` em menu e FAQ, `aria-label` em botões de ícone, labels em todos os campos, erros com `aria-invalid` + `aria-describedby` e foco no primeiro campo inválido, foco visível, foco movido ao primeiro link ao abrir o menu e devolvido ao botão no Esc.

## Regras de conteúdo
Sem promessa de resultado, diagnóstico, urgência, escassez, promoções, comparações ou depoimentos sem autorização. Linguagem: "pode fazer sentido buscar apoio quando…". Ver [CONTENT_REVIEW.md](CONTENT_REVIEW.md).
