import { useEffect, useState } from "react";
import { palabras } from "./data";

import useWordle from "./hooks/useWordle";

import Wordle from "./components/Wordle";
import ErrorModal from "./components/ErrorModal";

function App() {
  const [solution, setSolution] = useState(null);
  const { messageError, showErrorModal } = useWordle(solution);

  useEffect(() => {
    const randomWord = palabras[Math.floor(Math.random() * palabras.length)];
    setSolution(randomWord);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>WORDLE</h1>
        {solution && (
          <>
            <Wordle solution={solution} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
