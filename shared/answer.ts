import { banner } from "./display";
import { spawn } from "child_process";
import * as clipboardy from "clipboardy";

export function answer(a?: number | string | undefined, exit?: true): never;
export function answer(a?: number | string | undefined, exit?: false): void;
export function answer(a?: number | string | undefined, exit: boolean = false): void {
  banner(`Answer: ${a}`);
  if(a === undefined) {
    return;
  }
  clipboardy.writeSync(a.toString());
  if(exit) {
    process.exit(0);
  }
}
