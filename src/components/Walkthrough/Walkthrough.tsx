import React from "react";

type WalkthroughStep = {
  description: string;
  array: number[];
  steps?: string[];
  conclusion: string[];
};

type WalkthroughProps = {
  walkthroughSteps: WalkthroughStep[];
};

export const Walkthrough: React.FC<WalkthroughProps> = ({
  walkthroughSteps,
}) => {
  return (
    <div className="space-y-4">
      {walkthroughSteps.map((step: WalkthroughStep, index: number) => (
        <div key={index} className="mb-4">
          {step.steps && (
            <div>
              <p className="text-lg font-semibold">
                <strong>{step.description}</strong>
              </p>
              <p className="text-sm mb-2">Array state:</p>
              <div className="flex space-x-4">
                {step.array.map((value, i) => (
                  <div
                    key={i}
                    className={`border mb-2 p-2 rounded ${
                      value > 9 ? "border-emerald-400" : "border-gray-500"
                    }`}
                  >
                    {value > 9 ? value / 10 : value}
                  </div>
                ))}
              </div>
              <ul>
                {" "}
                Steps:
                {step.steps.map((step, subIndex) => (
                  <li key={subIndex} className="text-sm">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="my-2">
            {step.conclusion.map((conclusion, subIndex) => (
              <p key={subIndex} className="text-sm">
                {conclusion}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
