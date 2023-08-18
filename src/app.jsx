import { useState } from "react";

import "./app.css";

export function App() {
  const Boxes = ({ value }) => {
    return (
      <button className="box" onClick={() => checkArray(value)}>
        {value}
      </button>
    );
  };
  const [state, setState] = useState("");

  const [match, isMatch] = useState([""]);
  const [turns,setTurns]=useState(0);

  const objectCall = () => {
    const stationaryItems = [
      "stapler",
      "punchmachine",
      "scissors",
      "calculator",
      "tapedispenser",
      "toner",
      "printer",
      "envelope",
      "notebook",
      "writingpad",
      "highlighters",
      "folder",
      "magazine",
    ];
    const furniture = [
      "vase",
      "valance",
      "quilt",
      "plant",
      "mirror",
      "ottoman",
      "shutters",
      "loveseat",
      "pillow",
      "nightstand",
      "airconditioner",
      "curtains",
      "television",
      "clock",
    ];
    const ingredients = [
      "avocados",
      "apricots",
      "guava",
      "barley",
      "muhroom",
      "shellfish",
    ];
    const gadgets = [
      "camera",
      "polaroid",
      "videoplayer",
      "powebank",
      "charger",
      "massager",
      "dispenser",
      "shaver",
    ];
    const utensils = [
      "apron",
      "tenderizer",
      "rollingpin",
      "whisk",
      "cutlery",
      "chopstick",
      "grater",
      "teapot",
      "colander",
      "spatula",
      "skimmer",
      "ladle",
      "caseroledish",
      "cooker",
    ];

    const objectArray = [
      stationaryItems,
      furniture,
      ingredients,
      gadgets,
      utensils,
    ];
    console.log(objectArray);
    const len = objectArray.length;
    console.log(len);
    const generate = Math.floor(Math.random() * len);
    console.log(generate);
    const firstSelection = objectArray[generate];
    console.log(firstSelection);
    const len2 = firstSelection.length;
    console.log(len2);
    const generate2 = Math.floor(Math.random() * len2);
    console.log(generate2);

    const secondSelection = firstSelection[generate2];
    console.log(secondSelection);
    const generateDash = secondSelection.length;
    console.log(generateDash);
    setState(secondSelection);
 
  };
  

  const checkArray = (e) => {
    if(turns<10){
    
      if(!match.includes(e)){
        
    let event = e;
    console.log("Value", event);
    const stay = [...match];
    stay.push(event);
    isMatch(stay);
    console.log(stay);
    setTurns(turns+1)}
    
  
    else {return("already clicked")}
  
  }
  else if(turns===10) 
  setTurns("you've reached the limit");
  
  }
  const placeCall = () => {
    const cities = [
      "Newyork",
      "London",
      "Paris",
      "Tokyo",
      "Sydney",
      "Rome",
      "Toronto",
      "Mumbai",
      "Berlin",
      "Dubai",
    ];
    const country = [
      "Unitedstates",
      "Unitedkingdom",
      "France",
      "Japan",
      "Australia",
      "Italy",
      "Canada",
      "India",
      "Germany",
    ];
    const ocean = [
      "Pacificocean",
      "Atlantic ocean",
      "Indianocean",
      "Southernocean",
      "Arcticocean",
    ];

    const continent = [
      "Africa",
      "Antarctica",
      "Asia",
      "Europe",
      "Northamerica",
      "Oceania",
      "Southamerica",
    ];
    const placeArray=[cities,country,ocean,continent];



    
  console.log(placeArray);
  const len = placeArray.length;
  console.log(len);
  const generate = Math.floor(Math.random() * len);
  console.log(generate);
  const firstSelection = placeArray[generate];
  console.log(firstSelection);
  const len2 = firstSelection.length;
  console.log(len2);
  const generate2 = Math.floor(Math.random() * len2);
  console.log(generate2);

  const secondSelection = firstSelection[generate2];
  console.log(secondSelection);
  const generateDash = secondSelection.length;
  console.log(generateDash);
  setState(secondSelection);






  };

  const randomCall = () => {
    const profession = [
      "doctor",
      "teacher",
      "engineer",
      "lawyer",
      "artist",
      "chef",
      "pilot",
      "scientist",
      "athlete",
      "writer",
    ];
    const feelings = [
      "Sadness",
      "Excitement",
      "Surprise",
      "Disgust",
      "Anticipation",
      "Gratitude",
      "Contentment",
      "Confusion",
      "Hope",
      "Enthusiasm",
      "Loneliness",
      "Guilt",
      "Pride",
      "Jealousy",
      "Regret",
      "Relief",
      "Empathy",
      "Frustration",
      "Curiosity",
      "Amusement",
      "Anxiety",
      "Boredom",
      "Compassion",
      "Disappointment",
      "Nostalgia",
    ];

    const disease = [
      "Influenza",
      "Cancer",
      "Diabetes",
      "Heartattack",
      "Alzheimers",
      "Parkinsons",
      "Malaria",
      "Tuberculosis",
      "Hepatitis",
      "Cholera",
      "Ebola",
      "Lung disease",
      "Stroke",
      "Arthritis",
      "Osteoporosis",
      "Multiple sclerosis",
      "Epilepsy",
      "Asthma",
      "Dengue ",
      "Measles",
      "Chickenpox",
      "Pneumonia",
      "Gastroenteritis",
      "Hypertension",
      "Anemia",
      "Schizophrenia",
    ];
    const randomArray=[disease,feelings,profession];
    
  console.log(randomArray);
  const len = randomArray.length;
  console.log(len);
  const generate = Math.floor(Math.random() * len);
  console.log(generate);
  const firstSelection = randomArray[generate];
  console.log(firstSelection);
  const len2 = firstSelection.length;
  console.log(len2);
  const generate2 = Math.floor(Math.random() * len2);
  console.log(generate2);

  const secondSelection = firstSelection[generate2];
  console.log(secondSelection);
  const generateDash = secondSelection.length;
  console.log(generateDash);
  setState(secondSelection);
  };

  return (
    <>
      <div className="options">
        <button className="object" onClick={() => objectCall()}>
          OBJECT
        </button>
        <button className="place" onClick={()=>placeCall()}>PLACE</button>
        <button className="random"   onClick={()=>randomCall()}>RANDOM</button>
      </div>
      <table>
        <tr>
          <td>
            <Boxes value="a" />
          </td>
          <td>
            <Boxes value="b" />
          </td>
          <td>
            <Boxes value="c" />
          </td>
          <td>
            <Boxes value="d" />
          </td>
          <td>
            <Boxes value="e" />
          </td>
        </tr>

        <tr>
          <td>
            <Boxes value="f" />
          </td>
          <td>
            <Boxes value="g" />
          </td>
          <td>
            <Boxes value="h" />
          </td>
          <td>
            <Boxes value="i" />
          </td>
          <td>
            <Boxes value="j" />
          </td>
        </tr>

        <tr>
          <td>
            <Boxes value="k" />
          </td>
          <td>
            <Boxes value="l" />
          </td>
          <td>
            <Boxes value="m" />
          </td>
          <td>
            <Boxes value="n" />
          </td>
          <td>
            <Boxes value="o" />
          </td>
        </tr>

        <tr>
          <td>
            <Boxes value="p" />
          </td>
          <td>
            <Boxes value="q" />
          </td>
          <td>
            {" "}
            <Boxes value="r" />
          </td>
          <td>
            <Boxes value="s" />
          </td>
          <td>
            <Boxes value="t" />
          </td>
        </tr>

        <tr>
          <td>
            <Boxes value="u" />
          </td>
          <td>
            <Boxes value="v" />
          </td>
          <td>
            <Boxes value="w" />
          </td>
          <td>
            <Boxes value="x" />
          </td>
          <td>
            <Boxes value="y" />
          </td>
        </tr>

        <tr>
          <td>
            <Boxes value="z" />
          </td>
        </tr>
        
      </table>
      <div className="dashes">
        {state.split("").map((element, index) => {
          
          if (match.includes(element)) {
            return element;
          } else return "-";
        
        
      }
        )

        }

      </div>
      <div className="turns">Turns: {turns}</div>
      <div className="entered-numbers">
  
   {match.map((number, index) => (
    <div>
      {number}
      </div>
    
  ))}
</div>




    </>
  );
}
