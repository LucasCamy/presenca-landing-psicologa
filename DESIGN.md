# DESIGN: Presença · Elainy Karoliny

## Missão visual
Traduzir o material de divulgação da profissional (fundo branco, nome em caixa alta cobre, selo "Psicóloga clínica" em pêssego, lótus em traço fino, pílula preta com o @ em manuscrito) em um site calmo, claro e acolhedor. Sensação de consultório iluminado: muito respiro, linhas finas, poucas cores.

**Personalidade:** acolhedora e direta. **Público:** pessoas que procuram acompanhamento psicológico on-line. **Princípios:** clareza antes de efeito; um único acento; nada que pressione ou prometa.

## Paleta (tokens em `src/styles/tokens.css`)
| Token | Hex | Uso |
|---|---|---|
| background | #FFFCFA | fundo principal (branco quente, como no material) |
| background-alt | #FBF1EA | seções alternadas |
| surface | #FFFFFF | cartões, formulário |
| tint | #FCEBDD | selo "Psicóloga clínica", painel de princípios, CTA final (cor do selo original) |
| text-primary | #2E2622 | texto principal |
| text-secondary | #6B5A50 | texto de apoio |
| text-muted | #7C6A60 | placeholders |
| **accent** | **#9A5B3A** | **acento único**: botões, links, wordmark, eyebrows |
| accent-hover | #7F4A2E | hover/pressed |
| display | #B27350 | citação grande (só ≥ 24 px) |
| peach | #C9906A | **decorativo**: ícones, lótus (cor do nome no material) |
| peach-soft | #F3D3BE | **decorativo**: lótus grande de fundo |
| line | #EEDCCF | fios e bordas |
| ink | #1F1A17 | pílula do Instagram, rodapé, faixa de aviso |
| success / error | #3F6B4F / #A23B2A | estados, sempre com texto e ícone |
| focus-ring | #2F5E8E | anel de foco 3 px |

