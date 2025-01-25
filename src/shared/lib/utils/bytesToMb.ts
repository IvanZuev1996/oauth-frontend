/**
 * @description Convert bytes to megabytes
 */
export const bytesToMb = (bytes: number) => {
  return Math.trunc(bytes / Math.pow(10, 6));
};
