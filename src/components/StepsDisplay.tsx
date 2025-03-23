import React, { useEffect, useRef } from 'react';
import { Step } from '../types/collatz';

interface Props {
  steps: Step[];
  hasLoop: boolean;
}

export function StepsDisplay({ steps, hasLoop }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastStepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (steps.length > 0 && lastStepRef.current) {
      lastStepRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [steps]);

  return (
    <div className="bg-gray-900 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
      {hasLoop && (
        <div className="mb-4 text-red-500 font-bold p-2 border border-red-500 rounded">
          ⚠️ Loop detected! Calculation stopped.
        </div>
      )}
      <div className="grid grid-cols-[1fr_2fr_3fr] gap-6 sm:gap-8 mb-2 text-green-300 px-2">
        <div>Step</div>
        <div>Decimal</div>
        <div>Binary</div>
      </div>
      <div 
        ref={containerRef} 
        className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="px-2">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={index === steps.length - 1 ? lastStepRef : null}
              className="grid grid-cols-[1fr_2fr_3fr] gap-6 sm:gap-8 border-t border-green-900 py-2"
            >
              <div>{step.step}</div>
              <div>{step.number}</div>
              <div className="font-bold break-all">{step.binary}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}