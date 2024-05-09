import { useState, useEffect } from 'react';

const SOLUTION_ENUM = {
  CORRECT: 'correct',
  INCLUDES: 'includes',
  WRONG: 'wrong',
};

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [messageError, setMessageError] = useState('');

  const formatGuess = (guess) => {
    let formatedGuess = [];
    const letter = guess.split('');
    const solutionSplit = solution.split('');

    letter.map((letter, index) => {
      if (letter === solutionSplit[index]) {
        formatedGuess.push({
          letter: letter,
          position: SOLUTION_ENUM.CORRECT,
        });
      } else if (solution.includes(letter)) {
        formatedGuess.push({
          letter: letter,
          position: SOLUTION_ENUM.INCLUDES,
        });
      } else {
        formatedGuess.push({
          letter: letter,
          position: SOLUTION_ENUM.WRONG,
        });
      }
    })

    return formatedGuess;
  }

  const addNewGuess = (formatedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((previousGuesses) => {
      let newGuesses = [...previousGuesses];
      newGuesses[turn] = formatedGuess;

      return newGuesses;
    });

    setHistory((prevHistory) => [...prevHistory, currentGuess]);
    setTurn((prevTurn) => prevTurn + 1);
    setUsedKeys((prevUsedKeys) => formatUsedKeys(prevUsedKeys, formatedGuess));
    setCurrentGuess('');
  }

  const formatUsedKeys = (prevUsedKeys, formatedGuess) => {
    let newKeys = { ...prevUsedKeys };

    formatedGuess.forEach((letter) => {
      const currentPosition = newKeys[letter.position];

      formatedGuess.forEach((letter) => {
        if (letter.position === SOLUTION_ENUM.CORRECT) {
          newKeys[letter.letter] = SOLUTION_ENUM.CORRECT;
          return;
        }

        if (letter.position === SOLUTION_ENUM.INCLUDES && currentPosition !== SOLUTION_ENUM.CORRECT) {
          newKeys[letter.letter] = SOLUTION_ENUM.INCLUDES;
          return;
        }

        if (letter.position === SOLUTION_ENUM.WRONG) {
          newKeys[letter.letter] = SOLUTION_ENUM.WRONG;
          return;
        }
      });
    });

    return newKeys;
  }

  const handleKeyUp = (event) => {
    const { key } = event;
    const letterRegex = /^[a-zA-Z]$/;

    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (key === 'Enter') {
      if (turn > 5) {
        setMessageError('Ya no puedes hacer más intentos');
        setShowErrorModal(true);

        return;
      }
      if (currentGuess.length !== 5) {
        setMessageError('La palabra debe tener 5 letras');
        setShowErrorModal(true);

        return;
      }
      if (history.includes(currentGuess)) {
        setMessageError('Ya intentaste con esa palabra');
        setShowErrorModal(true);

        return;
      }

      const formatedGuest = formatGuess(currentGuess);
      addNewGuess(formatedGuest);
    }

    if (letterRegex.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key)
      }
    }
  }

  return {
    turn, currentGuess, guesses, isCorrect, showErrorModal, messageError, addNewGuess, handleKeyUp, usedKeys,
  };
};

export default useWordle;
