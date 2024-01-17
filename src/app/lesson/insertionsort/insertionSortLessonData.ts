
export const insertionSortSteps = [
  {
    title: "Starting the Sort",
    steps: [
      "Start from the second element of the array (assuming the first element is the sorted portion).",
      "This element is referred to as the 'key'.",
    ]
  },
  {
    title: "Compare with Sorted Portion",
    steps: [
      "Compare the key with each element in the sorted portion (from right to left).",
      "If the key is smaller, shift the sorted element to the right.",
    ]
  },
  {
    title: "Insert the Key",
    steps: [
      "Once you find an element smaller than the key, or reach the start of the array, insert the key.",
      "The sorted portion of the array now increases by one element.",
    ]
  },
  {
    title: "Repeat for Next Element",
    steps: [
      "Move to the next element and repeat the process until the array is fully sorted.",
    ]
  }
];

export const walkthroughSteps = [
  {
    description: "Pass 1:",
    array: [8, 4, 3, 7, 5],
    steps: [
      "Starting from index 1 (value 4), compare with previous elements.",
      "Swap 4 and 8 (as 4 < 8).",
      "No more elements to compare, move to next index."
    ],
    conclusion: [
      "After the first pass, the array is partially sorted: [4, 8, 3, 7, 5].",
      "The number 4 is inserted in its correct position."
    ]
  },
  {
    description: "Pass 2:",
    array: [4, 8, 3, 7, 5],
    steps: [
      "At index 2 (value 3), compare with previous elements.",
      "Swap 3 and 8, then 3 and 4 (as 3 < 4 and 3 < 8).",
      "No more elements to compare, move to next index."
    ],
    conclusion: [
      "The array now looks like this: [3, 4, 8, 7, 5].",
      "The number 3 is inserted in its correct position."
    ]
  },
  {
    description: "Pass 3:",
    array: [3, 4, 8, 7, 5],
    steps: [
      "At index 3 (value 7), compare with previous elements.",
      "Swap 7 and 8 (as 7 < 8).",
      "No need to swap 7 with 4 or 3, move to next index."
    ],
    conclusion: [
      "Now the array is: [3, 4, 7, 8, 5].",
      "The number 7 is inserted in its correct position."
    ]
  },
  {
    description: "Pass 4:",
    array: [3, 4, 7, 8, 5],
    steps: [
      "At index 4 (value 5), compare with previous elements.",
      "Swap 5 with 8, then with 7.",
      "No need to swap 5 with 4 or 3."
    ],
    conclusion: [
      "Finally, the array is fully sorted: [3, 4, 5, 7, 8].",
      "The number 5 is inserted in its correct position."
    ]
  }
];
