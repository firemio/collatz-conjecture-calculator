import React from 'react';
import { CollatzRules } from '../types/collatz';

interface Props {
  startNumber: number;
  setStartNumber: (n: number) => void;
  delay: number;
  setDelay: (n: number) => void;
  rules: CollatzRules;
  setRules: (rules: CollatzRules) => void;
  isCalculating: boolean;
  onCalculate: () => void;
  onReset: () => void;
}

export function ControlPanel({
  startNumber,
  setStartNumber,
  delay,
  setDelay,
  rules,
  setRules,
  isCalculating,
  onCalculate,
  onReset,
}: Props) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
          <label className="block mb-2 text-sm sm:text-base">Starting Number:</label>
          <input
            type="number"
            min="1"
            value={startNumber}
            onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
            className="bg-black border border-green-500 text-green-500 p-2 rounded w-full text-sm sm:text-base"
          />
        </div>
        
        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
          <label className="block mb-2 text-sm sm:text-base">Animation Delay (ms):</label>
          <input
            type="number"
            min="0"
            max="2000"
            step="10"
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value) || 0)}
            className="bg-black border border-green-500 text-green-500 p-2 rounded w-full text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
        <h3 className="mb-4 text-base sm:text-lg">Custom Rules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm sm:text-base">Even number divisor:</label>
            <input
              type="number"
              min="1"
              step="1"
              value={rules.evenDivisor}
              onChange={(e) => {
                const evenDivisor = Math.max(1, parseInt(e.target.value) || 2);
                setRules({ ...rules, evenDivisor });
              }}
              className="bg-black border border-green-500 text-green-500 p-2 rounded w-full text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">Odd number multiplier:</label>
            <input
              type="number"
              min="1"
              step="1"
              value={rules.oddMultiplier}
              onChange={(e) => {
                const oddMultiplier = Math.max(1, parseInt(e.target.value) || 3);
                setRules({ ...rules, oddMultiplier });
              }}
              className="bg-black border border-green-500 text-green-500 p-2 rounded w-full text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={onCalculate}
          disabled={isCalculating}
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400 disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto"
        >
          {isCalculating ? 'Calculating...' : 'Calculate'}
        </button>
        <button
          onClick={onReset}
          className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-400 text-sm sm:text-base w-full sm:w-auto"
        >
          Reset Rules
        </button>
      </div>
    </div>
  );
}