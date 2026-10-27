import { Line } from '../../lib/captions';
import { sec } from '../../theme';

// Edit the lines here and re-render. Timings follow the brief (seconds).
export const TEHPOS_LINES: Line[] = [
  { from: sec(0), to: sec(3), text: 'Your shop sells all day. Do you know what you actually earned?', keyword: 'actually earned?' },
  { from: sec(3), to: sec(4.67), text: 'Paper notes.', keyword: 'notes.' },
  { from: sec(4.67), to: sec(6.33), text: 'Guesswork stock.', keyword: 'Guesswork' },
  { from: sec(6.33), to: sec(8), text: 'Shifts on a group chat.', keyword: 'group chat.' },
  { from: sec(8), to: sec(13), text: 'TehPOS rings up a sale in seconds,', keyword: 'seconds,' },
  { from: sec(13), to: sec(18), text: 'with every payment method your customers use.', keyword: 'every payment method' },
  { from: sec(18), to: sec(23), text: 'Stock updates itself.', keyword: 'itself.' },
  { from: sec(23), to: sec(26), text: 'Shifts and payroll stay organized.', keyword: 'organized.' },
  { from: sec(26), to: sec(28.67), text: 'And every evening,', keyword: 'evening,' },
  { from: sec(28.67), to: sec(34), text: 'your daily report lands in Telegram.', keyword: 'Telegram.' },
  { from: sec(34), to: sec(36), text: 'TehPOS.', keyword: 'TehPOS.' },
  { from: sec(36), to: sec(40), text: 'Run your shop, not your spreadsheet.', keyword: 'not your spreadsheet.' },
];

export const PRODUCTS = [
  { name: 'Iced Jasmine Tea', price: 15000 },
  { name: 'Milk Tea', price: 18000 },
  { name: 'Lemon Tea', price: 14000 },
  { name: 'Thai Tea', price: 16000 },
  { name: 'Matcha Latte', price: 22000 },
  { name: 'Butter Toast', price: 12000 },
];

export const rp = (n: number) => 'Rp' + Math.round(n).toLocaleString('id-ID');
