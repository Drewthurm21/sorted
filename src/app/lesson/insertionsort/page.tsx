import {
  insertionSortSteps,
  walkthroughSteps,
} from "./insertionSortLessonData";
import { Walkthrough } from "../../../components/Walkthrough/Walkthrough";

const InsertionSortArticle: React.FC = () => {
  return (
    <div className="max-w-3xl my-12 mx-auto p-6 h-full overflow-scroll">
      <h1 className="text-4xl font-bold mb-4">
        Understanding Insertion Sort in JavaScript
      </h1>

      <h2 className="text-3xl font-bold mt-8">The overview</h2>
      <p className="text-lg leading-relaxed mb-6">
        Insertion sort is a simple sorting algorithm that builds the final
        sorted array one item at a time. It is much less efficient on large
        lists than more advanced algorithms such as quicksort, heapsort, or
        merge sort. However, insertion sort provides several advantages: it is
        simple to implement, it can sort a list as it receives it, and it is
        more efficient in practice than most other simple quadratic algorithms
        such as bubble sort.
      </p>

      <Walkthrough walkthroughSteps={walkthroughSteps} />

      {insertionSortSteps.map((step, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-2xl font-bold">{step.title}</h3>
          <ul className="list-disc list-inside">
            {step.steps.map((subStep, subIndex) => (
              <li key={subIndex} className="text-lg leading-relaxed">
                {subStep}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default InsertionSortArticle;
