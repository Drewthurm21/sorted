export function generateBubbleSortAnimations(arr: number[]): number[][] {
  const arrayCopy = [...arr];
  const bubbleSortAnimations = []
  let swapped;

  while (!swapped) {
    swapped = false;
    for (let i = 0; i < arrayCopy.length - 1; i++) {
      if (arrayCopy[i] > arrayCopy[i + 1]) {
        bubbleSortAnimations.push([i, i+1])
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swapped = true;
      }
    }
  } ;

  return bubbleSortAnimations;
};

