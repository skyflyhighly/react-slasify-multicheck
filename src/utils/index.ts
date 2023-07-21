// Sort Arrays by Columns
export const arrangeArrayByColumns = <T>(
  options: T[],
  columns: number
): T[] => {
  let n = options.length;
  let base = Math.floor(n / columns);
  let extra = n % columns;

  let result = [];

  for (let i = 0; i < base; i++) {
    let addColumnsCount = 0;
    for (let j = 0; j < columns; j++) {
      if (j > 0) addColumnsCount += j <= extra ? base + 1 : base;
      result.push(options[i + addColumnsCount]);
    }
  }

  for (let i = 0; i < extra; i++) {
    let addColumnsCount = 0;
    if (i > 0) addColumnsCount += i <= extra ? base + 1 : base;
    result.push(options[base + addColumnsCount]);
  }

  return result;
};
