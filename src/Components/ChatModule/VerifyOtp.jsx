import React, { useState } from "react";
import { Text, Flex, Button, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import your Firebase configuration

const VerifyOTP = () => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const verifyOTP = async () => {
    setError("");
    try {
      const user = auth.currentUser;

      if (user) {
        await signInWithEmailLink(user.email, window.location.href)
          .then(() => {
            // OTP verification successful
            alert("OTP verified successfully");
            navigate("/dash-board"); // Navigate to the dashboard
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
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
            marginTop: "100px",
          }}
        >
          <TextInput
            placeholder="Enter OTP"
            label="OTP"
            type="text"
            style={{ width: "100%" }}
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <Button
            style={{ backgroundColor: "orange" }}
            onClick={verifyOTP}
          >
            Verify OTP
          </Button>
        </Flex>
        {error && <Text color="red">{error}</Text>}
      </div>
    </>
  );
};

export default VerifyOTP;