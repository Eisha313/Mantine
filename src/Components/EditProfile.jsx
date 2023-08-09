import { useForm } from "@mantine/form";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  NumberInput,
  TextInput,
  Button,
  Box,
  Select,
  Text,
  FileButton,
  Group,
} from "@mantine/core";
import "./UserProfile.css";

export default function EditProfile() {
  const form = useForm({
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

  const handleEditProfile = (values) => {
    // Handle the logic to edit the user's profile here
    console.log("Edit profile:", values);
  };

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Create a URL for the selected image file and set it as the imagePreview state
      const imageURL = URL.createObjectURL(selectedFile);
      setImagePreview(imageURL);
    }
  };

  return (
    <Box className="form-container" maw={320} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleEditProfile(values))}>
        <Group position="center">
          <FileButton
            className="profile"
            onChange={handleFileChange}
            accept="image/png,image/jpeg"
          >
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
        </Group>

        {imagePreview && (
          <img src={imagePreview} alt="Preview" width={200} height={200} />
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
        <div className="password">
        <Link to="/ChangePassword"> <Button>ChangePassword</Button>        
          </Link></div>
      </form>
    </Box>
  );
}