  import React from "react";
  import {
    Box,
    Text,
    PasswordInput,
    Button,
    TextInput,
    Flex,
  } from "@mantine/core";
  
  import { useForm } from "@mantine/form";
  import { Link, useNavigate } from "react-router-dom";
  import { GoogleLogin } from "@react-oauth/google";
  import "./login.css";
  import "./Dashboard";
  import "./ForgetPassword";
  import "./Signup";
  import axios from "axios";
import { toast } from "react-hot-toast";

  function Login() {
    const navigate = useNavigate();
    const handleLogin = async (values) => {
      const dataToSend = { password: values.password, email: values.email };
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          dataToSend
        );

        // Successful login
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);

        navigate("/dash-board");
        toast.success("welcome")
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

    return (
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <form onSubmit={form.onSubmit(handleLogin)}>
          <Box
            style={{
              display:'flex',
              flexDirection:'column',
              gap:'15px',
              alignItems:'center',
              backgroundColor: "rgb(211, 103, 103)",
            }}
            p={50}
            mah={600}
          >
            <Text className="titleStyle">WELCOME!</Text>

            <TextInput
              className="inputStylee"
              label="Email"
              required
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              className="inputStylee"
              label="Password"
              required
              // value={form.values.password}
              // onChange={form.handleChange("password")}
              {...form.getInputProps("password")}
            />

            {/* ... rest of the form ... */}

            <Button classNames="submit" type="submit" className="buttonStyle">
              Login
            </Button>
            {/* <div className="forgetpassword"> */}
            <Link to="/Forget-Password">
              <Button>ForgetPassword</Button>
            </Link>
            {/* <div> */}
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                navigate("/Get-Profile");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            <Link to="/sign-up" >
              <Text style={{color:"white",fontSize:"20px"}}>Didn't register yet?</Text>

            
            <Button style={{marginLeft:"50px",marginTop:"20px"}}>Sign up</Button></Link>
            {/* </div> */}
            {/* </div> */}
          </Box>
        </form>
      </Flex>
    );
  }
  export default Login;