**Por que os tons da imagem não são usados como texto:** o cobre do nome (#C9906A) tem 2,73:1 sobre branco e o dos contatos (#D4A07E) 2,30:1, abaixo de AA. Eles ficam como cor de forma/ícone; o texto usa versões mais escuras da mesma família.

**Contraste calculado (WCAG):**
| Par | Razão |
|---|---|
| text-primary / background | 14,51 |
| text-secondary / background · alt · tint | 6,42 · 5,89 · 5,64 |
| accent / background · alt · tint | 5,23 · 4,80 · 4,60 |
| branco / accent (botão) · accent-hover | 5,34 · 7,19 |
| display / background · alt (texto grande) | 3,76 · 3,46 |
| background / ink (pílula) | 16,87 |
| tint / ink (rodapé) | 12,75 |
| error · success · focus / background | 6,43 · 6,00 · 6,60 |

## Tipografia
- **Montserrat** (display): títulos em peso Light/Regular, sentence case; **wordmark em caixa alta** SemiBold com tracking 0,06em, como o nome no material. Acentos (é, ã, ç, õ) conferidos no navegador.
- **DM Sans** (texto, UI).
- **Dancing Script**: só na pílula do Instagram (detalhe decorativo, nunca conteúdo essencial).

Escala: h1 `clamp(2rem, 4,2vw, 3,5rem)` (máx. 3 linhas de 375 a 1920 px) · h2 `clamp(1,75rem, 3,6vw, 2,5rem)` · h3 18–20 px Medium · corpo 17 px/1,65 · small 15 px · caption 14 px.

## Espaçamento, raios e sombras
Escala Tailwind (4 px). Seções com 80–112 px verticais; gutters 20/40 px; conteúdo até 1280 px.
Raios: badge 6 · campo 12 · painel 20 · moldura 28 · botões e pílulas 999. Sombra única `--shadow-soft`, tingida de cobre.

## Elemento-assinatura: a lótus
SVG de traço fino (`src/components/Lotus.tsx`), extraído do material da profissional. Aparece grande e cortada atrás do retrato no hero e no bloco de acolhimento (como no story), pequena como marcador na lista "Pode fazer sentido…" e na citação, e média no CTA final. Desenha o traço uma vez (`pathLength`) ao entrar na tela. Com movimento reduzido, aparece pronta. É decorativa (`aria-hidden`).

## Layout por seção (sem repetir família)
Hero split com lótus · acolhimento centralizado · Sobre mim split com fatos em `dl` · Público em lista editorial de duas colunas com título fixo · Como funciona em linha do tempo · Atendimento em split imagem + lista com ícones · Como eu trabalho em texto + blocos com fios · Princípios em painel pêssego · FAQ em acordeão · Contato com canais + formulário · CTA final em pêssego.

## Motion
Peso da skill design-motion-principles para landing page: **Jakub** (polimento sutil, primário) · **Jhey** (lótus e entrada da foto) · **Emil** (menu, formulário, teclado). Tokens em `src/styles/tokens.css` e `src/lib/motion.ts`: `ease.out` (.22, 1, .36, 1), `ease.inOut` (.65, 0, .35, 1), molas sem overshoot (`bounce: 0`), durações 120/180/280/560/900 ms.

| Momento | O que comunica | Como |
|---|---|---|
| Rolagem da página | Calma, continuidade | Lenis (`lerp: 0.1`) só com movimento permitido; toque continua nativo |
| Clique num item do menu | Para onde você vai | Desliza até a seção em 0,6 a 1,4 s (proporcional à distância, `easeInOutCubic`), para **exatamente** sob o menu fixo, atualiza a URL e move o foco para a seção; pode ser interrompido pela roda ou pelo toque |
| Indicador do menu | Onde você está | Fio cobre desliza entre os links (`layoutId`); trava no destino durante o deslocamento |
| Menu mobile | Abrir/fechar | Painel com opacidade + 8 px + blur (mola 0,4 s), links em sequência (35 ms); saída 160 ms só com opacidade; véu escuro; ícone ☰↔✕ com troca por blur |
| Hero | Primeira impressão (rara) | Headline por máscara palavra a palavra; foto com cortina de baixo para cima (`clip-path`, 1,1 s) e assentamento 1,06→1 |
| Hero ao rolar | Profundidade | **Ligado ao scroll:** lótus sobe 140 px e gira 14°, foto desce 70 px (com a legenda); o texto fica parado e legível |
| Lótus | Assinatura | Desenho do traço uma vez; **desabrocha com o scroll** (pétalas laterais de ±16°/±34° até 0°) no acolhimento e no fechamento |
| Frase do acolhimento | Ritmo de leitura | **Ligado ao scroll:** cada palavra vai de 22% a 100% de opacidade conforme a frase sobe |
| Seções | Entrar em foco | Opacidade + 10 px + blur 4 px → nítido (mola 0,7 s), uma vez; `filter` volta a `none` ao terminar |
| Fotos (Sobre mim, Atendimento, Como eu trabalho) | Abrir o ambiente | Cortina ao entrar (1,1 s; o consultório abre da esquerda); **ligado ao scroll:** a imagem se aproxima de 1,08 para 1 e desliza ±4% |
| Como funciona | Sequência | **Ligado ao scroll:** a linha avança com a rolagem e cada etapa acende quando é alcançada (círculo se preenche, texto de 40% para 100%) |
| Princípios | Chegada | **Ligado ao scroll:** o painel emerge de 94% para 100% e sobe 48 px |
| Barra de leitura | Quanto falta | Fio pêssego de 2 px sob o menu, proporcional à rolagem (continua com movimento reduzido: é orientação) |
| FAQ | Abrir/fechar | Altura + opacidade (0,38 s na entrada, 0,26 s na saída); "+" vira "−" por transição CSS interrompível |
| Troca de página (privacidade) | Mudança de lugar | Saída 150 ms; entrada 380 ms com blur, sem deslocamento |
| Botões | Resposta ao toque | `scale(0.98)` ao pressionar (120 ms) |
| WhatsApp flutuante | Aparecer/sumir | Entrada 320 ms; saída 180 ms e menor |

**Deliberadamente sem animação:** qualquer ação iniciada pelo teclado (Enter em link, FAQ, menu), o skip link e loops (não há pulsos nem movimento contínuo).

**Movimento reduzido:** sem Lenis (rolagem nativa, âncoras saltam), sem deslocamentos, sem cortina, sem desenho da lótus e **sem nenhum efeito ligado ao scroll** (frase inteira, linha do tempo completa, lótus aberta; `useMotionAllowed` em cada componente, porque valores do `useTransform` não são desligados pelo `MotionConfig`); `MotionConfig reducedMotion="user"` + `useReducedMotionConfig` + regra CSS. Para demonstrar numa máquina com "reduzir movimento" ligado, use `?movimento=1`.

**Validação:** `npm run check:motion` (Playwright + Edge) roda desktop e celular com as duas preferências: 62 verificações (deslize ou salto, posição sob o menu, foco, URL, indicador, teclado, menu, volta da privacidade, frase, linha do tempo, lótus, overflow, console).

## Estados
Botões: default, hover, active, focus (anel azul), disabled. Campos: hover, focus, inválido (borda 2 px + ícone + texto com `role="alert"`). Formulário: carregando (mesma largura, desabilitado), sucesso (foco movido para a mensagem), erro de envio (`role="alert"`). Pendências: itálico em cor secundária com "(pendente)".

## Responsividade
Conferido em 375, 390, 768, 1024, 1280, 1440 e 1920 px sem overflow. A timeline vira vertical no celular. O menu mobile prende o foco, trava o scroll e fecha com Esc. O botão do WhatsApp some no hero, no contato e no rodapé.

## Acessibilidade
Um `h1`, skip link, foco visível global, `aria-expanded/controls` no menu e no FAQ, labels em todos os campos, alvos ≥ 44 px (exceto link dentro de frase), sem dependência só de cor.

## Do / Don't
- ✅ Um acento cobre; pêssego só decorativo; lótus como assinatura.
- ✅ Pendências visíveis em vez de dados inventados.
- ❌ Travessão longo em texto visível; promessas, urgência, diagnóstico; eyebrow em toda seção (há 3 em 11 seções).
- ❌ Ícones médicos, cérebro, imagens de banco.
