import { useEffect, useState } from "react";
import Choice from "./components/Choice";
import Header from "./components/Header";
import Collapse from 'react-collapse';
import { useAutoAnimate } from '@formkit/auto-animate/react'

function App() {
  const [animationParent] = useAutoAnimate()
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
      setIsVisible(true);

    };
    window.addEventListener("beforeinstallprompt", handler);
    
    return () => window.removeEventListener("transitionend", handler);
  }, []);
  const handleInstall = (e) => {
    e.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <div className="App" ref={animationParent}>
      <a className="play-again" href="/">
      <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 44q-3.75 0-7.025-1.4-3.275-1.4-5.725-3.85Q8.8 36.3 7.4 33.025 6 29.75 6 26h3q0 6.25 4.375 10.625T24 41q6.25 0 10.625-4.375T39 26q0-6.25-4.25-10.625T24.25 11H23.1l3.65 3.65-2.05 2.1-7.35-7.35 7.35-7.35 2.05 2.05-3.9 3.9H24q3.75 0 7.025 1.4 3.275 1.4 5.725 3.85 2.45 2.45 3.85 5.725Q42 22.25 42 26q0 3.75-1.4 7.025-1.4 3.275-3.85 5.725-2.45 2.45-5.725 3.85Q27.75 44 24 44Z"/></svg>      </a>
      <div onClick={() => setIsOpen(prev => !prev)} className="history">
        History <Collapse isOpened={isOpen}>{history.map((result, index) => (
          <div key={index}>
            {result}
            </div>
        ))}
        </Collapse>
        
        </div>
        
        <button style={{display: isVisible ? "block" : "none"}} onClick={handleInstall} id="install-app">
          <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" height="48" width="48"><path d="M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z"/></svg>
        </div>
        </button>
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
