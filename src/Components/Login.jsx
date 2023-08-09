import React from "react";
import { Box, Text, PasswordInput, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./login.css";
import "./Dashboard";
import "./ForgetPassword";
import "./Signup";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    //   const dataToSend={password: values.password,
    //   email:values.email};
    //   try {
    //     const response = await axios.post("http://localhost:3000/auth/login",
    //     dataToSend)
    //     //  {
    //     //   // method: "POST",
    //     //   // headers: {
    //     //   //   "Content-Type": "application/json",
    //     //   // },
    //     //   body: JSON.stringify({
    //     //     email: values.email,
    //     //     password: values.password,
    //     //   }),
    //     // }

    //     if (!response.ok) {
    //       throw new Error("Failed to log in. Please check your credentials.");
    //     }
    //     const responseData = await response.json();
    //    const token = responseData.data.token;

    //    localStorage.setItem("jwtToken", token);

    //     navigate("/Dashboard");
    //   } catch (error) {
    //     console.error("Error logging in:", error)

    //   }
    // };

    const dataToSend = { password: values.password, email: values.email };
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        dataToSend
      );

      if (response.status >= 200 && response.status < 300) {
        // Successful login
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        // Navigate to the dashboard or some other page after successful login
        // Example:
        navigate("/UserProfile");
      } else {
        // Unsuccessful login
        throw new Error("Failed to log in. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),

      // password: (value) =>
      //   // /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/.test(value)
      //     ? null
      //     : "Invalid password.",
    },
  });

  const handleSocialSignIn = async () => {
    try {
      // Initiate Google sign-in
      const user = await signIn();

      // Here, you can handle the user data returned by Google
      console.log("Google user:", user);

      // You can also use the user data to log in the user to your app
      // ...
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Box maw={600} mx="auto">
      <form onSubmit={form.onSubmit(handleLogin)}>
        <div className="containerStyle">
          <Text className="titleStyle">WELCOME!</Text>

          <TextInput
            className="inputStylee"
            label="Email"
            required
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
           <PasswordInput className="inputStylee"
            label="Password"
            required
            
            // value={form.values.password}
            // onChange={form.handleChange("password")}
            {...form.getInputProps("password")}
          />


          {/* ... rest of the form ... */}

          <Button  classNames="submit"type="submit" className="buttonStyle">
            Login
          </Button>
            <div className="forgetpassword">  
          <Link  to="/ForgetPassword">
          <Button >ForgetPassword</Button>
          </Link>
          </div>
          <div className="socialButtons">
          <GoogleLogin 
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                navigate("/GetProfile")
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            </div>
          {/* </div>  */}

          {/* <div className="socialButtons"> */}
            {/* <Button onClick={handleSocialSignIn}>Sign in with Google</Button> */}
            {/* ... other social sign-in buttons ... */}
            
          {/* </div> */}

          {/* ... rest of the form ... */}
        </div>
      </form>
    </Box>
  );
}
export default Login;
