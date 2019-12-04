export type PasswordDigits = [number, number, number, number, number, number];

export class Password {
  constructor(private raw: PasswordDigits) {
    raw.forEach((d, i) => {
      if (d > 9) {
        throw new InvalidPassword(
          this.toString(),
          `digit ${i} is greater than 9`
        );
      }
    });
  }

  get valid(): boolean {
    return this.pairIndex() !== -1 && this.decreaseIndex() === -1;
  }

  private decreaseIndex(): number {
    return this.raw.findIndex((d, i) => i > 0 && d < this.raw[i - 1]);
  }

  private pairIndex(): number {
    return this.raw.findIndex((d, i) => i > 0 && d === this.raw[i - 1]);
  }

  next(): Password {
    const decreaseIndex = this.decreaseIndex();
    if (decreaseIndex !== -1) {
      return this.clone(decreaseIndex, this.raw[decreaseIndex - 1]);
    }
    const bumpIndex = this.pairIndex() === 5 ? 4 : 5;
    const newPass = this.bump(bumpIndex);
    if (newPass === this) {
      throw new Error(
        `Unable to generate password higher than ${this.toString()}`
      );
    }
    if (!newPass.valid) {
      throw new Error(
        `Invalid password generated: ${this.toString()} -> ${newPass.toString()}`
      );
    }
    return newPass;
  }

  toString(): string {
    return this.raw.join('');
  }

  static fromString(raw: string): Password {
    if (raw.length !== 6) {
      throw new InvalidPassword(raw, 'password length must be exactly 6');
    }
    if (/[^0-9]/.test(raw)) {
      throw new InvalidPassword(raw, 'password must be composed of digits');
    }
    // @ts-ignore already checked the length above
    return new Password(raw.split('').map(d => parseInt(d, 10)));
  }

  private bump(index: number): Password {
    if (index < 0) {
      return this;
    }
    const newnum = this.raw[index] + 1;
    if (newnum > 9) {
      return this.bump(index - 1);
    }

    return this.clone(index, newnum);
  }

  private clone(index: number, value: number): Password {
    if (index < 0) {
      throw new Error(`Attempted to clone with changes to index ${index}`);
    }

    // @ts-ignore
    const newRaw: PasswordDigits = [...this.raw];

    for (let i = index; i < 6; i++) {
      newRaw[i] = value;
    }

    return new Password(newRaw);
  }
}

export class InvalidPassword extends Error {
  constructor(rawPass: string, reason: string) {
    super(`Invalid password "${rawPass}": ${reason}`);
  }
}
