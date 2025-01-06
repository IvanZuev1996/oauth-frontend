/**
 * Async timeout
 */
export const timeout = async (delay = 0): Promise<void> => {
  await new Promise((resolve: (v?: unknown) => void) => {
    setTimeout(() => resolve(), delay);
  });
};
