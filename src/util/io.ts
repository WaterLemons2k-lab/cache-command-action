import { appendFileSync } from "fs";

export function getInput(name: string, required?: boolean): string {
  const v = process.env[`INPUT_${name.toUpperCase()}`];

  if (required && !v)
    throw new Error(`Input required and not supplied: ${name}`);

  return v.trim();
}

export function setOutput(name: string, value: unknown) {
  const output = process.env["GITHUB_OUTPUT"];
  if (!output) return;

  appendFileSync(output, `${name}=${value}\n`);
}
