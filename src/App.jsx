import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/pages/login";
import Signup from "./Components/pages/signup";
import ForgotPassword from "./Components/pages/forgotPassword";
import AddVehicle from "./Components/pages/Addvehicle";
import ViewVehicles from "./Components/pages/Viewvehicle";
import Vehicles from "./Components/pages/vehicles";
// import Vehicles from "./vehicles";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/Addvehicle" element={<AddVehicle/>}/>
       
        <Route path="/viewvehicles" element={<ViewVehicles />} />
        <Route path="/vehicles" element={<Vehicles />} />


        <Route path="*" element={<p>WHERE ARE U HEADED???</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
