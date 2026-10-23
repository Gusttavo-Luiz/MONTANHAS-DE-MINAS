import { expect, test } from '@playwright/test';
import { openingHours, timeZone } from '../src/content/hours';
import { formatRange, localTime, openingStatus, statusText } from '../src/lib/hours';

// Itaúna fica em UTC−3 (sem horário de verão): 20:00 locais = 23:00Z.
const at = (iso: string) => new Date(`${iso}-03:00`);
const status = (iso: string) => statusText(openingStatus(openingHours, at(iso), timeZone));

test('faixas de horário exibidas', () => {
  expect(openingHours.map((d) => `${d.label}: ${formatRange(d)}`)).toEqual([
    'Segunda-feira: Fechado',
    'Terça-feira: Fechado',
    'Quarta-feira: Fechado',
    'Quinta-feira: 17h às 0h',
    'Sexta-feira: 17h às 0h',
    'Sábado: 16h às 0h',
    'Domingo: 8h às 18h',
  ]);
});

test('usa o fuso de Itaúna, não o do visitante', () => {
  // 02:30Z de sexta = 23:30 de quinta em Itaúna.
  expect(localTime(new Date('2026-10-23T02:30:00Z'), timeZone)).toEqual({ weekday: 4, minutes: 23 * 60 + 30 });
});

test('aberto dentro do horário', () => {
  expect(status('2026-10-22T17:00')).toBe('Aberto agora · fecha às 0h'); // quinta, na abertura
  expect(status('2026-10-22T23:59')).toBe('Aberto agora · fecha às 0h');
  expect(status('2026-10-24T16:30')).toBe('Aberto agora · fecha às 0h'); // sábado
  expect(status('2026-10-25T08:00')).toBe('Aberto agora · fecha às 18h'); // domingo
});

test('fechado fora do horário, com a próxima abertura', () => {
  expect(status('2026-10-23T00:00')).toBe('Fechado agora · abre hoje às 17h'); // sexta 0h: quinta já fechou
  expect(status('2026-10-25T07:59')).toBe('Fechado agora · abre hoje às 8h');
  expect(status('2026-10-25T18:00')).toBe('Fechado agora · abre quinta-feira às 17h');
  expect(status('2026-10-19T12:00')).toBe('Fechado agora · abre quinta-feira às 17h'); // segunda
  expect(status('2026-10-21T12:00')).toBe('Fechado agora · abre amanhã às 17h'); // quarta
  expect(status('2026-10-24T15:59')).toBe('Fechado agora · abre hoje às 16h'); // sábado
});

test('funcionamento que atravessa a meia-noite', () => {
  const lateNight = [{ weekday: 5, label: 'Sexta-feira', short: 'Sex', open: '18:00', close: '02:00' }];
  const s = (iso: string) => statusText(openingStatus(lateNight, at(iso), timeZone));
  expect(s('2026-10-24T01:30')).toBe('Aberto agora · fecha às 2h'); // madrugada de sábado
  expect(s('2026-10-24T02:00')).toBe('Fechado agora · abre sexta-feira às 18h');
});
