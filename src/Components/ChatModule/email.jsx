import React, { useState } from "react";
import {
  Text,
  Flex,
  Button,
  TextInput,
  PasswordInput,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { auth } from "../../firebase"; // Make sure to import your Firebase configuration
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const EmailSignup = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const form = useForm({
    initialValues: {
      email: null,
      password: "",
    },
  });
  

  const signUpWithEmail = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(
        auth,
        form.values.email,
        form.values.password
      )
        .then((userCredential) => {
          sendEmailVerification(userCredential.user);
          auth.signOut();
          alert("Email sent");
          navigate("/verify-otp");
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={form.onSubmit((values) => signUpWithEmail(values))}>
          <Flex
            
            direction={"column"}
            justify={"center"}
            align={"center"}
            gap={"lg"}
            p="20px"
            style={{
              border: "1px solid orange",
              height: "300px",
              width: "300px",
              margin: "auto",
              marginTop:"100px"
            }}
          >
            <TextInput
              placeholder="Enter your email"
              label="Email"
              type="email"
              style={{ width: "100%" }}
              value={email}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              placeholder="Enter your password"
              label="Password"
              type="password"
              value={password}
              style={{ width: "100%" }}
              // onChange={(e) => setPassword(e.target.value)}
              {...form.getInputProps("password")}
            />
            <Group>
              <Link to="/">
                <Button  style={{backgroundColor:"orange"}}>Cancel</Button>
              </Link>
              <Button  style={{backgroundColor:"orange"}} type="submit">Sign Up</Button>
            </Group>
          </Flex>
          {error && <Text color="red">{error}</Text>}
        </form>
      </div>
    </>
  );
};
export default EmailSignup;
