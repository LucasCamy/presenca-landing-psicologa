# CONTENT_REVIEW — revisão da profissional

> **Este material é um modelo.** Antes de publicar, a profissional deve validar o conteúdo **ética e juridicamente**, conforme o Código de Ética Profissional do Psicólogo, as resoluções do CFP/CRP sobre publicidade e serviços on-line, e a LGPD. Esta lista não substitui orientação do CRP ou de assessoria jurídica.

## Campos obrigatórios (sempre visíveis)
Nome completo · título "Psicóloga" · número de CRP real (visível no topo, hero e rodapé) · modalidade (on-line/presencial) · contato profissional.

> **Versão de demonstração:** os campos antes marcados com `[colchetes]` foram preenchidos com **textos fictícios de exemplo** (história pessoal, formação "Graduação em Psicologia (dado demonstrativo)", abordagem genérica, duração de 50 min, cancelamento com 24 h, retenção de 90 dias, horários de seg. a sex.). **Nenhum deles é fato verificado**: todos precisam ser reescritos ou confirmados pela profissional. As imagens são ilustrações demonstrativas.

## Dados a confirmar/substituir (`src/content/site.ts`)
- [ ] Nome, CRP (`CRP 00/00000` é fictício), localização
- [ ] WhatsApp, e-mail, Instagram (todos demonstrativos)
- [ ] Formação e abordagem (nada foi inventado: aparecem como `[a informar]`)
- [ ] Texto "Sobre mim" em primeira pessoa
- [ ] Seção Abordagem: nome, explicação em linguagem simples, como aparece no atendimento
- [ ] Plataforma on-line, endereço (se houver presencial), horários
- [ ] FAQ: duração da sessão, horários, cancelamento, pagamento, sigilo
- [ ] Horário preferencial de contato
- [ ] Substituir as 4 ilustrações demonstrativas por fotos reais (texto alternativo e direitos de imagem)
- [ ] Política de privacidade (retenção, provedor do formulário, responsável)
- [ ] `demoMode = false` ao publicar

## Frases proibidas ou de risco (cobertas por `tests/content.test.ts`)
"a melhor", "mais procurada", "resultado garantido", "cura/curo", "livre-se da ansiedade", "resolva seus traumas", "garanta sua transformação", "você tem ansiedade/depressão", "últimas vagas", "agende agora", "perca sua vaga", "não espere piorar", "sua mudança começa hoje", promoções/descontos, antes e depois, contadores, escassez, comparações com outros profissionais, preço como argumento.

## Dependem de autorização ou comprovação
- Depoimentos de pacientes: **não incluídos**; só com autorização formal e conformidade com o CFP.
- Especialidades, técnicas e certificações: só as comprovadas e informadas pela profissional.
- Imagens de terceiros: somente com licença.

## Checklist final
- [ ] Nenhuma promessa de resultado, prazo ou garantia
- [ ] Nenhum diagnóstico ou linguagem que sugira condição clínica ao visitante
- [ ] CRP real e visível; sem dados fictícios
- [ ] Aviso de emergência presente (FAQ, rodapé e privacidade); **inserir serviços locais só se confirmados**
- [ ] Formulário sem dados clínicos; aviso de dados sensíveis presente; consentimento funcionando
- [ ] Canal de envio real configurado e testado
- [ ] Tom acolhedor, sem urgência
- [ ] Aprovação ética/jurídica registrada
