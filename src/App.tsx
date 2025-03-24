import React, { useState, useCallback, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { CollatzExplanation } from './components/CollatzExplanation';
import { ControlPanel } from './components/ControlPanel';
import { StepsDisplay } from './components/StepsDisplay';
import { Step, CollatzRules, defaultRules } from './types/collatz';
import { calculateCollatzSequence } from './utils/collatzCalculator';

function App() {
  const [startNumber, setStartNumber] = useState<number>(27);
  const [delay, setDelay] = useState<number>(30);
  const [steps, setSteps] = useState<Step[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasLoop, setHasLoop] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rules, setRules] = useState<CollatzRules>(defaultRules);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleCalculate = useCallback(async (n: number) => {
    if (isCalculating) return;
    
    // 新しい計算を開始する前に既存の計算をキャンセル
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    setIsCalculating(true);
    setSteps([]);
    setHasLoop(false);
    setError(null);

    try {
      await calculateCollatzSequence(n, rules, delay, (newStep: Step) => {
        setSteps(prev => [...prev, newStep]);
      }, controller.signal);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== 'Calculation cancelled') {
          setError(error.message);
          if (error.message.startsWith('Loop detected')) {
            setHasLoop(true);
          }
        }
      }
    } finally {
      setIsCalculating(false);
      abortControllerRef.current = null;
    }
  }, [delay, isCalculating, rules]);

  const handleReset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setRules(defaultRules);
    setSteps([]);
    setHasLoop(false);
    setError(null);
    setIsCalculating(false);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 sm:p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
          <h1 className="text-xl sm:text-2xl">Collatz Conjecture Calculator</h1>
        </div>

        <CollatzExplanation rules={rules} />
        
        <ControlPanel
          startNumber={startNumber}
          setStartNumber={setStartNumber}
          delay={delay}
          setDelay={setDelay}
          rules={rules}
          setRules={setRules}
          isCalculating={isCalculating}
          onCalculate={() => handleCalculate(startNumber)}
          onReset={handleReset}
        />

        <div className="mt-4 sm:mt-6">
          <StepsDisplay steps={steps} hasLoop={hasLoop} error={error} />
        </div>
      </div>
    </div>
  );
}

export default App;