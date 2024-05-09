import React from 'react'

export default function Row({ guess, currentGuess }) {
  const ROW_LENGTH = 5;

  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, index) => (
          <div key={index} className={letter.position}> {letter.letter} </div>
        ))}
      </div>
    )
  }

  if (currentGuess) {
    let currentGuessSplitted = currentGuess.split('');
    let emptyBoxes = ROW_LENGTH - currentGuessSplitted.length;

    return (
      <div className="row current">
        {currentGuessSplitted.map((currentLetter, index) => (
          <div key={index} className='active'> {currentLetter} </div>
        ))}

        {[...Array(emptyBoxes)].map((_, index) => (
          <div key={index}> </div>
        ))}
      </div>
    )
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
