import { TextInput, Button, Box, PasswordInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "./resetpassword.css"

export default function ResetPassword() {
  const [formError, setFormError] = useState(null);
  const location = useLocation();
  const routerLocation = useLocation();
  const emailFromQuery = new URLSearchParams(routerLocation.search).get('email');

  useEffect(() => {
    if (emailFromQuery) {
      // Set the initial value of the email field
      form.setFieldValue('email', emailFromQuery);
    }
  }, [emailFromQuery]);

  const form = useForm({
    initialValues: {
      email: '',
      newPassword: '',
      confirmPassword: '',
      resetPasswordToken: '',
    },
    validate: {
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : 'Passwords do not match',
      resetPasswordToken: (value) => (value.length === 6 ? null : 'Invalid token'),
    },
  });

  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    try {
      if (!form.values.newPassword || !form.values.confirmPassword) {
        setFormError('Enter the details first');
        return;
      }

      const dataToSend = {
        email: form.values.email,
        newPassword: form.values.newPassword,
        resetPasswordToken: form.values.resetPasswordToken,
      };

      const response = await axios.post('http://localhost:3000/auth/reset-password', dataToSend);
      console.log(response);
      navigate('/UserProfile');
    } catch (error) {
      console.log('Error resetting password:', error);
      setFormError('Something went wrong');
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handlePasswordReset)}>
        <div className="ResetMain">
          <div className="heading">
            <Text>Reset Password</Text>
          </div>
          <div className="email">
            <TextInput
              label="Email"
              value={form.values.email}
              {...form.getInputProps('email')}
            />
          </div>
          <div className="token">
            <TextInput
              withAsterisk
              label="Reset Password Token"
              placeholder="Enter the token you were provided"
              {...form.getInputProps('resetPasswordToken')}
            />
            {form.errors.resetPasswordToken && (
              <div style={{ color: 'red' }}>{form.errors.resetPasswordToken}</div>
            )}
          </div>
          <div className="password">
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="hello123"
              {...form.getInputProps('newPassword')}
            />
          </div>
          <div className="Cpassword">
            <PasswordInput
              withAsterisk
              label="ConfirmPassword"
              placeholder="hello123"
              {...form.getInputProps('confirmPassword')}
            />
          </div>
          {formError && <div style={{ color: 'red' }}>{formError}</div>}
          <div className="button">
            <Button type="submit">Reset</Button>
          </div>
        </div>
      </form>
    </Box>
  );
}