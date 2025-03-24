import React, { useEffect, useRef } from 'react';
import { Step } from '../types/collatz';

interface Props {
  steps: Step[];
  hasLoop: boolean;
  error: string | null;
}

export function StepsDisplay({ steps, hasLoop, error }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastStepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (steps.length > 0 && lastStepRef.current) {
      lastStepRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [steps]);

  const isLoopError = error?.startsWith('Loop detected:');

  return (
    <div className="bg-gray-900 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
      {error && (
        <div className={`mb-4 p-2 border rounded ${
          isLoopError
            ? 'text-red-500 border-red-500' 
            : 'text-yellow-500 border-yellow-500'
        }`}>
          ⚠️ {error}
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
        style={{ willChange: 'transform' }}
      >
        <div className="px-2">
          {steps.map((step, index) => {
            const isLoopNumber = error?.includes(`${step.number} appears`);
            return (
              <div
                key={step.step}
                ref={index === steps.length - 1 ? lastStepRef : null}
                className={`grid grid-cols-[1fr_2fr_3fr] gap-6 sm:gap-8 border-t border-green-900 py-2 ${
                  isLoopNumber ? 'bg-red-900/20' : ''
                }`}
              >
                <div>{step.step}</div>
                <div>{step.number}</div>
                <div className="font-bold break-all">{step.binary}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}