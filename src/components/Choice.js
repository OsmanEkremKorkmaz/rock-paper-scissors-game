import React, { useState } from 'react'

function Choice({ setScore, setHistory }) {
    const [selected, setSelected] = useState(null);
    const [computerSelected, setComputerSelected] = useState(null);
    const [result, setResult] = useState(null);

    const handleClick = (choice) => {
        setSelected(choice);
        const computerChoice = (Math.floor(Math.random() * 3)) + 1;
        setComputerSelected(computerChoice === 1 ? 'rock' : computerChoice === 2 ? 'paper' : 'scissors');
        setResult(compare(choice, (computerChoice === 1 ? 'rock' : computerChoice === 2 ? 'paper' : 'scissors')));
    }
    
    const compare = (player, computer) => {
        let result = null;
        if (player === computer) {
            result = 'draw';
        } else if (player === 'rock') {
            result =  computer === 'scissors' ? 'win' : 'lose';
        } else if (player === 'paper') {
            result =  computer === 'rock' ? 'win' : 'lose';
        } else if (player === 'scissors') {
            result =  computer === 'paper' ? 'win' : 'lose';
        }
        setHistory(history => [...history, result]);
        setScore(score => score + (result === 'win' ? 1 : result === 'lose' ? -1 : 0));
        return result;
    }

    console.log(selected, computerSelected, result);

  return (
    <main>
        {
            computerSelected ? <div>
                <h3>Computer chose {computerSelected}</h3>
                <h4>{result}</h4>
            </div> : ""
                
        }
        <h1>Choice your weapon</h1>
        <div className="choice-container">
        <button onClick={() => handleClick("rock")}>
            <img src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png" alt="Rock" />
        </button>
        <button onClick={() => handleClick("scissors")}>
            <img src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png" alt="Paper" />
        </button>
        <button onClick={() => handleClick("paper")}>
            <img src='https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png' alt="Scissors" />
        </button>
        </div>

    </main>
  )
}

export default Choice