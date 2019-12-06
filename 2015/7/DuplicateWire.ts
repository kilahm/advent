export class DuplicateWire extends Error {
  constructor(wireName: string) {
    super(`Wire ${wireName} defined multiple times`);
  }
}
