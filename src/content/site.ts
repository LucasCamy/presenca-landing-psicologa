/**
 * ÚNICA FONTE DE CONTEÚDO DO SITE.
 *
 * Dados da profissional retirados do material de divulgação fornecido (story do Instagram):
 * nome, título, telefone, e-mail, Instagram e modalidade.
 *
 * ⚠ Nada além disso foi informado. CRP, formação, abordagem, valores, duração e regras de
 * cancelamento NÃO foram inventados: ficam como pendência visível (`pending`) ou como texto que
 * apenas diz que o assunto é combinado com a profissional. Enquanto houver itens em
 * `publishBlockers`, o site não deve ser publicado (veja CONTENT_REVIEW.md).
 */

/** Exibe a faixa de "versão para apresentação". Desligue só quando `publishBlockers` estiver vazio. */
export const demoMode = true

/** Marcador de pendência visível. Mantém o site legível e deixa claro o que falta. */
export const pending = (label: string) => `${label} (pendente)`

export const professional = {
  fullName: 'Elainy Karoliny R M Genova',
  shortName: 'Elainy Karoliny',
  firstName: 'Elainy',
  title: 'Psicóloga clínica',
  /** ⚠ Obrigatório pelas regras de publicidade profissional. Informe no formato "CRP 14/00000". */
  crp: 'CRP pendente',
  modality: 'Atendimento on-line',
  phoneDisplay: '(67) 99962-2351',
  /** Somente dígitos, com DDI+DDD. ⚠ Confirmar se este número também é WhatsApp. */
  whatsappNumber: '5567999622351',
  whatsappMessage: 'Olá, Elainy! Gostaria de saber mais sobre o atendimento.',
  email: 'psielainykaroliny@gmail.com',
  instagramHandle: '@psielainykaroliny',
  instagramUrl: 'https://www.instagram.com/psielainykaroliny/',
} as const

/** Itens que impedem a publicação. Esvazie esta lista à medida que a profissional confirmar. */
export const publishBlockers = [
  'Número do CRP',
  'Confirmação de que o telefone (67) 99962-2351 atende pelo WhatsApp',
  'Fotografia real da profissional (as imagens atuais são ilustrações)',
  'Revisão e aprovação de todos os textos pela profissional',
  'Serviço real para o formulário de contato e revisão da política de privacidade',
] as const

export const whatsappUrl = `https://wa.me/${professional.whatsappNumber}?text=${encodeURIComponent(professional.whatsappMessage)}`
export const phoneUrl = `tel:+${professional.whatsappNumber}`

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

export interface SiteImage {
  src: string | null
  alt: string
  caption?: string
}

/**
 * Ilustrações SVG próprias (sem direitos de terceiros). NÃO são retratos da profissional.
 * Troque por fotografias reais com autorização de uso de imagem. `src: null` mostra placeholder.
 */
export const images: Record<'portraitHero' | 'portraitAbout' | 'office' | 'still', SiteImage> = {
  portraitHero: {
    src: '/images/retrato-hero.svg',
    alt: 'Ilustração de uma psicóloga em um consultório iluminado por luz natural',
    caption: 'Ilustração. A fotografia da profissional entra aqui.',
  },
  portraitAbout: { src: '/images/retrato-sobre.svg', alt: 'Ilustração de mãos sobre uma mesa de madeira, com caderno, xícara e folhas' },
  office: { src: '/images/consultorio.svg', alt: 'Ilustração de um ambiente claro e acolhedor, com poltrona, estante, planta e janela' },
  still: { src: '/images/detalhe.svg', alt: 'Ilustração de livros empilhados, uma xícara e um galho com folhas sob luz natural' },
}

export const hero = {
  badge: professional.title,
  headline: 'Você não precisa organizar tudo antes de pedir ajuda.',
  intro: `Sou ${professional.firstName}, psicóloga clínica. Atendo on-line, em um espaço de escuta, reflexão e cuidado com a sua história.`,
  primaryCta: { label: 'Conheça meu trabalho', href: '#sobre' },
  secondaryCta: { label: 'Entrar em contato', href: '#contato' },
} as const

