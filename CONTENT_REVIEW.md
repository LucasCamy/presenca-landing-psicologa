# CONTENT_REVIEW: revisão da profissional

> Este site é uma **minuta para revisão**. Antes de publicar, a profissional deve validar o conteúdo **ética e juridicamente** (Código de Ética Profissional do Psicólogo, resoluções do CFP/CRP sobre publicidade e atendimento on-line, LGPD). Esta lista não substitui orientação do CRP ou de advogado.

## Origem dos dados
Retirados do material de divulgação fornecido (story do Instagram):
- Nome: **Elainy Karoliny R M Genova**
- Título: **Psicóloga clínica**
- Telefone: **(67) 99962-2351**
- E-mail: **psielainykaroliny@gmail.com**
- Instagram: **@psielainykaroliny**
- Modalidade: **Atendimento online**

Nada além disso foi informado, e **nada além disso foi inventado**.

## Bloqueios de publicação (`publishBlockers` em `src/content/site.ts`)
- [ ] **Número do CRP** (obrigatório na publicidade profissional). Hoje aparece "CRP pendente".
- [ ] Confirmar que **(67) 99962-2351 atende no WhatsApp** (o material mostra ícone de telefone; o botão do site abre o WhatsApp).
- [ ] **Fotografia real** com autorização de uso de imagem (as 4 imagens atuais são ilustrações próprias e **não** retratam a profissional).
- [ ] Revisão e aprovação de **todos os textos**.
- [ ] Serviço real para o formulário e revisão da **política de privacidade**.

Quando todos forem resolvidos: esvaziar `publishBlockers` e mudar `demoMode` para `false`.

## Pendências visíveis no site
- "Formação e abordagem: A informar (pendente)" em Sobre mim.
- "Abordagem teórica: a informar pela profissional (pendente)" em Como eu trabalho.
- Política de privacidade: data de atualização e prazo de retenção.

## Textos escritos para revisão (não são fatos sobre a profissional)
- Apresentação em primeira pessoa ("Sobre mim"): genérica, sem formação, especialidade ou trajetória.
- FAQ: as respostas **não fixam** duração, valores, cancelamento ou prazos; dizem que são combinados no início do atendimento. Se a profissional quiser publicar números, eles entram aqui.
- "Pode fazer sentido buscar apoio quando…": situações de vida, sem diagnóstico.

## Frases proibidas ou de risco (cobertas por `tests/content.test.ts`)
"a melhor", "mais procurada", "resultado garantido", "cura/curo", "livre-se", "resolva seus traumas", "garanta sua transformação", "você tem ansiedade/depressão", "últimas vagas", "agende agora", "perca sua vaga", "não espere piorar", "sua mudança começa hoje", promoções, descontos, antes e depois, travessão longo em texto visível.

## Dependem de autorização ou comprovação
- Depoimentos: **não incluídos**.
- Especialidades, técnicas, certificações: só se comprovadas e informadas.
- Imagem da profissional: só com autorização registrada **fora do repositório público**.

## Checklist final
- [ ] Nenhuma promessa de resultado, prazo ou garantia
- [ ] Nenhum diagnóstico ou linguagem que sugira condição clínica ao visitante
- [ ] CRP real e visível no topo, no Sobre mim e no rodapé
- [ ] Aviso de emergência presente (FAQ, rodapé e privacidade); telefones locais só se confirmados
- [ ] Formulário sem dados clínicos, com aviso de dados sensíveis; envio real testado
- [ ] Tom acolhedor, sem urgência
- [ ] Aprovação ética/jurídica registrada
