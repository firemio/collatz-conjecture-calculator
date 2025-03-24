import { Step, CollatzRules } from '../types/collatz';

const MAX_STEPS = 1000; // 安全対策として最大ステップ数を制限

export const calculateNextNumber = (n: number, rules: CollatzRules): number => {
  if (!Number.isFinite(n)) {
    throw new Error('Number overflow detected');
  }
  return n % 2 === 0 
    ? n / rules.evenDivisor 
    : rules.oddMultiplier * n + 1;
};

export const calculateCollatzSequence = async (
  startNumber: number,
  rules: CollatzRules,
  delay: number,
  onStep: (step: Step) => void,
  signal?: AbortSignal
): Promise<void> => {
  if (startNumber <= 0 || !Number.isInteger(startNumber)) {
    throw new Error('Starting number must be a positive integer');
  }

  const previousNumbers = new Map<number, number>(); // 数値とそのステップ番号を保存
  let current = startNumber;
  let step = 0;

  const processStep = async (num: number, stepNum: number) => {
    const currentStep: Step = {
      number: num,
      binary: num.toString(2),
      step: stepNum
    };
    
    await new Promise((resolve, reject) => {
      const frame = requestAnimationFrame(() => {
        if (signal?.aborted) {
          cancelAnimationFrame(frame);
          reject(new Error('Calculation cancelled'));
          return;
        }
        onStep(currentStep);
        const timeout = setTimeout(resolve, delay);
        signal?.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('Calculation cancelled'));
        });
      });
    });
  };

  while (true) {
    if (signal?.aborted) {
      throw new Error('Calculation cancelled');
    }

    // 最大ステップ数チェック
    if (step >= MAX_STEPS) {
      throw new Error('Maximum steps exceeded');
    }

    await processStep(current, step);

    if (current === 1) break;

    const nextNumber = calculateNextNumber(current, rules);
    
    // オーバーフローチェック
    if (nextNumber > Number.MAX_SAFE_INTEGER) {
      throw new Error('Number too large');
    }

    // ループ検出
    if (previousNumbers.has(nextNumber)) {
      const loopStartStep = previousNumbers.get(nextNumber)!;
      // 次のステップも表示してからエラーを投げる
      await processStep(nextNumber, step + 1);
      throw new Error(`Loop detected: ${nextNumber} appears at step ${loopStartStep} and ${step + 1}`);
    }
    
    previousNumbers.set(current, step);
    current = nextNumber;
    step++;
  }
}