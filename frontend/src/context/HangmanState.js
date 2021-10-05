import React, { useReducer } from "react";
import HangmanContext from "./hangmanContext";
import HangmanReducer from "./hangmanReducer";

import {
    GUESSED_WORD,
    HANDLE_GUESS,
    GENERATE_BUTTONS
} from "./types";

const HangmanState = (props) => {
  const initialState = {
    nWrong: 0,
    guessed: new Set(),
    answer: "apple",
  };

  const [state, dispatch] = useReducer(HangmanReducer, initialState);

  const [guess, setGuess] = useState("");



    /** guessedWord: show current-state of word:
      if guessed letters are {a,p,e}, show "app_e" for "apple"
    */
    const guessedWord = () => {
        const guess = state.answer
            .split("")
            .map(ltr => (guessed.has(ltr) ? ltr : "_"));

        dispatch ({
            type: GUESSED_WORD,
            payload: guess
        })
    }

    /** handleGuest: handle a guessed letter:
      - add to guessed letters
      - if not in answer, increase number-wrong guesses
    */
    const handleGuess = (e) => {
        let ltr = e.target.value;
        setGuess(st => ({
            guessed: st.guessed.add(ltr),
            nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
        }));
    }

    /** generateButtons: return array of letter buttons to render */
    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
            <button
                value={ltr}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(ltr)}
            >
                {ltr}
            </button>
        ));
    }

    return (
        <HangmanContext.Provider
        value={{
            nWrong: state.nWrong,
            guessed: state.guessed,
            answer: state.answer
        }}
        // {props.children}
        ></HangmanContext.Provider>
    )
};

export default HangmanState;