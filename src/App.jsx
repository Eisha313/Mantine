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
Chart.register(CategoryScale);
// import {BarChart} from "../utils/BarChart";

function App() {
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
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* <Route index element={<Dashboard />} /> */}
        <Route path="/dash-board" element={<Dashboard/>}/>
        <Route path="add-user" element={<AddUserForm />} />
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
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    // <BarChart chartData={chartData} />
  );
}
export default App;
