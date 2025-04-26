import { stat, symlink } from 'fs/promises';
import fs from 'fs';
import { exec as execSync } from 'child_process';
import { promisify } from 'util';
import { logger } from './logger.js';

// exec
export const exec = promisify(execSync);

// exists
export function existsSync(path, type = 'none') {
  try {
    type = type.toLocaleLowerCase();
    const stats = fs.statSync(path);

    if (type === 'file') {
      return stats.isFile();
    }
    if (type === 'dir' || type === 'directory') {
      return stats.isDirectory();
    }
    if (type === 'symlink' || type === 'sym' || type === 'link' ) {
      return stats.isSymbolicLink();
    }
    
    return true;
  } catch (error) {
    // returns if it does not exist or isn't accessible
    logger(error, 'error', 'debug');
    return false;
  }
}

export async function exists(path, type = 'none') {
  try {
    type = type.toLocaleLowerCase();
    const stats = await stat(path);
    if (type === 'file') {
      return stats.isFile();
    }
    if (type === 'dir' || type === 'directory') {
      return stats.isDirectory();
    }
    return true;
  } catch (error) {
    // returns if it does not exist or isn't accessible
    //logger(error, 'error', 'debug');
    //logger(`${path} does not exist`, 'error', 'debug');
    return false;
  }
}

// symlink
export async function createSymlinkSync(sourcePath, linkPath, type = 'file') {
  try {
    fs.symlinkSync(sourcePath, linkPath, type);
    logger(`Created symlink: ${sourcePath} -> ${linkPath}`);
  } catch (error) {
    logger('Failed to create symlink', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to create symlink');
  }
}

export async function createSymlink(sourcePath, linkPath, type = 'file') {
  try {
    await symlink(sourcePath, linkPath, type);
    logger(`Created symlink: ${sourcePath} -> ${linkPath}`);
  } catch (error) {
    logger('Failed to create symlink', 'error', 'error');
    logger(error, 'error', 'debug');
    throw new Error('Failed to create symlink');
  }
}
