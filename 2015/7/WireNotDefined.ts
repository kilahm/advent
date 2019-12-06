export class WireNotDefined extends Error {
  constructor(wireName: string) {
    super(`Wire ${wireName} not defined`);
  }
}
