import React, { useState } from "react";
import {
  TextInput,
  Select,
  Button,
  PasswordInput,
  Group,
  Text,
  useMantineTheme,
  rem,
  Grid,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Paperclip } from "tabler-icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
// import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import axios from "axios";

const AddUserForm = () => {
  // const [userData, setUserData] = useState("");
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      ConfirmPassword: "",
      CellNumber: "",
      StateLocation: "",
      UserType: "",
      ZipCode: "",
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
      password: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : "Invalid password. It must be at least 8 characters long and contain at least one letter and one digit.",

      ConfirmPassword: (value, data) =>
        value === data.password ? null : "Passwords do not match",

      ZipCode: (value) =>
        /^\d{5}(?:-\d{4})?$/.test(value) ? null : "Invalid zip code",

      CellNumber: (value) =>
        /^\d{11}$/.test(value)
          ? null
          : "Invalid phone number. It must be 11-digit number.",
    },
  });

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target;
  //     setUserData((prevUserData) => ({
  //       ...prevUserData,
  //       [name]: value,
  //     }));
  //   };

  const token = localStorage.getItem("jwtToken");
  // console.log("this is ",token)

  const handleSubmit = async (values) => {
    console.log("hello");
    const dataToSend = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      ConfirmPassword: values.ConfirmPassword,
      CellNumber: values.CellNumber,
      StateLocation: values.StateLocation,
      UserType: values.UserType,
      ZipCode: values.ZipCode,
    };
    console.log(dataToSend);

    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("User Data:", form.values);
      console.log("Response:", response.data);

      form.reset();
    } catch (error) {
      console.error("Error:", error);
    }

    // Reset the form fields
    // setUserData({
    //   FirstName: "",
    //   LastName: "",
    //   Email: "",
    //   Password: "",
    //   ConfirmPassword: "",
    //   cellNumber: "",
    //   StateLocation: "",
    //   UserType: "",
    //   ZipCode: "",
    // });
  };

  console.log(form.values)

  return (
    <div>
      <h1 style={{ marginLeft: "440px" }}>Add User</h1>
      <h4
        style={{
          color: "GrayText",
          marginLeft: "420px",
        }}
      >
        Fill in the data to add user
      </h4>
      {/* <form onSubmit={form.onSubmit((values) => handleSubmit(values))}> */}
      {/* <form onSubmit={form.onSubmit((values) => handleSubmit(values))}> */}
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid>
          <Grid.Col span={4}>
            <Select
              label="User Type"
              placeholder="Pick one"
              withAsterisk
              data={[
                { value: "User", label: "User" },
                { value: "Admin", label: "Admin" },
                // { value: "Inventory Manager", label: "Inventory Manager" },
                // { value: "Accountant", label: "Accountant" },
                // { value: "Dispatcher", label: "Dispatcher" },
              ]}
              {...form.getInputProps("UserType")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="First Name"
              withAsterisk
              placeholder="Eisha"
              required
              {...form.getInputProps("firstName")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Last Name"
              placeholder="Abbasi"
              required
              {...form.getInputProps("lastName")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Email"
              withAsterisk
              placeholder="eisha@gmail.com"
              required
              {...form.getInputProps("email")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <PasswordInput
              label="Password"
              withAsterisk
              placeholder="abc123"
              {...form.getInputProps("password")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <PasswordInput
              label="Confirm Password"
              withAsterisk
              placeholder="abc123"
              {...form.getInputProps("ConfirmPassword")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Cell Number"
              withAsterisk
              placeholder="0300-1234561"
              {...form.getInputProps("CellNumber")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="State Location"
              placeholder="Pick one"
              withAsterisk
              data={[
                { value: "Alabama", label: "ALabama" },
                { value: "Alaska", label: "Alaska" },
                { value: "Arizona", label: "Texas" },
                { value: "California", label: "California" },
                { value: "Conneticut", label: "Conneticut" },
              ]}
              {...form.getInputProps("StateLocation")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Zip Code"
              withAsterisk
              placeholder="12345"
              {...form.getInputProps("ZipCode")}
            />
          </Grid.Col>
          <Group position="center">
            <Dropzone
              mx={"500px"}
              my={"20px"}
              style={{
                width: 200,
                borderRadius: 8,
                padding: "20",
                marginLeft: "400px",
              }}
              h={230}
              onDrop={(files) => console.log("accepted files", files)}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: rem(220), pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    size="3.2rem"
                    stroke={1.5}
                    color={
                      theme.colors[theme.primaryColor][
                        theme.colorScheme === "dark" ? 4 : 6
                      ]
                    }
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size="3.2rem"
                    stroke={1.5}
                    color={
                      theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
                    }
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  {/* <IconPhoto size="3.2rem" stroke={1.5} /> */}
                  <Paperclip
                    size={48}
                    strokeWidth={2}
                    color={"black"}
                    style={{
                      marginTop: "50px",
                    }}
                  />
                </Dropzone.Idle>

                <div>
                  <Text
                    size="xxl"
                    inline
                    style={{
                      marginBottom: "65px",
                    }}
                  >
                    Drag images here or click to select files
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </Group>
          <Flex justify={"space-around"} w={"100%"} px={320}>
            <Button
              type="reset"
              style={{
                backgroundColor: "white",
                color: "red",
                border: "1px solid red ",
                width: "150px",
              }}
            >
              Reset
            </Button>

            <Button
              type="submit"
              style={{ backgroundColor: "orange", width: "150px" }}
            >
              Add User
            </Button>
          </Flex>
        </Grid>
      </form>
    </div>
  );
};

export default AddUserForm;
