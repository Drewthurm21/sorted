export const bubbleSortSteps = [
  {
    title: "Initialize",
    steps: ["Assign a variable 'n' to the length of the list.", "Initialize a variable called 'swapped'"]
  },
  {
    title: "(Outer Loop) - Repeat Until No Swaps Occur",
    steps: [
      "Begin a do-while loop that continues as long as the variable swapped is true.",
      "Inside the loop, set swapped to false at the start of each iteration."
    ]
  },
  {
    title: "(Inner Loop) - Iterate Through the List",
    steps: [
      "After we've set our 'swapped' variable, begin a for loop that iterates from 1 to n - 1."
    ]
  },
  {
    title: "Compare Adjacent Elements",
    steps: [
      "Within the inner loop, compare the element at index i-1 with the element at index i in the list.",
      "If they're in the wrong order execute step 5, else skip to step 6."
    ]
  },
  {
    title: "Swap Elements and Mark Swap",
    steps: [
      "Swap the elements at positions i-1 and i in the list.",
      "Set the swapped variable to true, indicating that a swap has occurred."
    ]
  },
  {
    title: "End of Inner Loop",
    steps: [
      "End the for loop."
    ]
  },
  {
    title: "(Outer Loop) - Repeat If Swapped",
    steps: [
      "Check if swapped is true.",
      "If true, repeat the entire process from step 3."
    ]
  },
  {
    title: "End of Algorithm",
    steps: [
      "Once the do-while loop exits because swapped is false, the list is sorted, and the Bubble Sort algorithm concludes."
    ]
  }
];

export const walkthroughSteps = [
  {
    description: "Pass 1:",
    array: [7, 2, 9, 1, 5],
    steps: [
      "Compare 7 and 2 (swap)",
      "Compare 7 and 9 (no swap)",
      "Compare 9 and 1 (swap)",
      "Compare 9 and 5 (swap)",
    ],
    conclusion: ["We have made a few swaps in the first pass, and our array now looks like this: [2, 7, 1, 5, 9]", "Notice how by swapping adjacent elements we've successfully 'bubbled' the largest number up to its proper place in the array. Let's repeat the process."]
  },
  {
    description: "Pass 2:",
    array: [2, 7, 1, 5, 90],
    steps: [
      "Compare 2 and 7 (no swap)",
      "Compare 7 and 1 (swap)",
      "Compare 7 and 5 (swap)",
      "Compare 7 and 9 (no swap)",
    ],
    conclusion: ["Again we have some swaps, and our array looks like this now: [2, 1, 5, 7, 9]", "Now there are three numbers sorted into their correct spots. We're making good progress, let's keep going!"]
  },
  {
    description: "Pass 3:",
    array: [2, 1, 50, 70, 90],
    steps: [
      "Compare 2 and 1 (swap)",
      "Compare 2 and 5 (no swap)",
      "Compare 5 and 7 (no swap)",
      "Compare 7 and 9 (no swap)",
      
    ],
    conclusion: ["After this pass here's what our array looks like: [1, 2, 5, 7, 9]", "We've successfully sorted the array! However, since we made a swap on this pass we will still have to repeat the process."]
  },
  {
    description: "Pass 4:",
    array: [10, 20, 50, 70, 90],
    steps: [
      "Compare 1 and 2 (no swap)",
      "Compare 2 and 5 (no swap)",
      "Compare 5 and 7 (no swap)",
      "Compare 5 and 5 (no swap)",
    ],
    conclusion: ["Finally, since we made no swaps on this pass, we can assume that our array is sorted. Great job!"]
  }
];
