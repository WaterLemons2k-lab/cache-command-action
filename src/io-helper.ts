import { appendFileSync } from "fs";

export function getInput(name: string, required?: boolean): string {
  const v = process.env[`INPUT_${name.toUpperCase()}`];

  if (required && !v)
    throw new Error(`Input required and not supplied: ${name}`);

  return v.trim();
}

export function setOutput(name: string, value: unknown) {
  appendFileSync(process.env["GITHUB_OUTPUT"], `${name}=${value}\n`);
}
