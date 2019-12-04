export function nice(word: string): boolean {
  if (/ab|cd|pq|xy/.test(word)) {
    return false;
  }
  if (!/(.)\1/.test(word)) {
    return false;
  }
  if (!/[aeiou].*[aeiou].*[aeiou]/.test(word)) {
    return false;
  }
  return true;
}

export function supernice(word: string): boolean {
  if (!/(..).*\1/.test(word)) {
    return false;
  }
  if (!/(.).\1/.test(word)) {
    return false;
  }
  return true;
}