export const welcome = {
  quote: 'Nem sempre é fácil explicar o que está acontecendo.',
  body: 'A terapia pode ser um espaço para construir essa compreensão com tempo, cuidado e respeito à sua história.',
} as const

export const about = {
  eyebrow: 'Sobre mim',
  title: `Prazer, sou a ${professional.firstName}.`,
  story: [
    'Acredito que cada pessoa chega à terapia com uma história própria, e que compreendê-la leva o tempo que for necessário.',
    'Meu trabalho é oferecer uma escuta atenta e explicar com clareza como o processo funciona, para que você se sinta à vontade em cada etapa.',
  ],
  storyNote: 'Texto de apresentação para revisão da profissional.',
  facts: [
    { label: 'Registro profissional', value: `${professional.title} · ${professional.crp}` },
    { label: 'Modalidade', value: professional.modality },
    { label: 'Formação e abordagem', value: pending('A informar') },
    { label: 'Contato', value: professional.phoneDisplay },
  ],
  link: { label: 'Como funciona o atendimento', href: '#como-funciona' },
} as const

export const audience = {
  title: 'Pode fazer sentido buscar apoio quando…',
  intro: 'Pessoas que estão vivendo momentos como estes costumam procurar acompanhamento. A compreensão de cada situação é construída em conjunto, durante o processo.',
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
  intro: 'Quatro momentos simples. Não há fórmula nem prazo fixo: cada processo é individual.',
  steps: [
    { title: 'Primeiro contato', text: 'Você envia uma mensagem para verificar horários e tirar dúvidas iniciais.' },
    { title: 'Conversa inicial', text: 'Falamos sobre o que trouxe você até aqui e avaliamos juntas(os) se o formato faz sentido.' },
    { title: 'Construção do processo', text: 'Caso exista alinhamento, combinamos frequência, formato e próximos passos.' },
    { title: 'Acompanhamento contínuo', text: 'O processo segue de forma individual, respeitando seu momento e seus objetivos.' },
  ],
} as const

export const modality = {
  title: 'Atendimento on-line, de onde você estiver',
  intro: 'As sessões acontecem por videochamada. Você só precisa de um lugar reservado e de uma conexão estável.',
  items: [
    { title: 'Por videochamada', text: 'A plataforma e o link são combinados antes da primeira sessão.' },
    { title: 'Horários combinados', text: 'Os horários são definidos individualmente, conforme a agenda disponível.' },
    { title: 'Um lugar só seu', text: 'Escolha um ambiente reservado; fones de ouvido ajudam na privacidade.' },
    { title: 'Primeiro passo', text: `Escreva para ${professional.phoneDisplay} ou ${professional.email}.` },
  ],
} as const

export const approach = {
  title: 'Como eu trabalho',
  intro: 'A terapia é uma relação construída a dois. Explico o que estamos fazendo e por quê, sem termos técnicos desnecessários, e ajustamos o caminho juntas(os).',
  approachNote: pending('Abordagem teórica: a informar pela profissional'),
  blocks: [
    { title: 'O que esperar das sessões', text: 'Escuta atenta, espaço para reflexão e clareza sobre cada etapa do processo.' },
    { title: 'O que esperar da relação', text: 'Respeito ao seu ritmo, sem julgamentos, com combinados claros desde o início.' },
    { title: 'O que não é uma promessa', text: 'A terapia não garante resultados específicos nem prazos. É um processo construído com você.' },
  ],
} as const

