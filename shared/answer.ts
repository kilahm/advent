import { banner } from "./display";
import { spawn } from "child_process";

export function answer(a: number | string | undefined): void {
  banner(`Answer: ${a}`);
  if(a === undefined) {
    return;
  }
  const p = spawn('pbcopy');
  p.stdin.write(a.toString());
  p.stdin.end();
}
