/**
 * Avaliações. A nota geral fica em `site.googleRating` (src/config/site.ts).
 *
 * `testimonials` só aceita avaliações REAIS e verificáveis: texto original,
 * identificação pública permitida pelo autor e link da fonte. Nunca invente
 * comentários, nomes ou notas individuais.
 */
import type { IconName } from '../components/icons';

export const reviewHighlights: { icon: IconName; title: string; text: string }[] = [
  { icon: 'heart', title: 'Atendimento atencioso', text: 'Cuidado com cada mesa, do jeito mineiro de receber.' },
  { icon: 'users', title: 'Ambiente agradável e familiar', text: 'Um lugar para ir com a família e se sentir à vontade.' },
  { icon: 'chat', title: 'Para conversar sem pressa', text: 'Espaço propício para aproveitar a refeição e a companhia.' },
  { icon: 'leaf', title: 'Cenário rural', text: 'A experiência gastronômica com a natureza ao redor.' },
];

export interface Testimonial {
  text: string;
  author: string;
  source: 'Google' | string;
  url: string;
  /** Data da avaliação (AAAA-MM), se disponível. */
  date?: string;
}

export const testimonials: Testimonial[] = [];
