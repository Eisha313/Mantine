// function App() {
//   return (
//     <>
//       <p>App Chal rha ha</p>
//     </>
//   );
// }

// export default App;
import React, { useState } from "react";
import "./App.css";

const App = () => {
  // const [number, setNumber] = useState(0);
  // const [number2, setNumber2] = useState(0);
  // const [sum, setSum] = useState(0);

  // const updateNumber = (event) => {
  //   setNumber(event.target.value);
  // };
  // const updateNumber2 = (event2) => {
  //   setNumber2(event2.target.value);
  // };
  // const updateSum = (event3) => {
  //   setSum(event3.target.value);
  // };

  //   const add = () => {
  //     setSum(parseInt(number) + parseInt(number2));

  //   };
  //   const sub = () => {
  //     setSum(number - number2);

  //   };
  //   const mult = () => {
  //     setSum(number * number2);

  //   };
  //   const div = () => {
  //     setSum(number / number2);

  //   };

  //   return (
  //     <>
  //       <form>
  //         <h1>Calculator</h1>
  //         <div className="cal">

  //         <input
  //           type="number"
  //           id="num"
  //           value={number}
  //           placeholder="Ënter the first nummber"
  //           onChange={updateNumber}
  //         />
  //         <br />
  //         <br />
  //         <input
  //           type="number"
  //           id="num2"
  //           value={number2}
  //           placeholder="Ënter the second nummber"
  //           onChange={updateNumber2}
  //         />
  //         <br />
  //         <br />
  //         <button type="button" onClick={add}>
  //           +
  //         </button>
  //         <button type="button"onClick={sub}>-</button>
  //         <button type="button"onClick={mult}>*</button>
  //         <button type="button" onClick={div}>/</button>
  //         <br />
  //         <br />

  //         <input type="number" id="result" value={sum} readOnly />
  //         </div>
  //       </form>
  //     </>
  //   );
  const [number, setNumber] = useState("");
  // const [number2, setNumber2] = useState(0);
  // const [expression, setExpression] = useState(0);
  // const [result, setResult] = useState(0);
  const updateNumber = (event) => {
    setNumber(event.target.value);
  };
  // const updateNumber2 = (event2) => {
  //   setNumber2(event2.target.value);
  // };
  // const updateResult = (event3) => {
  //   setResult(event3.target.value);
  // };
  // const diplayNumber = (value,numberType) => {
  //   if(numberType==='number1'){
  //     setNumber(parseInt(value));

  //   }
  //   else if(numberType==='number2'){
  //     setNumber2(parseInt(value));
  //   }

  // };
  const showNumber = (e) => {
    // if(numberType==='number1'){
    // setNumber(number + value);
    setNumber(number.concat(e.target.value));

    // }
  };
  // const showOperator = (value) => {
  //   setNumber(number + " " + value + " ");
  // };

  // const add = () => {
  //   setResult = parseInt(number) + parseInt(number2);
  // };
  // const sub = () => {
  //   setResult(number - number2);
  // };
  // const mult = () => {
  //   setResult(number - number2);
  // };
  // const div = () => {
  //   setResult(number - number2);
  // };
  // const exp = () => {
  //   setResult(number ** number2);
  // };
  // const mod = () => {
  //   setResult(number % number2);
  // };
  // const pow = () => {
  //   setResult(Math.pow(number, number2));
  // };
  const clear = () => {
    setNumber("");
  };
  const backspace = () => {
    setNumber(number.slice(-1));
  };
  const calculate = (number) => {
    // try {
    //   setNumber(eval(number).toString());
    // } catch (err) {
    //   setResult("error");
    // }

    // setResult(eval(result).toString());
  };
  // const finalcalc=()=>{
  //   setResult(parseInt(string.conca))

  // }
  // const calculateResult=(number)=>{
    const splitArray=number.split("");
    const sum=0;

    const NewArray=splitArray.map(element,index);
  if (index=0){
    sum=parseInt(element);
  }
  


  //     const fun=parseInt(number);}
      const operator=null;

      
      

      switch(element){
        case("+"):
        operator="+";
        break;
        case("-"):
        operator="-";
        break;
        case("*"):
        operator="*";
        break;
        case("/"):
        operator="/";
        break;
        case("**"):
        operator="**";
        break;
        case("^"):
        operator="^";
        break;
        case("%"):
        operator="%";
        break;
        default:
          operator="";

      }
      if(element!=operator){
       number= sum.concat(element)
      }
      else{
    number=sum+element;}
      setNumber(number.toString)


  //     if(index=0){
  //       sum=element
  //     }

  // const calculatedResult = () => {
  //   let setResult;

  //   switch (expression) {
  //     case "+":
  //       calculatedResult = { add };
  //       break;
  //     case "-":
  //       calculatedresult = { sub };
  //       break;
  //     case "*":
  //       calculatedResult = { mult };
  //       break;
  //     case "/":
  //       calculatedResult = { div };

  //       break;

  //     case "%":
  //       calculatedResult = { mod };

  //       break;
  //     case "^":
  //       calculatedResult = { pow };

  //       break;
  //     case "**":
  //       calculatedResult = { exp };

  //       break;

  //     default:
  //       calculatedResult = "";
  //   }

  //   setResult(calculatedResult);
  // };

  return (
    <>
      <input
        // type="number"
        id="num"
        // onClick={()=>showNumber(value)}

        value={number}
      />

      {/* <input
        type="char"
        id="char2"
        onClick={display}
      
        value={expression}
        readOnly
      />
      <input
        type="number"
        id="num2"
        onClick={()=>show(value,'number2')}
      
        value={number2}
        readOnly
      /> */}

      <table>
        <div className="calc">
          <tbody>
            <tr>
              <td>
                <button
                  className="hightlight"
                  onClick={backspace}
                  id="backspace"
                >
                  C
                </button>
              </td>
              <td>
                <button className="hightlight" value="**" onClick={showNumber}>
                  **
                </button>
              </td>
              <td>
                <button className="hightlight" value="^" onClick={showNumber}>
                  ^
                </button>
              </td>
              <td>
                <button className="hightlight" onClick={clear} id="clear">
                  Clear
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button value="1" onClick={showNumber}>
                  1
                </button>
              </td>
              <td>
                <button value="2" onClick={showNumber}>
                  2
                </button>
              </td>
              <td>
                <button value="3" onClick={showNumber}>
                  3
                </button>
              </td>
              <td>
                <button className="hightlight" value="+" onClick={showNumber}>
                  +
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button value="4" onClick={showNumber}>
                  4
                </button>
              </td>
              <td>
                <button value="5" onClick={showNumber}>
                  5
                </button>
              </td>
              <td>
                <button value="6" onClick={showNumber}>
                  6
                </button>
              </td>
              <td>
                <button className="hightlight" value="-" onClick={showNumber}>
                  -
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button value="7" onClick={showNumber}>
                  7
                </button>
              </td>
              <td>
                <button value="8" onClick={showNumber}>
                  8
                </button>
              </td>
              <td>
                <button value="9" onClick={showNumber}>
                  9
                </button>
              </td>
              <td>
                <button className="hightlight" value="*" onClick={showNumber}>
                  *
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button className="hightlight" value="/" onClick={showNumber}>
                  /
                </button>
              </td>
              <td>
                <button value="0" onClick={showNumber}>
                  0
                </button>
              </td>
              <td>
                <button className="hightlight" value="." onClick={showNumber}>
                  .
                </button>
              </td>
              <td>
                <button className="hightlight" onClick={calculate} id="result">
                  =
                </button>
              </td>
            </tr>
          </tbody>
        </div>
      </table>
    </>
  );
};
// };

export default App;
