export const generateRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};

export const generateRandomNumberList = (length: number) => {
  return Array.from({ length }, () => generateRandomNumber(500));
};

export const generateNewListData = (
  length: number
): { id: number; value: number }[] => {
  return Array.from({ length }, () => generateRandomNumber(500)).map(
    (val, i) => ({ id: i + 1, value: val })
  );
};

export const generateBubbleSortSteps = (array: any[]) => {
  console.log(array);
  const arr = [...array];
  const swappedPositions: number[][] = [];
  let swappedElements = true;

  while (swappedElements) {
    swappedElements = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].value > arr[i + 1].value) {
        swappedPositions.push([i, i + 1]);
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swappedElements = true;
      }
    }
  }

  console.log(swappedPositions, "<-- swaps");
  return swappedPositions.reverse();
};

export const sortingAlgos = {
  bubbleSort: generateBubbleSortSteps,
};
