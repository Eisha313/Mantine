import React, { useState } from "react";
import { Text, Flex, Button, TextInput } from "@mantine/core";
// import { Form } from "mantine-form";
import { useForm } from "@mantine/form";
// import { Form } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const Phone = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [confirmObj, setConfirmObj] = useState("");
  const [flag, setFlag] = useState(false);
  const form = useForm();
  const getOtp = async (e) => {
    // e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined) {
      console.log("Errror");
      return setError("enter a valid phone number");
    }
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setError(err.messages);
    }
  };

  const setUpRecaptcha = (number) => {
    console.log("In Recaptcha");

    try {
      const reCaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
      reCaptchaVerifier.render();
    } catch (err) {
      console.log(err);
    }
    return signInWithPhoneNumber(auth, number,reCaptchaVerifier,);
  };

  const phoneSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const [otp, setOtp] = useState("");
  const verifyOtp = async (e) => {
    //   e.preventDefault()
    if (opt === "" || opt === null) return;
    try {
      await confirmObj.confirm(otp);
      navigate("/dash-board");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={form.onSubmit(getOtp)}
        style={{ display: !flag ? "block" : "none" }}
      >
        <PhoneInput
          defaultCountry="Pakistan"
          onChange={setNumber}
          value={number}
          placeholder=""
        />
        <div id="recaptcha-container" />
        <Flex>
          <Link to="/">
            <Button>Cancel</Button>
          </Link>
          <Button type="submit">Send</Button>
        </Flex>
      </form>
      <form
        onSubmit={form.onSubmit(verifyOtp)}
        style={{ display: !flag ? "block" : "none" }}
      >
        <TextInput
          placeholder="enter your otp"
          onChange={(e) => setOtp(e.target.value)}
        />

        <Flex>
          <Link to="/">
            <Button>Cancel</Button>
          </Link>
          <Button type="submit">Verify</Button>
        </Flex>
      </form>
    </div>
  );
};
export default Phone;
