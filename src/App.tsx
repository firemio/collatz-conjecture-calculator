import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { CollatzExplanation } from './components/CollatzExplanation';
import { ControlPanel } from './components/ControlPanel';
import { StepsDisplay } from './components/StepsDisplay';
import { Step, CollatzRules, defaultRules } from './types/collatz';
import { calculateCollatzSequence } from './utils/collatzCalculator';

function App() {
  const [startNumber, setStartNumber] = useState<number>(27);
  const [delay, setDelay] = useState<number>(100);
  const [steps, setSteps] = useState<Step[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasLoop, setHasLoop] = useState<boolean>(false);
  const [rules, setRules] = useState<CollatzRules>(defaultRules);

  const handleCalculate = async (n: number) => {
    setIsCalculating(true);
    setSteps([]);
    setHasLoop(false);

    try {
      await calculateCollatzSequence(n, rules, delay, (newSteps) => {
        setSteps([...newSteps]);
      });
    } catch (error) {
      setHasLoop(true);
    }
    
    setIsCalculating(false);
  };

  const handleReset = () => {
    setRules(defaultRules);
    setSteps([]);
    setHasLoop(false);
  };

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
          <StepsDisplay steps={steps} hasLoop={hasLoop} />
        </div>
      </div>
    </div>
  );
}

export default App;