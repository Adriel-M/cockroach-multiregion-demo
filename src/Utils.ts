export async function measureTimeMillis<T>(
  fn: () => Promise<T>,
): Promise<[T, number]> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  // get rid of decimals
  const millis = ~~(end - start);
  return [result, millis];
}
