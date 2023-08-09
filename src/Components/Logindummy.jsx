import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Input,PasswordInput,Button ,Text} from "@mantine/core"
// import Signup from "./Components/Pages/signup";
// import Signup from "./Components/pages/signup";
import "./login.css";
// import {db} from '../../../firebase'

export default function Login() {


  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const handleEmailchange = (e) => {
    setLemail(e.target.value);
  };
  const handlePasswordchange = (e) => {
    setLpassword(e.target.value);
  };
 
  // const handleLogin = () => {
  //   const data = JSON.parse(localStorage.getItem("dataKey"));
  //   console.log(data);
  //   const len = data.length;
  //   let isLoggedIn = false;

  //   for (let i = 0; i < len; i++) {
  //     if (data[i].email === lemail && data[i].password === lpassword) {
  //       console.log("hello");
  //       alert("Login successful");
  //       isLoggedIn = true;
  //       break;
        // } else if (data[i].email !== lemail) {
        //   alert("we do not have this user");
        //   break;
    //   }
    // }

  //   if (!isLoggedIn) {
  //     alert("something is wrong..fill the fields and check them too");
  //   }
  // };

  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/Signup");
  };
  const handleForgotPassword = () => {
    navigate("/ForgotPassword");
  };
  const handleLogin = async () => {
    const dataToSend = {
      email: lemail,
      password: lpassword,
      // Add other login data properties here if needed
    };

    try {
      const response = await fetch("https://usquare-test-apis.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to log in. Please check your credentials.");
      }
      const responseData = await response.json();
     const token = responseData.data.token;

   
     localStorage.setItem("jwtToken", token);


      
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error logging in:", error)
      setLoginError(true);
    }
  };

  return (
    <>
      <div className="styy">
        <label htmlFor="email" className="ee">
          Email
        </label>
        <Input
          type="email"
          id="lemail"
          name="email"
          placeholder="Enter the email you used for signing up"
          onChange={handleEmailchange}
          value={lemail}
        />
        <br />

        <label htmlFor="password" className="pp">
          Password
        </label>
        <PasswordInput
          // type="password"
          id="lpassword"
          name="password"
          placeholder="Enter the password you used for signing up"
          onChange={handlePasswordchange}
          // onChange={(e)=> setLpassword(e.target.value)}
          value={lpassword}
        />
        {loginError && (
          <Text style={{ color: "red" }}>Invalid email or password. Please try again.</Text>
        )}
        <br />
      </div>
      <div className="sty">
        <Button onClick={handleLogin}>LOGIN</Button>

        <Button onClick={handleForgotPassword}>Forgot Password</Button>

        <Button
          onClick={() => {
            handleSignup();
          }}
        >
          {" "}
          Sign up{" "}
        </Button>
      </div>
    </>
  );
}
