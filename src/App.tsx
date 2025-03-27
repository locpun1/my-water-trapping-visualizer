import React, { useState } from 'react';
import NumberInput from './components/NumberInput';
import CanvasDisplay from './components/CanvasDisplay';

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);

  const handleNumbersChange = (numbers: number[]) => {
    setNumbers(numbers);
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h1>Water Trapping Visualizer</h1>
      <NumberInput onNumbersChange={handleNumbersChange} />
      <div style={{ textAlign: 'center' }}>
        {numbers.length > 0 ?
          <CanvasDisplay numbers={numbers} />
          :
          ''
        }
      </div>
    </div>
  );
}

export default App;