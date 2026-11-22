import { IconName } from './icon.component';

export const CONTACT = {
  whatsappNumber: '5511946070726',
  phoneDisplay: '(11) 94607-0726',
  instagramUrl: 'https://www.instagram.com/lalashdesignerr/',
  instagramHandle: '@lalashdesignerr',
  city: 'Jundiaí, SP',
  fullName: 'Livia Barreto Ribeiro da Silva',
};

export function whatsappLink(
  message = 'Olá, Dra. Lívia! Vim pelo site e gostaria de agendar uma avaliação.',
): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export interface NavItem {
  id: string;
  label: string;
}

export const NAV: NavItem[] = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'procedimentos', label: 'Procedimentos' },
  { id: 'jornada', label: 'Como funciona' },
  { id: 'duvidas', label: 'Dúvidas' },
];

export interface Procedure {
  id: string;
  name: string;
  category: string;
  badge?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  highlights: { icon: IconName; label: string }[];
  benefits: string[];
  price: string;
  priceNote: string;
}

export const PROCEDURES: Procedure[] = [
  {
    id: 'vasinhos',
    name: 'Secagem de Vasinhos',
    category: 'Pernas leves e uniformes',
    badge: 'Especialidade da casa',
    description:
      'Tratamento para eliminar microvarizes e vasinhos aparentes. Um procedimento minimamente invasivo que devolve uniformidade à pele e a liberdade de usar o que você quiser.',
    image: 'assets/img/vasinhos.webp',
    imageAlt: 'Aplicação para secagem de vasinhos na perna',
    highlights: [
      { icon: 'clock', label: 'Sessão de 40 a 60 min' },
      { icon: 'trend', label: 'Resultados progressivos' },
      { icon: 'calendar', label: 'Poucas sessões' },
    ],
    benefits: [
      'Eliminação eficaz de vasinhos',
      'Pernas mais uniformes',
      'Mais liberdade para usar shorts e vestidos',
      'Autoestima lá em cima',
    ],
    price: 'A partir de R$ 200',
    priceNote: 'por sessão, varia conforme a área',
  },
  {
    id: 'toxina',
    name: 'Toxina Botulínica',
    category: 'Rejuvenescimento facial',
    description:
      'Suaviza as linhas de expressão da testa, entre as sobrancelhas e ao redor dos olhos, e ajuda a prevenir novas rugas. Aplicação precisa para um resultado leve, sem perder a naturalidade das suas expressões.',
    image: 'assets/img/botox.webp',
    imageAlt: 'Aplicação de toxina botulínica na testa',
    highlights: [
      { icon: 'zap', label: 'Aplicação rápida' },
      { icon: 'sparkles', label: 'Efeito gradual' },
      { icon: 'smile', label: 'Expressão natural' },
    ],
    benefits: [
      'Suaviza rugas e linhas de expressão',
      'Previne novas linhas',
      'Aspecto descansado e jovem',
      'Resultado natural, sem "congelar"',
    ],
    price: 'Valor sob avaliação',
    priceNote: 'definido conforme as áreas tratadas',
  },
  {
    id: 'labios',
    name: 'Preenchimento Labial',
    category: 'Harmonização facial',
    description:
      'O preenchimento com ácido hialurônico devolve volume, contorno e hidratação aos lábios, realçando a sua beleza de forma delicada e harmoniosa.',
    image: 'assets/img/labios.webp',
    imageAlt: 'Preenchimento labial com ácido hialurônico',
    highlights: [
      { icon: 'clock', label: '30 a 45 minutos' },
      { icon: 'sparkles', label: 'Resultado imediato' },
      { icon: 'calendar', label: 'Dura de 8 a 12 meses' },
    ],
    benefits: ['Volume e projeção natural', 'Hidratação profunda', 'Contorno definido', 'Correção de assimetrias'],
    price: 'A partir de R$ 850',
    priceNote: 'varia conforme a quantidade de produto',
  },
  {
    id: 'bioestimuladores',
    name: 'Bioestimuladores',
    category: 'Firmeza e colágeno',
    description:
      'Estimulam o seu próprio organismo a produzir colágeno, melhorando a firmeza, a sustentação e a qualidade da pele. Um rejuvenescimento progressivo, que acontece de dentro para fora.',
    image: 'assets/img/bioestimuladores.webp',
    imageAlt: 'Aplicação de bioestimulador de colágeno no rosto',
    highlights: [
      { icon: 'drop', label: 'Colágeno natural' },
      { icon: 'trend', label: 'Resultado progressivo' },
      { icon: 'gem', label: 'Efeito duradouro' },
    ],
    benefits: [
      'Melhora da flacidez',
      'Pele mais firme e espessa',
      'Contorno facial mais definido',
      'Rejuvenescimento sem exageros',
    ],
    price: 'Valor sob avaliação',
    priceNote: 'protocolo personalizado',
  },
  {
    id: 'microagulhamento',
    name: 'Microagulhamento',
    category: 'Renovação da pele',
    description:
      'Microperfurações controladas ativam a renovação da pele e a produção de colágeno. Ideal para melhorar textura, poros dilatados, manchas e marcas de acne.',
    highlights: [
      { icon: 'sparkles', label: 'Renovação da pele' },
      { icon: 'drop', label: 'Estímulo de colágeno' },
      { icon: 'calendar', label: 'Protocolo em sessões' },
    ],
    benefits: [
      'Textura mais lisa e uniforme',
      'Redução de poros e marcas de acne',
      'Clareamento de manchas',
      'Pele com mais viço',
    ],
    price: 'Valor sob avaliação',
    priceNote: 'protocolo em sessões',
  },
];

