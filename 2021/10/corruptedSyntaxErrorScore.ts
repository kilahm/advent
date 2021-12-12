export function corruptedSyntaxErrorScore(line: string): number {
  const opens: OpenCharacter[] = [];
  const errorChar = line
    .split('')
    .reduce(
      (
        errorChar: CloseCharacter | undefined,
        char
      ): CloseCharacter | undefined => {
        if (errorChar !== undefined) {
          return errorChar;
        }
        if (isOpen(char)) {
          opens.push(char);
          return undefined;
        }
        if (isClose(char)) {
          const lastOpen = opens.pop();
          if (lastOpen === undefined) {
            // This is an "incomplete" line
            return undefined;
          }

          if (char === CloseCharacterMap[lastOpen]) {
            return undefined;
          }
          return char;
        }
        throw new Error(`Unexpected character in code: ${char}`);
      },
      undefined
    );

    return errorChar === undefined ? 0 : ErrorCharScore[errorChar];
    
}

const ErrorCharScore = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
} as const;

const CloseCharacterMap = {
  '[': ']',
  '(': ')',
  '{': '}',
  '<': '>',
} as const;
type OpenCharacter = keyof typeof CloseCharacterMap;
type CloseCharacter = typeof CloseCharacterMap[OpenCharacter];
function isOpen(char: unknown): char is OpenCharacter {
  // @ts-ignore
  return Object.keys(CloseCharacterMap).includes(char);
}

function isClose(char: unknown): char is CloseCharacter {
  // @ts-ignore
  return Object.values(CloseCharacterMap).includes(char);
}
