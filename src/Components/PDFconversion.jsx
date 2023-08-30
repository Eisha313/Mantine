import React, { useState, useEffect } from "react";
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
import { toast } from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import UserFormPDF from "./UserFormPDF";
const AddUserFormm = ({ userId, userData }) => {
 

  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      firstName: userData ? userData.firstName : "",
      lastName: userData ? userData.lastName : "",
      email: userData ? userData.email : "",
      password: userData ? userData.password : "",
      ConfirmPassword: userData ? userData.ConfirmPassword : "",
      CellNumber: userData ? userData.CellNumber : "",
      StateLocation: userData ? userData.StateLocation : "",
      userType: userData ? ZipCode : "",
      ZipCode: userData ? userData.ZipCode : "",
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


  const location = useLocation();
  const [showPrint, setShowPrint] = useState(false);

  console.log(location)

  const id  = location?.state?.id ;
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    
    try {
      const response = axios
        .get(`http://localhost:3000/users/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => form.setValues(res.data.user));
      form.setValues(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId, token]);

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
      userType: values.userType,
      ZipCode: values.ZipCode,
    };
    console.log(dataToSend);
    if(id===null){
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
      toast.success("user added successfuly");

      form.reset();
    } catch (error) {
      console.error("Error:", error);
    }}
    else {
      try{
      const response2 = await axios.patch(
        `http://localhost:3000/users/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Response:", response2.data);
      toast.success("User updated successfully");
      form.reset()
    }
   catch (error) {
    console.error("Error:", error);
  }}
;







   

  };
  const handlePrint = () => {
    setShowPrint(true);

    setTimeout(() => {
        window.print();
        setShowPrint(false); 
      }, 1000); 
    };

  console.log(form.values);

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
  
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Button
          type="button"
          onClick={handlePrint}
          
        >
          Print PDF
        </Button>
        {showPrint && <UserFormPDF formData={form.values} />}
        <style>
        {`
        
          @media print {
            button[type="reset"],
            button[type="submit"] ,
            button [type="button"]{
              display: none;
            }
          }
        `}
      </style>
        
         
         
        
        <Grid>
          <Grid.Col span={4}>
            <Select
              label="User Type"
              placeholder="Pick one"
              withAsterisk
              data={[
                { value: "User", label: "User" },
                { value: "Admin", label: "Admin" },
               
              ]}
              {...form.getInputProps("userType")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="First Name"
              withAsterisk
              placeholder="Eisha"
              required
              {...form.getInputProps("firstName", {
                initialValue: userData ? userData.firstName : "",
              })}
              // {...form.getInputProps("firstName")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Last Name"
              placeholder="Abbasi"
              required
              // {...form.getInputProps("lastName")}
              {...form.getInputProps("lastName", {
                initialValue: userData ? userData.lastName : "",
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Email"
              withAsterisk
              placeholder="eisha@gmail.com"
              required
              // {...form.getInputProps("email")}
              {...form.getInputProps("email", {
                initialValue: userData ? userData.email : "",
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <PasswordInput
              label="Password"
              withAsterisk
              placeholder="abc123"
              // {...form.getInputProps("password")}
              {...form.getInputProps("password", {
                initialValue: userData ? userData.password : "",
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <PasswordInput
              label="Confirm Password"
              withAsterisk
              placeholder="abc123"
              // {...form.getInputProps("ConfirmPassword")}
              {...form.getInputProps("ConfirmPassword", {
                initialValue: userData ? userData.ConfirmPassword : "",
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Cell Number"
              withAsterisk
              placeholder="0300-1234561"
              // {...form.getInputProps("CellNumber")}
              {...form.getInputProps("CellNumber", {
                initialValue: userData ? userData.CellNumber : "",
              })}
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
              // {...form.getInputProps("StateLocation")}
              {...form.getInputProps("StateLocation", {
                initialValue: userData ? userData.StateLocation : "",
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Zip Code"
              withAsterisk
              placeholder="12345"
              // {...form.getInputProps("ZipCode")}
              {...form.getInputProps("ZipCode", {
                initialValue: userData ? userData.ZipCode : "",
              })}
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

export default AddUserFormm;
