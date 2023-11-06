import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Hello world</div>
      <div>{count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>Count</button>
    </div>
  );
}

export default App;
