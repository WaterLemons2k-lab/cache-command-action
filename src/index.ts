import isCacheFound from "./cache-helper";
import { getExecOutput } from "@actions/exec";
import { getInput, setOutput } from "./io-helper";

async function run(file: string): Promise<void> {
  const output = (await getExecOutput(getInput("run", true))).stdout.trim();
  if (!output) throw new Error("Stdout is null");

  setOutput("output", output);

  // Set the output hit depending on whether the cache is found or not
  const cacheFound = await isCacheFound(file, output);
  setOutput("hit", cacheFound);
}

// Cache file used as a placeholder
const file = ".cache-command-action-file";

run(file).catch((e) => {
  process.exitCode = 1;
  if (e instanceof Error) console.log(`::error::${e.message}`);
});
