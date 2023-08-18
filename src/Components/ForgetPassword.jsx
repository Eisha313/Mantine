import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPassword";
import "./ForgetPassword.css";
import "./Login";
import axios from "axios";
import { useState } from "react";

export default function ForgetPassword() {
  // const [email, setEmail] = useState('');
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const handleFormSubmit = async (values) => {
    try {
      if (!form.values.email) {
        setFormError("Enter email first");
        console.log(setFormError);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        {
          email: form.values.email,
        }
      );
      console.log("response", response);
      setFormError("You can now go to Reset Your password");
      // navigate("/ResetPassword?email=${form.values.email}");
      navigate("/ResetPassword");
    } catch (error) {
      console.error("Error checking email:", error);
      setFormError("Something went wrong. Please try again later.");
    }
  };

  queueMicrotask;

  return (
    <Box maw={300} mx="auto">
      <form className="formstyle" onSubmit={form.onSubmit(handleFormSubmit)}>
        <div className="forgetpassword">
          <Text className="h1">Forget Password</Text>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          {form.errors.email && (
            <div style={{ color: "white" }}>{form.errors.email}</div>
          )}

          <Group position="right" mt="md">
            <div className="Button">
              {/* <Link to="/ResetPassword">  */}
              <Button type="submit">Submit</Button>

              {/* </Link> */}
            </div>
            <div className="random">
              <Text className="randomText">Want to go back?</Text>
              <div className="Button2">
                <Link to="/Login">
                  <Button type="submit">Login</Button>
                </Link>
              </div>
            </div>
          </Group>
        </div>
      </form>
    </Box>
  );
}
