#### Throughout all phases, this documentation will be updated to guide users on what is new, challenges I've faced, and solutions I've come up with. It will include instructions on how to use the platform effectively, or clone and deploy it on multiple platforms.

# Sorted_Project Overview:

- **Purpose:**

  - The primary purpose of the "algoVIs" project is to provide a platform for mastering and learning about commonly used algorithms for sorting, array manipulation, tree and graph traversal, and linked list operations. Additionally, the project aims to build a pathfinding algorithm visualizer in the future.

- **Target Audience:**
  - The target audience includes computer science students, coding bootcamp participants, and anyone interested in learning and mastering algorithms. The project will also serve as a valuable addition to your professional portfolio.

# Technologies:

- **Front-End:**

  - Next.js with TypeScript will be used for building the front-end of the website.
  - Tailwind and SaSS modules will be employed for styling and design.
  - headlessUI will provide some menu components for ease of use.
  - Framer Motion will be used to enhance the user experience with animations and transitions.

- **Back-End:**
  - None for now.

# MVP Features:

- **Algorithm Visualization:**

  - Users will be able to visually understand how sorting algorithms work through animations and interactive representations.

- **Algorithm Selection:**

  - Users can choose from a list of sorting algorithms to visualize and learn about.

- **Input Options:**

  - Various input options will be available, allowing users to input their own data or select from predefined datasets.

- **User Controls:**

  - Users will have control over the visualization process, with options to start, pause, reset, and step through the sorting algorithm's execution.

- **Algorithm Write-ups:**

  - Detailed explanations and code samples for each algorithm will be provided to help users understand the underlying logic.

- **Code Samples:**
  - Implementation examples will be given for JavaScript and Python, to start.

# Project Phases:

- **Array Sorting Visualizations:**

  - The first phase will focus on implementing a few fundamental array sorting algorithms and creating write-ups for each, then implementing visualizations for each sorting algorithm. The first algorithms implemented will be Bubble Sort, Merge Sort, Insertion Sort, and Quick Sort.

- **Pathfinding Visualizer (Future):**

  - The next phase of the project will involve building a pathfinding algorithm visualizer to explore algorithms like Dijkstra's and A\* for navigation and optimization.

- **Expansion to Other Algorithms:**
  - After completing the initial phase and path-finding algorithms, the project will expand to include visualizations and explanations for algorithms related to trees, graphs, and linked lists.

# Design and User Interface:

- The user interface will be intuitive and user-friendly, with a clean layout. Algorithm selection, input options, and user controls will be easily accessible via the navigation and sidebars.
- Visualizations will be prominently displayed to enhance the learning experience. Algorithm write-ups and code samples will be presented alongside the visualization area for reference and learning.

# Testing Strategy:

- Rigorous testing will be conducted on various browsers and devices to ensure compatibility. Functional test sets will be written and performed to verify the correctness of algorithms and their visualizations. User testing is encouraged to gather feedback for improvements - feel free to email me here:
  <drewthurmcodes@gmail.com>

# Blog:

-11/23

<details>

<summary> The first iteration of the actual visualizer for each of the algos is tentatively done. Inside are some details about my thought processes while building, notes on drawbacks or roadblocks, and how I decided to solve these issues. </summary>