export const principles = {
  title: 'Princípios que orientam meu trabalho',
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
  title: 'Perguntas frequentes',
  intro: 'Se a sua dúvida não estiver aqui, é só escrever.',
  items: [
    { q: 'Como funciona o primeiro contato?', a: 'Você pode enviar uma mensagem pelo WhatsApp, e-mail ou formulário. A resposta vem com as informações para combinarmos uma conversa inicial.' },
    { q: 'O atendimento é on-line ou presencial?', a: 'O atendimento é on-line, por videochamada.' },
    { q: 'Quanto dura uma sessão?', a: 'A duração e a frequência das sessões são explicadas e combinadas na conversa inicial.' },
    { q: 'Como são definidos os horários?', a: 'Os horários são combinados individualmente, conforme a sua disponibilidade e a agenda.' },
    { q: 'O que acontece na primeira conversa?', a: 'Conversamos sobre o que trouxe você até aqui, tiramos dúvidas e avaliamos se o formato faz sentido. Você não precisa chegar com tudo organizado.' },
    { q: 'Posso tirar dúvidas antes de agendar?', a: 'Sim. Você pode escrever a qualquer momento para perguntar sobre o atendimento.' },
    { q: 'Como funciona o cancelamento?', a: 'As regras de remarcação e cancelamento são apresentadas no início do acompanhamento, antes de qualquer compromisso.' },
    { q: 'O atendimento é sigiloso?', a: 'O sigilo é um princípio da prática profissional da Psicologia. Os detalhes de como as informações são tratadas são conversados no início do atendimento.' },
    { q: 'Como funciona o pagamento?', a: 'Valores e formas de pagamento são informados com transparência no primeiro contato.' },
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
  privacyNotice: 'Seus dados são usados apenas para responder a este contato.',
  contactPreferences: ['WhatsApp', 'E-mail'],
  /** ⚠ Envio SIMULADO. Conecte um serviço real em src/lib/submitContact.ts. */
  success: 'Obrigada pela mensagem. Neste modelo o envio é simulado: para falar agora, use o WhatsApp ou o e-mail.',
} as const

export const finalCta = {
  title: 'Se você está pensando em começar, o primeiro passo pode ser uma conversa.',
  text: 'Respeite o seu próprio tempo. Não há pressa.',
  primary: { label: 'Entrar em contato', href: '#contato' },
  secondary: { label: 'Conhecer o atendimento', href: '#atendimento' },
} as const

export const footer = {
  links: [...nav.links, { label: 'Política de privacidade', href: '#/privacidade' }],
  copyright: `© ${new Date().getFullYear()} ${professional.fullName}. Todos os direitos reservados.`,
  demoNotice: 'Versão para apresentação: CRP e alguns textos aguardam confirmação da profissional.',
} as const

export const privacy = {
  title: 'Política de privacidade',
  reviewNotice: 'Minuta para revisão da profissional e de assessoria jurídica antes da publicação.',
  updatedAt: pending('Data de atualização'),
  sections: [
    { title: 'Quem é a responsável', text: `${professional.fullName}, ${professional.title.toLowerCase()} (${professional.crp}). Contato: ${professional.email}.` },
    { title: 'Quais dados são coletados', text: 'O formulário de contato coleta apenas nome, e-mail, preferência de canal e uma mensagem curta. Não pedimos informações clínicas, diagnósticos ou histórico de saúde.' },
    { title: 'Para que usamos', text: 'Os dados são usados somente para responder ao seu contato e combinar uma conversa inicial, a seu pedido.' },
    { title: 'Compartilhamento', text: 'Os dados não são vendidos nem compartilhados para marketing. O serviço que recebe o formulário será informado aqui quando for configurado.' },
    { title: 'Retenção', text: pending('Prazo de guarda das mensagens e forma de exclusão') },
    { title: 'Cookies e analytics', text: 'Este site não usa cookies de rastreamento nem ferramentas de análise. As fontes são servidas pelo próprio site.' },
    { title: 'Seus direitos', text: `Você pode pedir acesso, correção ou exclusão dos seus dados pelo e-mail ${professional.email}.` },
    { title: 'Canais seguros', text: 'Evite enviar informações sensíveis por formulário, e-mail ou redes sociais. Detalhes clínicos devem ser tratados em canal apropriado, combinado com a profissional.' },
    { title: 'Emergências', text: emergencyNotice },
  ],
} as const
