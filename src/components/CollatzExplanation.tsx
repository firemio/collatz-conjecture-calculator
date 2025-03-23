import React from 'react';
import { CollatzRules } from '../types/collatz';

interface Props {
  rules: CollatzRules;
}

export function CollatzExplanation({ rules }: Props) {
  return (
    <div className="bg-gray-900 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
      <p className="mb-3 sm:mb-4">The Collatz conjecture with current rules:</p>
      <p className="text-yellow-500">if n is even: n → n/{rules.evenDivisor}</p>
      <p className="text-yellow-500">if n is odd: n → {rules.oddMultiplier}n + 1</p>
      <p className="mt-3 sm:mt-4">This sequence should reach 1 or detect a loop.</p>
    </div>
  );
}