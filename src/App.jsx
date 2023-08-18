import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Page1 from "./Components/Pages/Page1";
import { Page2 } from "./Components/Pages/Page2";
import "./App.css";
import Home from "./Components/Pages/home";

function App() {
  // const navigate=useNavigate();
  // const handlepage1Click=()=>{
  //   navigate("/Page1")

  // }
  // const handlepage2Click=()=>{
  //   navigate("/Page2")

  // }
  // const handlebackClick=()=>{
  //   navigate("/")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />

        <Route path="*" element={<p>WHERE ARE U HEADED???</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
