import { MantineProvider } from "@mantine/core";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddVehicle from "./Components/Addvehicle";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import UserProfile from "./Components/UserProfile";
import EditProfile from "./Components/EditProfile";
import ChangePassword from "./Components/changePassword";
import GetProfile from "./Components/GetProfile";
import UpdateProfile from "./Components/UpdateProfile";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Demo() {
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route path="/Signup" element={<Signup />} />;
            <Route path="/login" element={<Login />} />;
            <Route path="/Dashboard" element={<Dashboard />} />;
            <Route path="/Addvehicle" element={<AddVehicle />} />;
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/GetProfile" element={<GetProfile />} />
            <Route path="/UpdateProfile" element={<UpdateProfile />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </GoogleOAuthProvider>
  );
}
export default Demo;