- I started by creating functions to generate a list of random numbers, and employed useState to store the generated "sortingArray", and mapped over these values in the jsx to create a column for each.

  - <details>
        <summary> columns code:</summary>
      
      ```typescript
          function ArrayElementNode({ color, label }: { color: string; label: string }) {
            return (
              <div className={`flex h-full w-3 justify-center items-end text-xs ${color}`}>
                <div className="translate-y-6 -rotate-45 text-white">{label}</div>
              </div>
            );
          }

          <div className="flex gap-4 h-1/2 w-full justify-center items-end">
            {sortingArray.map((value: number, idx: number, arr: number[]) => {
              return (
                <div className="array-element-node" style={{ height: value }}>
                  <ArrayElementNode
                    key={idx}
                    label={arr.length < 30 ? ${value} : ""}
                    color={"bg-blue"}
                  />
                </div>
              );
            })}
          </div>

  - [x] While testing I noticed column labels tend to overlap and look ugly when the list is above 30-40 elements.

- With the ability to create a random array of numbers and render them on the screen, the next step would be to implement a version of bubble sort that keeps track of the steps it took to sort the array. For this step I modified traditional bubbleSort to create an auxiliary array called animationFrames. The plan is to push a copy of the sortingArray to animationFrames on each iteration of the inner loop. This would give me a snapshot of the sortingArray's state after every comparison. I could use these captured array states to illustrate the steps taken to sort the input array.

  - <details>
      <summary> bubbleSort code: </summary>

    ```typescript
      generateBubbleSortAnimations(arr: number[]): number[][] {
        const arrayCopy = [...arr];
        const bubbleSortAnimations = []
        let swapped = true;

        while (swapped) {
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
    ```

    </details>

  - [x] I realized that this was wasteful, as it would produce an unused animation frame when the numbers being compared are already in order. Also, since I'm only concerned with the positions being changed, I modified it to store the two positions being swapped only when I've made a change.

- The next order of business would be to create a function, handleFrame, which would handle a single animation frame by modifying the currently rendered array elements to reflect the new state of the array. I imagined 3 visual indicators to guide the user through the steps. First, I would change the colors of the elements to be swapped. Next I would swap the style properties and labels of the two elements, and finally I would return them to the default color. I used regular DOM manipulation to achieve all of this, like so:

  - <details>
        <summary> handleFrame code: </summary>

        ```typescript
        const handleFrame = (frameNumber: number, col1: any, col2: any) => {
          let c1h = col1.style.height;
          let c2h = col2.style.height;
          let el1 = col1.firstChild;
          let el2 = col2.firstChild;
          let text = el1.firstChild.innerText;

          if (frameNumber % 3 === 1) {
            el1.style.backgroundColor = "red";
            el2.style.backgroundColor = "purple";
          } else if (frameNumber % 3 === 2) {
            el1.style.backgroundColor = "purple";
            el2.style.backgroundColor = "red";
            el1.firstChild.innerText = el2.firstChild.innerText;
            el2.firstChild.innerText = text;
            col1.style.height = c2h;
            col2.style.height = c1h;
          } else {
            el1.style.backgroundColor = "blue";
            el2.style.backgroundColor = "blue";
          }

          };

          ```

      </details>

- With these steps completed I could begin to put everything together. My plan was to iterate over the animation frames, creating a set of nested timeouts. The higher order timeout would be responsible for grabbing the proper array columns and creating 3 staggered calls to the handleFrame function described above. To start and stop the animations I decided to employ useEffect's dependancy array in conjunction with a slice of local state called "sortingInProgress", which the "Sort" button would manipulate. It's not the most beautiful code, but this is what I came up with for the first iteration:

  - <details>
        <summary> useEffect code:</summary>
      
      ```typescript
        useEffect(() => {
          if (!sortingInProgress) return;
          const animationFrames = generateBubbleSortAnimations(sortingArray);
          for (let i = 0; i < animationFrames.length; i++) {
            setTimeout(() => {
              const arrayElements = document.querySelectorAll(
                ".array-element-node"
              );
              const [pos1, pos2] = animationFrames[i];
              const col1 = arrayElements[pos1];
              const col2 = arrayElements[pos2];
              for (let idx = 1; idx <= 3; idx++) {
                setTimeout(() => {
                  handleFrame(idx, col1, col2);
                }, idx * 15);
              }
            }, i * 45);
          }
        }, [sortingInProgress]);
        ```
    </details>

- Lastly, I made a few simple buttons. One to start the sorting visualization, and one to create / render a new list of values. So. The creation is complete. It works but, even aside from sloppy first-attempt code, there are drawbacks and things that I would like to refactor. Here are some of the things I'd like to improve on the next iteration:

  1. The visualization is kind of jarring. It gets the point across, but it's not pretty.
     - _a._ the columns don't move horizontally, they just swap sizes.
     - _b._ since there are no transitions the changes happen instantly.
     - _c._ faster animation speeds make this look like "blur of color, then done" - not the desired effect & useless for teaching
  2. Once animations start, they cannot be stopped.
     - _b._ it is not possible to pause, rewind or reset back to the original list order.
     - _a._ if a new list is generated during animation, the column values update but the animations continue.

  </details>

<details>

<summary> The second iteration of the visualizer is mostly complete. In this iteration of the component I wanted to improve the animation of array columns as they were being sorted. I also wanted to address the rendering strategy. Inside you'll find some details about the process. </summary>

## Problem 1 - Once animations start, they cannot be stopped.

- This is because all of the timeouts are placed onto the message queue synchronously. So even after the array values are changed, or sortingInProgress is toggled to false, handleFrame continues to be called as the timeouts resolve. My first response was to store each timeout id as it was being created in a ref, then clear them using a loop if the "cancel" button was clicked, but I was unsuccessful.

- After a bit more thought I decide to look at this from a different angle and try a recursive approach. Here's what I came up with.

  - <details>
    <summary> the plan:</summary>

    1. use useRef to store:

       - animationFramesRef: the array of animation steps taken
       - timeoutRef: the ID of the current pending setTimeout

    2. use useState to store:

       - arrayValues: the list values to be mapped and sorted
       - columns: html elements created by mapping over arrayValues
       - sortingInProgress: used to toggle sorting on or off

    3. create a useEffect that will:

       - call a recursive function, "animateFrames", if sortingInProgress is true
       - return a cleanup function calls clearTimeout on timeoutRef

    4. animateFrames will:

       - create a new timeout whose callback will:
         - remove one frame from the animationFramesRef
         - call a helper function, "swapColumns", passing the removed animation frame
       - update timeoutRef with the new ID

    5. swapColumns will:

       - use the animation frame to swap the elements of "arrayValues"
       - call setArrayValues with the newly mutated array triggering a rerender, and starting the process over
       </details>

  - <details> 
    <summary>the code:</summary>

    ```javascript
    useEffect(() => {
      if (!sortingInProgress) return;
      if (!animationFramesRef.current.length)
        animationFramesRef.current = sortingAlgos["bubbleSort"](arrayValues);
      animateFrames();
      return () => clearTimeout(timeoutRef.current);
    }, [arrayValues, columns, sortingInProgress]);

    const animateFrames = () => {
      timeoutRef.current = setTimeout(() => {
        if (animationFramesRef.current.length)
          swapColumns(...animationFramesRef.current.pop());
      }, ANIMATION_SPEED * 1000);
    };

    const swapColumns = (...pos: number[]) => {
      let [a, b] = pos;
      [arrayValues[a], arrayValues[b]] = [arrayValues[b], arrayValues[a]];
      setColumns(createColumns(arrayValues));
    };
    ```

    </details>

- Users can pause sorting any time, and if the array is reset during sorting then animations stop automatically. Additionally I feel like this code is quite a bit cleaner so I'm happy with the results, for now.
