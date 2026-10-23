/**
 * Horário habitual de funcionamento. `weekday` segue o padrão do JavaScript
 * (0 = domingo … 6 = sábado). Dia fechado: sem `open`/`close`.
 * Horários no formato 'HH:MM'; fechamento '00:00' = meia-noite.
 */
export interface OpeningDay {
  weekday: number;
  label: string;
  short: string;
  open?: string;
  close?: string;
}

/** Fuso horário de Itaúna, MG — base do indicador "aberto agora". */
export const timeZone = 'America/Sao_Paulo';

/** Ordem de exibição: segunda a domingo. */
export const openingHours: OpeningDay[] = [
  { weekday: 1, label: 'Segunda-feira', short: 'Seg' },
  { weekday: 2, label: 'Terça-feira', short: 'Ter' },
  { weekday: 3, label: 'Quarta-feira', short: 'Qua' },
  { weekday: 4, label: 'Quinta-feira', short: 'Qui', open: '17:00', close: '00:00' },
  { weekday: 5, label: 'Sexta-feira', short: 'Sex', open: '17:00', close: '00:00' },
  { weekday: 6, label: 'Sábado', short: 'Sáb', open: '16:00', close: '00:00' },
  { weekday: 0, label: 'Domingo', short: 'Dom', open: '08:00', close: '18:00' },
];

export const hoursNotice =
  'Os horários podem sofrer alterações em feriados e datas especiais. Entre em contato para confirmar antes da visita.';
