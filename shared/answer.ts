import { banner } from "./display";
import { spawn } from "child_process";
import * as clipboardy from "clipboardy";

export function answer(a: number | string | undefined): void {
  banner(`Answer: ${a}`);
  if(a === undefined) {
    return;
  }
  clipboardy.writeSync(a.toString());
}