export const CREDENTIALS: { icon: IconName; label: string }[] = [
  { icon: 'flask', label: 'Biomédica' },
  { icon: 'graduation', label: 'Pós-graduada em Estética Avançada' },
  { icon: 'star', label: 'Especialista em Secagem de Vasinhos' },
  { icon: 'briefcase', label: 'Empreendedora' },
  { icon: 'heart', label: 'Esposa e mãe' },
];

export const DIFFERENTIALS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'user',
    title: 'Avaliação individual',
    text: 'Cada protocolo é desenhado para o seu rosto, a sua pele e a sua rotina. Nada de receita pronta.',
  },
  {
    icon: 'gem',
    title: 'Produtos premium',
    text: 'Trabalho com marcas de alta qualidade, porque o seu resultado e a sua segurança vêm primeiro.',
  },
  {
    icon: 'smile',
    title: 'Resultado natural',
    text: 'Realçar quem você já é, sem exageros. Essa é a assinatura de cada atendimento.',
  },
  {
    icon: 'shield',
    title: 'Técnica e segurança',
    text: 'Biossegurança, precisão e acompanhamento em cada etapa, do primeiro contato ao pós.',
  },
];

export const STEPS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'message',
    title: 'Chame no WhatsApp',
    text: 'Conte o que você deseja melhorar e escolha o melhor horário para você.',
  },
  {
    icon: 'user',
    title: 'Avaliação personalizada',
    text: 'Uma conversa detalhada para entender a sua pele, as suas expectativas e indicar o protocolo ideal.',
  },
  {
    icon: 'sparkles',
    title: 'Procedimento',
    text: 'Realizado com técnica, segurança e muito carinho, em um ambiente acolhedor.',
  },
  {
    icon: 'heart',
    title: 'Acompanhamento',
    text: 'Orientações de cuidados e retorno para o resultado ficar exatamente como você sonhou.',
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'Preciso fazer uma avaliação antes do procedimento?',
    a: 'Sim. A avaliação é o momento de entender a sua pele, tirar todas as suas dúvidas e definir o protocolo mais indicado para você. É só chamar no WhatsApp para agendar.',
  },
  {
    q: 'Os procedimentos doem?',
    a: 'O desconforto costuma ser leve e varia de pessoa para pessoa. Quando indicado, é utilizado anestésico tópico para deixar o atendimento ainda mais tranquilo.',
  },
  {
    q: 'O resultado fica natural?',
    a: 'Esse é o principal objetivo. Cada aplicação é planejada para respeitar os seus traços e realçar a sua beleza, sem exageros.',
  },
  {
    q: 'Quanto tempo duram os resultados?',
    a: 'Depende do procedimento e do organismo de cada pessoa. O preenchimento labial, por exemplo, dura em média de 8 a 12 meses. Na avaliação você recebe todas as orientações.',
  },
  {
    q: 'Posso voltar à rotina no mesmo dia?',
    a: 'Na maioria dos procedimentos, sim. Você recebe orientações específicas de cuidados para cada tratamento.',
  },
  {
    q: 'Onde é o atendimento?',
    a: 'O atendimento acontece em Jundiaí, SP. O endereço completo é enviado no momento do agendamento pelo WhatsApp.',
  },
];
