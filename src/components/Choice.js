import React, { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

function Choice({ setScore, setHistory }) {
    const [selected, setSelected] = useState(null);
    const [computerSelected, setComputerSelected] = useState(null);
    const [result, setResult] = useState(null);
    const [animationParent] = useAutoAnimate()
    

    const handleClick = (choice) => {
        setSelected(choice);
        const computerChoice = (Math.floor(Math.random() * 3)) + 1;
        setComputerSelected(computerChoice === 1 ? 'rock' : computerChoice === 2 ? 'paper' : 'scissors');
        setResult(compare(choice, (computerChoice === 1 ? 'rock' : computerChoice === 2 ? 'paper' : 'scissors')));
        setTimeout(() => {
            setSelected(null);
            setComputerSelected(null);
            setResult(null);
        }, 1500);
    }

    const options = {
        "rock": {
            name: 'rock',
            image: "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png" 
        },

        "paper": {
            name: 'paper',
            image: "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png"
        },  
        "scissors": {
            name: 'scissors',
            image: "https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png"
        }
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

  return (
    <main  ref={animationParent} >
        {
            selected ? <div className='selected-items'>
                <div className='user-choice'>
                    <h3>You chose:</h3>
                    <img alt={options[selected].name} className='selected-choice' src={options[selected].image} />
                </div>
                <div className='computer-choice'>
                    <h3>Computer chose:</h3>
                    <img alt={options[computerSelected].name} className='selected-choice' src={options[computerSelected].image} />
                </div>
            </div> : <>
                <h1>Choice your weapon</h1>
                <div className="choice-container">
                <button onClick={() => handleClick("rock")}>
                    <img src={options["rock"].image} alt="Rock" />
                </button>
                <button onClick={() => handleClick("scissors")}>
                    <img src={options["paper"].image} alt="Paper" />
                </button>
                <button onClick={() => handleClick("paper")}>
                    <img src={options["scissors"].image} alt="Scissors" />
                </button>
                </div>            
            </>
        }
        {
            result ? <h1 className={`result ${result}`}>{result}</h1> : null
        }

    </main>
  )
}

export default Choice