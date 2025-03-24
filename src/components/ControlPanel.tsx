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
  const [startNumberInput, setStartNumberInput] = React.useState(startNumber.toString());
  const [delayInput, setDelayInput] = React.useState(delay.toString());
  const [evenDivisorInput, setEvenDivisorInput] = React.useState(rules.evenDivisor.toString());
  const [oddMultiplierInput, setOddMultiplierInput] = React.useState(rules.oddMultiplier.toString());

  // ルールが変更されたときに入力値を更新
  React.useEffect(() => {
    setEvenDivisorInput(rules.evenDivisor.toString());
    setOddMultiplierInput(rules.oddMultiplier.toString());
  }, [rules]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartNumberInput(value);
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setStartNumber(num);
    }
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDelayInput(value);
    const num = parseInt(value);
    if (!isNaN(num) && num >= 0) {
      setDelay(Math.min(2000, num));
    }
  };

  const handleEvenDivisorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEvenDivisorInput(value);
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setRules(prev => ({ ...prev, evenDivisor: num }));
    }
  };

  const handleOddMultiplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOddMultiplierInput(value);
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setRules(prev => ({ ...prev, oddMultiplier: num }));
    }
  };

  const handleInputBlur = (
    value: string,
    setValue: (value: string) => void,
    defaultValue: number
  ) => {
    const num = parseInt(value);
    if (isNaN(num) || num <= 0) {
      setValue(defaultValue.toString());
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
          <label className="block mb-2 text-sm sm:text-base">Starting Number:</label>
          <input
            type="number"
            min="1"
            value={startNumberInput}
            onChange={handleNumberChange}
            onBlur={() => handleInputBlur(startNumberInput, setStartNumberInput, 1)}
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e' || e.key === '.') {
                e.preventDefault();
              }
            }}
            className="bg-black border border-green-500 text-green-500 p-2 rounded w-full text-sm sm:text-base"
          />
        </div>
        
        <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
          <label className="block mb-2 text-sm sm:text-base">Animation Delay (ms):</label>
          <input
            type="number"
            min="0"
            max="2000"
            value={delayInput}
            onChange={handleDelayChange}
            onBlur={() => handleInputBlur(delayInput, setDelayInput, 0)}
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e' || e.key === '.') {
                e.preventDefault();
              }
            }}
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
              value={evenDivisorInput}
              onChange={handleEvenDivisorChange}
              onBlur={() => handleInputBlur(evenDivisorInput, setEvenDivisorInput, 2)}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e' || e.key === '.') {
                  e.preventDefault();
                }
              }}
              className="bg-black border border-green-500 text-green-500 p-2 rounded w-full text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm sm:text-base">Odd number multiplier:</label>
            <input
              type="number"
              min="1"
              value={oddMultiplierInput}
              onChange={handleOddMultiplierChange}
              onBlur={() => handleInputBlur(oddMultiplierInput, setOddMultiplierInput, 3)}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e' || e.key === '.') {
                  e.preventDefault();
              }
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