import { useState } from "react";
import Choice from "./components/Choice";
import Header from "./components/Header";
import Collapse from 'react-collapse';

function App() {
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="App">
      <div className="top">
      <a href="/">Play Again</a>
      <div onClick={() => setIsOpen(prev => !prev)} className="history">
        History: <Collapse isOpened={isOpen}>{history.map((result, index) => (
          <div key={index}>
            {result}
            </div>
        ))}
        </Collapse>
        
        </div>
      </div>
      {
        score === 3 ? <h1>You won!</h1> : score === -3 ? <h1>You lost!</h1> : <>
          <Header score={score} />
          <Choice setScore={setScore} setHistory={setHistory} />
        </>
      }
      
    </div>
  );
}

export default App;
