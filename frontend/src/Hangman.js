import React, { Component, useState, useContext } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
// import HangmanContext from "./context/hangmanContext";

import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

const Hangman = () => {
  // const { nWrong, guessed, answer } = useContext(HangmanContext);

  const maxWrong = 6;
  const images = [img0, img1, img2, img3, img4, img5, img6];
  // const problem = randomWord();

  const [answer, setAnswer] = useState(randomWord());
  const [userRequest, setUserRequest] = useState({
    nWrong: 0,
    guessed: new Set(),
  });

  const { nWrong, guessed } = userRequest;

  console.log(answer);
  // console.log(problem);
  // const [nWrong, setNWrong] = useState(0);
  // const [guessed, setGuessed] = useState(new Set());

  /** guessedWord: show current-state of word:
//     if guessed letters are {a,p,e}, show "app_e" for "apple"
//   */

  function guessedWord() {
    return answer.split("").map((ltr) => (guessed.has(ltr) ? ltr : "_"));
  }

  console.log(answer);

  //   /** handleGuest: handle a guessed letter:
  //     - add to guessed letters
  //     - if not in answer, increase number-wrong guesses
  //   */

  function handleGuess(e) {
    let ltr = e.target.value;
    setUserRequest({
      guessed: guessed.add(ltr),
      nWrong: nWrong + (answer.includes(ltr) ? 0 : 1),
    });
    // console.log(guessed);
    // setUserRequest({nWrong: (nWrong + (answer.includes(ltr) ? 0 : 1))});
    // console.log(nWrong);
  }

  //   /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  function reset() {
    setUserRequest({
      guessed: new Set(),
      nWrong: 0,
    });
    setAnswer(randomWord());
  }

  const gameOver = nWrong >= maxWrong;
  const isWinner = guessedWord().join("") === answer;
  const altText = `${nWrong}/${maxWrong} guesses`;
  let gameState = generateButtons();
  if (isWinner) gameState = "You win!";
  if (gameOver) gameState = "You lose!";

  return (
    <div className="Hangman">
      <h1>Hangman</h1>
      <img src={images[nWrong]} alt={altText} />
      <p>Guessed wrong: {nWrong}</p>
      <p className="Hangman-word">{!gameOver ? guessedWord() : answer}</p>
      <p className="Hangman-btns">{gameState}</p>

      <button id="reset" onClick={reset}>
        Reset?
      </button>
    </div>
  );
};

// Hangman.defaultProps = {
//   maxWrong: 6,
//   images: [img0, img1, img2, img3, img4, img5, img6],
// };

// class Hangman extends Component {
//   /** by default, allow 6 guesses and use provided gallows images. */
//   // static defaultProps = {
//   //   maxWrong: 6,
//   //   images: [img0, img1, img2, img3, img4, img5, img6]
//   // };

//   // constructor(props) {
//   //   super(props);
//   //   this.state = { nWrong: 0, guessed: new Set(), answer: "apple" };
//   //   this.handleGuess = this.handleGuess.bind(this);
//   // }

//   /** guessedWord: show current-state of word:
//     if guessed letters are {a,p,e}, show "app_e" for "apple"
//   */

//   guessedWord() {
//     return this.state.answer
//       .split("")
//       .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
//   }

//   /** handleGuest: handle a guessed letter:
//     - add to guessed letters
//     - if not in answer, increase number-wrong guesses
//   */
//   handleGuess(evt) {
//     let ltr = evt.target.value;
//     this.setState(st => ({
//       guessed: st.guessed.add(ltr),
//       nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
//     }));
//   }

//   /** generateButtons: return array of letter buttons to render */
//   generateButtons() {
//     return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
//       <button
//         value={ltr}
//         onClick={this.handleGuess}
//         disabled={this.state.guessed.has(ltr)}
//       >
//         {ltr}
//       </button>
//     ));
//   }

//   /** render: render game */
//   render() {
//     return (
//       <div className='Hangman'>
//         <h1>Hangman</h1>
//         <img src={this.props.images[this.state.nWrong]} />
//         <p className='Hangman-word'>{this.guessedWord()}</p>
//         <p className='Hangman-btns'>{this.generateButtons()}</p>
//       </div>
//     );
//   }
// }

export default Hangman;
