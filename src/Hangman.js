import React, { Component, useState, useContext } from "react";
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

  const [answer, setAnswer] = useState("apple");
  const [userRequest, setUserRequest] = useState({
    nWrong: 0,
    guessed: new Set(),
  });

  const { nWrong, guessed } = userRequest;

  // const [nWrong, setNWrong] = useState(0);
  // const [guessed, setGuessed] = useState(new Set());

  /** guessedWord: show current-state of word:
//     if guessed letters are {a,p,e}, show "app_e" for "apple"
//   */

  function guessedWord() {
    return answer.split("").map((ltr) => (guessed.has(ltr) ? ltr : "_"));
  }

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
      <button value={ltr} onClick={handleGuess} disabled={guessed.has(ltr)}>
        {ltr}
      </button>
    ));
  }

  return (
    <div className="Hangman">
      <h1>Hangman</h1>
      <img src={images[nWrong]} alt="Current Hangman" />
      <p className="Hangman-word">{guessedWord()}</p>
      <p className="Hangman-btns">{generateButtons()}</p>{" "}
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
