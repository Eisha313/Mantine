import { useEffect, useState } from "react";
import "./App.css";

function Square({ value, onClick }) {
  // const [value, setValue] = useState('');

  // <button className='square'onClick={onSquareclick}>{value}</button>
  // function handlingClick() {
  //   setValue("X");
  // }
  return (
    <button className="square" onClick={onClick}>
      {value === null ? "" : value}
    </button>
  );
}
// }
export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [state, setState] = useState(Array(9).fill(null));
  const [isWinner, setWinner] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (isWinner) {
      console.log("verify");
      setMessage(`${isWinner} CONGRATS YOU WON`);

      // setState(Array(9).fill(null))
      setWinner(false);
    }
    setWinner(checkWinner());
  }, [isWinner, state]);

  const checkWinner = () => {
    // if (isWinner) {
    //   console.log('in block')
    //   console.log(isWinner)
    //   return
    // }
    const Logic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // console.log(state)
    for (let logits of Logic) {
      // console.log('here')

      const [a, b, c] = logits;
      if (state[a] != null && state[a] === state[b] && state[a] === state[c]) {
        // setMessage("Congrtats")
        return state[a];
        setMessage("Congrtats");
        // setState(null);
      }
      // setState(null);
    }

    return false;
  };

  // console.log(isWinner)
  // const nextSquares = state.slice();
  //   if(nextSquares===null){
    

  function handlingClick(i) {
    if(state[i]==null){
    
    if (isWinner) {
      

      setState(Array(9).fill(null));
      setWinner(false);
      return;
    }
    // if(state[i]==null){
    // if(state[i]===null){
    const nextSquares = state.slice();
    // if(nextSquares===null){
    // console.log("working")
    if (xIsNext) {
      if (nextSquares[i] === null) {
        nextSquares[i] = "X";
        // if(nextSquares[i]===X){
        //   setXIsNext(!xIsNext);
        // }
        // if (nextSquares[i]!=null)
      }
    } else {
      if (nextSquares[i] === null) {
        nextSquares[i] = "O";
      }
    }
  
    setState(nextSquares);
    // if(nextSquares[i]===X){
    //   setXIsNext(!xIsNext);
    // }
    setXIsNext(!xIsNext);
  // }


    }
    else
    if(nextSquares[i]===X){
      setXIsNext(!xIsNext)
    }
    else{
      setXIsNext(xIsNext)
    }
  }

  const setting = () => {
    setState(Array(9).fill(null));
    setXIsNext(true);
    setWinner(false);
    setMessage("");
  };

  return (
    <>
      <div className="boardContainer">
        {/* {isWinner ? <>{message}</> : <></>} */}
        {message}

        {/* <div className="boardContainer>"{isWinner?(<>{isWinner}Congrats!You won the game</>)} */}

        <div className="boardRow">
          <Square value={state[0]} onClick={() => handlingClick(0)} />
          <Square value={state[1]} onClick={() => handlingClick(1)} />
          <Square value={state[2]} onClick={() => handlingClick(2)} />
        </div>
        <div className="boardRow">
          <Square value={state[3]} onClick={() => handlingClick(3)} />
          <Square value={state[4]} onClick={() => handlingClick(4)} />
          <Square value={state[5]} onClick={() => handlingClick(5)} />
        </div>
        <div className="boardRow">
          <Square value={state[6]} onClick={() => handlingClick(6)} />
          <Square value={state[7]} onClick={() => handlingClick(7)} />
          <Square value={state[8]} onClick={() => handlingClick(8)} />
        </div>
        <div>
          <button className="resett" onClick={() => setting()}>
            RESET
          </button>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
