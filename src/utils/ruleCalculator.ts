import { CollatzRules } from '../types/collatz';

export const createEvenRule = (divisor: number): (n: number) => number => {
  return (n: number) => n / divisor;
};

export const createOddRule = (multiplier: number): (n: number) => number => {
  return (n: number) => multiplier * n + 1;
};

export const getRuleValues = (rules: CollatzRules) => {
  // Get even divisor by testing with a sample even number
  const testEven = 10;
  const evenResult = rules.even(testEven);
  const evenDivisor = testEven / evenResult;

  // Get odd multiplier by testing with a sample odd number
  const testOdd = 5;
  const oddResult = rules.odd(testOdd);
  const oddMultiplier = (oddResult - 1) / testOdd;

  return {
    evenDivisor: 1 / evenDivisor, // Invert to get the actual divisor
    oddMultiplier
  };
};