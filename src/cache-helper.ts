import { closeSync, openSync, unlinkSync } from "node:fs";
import * as cache from "@actions/cache";

/**
 * Check if the cache has been found
 * @param file The file to be found from the cache
 * @param output an explicit output for found the cache
 * @returns True if the cache found, false otherwise
 */
export default async function isCacheFound(
  file: string,
  output: string
): Promise<boolean> {
  const cacheOutput = await cache.restoreCache([file], output, [], {
    lookupOnly: true,
  });

  if (!cacheOutput) {
    // Create the cache file to be used as a placeholder before saving cache
    closeSync(openSync(file, "w"));
    const cacheId = await cache.saveCache([file], output);

    if (cacheId !== -1) {
      console.log(`Cache saved with output: ${output}`);
    }

    // Delete the file after saving cache as it is no longer needed
    console.log(`Starting to delete cache file: ${file}`);
    unlinkSync(file);
    console.log(`Deleted cache file: ${file}`);
    return false;
  }

  console.log(`Cache found from output: ${output}`);
  return true;
}
