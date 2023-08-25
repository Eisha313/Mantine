import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Select } from "@mantine/core";
import "./Signup.css";
import "./Login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./UserProfile.css"
// import Phone from "./ChatModule/phone";

function Signup() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // zipCode: "",
      // PhoneNumber: "",
      userType: "",
      termsOfService: false,
    },

    validate: {
      firstName: (value) =>
        /^[A-Za-z\s]+$/.test(value) && value.length >= 2 && value.length <= 50
          ? null
          : "Invalid firstName",

      lastName: (value) =>
        /^[A-Za-z\s]+$/.test(value) && value.length >= 2 && value.length <= 50
          ? null
          : "Invalid lastName",

      email: (value) => (/.+@\S+$/.test(value) ? null : "Invalid email"),
      // password: (value) =>
      // /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/.test(value)
      // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
      //   ? null
      //   : "Invalid password. It must be at least 8 characters long and contain at least one letter and one digit.",

      confirmPassword: (value, data) =>
        value === data.password ? null : "Passwords do not match",

      // zipCode: (value) =>
      //   /^\d{5}(?:-\d{4})?$/.test(value) ? null : "Invalid zip code",

      // PhoneNumber: (value) =>
      //   /^\d{11}$/.test(value)
      //     ? null
      //     : "Invalid phone number. It must be 11-digit number.",
    },
  });
  const navigate = useNavigate();
  const signingIn = async (values) => {
    const dataToSend = {
      email: values.email,
      password: values.password,

      firstName: values.firstName,
      lastName: values.lastName,
      fullName: values.fullName,
      // zipCode: values.zipCode,
      userType: values.userType,
      
    };
    console.log(dataToSend);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        dataToSend
      );
      console.log(response.data);

      navigate("/login");
      // <Link to="/Login"></Link>
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <Box className="Box" maw={300} mx="auto">
      <form
        className="form"
        onSubmit={form.onSubmit((values) => signingIn(values))}
      >
        <Text className="titleStyle">Register Here!</Text>
        <Select
          label="UserType"
          placeholder="Pick one"
          data={[
            { value: "User", label: "User" },
            { value: "Admin", label: "Admin" },
          ]}
          {...form.getInputProps("userType")}
        />
        <TextInput
          withAsterisk
          label="First Name"
          placeholder="Sara"
          {...form.getInputProps("firstName")}
        />

        <TextInput
          withAsterisk
          label="Last Name"
          placeholder=" leonard"
          {...form.getInputProps("lastName")}
        />

        <TextInput
          withAsterisk
          label="Full Name"
          value={form.values.firstName + " " + form.values.lastName}
          disabled
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="abc123"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          withAsterisk
          label="Confirm Password"
          placeholder="abc123"
          {...form.getInputProps("confirmPassword")}
        />

        {/* <TextInput
          withAsterisk
          label="Zip Code"
          placeholder="123"
          {...form.getInputProps("zipCode")}
        /> */}
        {/* <Select
          label="UserType"
          placeholder="Pick one"
          data={[
            { value: "User", label: "User" },
            { value: "Admin", label: "Admin" },
          ]}
          {...form.getInputProps("userType")}
        /> */}

        {/* <TextInput
          withAsterisk
          label="Phone Number"
          placeholder="0303-1234567"
          {...form.getInputProps("PhoneNumber")}
        /> */}

        <Checkbox
          className="privacy"
          mt="md"
          label="I agree to share my information"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group position="right" mt="md">
          {/* <Link to="/Login"> */}
          <Button className="Button" type="submit">
            Sign Up
          </Button>
        
          {/* </Link> */}
        </Group>
      </form>
    </Box>
  );
}

export default Signup;
