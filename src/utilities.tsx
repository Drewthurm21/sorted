export const generateRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};

export const generateRandomNumberList = (length: number) => {
  return Array.from({ length }, () => generateRandomNumber(1000));
};

export const generateNewListData = (
  length: number
): { id: number; value: number }[] => {
  return Array.from({ length }, () => generateRandomNumber(1000)).map(
    (val, i) => ({ id: i + 1, value: val })
  );
};

export const swapListValues = (arr: number[], a: number, b: number) => {
  [arr[a], arr[b]] = [arr[b], arr[a]];
};

export const generateBubbleSortSteps = (array: any[]) => {
  const arr = [...array];
  const swappedPositions: number[][] = [];
  let swappedElements = true;

  while (swappedElements) {
    swappedElements = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value > arr[i + 1].value) {
        swappedPositions.push([i, i + 1]);
        swapListValues(arr, i, i + 1);
        swappedElements = true;
      }
    }
  }

  return swappedPositions.reverse();
};

export const sortingAlgos = {
  bubblesort: generateBubbleSortSteps,
};
