import { closeSync, openSync, unlinkSync } from 'node:fs';

/**
 * Create a empty file
 * @param file File to be created
 */
export const _createFile = (file: string) => {
  closeSync(openSync(file, 'w'));
};

/**
 * Delete a file
 * @param file File to be deleted
 */
export const _deleteFile = (file: string) => {
  unlinkSync(file);
};
