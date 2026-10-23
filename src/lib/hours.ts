/**
 * Regras de funcionamento — sem dependência do DOM, usadas no navegador e
 * nos testes. Sempre calculadas no fuso de Itaúna, não no do visitante.
 */
import type { OpeningDay } from '../content/hours';

const DAY = 24 * 60;
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

/** '17:00' → '17h' · '00:00' → '0h' · '17:30' → '17h30'. */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  return `${h}h${m ? String(m).padStart(2, '0') : ''}`;
}

/** Faixa de horário do dia ('17h às 0h') ou 'Fechado'. */
export function formatRange(day: OpeningDay): string {
  return day.open && day.close ? `${formatTime(day.open)} às ${formatTime(day.close)}` : 'Fechado';
}

/** Intervalo do dia em minutos; o fechamento pode passar da meia-noite (> 1440). */
function interval(day: OpeningDay | undefined): [number, number] | null {
  if (!day?.open || !day.close) return null;
  const open = toMinutes(day.open);
  let close = toMinutes(day.close);
  if (close <= open) close += DAY;
  return [open, close];
}

/** Dia da semana (0 = domingo) e minutos desde 0h no fuso informado. */
export function localTime(date: Date, timeZone: string): { weekday: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return {
    weekday: WEEKDAYS.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export type OpeningStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt?: string; opensOn?: 'hoje' | 'amanhã' | string };

export function openingStatus(days: OpeningDay[], date: Date, timeZone: string): OpeningStatus {
  const { weekday, minutes } = localTime(date, timeZone);
  const byWeekday = (w: number) => days.find((d) => d.weekday === (w + 7) % 7);

  const today = byWeekday(weekday);
  const todayRange = interval(today);
  if (todayRange && minutes >= todayRange[0] && minutes < todayRange[1]) {
    return { open: true, closesAt: formatTime(today!.close!) };
  }

  // Funcionamento de ontem que atravessa a meia-noite.
  const yesterday = byWeekday(weekday - 1);
  const yesterdayRange = interval(yesterday);
  if (yesterdayRange && yesterdayRange[1] > DAY && minutes < yesterdayRange[1] - DAY) {
    return { open: true, closesAt: formatTime(yesterday!.close!) };
  }

  if (todayRange && minutes < todayRange[0]) {
    return { open: false, opensAt: formatTime(today!.open!), opensOn: 'hoje' };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = byWeekday(weekday + offset);
    if (next?.open) {
      return {
        open: false,
        opensAt: formatTime(next.open),
        opensOn: offset === 1 ? 'amanhã' : next.label.toLowerCase(),
      };
    }
  }
  return { open: false };
}

export function statusText(status: OpeningStatus): string {
  if (status.open) return `Aberto agora · fecha às ${status.closesAt}`;
  if (!status.opensAt) return 'Fechado agora';
  return `Fechado agora · abre ${status.opensOn} às ${status.opensAt}`;
}
