import { createHash } from 'crypto';

export function mine(salt: string, leadingZeros: number = 5): number {
  const prefix = '0'.repeat(leadingZeros);
  let num = 0;
  while (true) {
    const h = createHash('md5');
    h.update(`${salt}${num.toString(10)}`);
    const digest = h.digest('hex');
    if (digest.startsWith(prefix)) {
      return num;
    }
    num++;
  }
}
