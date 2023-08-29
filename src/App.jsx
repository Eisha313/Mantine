import Signup from "./Components/Signup";
import Login from "./Components/Login";
import DashboardLayout from "./Components/DashboardLayout";
import { Routes, Route } from "react-router-dom";
import AddVehicle from "./Components/Addvehicle";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import UserProfile from "./Components/UserProfile";
import EditProfile from "./Components/EditProfile";
import ChangePassword from "./Components/changePassword";
import GetProfile from "./Components/GetProfile";
import UpdateProfile from "./Components/UpdateProfile";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../utils/Data";
import AddUserForm from "./Components/AddUser";
import ViewUser from "./Components/ViewUser";
import Dashboard from "./Components/Dashboard";
import AddingVehicle from "./Components/AddingVehicle";
import { Toaster } from "react-hot-toast";
import ViewVehicle from "./Components/viewVehicle";
import Chat from "./Components/Chat";
import ChatBox from "./Components/ChatModule/ChatBox";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import NavBar from "./Components/ChatModule/NavBar";
import Welcome from "./Components/ChatModule/Welcome";
import Phone from "./Components/ChatModule/phone";
import AboutUs from "./Components/AboutUs";
import Reactrender from "./Components/Reactrender";
// import PhoneSignUp from "./Components/phoneSignup";
Chart.register(CategoryScale);

// import {BarChart} from "../utils/BarChart";

function App() {
  const [user] = useAuthState(auth);
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          
          <Route path="/dash-board" element={<Dashboard />} />
          <Route path="add-user" element={<AddUserForm />} />
          <Route path="/adding-vehicle" element={<AddingVehicle/>}/>
          <Route path="/view-vehicle" element={<ViewVehicle/>}/>
          <Route path="/Chat-box" element={<ChatBox/>}/>
          <Route path="/phone" element={<Phone/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="react-render" element={<Reactrender/>}/>
          {/* <Route path="phone-sign" element={<PhoneSignUp/>}/> */}

          {/* <Route path="add-user" element={<AddUserForm />} /> */}
          <Route path="view-user" element={<ViewUser />} />
        </Route>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/get-profile" element={<GetProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/chat" element={<Chat/>}/>
        
        <Route path="/nav-bar" element={<NavBar/>}/>
        <Route path="/welcome" element={<Welcome/>}/>

        
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      {/* // <BarChart chartData={chartData} /> */}
    </>
  );
}
export default App;
