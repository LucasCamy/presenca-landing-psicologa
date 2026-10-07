/**
 * ÚNICA FONTE DE CONTEÚDO DO SITE.
 *
 * ⚠ TODOS os dados abaixo são DEMONSTRATIVOS (placeholders). Nome, CRP, contatos,
 * textos e imagens precisam ser substituídos e revisados pela profissional antes
 * da publicação. Veja CONTENT_REVIEW.md.
 *
 * Itens entre [colchetes] são lacunas que a profissional deve preencher.
 * Quando `demoMode` for false, o aviso de dados demonstrativos some do site.
 */

export const demoMode = true

export const professional = {
  fullName: 'Helena Martins',
  title: 'Psicóloga',
  crp: 'CRP 00/00000',
  approach: 'Psicologia baseada em evidências',
  modality: 'Atendimento on-line',
  location: 'Campo Grande - MS e atendimento on-line',
  audience: 'Adultos e jovens adultos',
  instagramHandle: '@helena.psicologia',
  instagramUrl: 'https://www.instagram.com/helena.psicologia/',
  /** Somente dígitos, com DDI+DDD. Número demonstrativo. */
  whatsappNumber: '5567900000000',
  whatsappDisplay: '(67) 90000-0000',
  whatsappMessage: 'Olá, Helena! Gostaria de saber mais sobre o atendimento.',
  email: 'contato@helenamartins.com.br',
  preferredContactHours: 'segunda a sexta, das 9h às 18h',
} as const

export const whatsappUrl = `https://wa.me/${professional.whatsappNumber}?text=${encodeURIComponent(
  professional.whatsappMessage,
)}`

