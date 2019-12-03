import { banner } from "./display";
import { spawn } from "child_process";

export function answer(a: number | string): void {
  banner(`Answer: ${a}`);
  const p = spawn('pbcopy');
  p.stdin.write(a.toString());
  p.stdin.end();
}
