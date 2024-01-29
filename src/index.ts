import isCacheFound from "./cache-helper";
import getCommandOutput from "./command";
import { getInput, setFailed, setOutput } from "@actions/core";

async function run(file: string): Promise<void> {
  // Getting the output of the input run
  const output = await getCommandOutput(getInput("run", { required: true }));
  setOutput("output", output);

  // Set the output hit depending on whether the cache is found or not
  const cacheFound = await isCacheFound(file, output);
  setOutput("hit", cacheFound);
}

// Cache file used as a placeholder
const file = ".cache-command-action-file";

run(file);
