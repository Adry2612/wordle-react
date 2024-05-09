import React, { useEffect, useState } from 'react'
import { letras } from '../data';

export default function Keypad({ usedKeys }) {

  const [letters, setLetters] = useState(null);

  useEffect(() => {
    setLetters(letras)
  }, [])

  return (
    <div className='keypad'>
      {letters && letters.map((letter) => (
        <div key={letter} className={usedKeys[letter]}>{letter}</div>
      ))}
    </div>
  )
}
