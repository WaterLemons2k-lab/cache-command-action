import isCacheFound from "./helper/cache";
import { getExecOutput } from "@actions/exec";
import { getInput, setOutput } from "./util/io";

async function run(file: string) {
  const output = (await getExecOutput(getInput("run", true))).stdout.trim();
  if (!output) throw new Error("stdout is null");
  setOutput("output", output);

  // Set the output hit depending on whether the cache is found or not
  const cacheFound = await isCacheFound(file, output);
  setOutput("hit", cacheFound);
}

// Cache file used as a placeholder
const file = ".cache-command-action-file";

run(file).catch((e) => {
  process.exitCode = 1;
  if (e instanceof Error) {
    console.log(`::error::${e.message}`);
    console.log(e.stack);
  }
});
