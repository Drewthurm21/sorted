import Link from "next/link";
import { bubbleSortSteps, walkthroughSteps } from "./bubbleSortLessonData";
import { Walkthrough } from "@/components/Walkthrough/Walkthrough";

const BubbleSortArticle: React.FC = () => {
  const letters = ["a", "b", "c", "d"];

  return (
    <div className="max-w-3xl my-12 mx-auto p-6 h-full overflow-scroll">
      <h1 className="text-4xl font-bold mb-4">
        Understanding Bubble Sort in JavaScript
      </h1>
      <h2 className="text-3xl font-bold mt-8">The overview</h2>
      <p className="text-lg leading-relaxed mb-6">
        Bubble Sort is a simple and elementary sorting algorithm used for
        sorting arrays. At a high level, Bubble Sort works by comparing adjacent
        elements in an array and swapping them if they are in the wrong order.
        This process is repeated for each pair of adjacent elements in the array
        until the entire array is sorted. Despite its inefficiency, Bubble Sort
        is often used for educational purposes to introduce fundamental concepts
        of sorting algorithms.
      </p>
      <h2 className="text-2xl font-bold mt-8">The concept</h2>
      <p className="text-lg leading-relaxed mb-2">
        Imagine you have a list of numbers that you wanted to sort in ascending
        order. You could sort it by starting at the beginning of the list and
        comparing each set of adjacent elements. If the elements are in the
        wrong order, you swap them. You continue this process until you reach
        the end of the list. At this point you know that at least one element,
        the last element in the list, is in its correct position. Furthermore,
        some other elements may have &apos;bubbled&apos; up to their correct
        positions as well. You can start back at the beginning of the list and
        repeat this process until the entire list is sorted.
      </p>
      <h2 className="text-2xl font-bold mt-8">Example walkthrough</h2>
      <p className="text-lg leading-relaxed mb-6">
        Bubble Sort uses nested loops, so in this example each pass will
        represent a single iteration through the outer loop, and each step
        listed in the pass will represent comparisons made in the inner loop.
        Let&apos;s walk through an example of how the algorithm would work if we
        were to use it on the following array: [7, 2, 9, 1, 5]
      </p>
      <p></p>
      <Walkthrough walkthroughSteps={walkthroughSteps} />
      <h2 className="text-2xl font-bold mt-8">The strategy</h2>
      <p className="text-md leading-relaxed">
        Now that we have a pretty good idea of how it works, lets think about
        how we would execute it in code. Here is what our pseudocode might look
        like...
      </p>
      <div className="space-y-3 my-6">
        {bubbleSortSteps.map((step, index) => (
          <div key={index}>
            <div className="text-lg font-semibold">
              {`${index + 1}. ${step.title}`}
            </div>
            {step.steps && (
              <ul className="pl-6">
                {step.steps.map((subStep, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-sm"
                  >{`${letters[subIndex]}. ${subStep}`}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">Code Walkthrough</h2>

      <p className="text-md leading-relaxed mb-6">
        Now that we have our plan written, let&apos;s write some code!
      </p>

      <pre className="bg-gray-50 bg-opacity-10 p-4 rounded">
        {`
    function bubbleSort(arr) {
        // Set a variable so we don't have to call .length on each iteration
        const n = arr.length;

        // Create a flag to track whether any swaps occur in the inner loop
        let swapped;

        // Begin outter loop
        do {

          // Set swapped to false at the beginning of each pass
          swapped = false;
          
          // Begin inner loop
          for (let i = 1; i < n; i++) {
            
            // Swap elements if they are in the wrong order
            if (arr[i - 1] > arr[i]) {
              [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
              
              // Set swapped to true if a swap occurs
              swapped = true;
            }
          }
          
          // Loop through the array until no swaps occur
        } while (swapped);

        return arr;
    }
  `}
      </pre>

      <h2 className="text-2xl font-bold mt-8">Time & Space Complexity</h2>

      <p className="text-lg leading-relaxed mb-6">
        The time complexity of Bubble Sort is O(n^2) in the worst and average
        cases. This is because, in each pass, it compares and swaps adjacent
        elements, resulting in a nested loop structure. The space complexity of
        Bubble Sort is O(1), indicating that the algorithm uses a constant
        amount of extra space. This is because Bubble Sort only requires a
        constant amount of additional memory for variables like swapped and i.
      </p>

      <h2 className="text-2xl font-bold mt-8">Conclusion</h2>
      <p className="text-lg leading-relaxed mb-20">
        In conclusion, while Bubble Sort is a simple algorithm, it&apos;s not
        the most efficient for large datasets. Understanding its inner workings
        can provide valuable insights into the basics of sorting algorithms.
      </p>

      <div className="flex flex-col items-center">
        <p className="text-lg leading-relaxed">Check it out in the</p>
        <Link href="/visualizer/bubblesort">visualizer!</Link>
      </div>
    </div>
  );
};

export default BubbleSortArticle;
