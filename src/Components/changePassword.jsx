import { PasswordInput, Button, Box, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { React, useState } from "react";
import "./ChangePassword.css";

export default function ChangePassword() {
  const [formError, setFormError] = useState(null);
  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationRules: {
      newPassword: (value) =>
        value.length >= 6 || "Password should be at least 6 characters long",
      confirmPassword: (value, values) =>
        value === values.newPassword || "Passwords do not match",
    },
  });

  const handleFormSubmit = async () => {
    try {
      if (
        !form.values.oldPassword ||
        !form.values.newPassword ||
        !form.values.confirmPassword
      ) {
        setFormError("Please fill in all fields.");
        return;
      }

      if (form.values.newPassword !== form.values.confirmPassword) {
        setFormError("New password and confirm password do not match.");
        return;
      }


      const response = await axios.post(
        "http://localhost:3000/auth/change-password",
        {
          oldPassword: form.values.oldPassword,
          newPassword: form.values.newPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );

      if (response.data.success) {
        form.reset();
        // Password changed successfully
      }
    } catch (error) {
      console.error("Error changing password:", error);
      // Handle error
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form className="formstyle" onSubmit={form.onSubmit(handleFormSubmit)}>
        <div className="change-password">
          <Text className="h1">Change Password</Text>
          <PasswordInput
            label="Old Password"
            placeholder="Enter previous password"
            {...form.getInputProps("oldPassword")}
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            {...form.getInputProps("confirmPassword")}
          />
          {form.errors.newPassword && (
            <div style={{ color: "red" }}>{form.errors.newPassword}</div>
          )}
          {form.errors.confirmPassword && (
            <div style={{ color: "red" }}>{form.errors.confirmPassword}</div>
          )}
          <Button className="button" type="submit">
            Change Password
          </Button>
        </div>
      </form>
    </Box>
  );
}
