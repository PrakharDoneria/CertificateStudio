import React from "react";

type StepIndicatorProps = {
  currentStep: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, name: "Information" },
    { number: 2, name: "Preview" },
    { number: 3, name: "Download" },
  ];

  return (
    <div className="px-4 mb-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`${
                index < currentStep
                  ? "bg-green-500 text-white"
                  : index === currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              } rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium`}
            >
              {step.number}
            </div>
          ))}
        </div>
        <div className="relative flex justify-between px-1 mt-2">
          {steps.map((step, index) => (
            <span
              key={`label-${step.number}`}
              className={`text-sm font-medium ${
                index === currentStep
                  ? "text-primary"
                  : "text-gray-500"
              }`}
            >
              {step.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
