import { closeSync, openSync, unlinkSync } from "node:fs";
import { isFeatureAvailable, restoreCache, saveCache } from "@actions/cache";

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
  if (!isFeatureAvailable()) {
    throw new Error("Cache is not available");
  }

  const cacheOutput = await restoreCache([file], output, [], {
    lookupOnly: true,
  });

  // Cache found
  if (cacheOutput) {
    console.log(`Cache found from output: ${output}`);
    return true;
  }

  // Cache not found
  // Create the cache file to be used as a placeholder before saving cache
  closeSync(openSync(file, "w"));
  const cacheId = await saveCache([file], output);

  if (cacheId !== -1) {
    console.log(`Cache saved with output: ${output}`);
  }

  // Delete the file after saving cache as it is no longer needed
  unlinkSync(file);
  return false;
}
