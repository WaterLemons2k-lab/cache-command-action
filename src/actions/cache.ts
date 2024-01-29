import { _createFile, _deleteFile } from "./internal/file";
import * as cache from "@actions/cache";

/**
 * Return true if found the cache, otherwize return false.
 * @param file The file to be found from the cache
 * @param output an explicit output for found the cache
 * @returns boolean
 */
export async function isCacheFound(
  file: string,
  output: string
): Promise<boolean> {
  const cacheOutput = await cache.restoreCache([file], output, [], {
    lookupOnly: true,
  });

  if (!cacheOutput) {
    // Create a cache file to be used as a placeholder before saving cache
    _createFile(file);
    const cacheId = await cache.saveCache([file], output);

    if (cacheId !== -1) {
      console.log(`Cache saved with output: ${output}`);
    }

    // Delete the file after saving cache as it is no longer needed
    _deleteFile(file);
    return false;
  }

  console.log(`Cache found from output: ${output}`);
  return true;
}
