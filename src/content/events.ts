/**
 * Programação de música ao vivo e eventos. Cadastre SOMENTE eventos
 * confirmados pelo restaurante. Eventos com data passada saem do site
 * automaticamente (no build e no navegador).
 *
 * Imagem de divulgação: salve em src/assets/fotos/ e informe o nome em `image`.
 */
export interface RestaurantEvent {
  name: string;
  /** Data no formato AAAA-MM-DD. */
  date: string;
  /** Horário de início, ex.: '19:00'. */
  time: string;
  /** Atração musical, se houver. */
  artist?: string;
  description?: string;
  image?: { file: string; alt: string };
  /** Informações sobre reservas, ex.: 'Reservas pelo WhatsApp'. */
  reservations?: string;
}

export const events: RestaurantEvent[] = [];