export const nav = {
  links: [
    { label: 'Sobre mim', href: '#sobre' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Atendimento', href: '#atendimento' },
    { label: 'Dúvidas', href: '#duvidas' },
    { label: 'Contato', href: '#contato' },
  ],
  cta: { label: 'Agendar conversa', href: '#contato' },
} as const

/** Imagens: `null` mostra um placeholder identificado. Coloque arquivos em /public/images. */
export interface SiteImage {
  src: string | null
  alt: string
  /** Legenda visível; remova quando usar fotografia real. */
  caption?: string
}

/**
 * ⚠ Ilustrações DEMONSTRATIVAS (SVG próprias, sem direitos de terceiros).
 * Substitua por fotografias reais da profissional/consultório, ou defina `src: null` para ver o placeholder.
 */
export const images: Record<'portraitHero' | 'portraitAbout' | 'office' | 'still', SiteImage> = {
  portraitHero: { src: '/images/retrato-hero.svg', alt: 'Ilustração de uma psicóloga em seu consultório, com luz natural entrando pela janela' },
  portraitAbout: { src: '/images/retrato-sobre.svg', alt: 'Ilustração de mãos sobre uma mesa de madeira, com caderno, xícara e folhas de uma planta' },
  office: { src: '/images/consultorio.svg', alt: 'Ilustração de um consultório claro, com poltrona, estante, planta e janela', caption: 'Ilustração demonstrativa do ambiente de atendimento.' },
  still: { src: '/images/detalhe.svg', alt: 'Ilustração de livros empilhados, uma xícara e um galho com folhas sob luz natural' },
}

export const hero = {
  eyebrow: `${professional.fullName} · ${professional.title} · ${professional.crp}`,
  headline: 'Um espaço para olhar para o que você está vivendo com mais cuidado.',
  intro: `Sou psicóloga e atendo ${professional.audience.toLowerCase()}, com uma prática baseada em evidências. Aqui você conhece meu trabalho e pode entrar em contato, no seu tempo.`,
  primaryCta: { label: 'Conheça meu trabalho', href: '#sobre' },
  secondaryCta: { label: 'Entrar em contato', href: '#contato' },
  chips: [professional.modality, professional.location],
} as const

export const welcome = {
  quote: 'Nem sempre é fácil explicar o que está acontecendo.',
  body: 'A terapia pode ser um espaço para construir essa compreensão com tempo, cuidado e respeito à sua história.',
} as const

export const about = {
  eyebrow: 'Sobre mim',
  title: 'Prazer, sou a Helena.',
  story: [
    'Sempre me interessei pela forma como as pessoas contam a própria história e pelo tempo que cada uma precisa para compreendê-la. Foi essa curiosidade, somada ao respeito por cada trajetória, que me aproximou da Psicologia.',
    'Entendo o cuidado como uma construção feita a dois: escuto com atenção, explico como o processo funciona e ajusto o caminho junto com você.',
    `Atendo ${professional.audience.toLowerCase()} de forma on-line, em um ritmo respeitoso e com clareza sobre cada etapa do processo.`,
  ],
  facts: [
    { label: 'Registro profissional', value: `${professional.title} · ${professional.crp}` },
    { label: 'Formação', value: 'Graduação em Psicologia (dado demonstrativo)' },
    { label: 'Abordagem', value: professional.approach },
    { label: 'Forma de trabalho', value: `${professional.modality} · individual` },
  ],
  link: { label: 'Conheça mais sobre meu trabalho', href: '#abordagem' },
} as const

export const audience = {
  eyebrow: 'Para quem é o atendimento',
  title: 'Pode fazer sentido buscar apoio quando…',
  intro: 'Pessoas que estão vivendo momentos como os abaixo costumam procurar acompanhamento. A avaliação é construída em conjunto durante o processo.',
  items: [
    { title: 'Mudanças importantes na vida', text: 'Novas fases que pedem tempo para serem compreendidas.' },
    { title: 'Dificuldades nos relacionamentos', text: 'Padrões que se repetem com familiares, amigos ou parceiros.' },
    { title: 'Sensação de sobrecarga', text: 'Quando o dia a dia pesa e falta espaço para respirar.' },
    { title: 'Preocupação persistente', text: 'Pensamentos que não se acalmam com facilidade.' },
    { title: 'Autoconhecimento', text: 'Vontade de entender melhor escolhas, valores e a forma de se relacionar.' },
    { title: 'Luto e transições', text: 'Perdas e despedidas que pedem escuta e respeito ao seu ritmo.' },
    { title: 'Dificuldade em estabelecer limites', text: 'Dizer não ou pedir espaço pode ser difícil.' },
    { title: 'Uma relação mais cuidadosa consigo', text: 'Construir uma forma mais gentil de lidar com as próprias exigências.' },
  ],
} as const

export const process = {
  eyebrow: 'Como funciona',
  title: 'Um começo sem pressa',
  intro: 'Quatro passos simples. Não há fórmula nem prazo fixo: cada processo é individual.',
  steps: [
    { title: 'Primeiro contato', text: 'Você pode enviar uma mensagem para verificar horários e tirar dúvidas iniciais.' },
    { title: 'Conversa inicial', text: 'Na conversa inicial, falamos sobre o que trouxe você até aqui e avaliamos se o formato faz sentido.' },
    { title: 'Construção do processo', text: 'Caso exista alinhamento, combinamos frequência, formato e próximos passos.' },
    { title: 'Acompanhamento contínuo', text: 'O processo é acompanhado de forma individual, respeitando seu momento e seus objetivos.' },
  ],
} as const

export const modality = {
  eyebrow: 'Atendimento',
  title: 'Como e onde acontece',
  notice: 'As informações de atendimento devem ser ajustadas pela profissional antes da publicação.',
  cards: [
    { title: 'Atendimento on-line', text: 'Sessões por videochamada, de onde você estiver. Plataforma de videochamada combinada antes da primeira sessão.' },
    { title: 'Presencial (se aplicável)', text: 'Campo Grande - MS. Consultório em região central, com endereço informado após o primeiro contato.' },
    { title: 'Horários', text: 'Segunda a sexta, entre 9h e 19h. Os horários são combinados individualmente.' },
    { title: 'Orientações para o on-line', text: 'Escolha um lugar reservado, com internet estável e fones de ouvido, se possível.' },
  ],
} as const

export const approach = {
  eyebrow: 'Abordagem',
  title: professional.approach,
  intro: 'Trabalho com uma prática que busca apoio em pesquisas e métodos reconhecidos da Psicologia, sempre adaptados à história e ao momento de cada pessoa. Procuro explicar o que estamos fazendo e por quê, sem termos técnicos desnecessários.',
  blocks: [
    { title: 'Como aparece no atendimento', text: 'Conversamos sobre o que importa para você e combinamos, passo a passo, como vamos trabalhar. Os encontros têm espaço para escuta, reflexão e, quando fizer sentido, estratégias práticas para o dia a dia.' },
    { title: 'O que esperar da relação terapêutica', text: 'Escuta, respeito e clareza sobre o processo, em uma relação construída em conjunto.' },
    { title: 'O que não é uma promessa', text: 'A terapia não garante resultados específicos nem prazos. É um processo construído com você, no seu ritmo.' },
  ],
} as const

export const principles = {
  eyebrow: 'Princípios',
  title: 'Princípios que orientam meu trabalho',
  intro: 'Exemplos editáveis. Descrevem uma postura de trabalho, não uma comparação com outros profissionais.',
  items: [
    { title: 'Escuta sem julgamentos', text: 'Um espaço para falar com liberdade.' },
    { title: 'Respeito ao ritmo', text: 'Cada pessoa tem o seu tempo.' },
    { title: 'Construção conjunta', text: 'Objetivos definidos em parceria.' },
    { title: 'Clareza sobre o processo', text: 'Combinados explicados com simplicidade.' },
    { title: 'Cuidado com a privacidade', text: 'Informações tratadas com responsabilidade.' },
    { title: 'Comunicação responsável', text: 'Sem promessas de resultado.' },
  ],
} as const

export const emergencyNotice =
  'Este site não substitui atendimento de emergência. Em uma situação de risco imediato, procure os serviços de emergência da sua região ou um serviço de saúde adequado.'

export const faq = {
  eyebrow: 'Dúvidas',
  title: 'Perguntas frequentes',
  intro: 'Respostas editáveis. A profissional deve revisar cada uma antes da publicação.',
  items: [
    { q: 'Como funciona o primeiro contato?', a: 'Você pode enviar uma mensagem pelo WhatsApp, e-mail ou formulário. Respondo para combinar uma conversa inicial, sem compromisso.' },
    { q: 'O atendimento é on-line ou presencial?', a: 'O atendimento é on-line, por videochamada. Em alguns casos, podemos conversar sobre a possibilidade de encontros presenciais em Campo Grande - MS.' },
    { q: 'Quanto dura uma sessão?', a: 'As sessões costumam durar cerca de 50 minutos. Combinamos a duração e a frequência juntas(os) na conversa inicial.' },
    { q: 'Como são definidos os horários?', a: 'Os horários são combinados individualmente, conforme a disponibilidade de cada pessoa e da agenda.' },
    { q: 'O que acontece na primeira conversa?', a: 'Conversamos sobre o que trouxe você até aqui, tiramos dúvidas e avaliamos juntas(os) se o formato faz sentido. Você não precisa chegar com tudo organizado.' },
    { q: 'Posso tirar dúvidas antes de agendar?', a: 'Sim. Você pode escrever a qualquer momento para perguntar sobre o atendimento.' },
    { q: 'Como funciona o cancelamento?', a: 'Pedimos aviso com pelo menos 24 horas de antecedência para remarcar ou cancelar. Os detalhes são combinados no início do acompanhamento.' },
    { q: 'O atendimento é sigiloso?', a: 'O sigilo é um princípio da prática profissional da Psicologia.' },
    { q: 'Como funciona o pagamento?', a: 'Os valores, as formas de pagamento e a periodicidade são informados na conversa inicial, de forma transparente, antes de qualquer compromisso.' },
    { q: 'O que fazer em uma situação de emergência?', a: emergencyNotice },
  ],
} as const

export const contact = {
  eyebrow: 'Contato',
  title: 'Vamos conversar, no seu tempo.',
  intro: 'Escolha o canal que for mais confortável para você.',
  whatsappLabel: 'Conversar pelo WhatsApp',
  sensitiveNotice:
    'Por segurança, evite enviar informações sensíveis ou detalhes clínicos neste formulário. Esses assuntos podem ser conversados em um canal apropriado.',
  contactPreferences: ['WhatsApp', 'E-mail'],
  /**
   * ⚠ O envio do formulário é SIMULADO. Para publicar, conecte um serviço real
   * em src/lib/submitContact.ts (veja PRIVACY.md).
   */
  success: 'Mensagem recebida (simulação). Neste modelo o envio é apenas visual.',
} as const

export const finalCta = {
  title: 'Se você está pensando em começar, o primeiro passo pode ser uma conversa.',
  text: 'Respeite o seu próprio tempo. Não há pressa.',
  primary: { label: 'Entrar em contato', href: '#contato' },
  secondary: { label: 'Conhecer o atendimento', href: '#atendimento' },
} as const

export const footer = {
  links: [
    ...nav.links,
    { label: 'Política de privacidade', href: '#/privacidade' },
  ],
  copyright: `© ${new Date().getFullYear()} ${professional.fullName}. Todos os direitos reservados.`,
  demoNotice: 'Dados demonstrativos — substituir antes da publicação.',
} as const

export const privacy = {
  title: 'Política de privacidade',
  reviewNotice:
    'Texto-modelo editável. Deve ser revisado pela profissional (e por assessoria jurídica) antes da publicação.',
  sections: [
    { title: 'Quais dados são coletados', text: 'O formulário de contato coleta apenas nome, e-mail, preferência de canal e uma mensagem curta. Não pedimos informações clínicas, diagnósticos ou histórico de saúde.' },
    { title: 'Para que usamos', text: 'Os dados são usados somente para responder ao seu contato e combinar uma conversa inicial.' },
    { title: 'Consentimento', text: 'O envio do formulário depende do seu consentimento explícito, marcado antes do envio.' },
    { title: 'Retenção', text: 'Mensagens de contato que não resultarem em atendimento são excluídas em até 90 dias (prazo demonstrativo, a ser confirmado pela profissional).' },
    { title: 'Cookies e analytics', text: 'Este modelo não usa cookies de rastreamento nem ferramentas de análise. [Atualizar se forem adicionados.]' },
    { title: 'Seus direitos', text: 'Você pode pedir acesso, correção ou exclusão dos seus dados pelo e-mail de contato.' },
    { title: 'Canais seguros', text: 'Evite enviar informações sensíveis por formulário, e-mail ou redes sociais. Detalhes clínicos devem ser tratados em canal apropriado combinado com a profissional.' },
    { title: 'Emergências', text: emergencyNotice },
  ],
} as const
