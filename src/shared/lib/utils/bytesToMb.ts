export const bytesToMb = (bytes: number) => {
  return Math.trunc(bytes / Math.pow(10, 6));
};
