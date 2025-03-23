import { Step, CollatzRules } from '../types/collatz';

export const calculateNextNumber = (n: number, rules: CollatzRules): number => {
  return n % 2 === 0 
    ? n / rules.evenDivisor 
    : rules.oddMultiplier * n + 1;
};

export const calculateCollatzSequence = async (
  startNumber: number,
  rules: CollatzRules,
  delay: number,
  onStep: (steps: Step[]) => void
): Promise<void> => {
  const steps: Step[] = [];
  const previousNumbers = new Set<number>();
  let current = startNumber;
  let step = 0;

  const addStep = async (number: number, step: number) => {
    const newStep: Step = {
      number,
      binary: number.toString(2),
      step
    };
    steps.push(newStep);
    onStep(steps);
  };

  while (current !== 1) {
    await addStep(current, step);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const nextNumber = calculateNextNumber(current, rules);
    
    if (previousNumbers.has(nextNumber)) {
      throw new Error('Loop detected');
    }
    
    previousNumbers.add(current);
    current = nextNumber;
    step++;
  }

  await addStep(1, step);
};