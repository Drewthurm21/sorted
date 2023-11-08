export function generateRandomNumber(max: number): number {
  return Math.floor(Math.random() * max) + 1;
}

export function generateNewListData(length: number): {}[] {
  return Array.from({ length }, () => generateRandomNumber(500)).map(
    (val, i) => ({
      id: i + 1,
      value: val,
    })
  );
}
