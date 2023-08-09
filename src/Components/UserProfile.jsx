import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  Select,
  Text,FileButton,Group,
} from "@mantine/core";
import React ,{ useState } from 'react';
import "./UserProfile.css";
import "./EditProfile";
import {Link} from 'react-router-dom';



export default function UserProfile() {
  const form = useForm({
    // initialValues: { name: '', email: '', age: 0 },
    initialValues: {
      Name: "",
      Email: "",
      DateOfBirth: "",
      Age: "",
      PhoneNumber: "",
      Education: "",
      Skill: "",
      Address: "",
      City: "",
    },

    validate: {
      Name: (value) => (value.trim() === "" ? "Name is required" : null),
      Email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      DateOfBirth: (value) =>
        value.trim() === "" ? "Date of birth is required" : null,
      Age: (value) => (value < 18 ? "Age must be at least 18" : null),
      PhoneNumber: (value) =>
        /^\d{4}-\d{7}$/.test(value) ? null : "Invalid  ( 0300-1234567)",
      Education: (value) =>
        value.trim() === "" ? "Education field is required" : null,
      Skill: (value) =>
        value.trim() === "" ? "Skill field is required" : null,
      Address: (value) => (value.trim() === "" ? "Address is required" : null),
      City: (value) => (value.trim() === "" ? "City is required" : null),
    },
  });
  const handleAddVehicle = (values) => {
    // values.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      console.error("Authentication token not found.");
      return;
    }

    if (
      values.Name.trim() === "" ||
      values.Skill.trim() === "" ||
      values.Addrress.trim() === "" ||
      //   form.values.condition.trim() === "" ||
      values.City.trim() === "" ||
      values.Email.trim() === ""

      //   values.year.trim() === "" ||
      //   values.vehiclePurchasePrice.trim() === "" ||
      //   values.vehicleRetailPrice.trim() === "" ||
    ) {
      console.error("Please fill all the fields.");
      return;
    }

    fetch("https://usquare-test-apis.onrender.com/vehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(form.values),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        // Add the new vehicle data to the existing list of vehicles
        // form([...form, data]);
        // Reset the form fields after successful addition
        form.reset();
      })
      .catch((error) => {
        console.error("Error sending vehicle data:", error);
      });
  };
  const [file, setFile] = useState(null);

  return (
    <Box className="form-container" maw={320} mx="auto">
    
      <form onSubmit={form.onSubmit((values) => handleAddVehicle(values))}>
        <Group position="center">
          <FileButton className="profile" onChange={setFile} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
        </Group>

        {file && (
          <Text size="sm" align="center" mt="sm">
            Picked file: {file.name}
          </Text>
        )}
        <TextInput
          label="Name"
          placeholder="Eisha"
          className="input-field"
          {...form.getInputProps("Name")}
        />
        <TextInput
          label="Email"
          withAsterisk
          placeholder="Eisha@gmail.com"
          className="input-field"
          {...form.getInputProps("Email")}
        />

        <NumberInput
          mt="sm"
          label="Date-of-Birth"
          placeholder="28-01-2001"
          
          className="input-field"
          {...form.getInputProps("DateOfBirth")}
        />
        <NumberInput
          mt="sm"
          label="Age"
          placeholder="18"
          min={18}
          max={130}
          className="input-field"
          {...form.getInputProps("Age")}
        />
        <TextInput
          withAsterisk
          label="PhoneNumber"
          placeholder="0303-1234567"
          className="input-field"
          {...form.getInputProps("PhoneNumber")}
        />
        <Select
          className="input-field"
          label="Education"
          placeholder="Pick one"
          data={[
            { value: "BS", label: "BS" },
            { value: "MS", label: "MS" },
            { value: "Phd", label: "Phd" },
          ]}
          {...form.getInputProps("Education")}
        />

        <TextInput
          label="Skills"
          placeholder="web-Designing"
          className="input-field"
          {...form.getInputProps("Skills")}
        />
        <TextInput
          label="Address"
          placeholder="I-8 Islamabad"
          className="input-field"
          {...form.getInputProps("Address")}
        />

        <Select
          className="input-field"
          label="City"
          placeholder="Pick one"
          data={[
            { value: "Islamabad", label: "Islamabad" },
            { value: "Karachi", label: "Karachi" },
            { value: "Lahore", label: "Lahore" },

            { value: "Multan", label: "Multan" },
            { value: "Faislabad", label: "Faislabad" },
          ]}
          {...form.getInputProps("City")}
        />

        <Button type="submit" mt="sm" className="submit-button">
          Submit profile
        </Button>
        <Link to="/EditProfile">
        <Button type="submit" className="edit">Edit</Button></Link>

        {/* <form
          onSubmit={form.onSubmit(
            (values, _event) => {
              setFormValues(values);
            },
            (validationErrors, _values, _event) => {
              console.log(validationErrors);
            }
          )}
        ></form> */}
      </form>
    </Box>
  );
}
