/**
 * Dados editáveis do restaurante — fonte única para todo o site.
 *
 * Regra de ouro: só preencha um campo com informação CONFIRMADA pelo
 * restaurante. Campos vazios (`''`) fazem o site ocultar o recurso ou usar
 * uma alternativa segura (ex.: o WhatsApp no lugar do cardápio em PDF).
 */
export const site = {
  name: 'Restaurante Montanhas de Minas',
  shortName: 'Montanhas de Minas',
  tagline: 'Restaurante Montanhas de Minas — sabor, tradição e acolhimento em Itaúna, MG.',
  footerPhrase: 'Comida mineira, conversa boa e o sossego do interior ao redor da mesa.',

  /**
   * Domínio oficial (ex.: 'https://www.seudominio.com.br'). Enquanto vazio, o
   * site não gera URLs canônicas absolutas. Não invente um domínio.
   */
  url: '',

  /** Localização confirmada. Não acrescente rua, número ou coordenadas sem confirmação. */
  address: {
    area: 'Povoado de Campos, zona rural',
    city: 'Itaúna',
    state: 'MG',
    stateName: 'Minas Gerais',
    country: 'BR',
  },

  contact: {
    /** WhatsApp — somente dígitos com DDI e DDD. */
    whatsapp: '5537998561626',
    /** Telefone para ligação (formato internacional, usado no link tel:). */
    phone: '+5537998561626',
    phoneDisplay: '(37) 99856-1626',
  },

  /** Mensagem pré-preenchida do botão principal de WhatsApp. */
  whatsappMessage: 'Olá! Conheci o Restaurante Montanhas de Minas pelo site e gostaria de obter mais informações.',

  /**
   * Cardápio completo oficial (PDF em /public, página própria ou link externo).
   * Enquanto vazio, o botão "Consultar cardápio completo" abre o WhatsApp.
   */
  menuUrl: '',

  /**
   * Link do perfil oficial no Google (aba de avaliações). Enquanto vazio, o
   * botão abre a busca do restaurante no Google Maps, onde estão as avaliações.
   */
  googleReviewsUrl: '',

  /** Nota no Google informada pelo restaurante. */
  googleRating: 4.6,

  /** Perfis oficiais — só aparecem quando preenchidos. */
  social: {
    instagram: '',
    facebook: '',
  },
};

const placeQuery = 'Restaurante Montanhas de Minas, Itaúna - Minas Gerais, Brazil';

export const mapLinks = {
  /** Rota até o restaurante no Google Maps (link fornecido pelo restaurante). */
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=Restaurante+Montanhas+de+Minas%2C+Ita%C3%BAna+-+Minas+Gerais%2C+Brazil',
  /** Abre o restaurante no Google Maps. */
  view: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`,
  /** Mapa incorporado (carregado somente quando o visitante solicita). */
  embed: `https://www.google.com/maps?q=${encodeURIComponent(placeQuery)}&output=embed&hl=pt-BR`,
};

export const reviewsLink = site.googleReviewsUrl || mapLinks.view;

export const placeLine = `${site.address.area} · ${site.address.city}, ${site.address.state}`;

export const whatsappLink = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const phoneLink = `tel:${site.contact.phone}`;

/** "Consultar cardápio completo": cardápio oficial ou, sem ele, o WhatsApp. */
export const menuLink = site.menuUrl
  ? { href: site.menuUrl, viaWhatsapp: false }
  : {
      href: whatsappLink('Olá! Conheci o Restaurante Montanhas de Minas pelo site e gostaria de consultar o cardápio completo.'),
      viaWhatsapp: true,
    };

export const formatRating = (value: number) => value.toLocaleString('pt-BR', { minimumFractionDigits: 1 });
