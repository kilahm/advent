export function banner(message: string): void {
  console.log(`╔${'═'.repeat(message.length + 2)}╗`);
  console.log(`║ ${message} ║`);
  console.log(`╚${'═'.repeat(message.length + 2)}╝`);
  console.log();
}
