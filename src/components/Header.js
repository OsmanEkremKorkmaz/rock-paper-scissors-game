import React from 'react'

function Header({score}) {
  return (
    <header>
        <h1>Rock Paper Scissors</h1>
        <span className='score'>Score: {score}</span>
    </header>
  )
}

export default Header