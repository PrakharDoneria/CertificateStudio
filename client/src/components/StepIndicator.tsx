import React from "react";
import { FileText, Eye, Download } from "lucide-react";

type StepIndicatorProps = {
  currentStep: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, name: "Information", icon: FileText },
    { number: 2, name: "Preview", icon: Eye },
    { number: 3, name: "Download", icon: Download },
  ];

  return (
    <div className="px-4 mb-10 mt-6">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Step circles */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.number}
                className={`
                  ${
                    index < currentStep
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : index === currentStep
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md ring-4 ring-blue-100"
                      : "bg-white text-gray-400 border-2 border-gray-200"
                  } 
                  rounded-full h-12 w-12 flex items-center justify-center text-sm font-medium transition-all duration-200
                `}
              >
                <StepIcon className="h-5 w-5" />
              </div>
            );
          })}
        </div>
        
        {/* Step labels */}
        <div className="relative flex justify-between mt-4">
          {steps.map((step, index) => (
            <div 
              key={`label-${step.number}`}
              className={`text-sm font-medium text-center transition-colors duration-200 ${
                index <= currentStep
                  ? "text-blue-700"
                  : "text-gray-500"
              }`}
              style={{ width: '80px', marginLeft: index === 0 ? '0' : index === steps.length - 1 ? 'auto' : '-40px' }}
            >
              {step.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
