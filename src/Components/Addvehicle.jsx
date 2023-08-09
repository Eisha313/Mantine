import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  Select,
} from "@mantine/core";
import "./Addvehicle.css"

export default function AddVehicle() {
  const form = useForm({
    // initialValues: { name: '', email: '', age: 0 },
    initialValues: {
      vehicleTitle: "",
      floorCompany: "",
      vehicleType: "",
      condition: "",
      VIN: "",
      state: "",
      vehiclePurchasePrice: 0,
      vehicleRetailPrice: 0,
      make: "",
      model: "",
      auctionCompany: "",
      year: 0,
    },

    // functions will be used to validate values at corresponding key
    validate: {
    //   name: (value) =>
    //     value.length < 2 ? "Name must have at least 2 letters" : null,
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      vehiclePurchasePrice: (value) =>
        value < 0 ? "Enter a valid amount" : null,
      vehicleRetailPrice: (value) =>
        value < 0 ? "Enter a valid amount" : null,
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
        
      values.vehicleTitle.trim() === "" ||
      values.floorCompany.trim() === "" ||
    values.vehicleType.trim() === "" ||
    //   form.values.condition.trim() === "" ||
      values.VIN.trim() === "" ||
      values.state.trim() === "" ||
      values.make.trim() === "" ||
      values.model.trim() === "" ||
    //   values.year.trim() === "" ||
    //   values.vehiclePurchasePrice.trim() === "" ||
    //   values.vehicleRetailPrice.trim() === "" ||
      values.auctionCompany.trim() === ""
    )
     {
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
        form.reset()
      })
      .catch((error) => {
        console.error("Error sending vehicle data:", error);
      });
  };

  return (
    <Box className="form-container" maw={320} mx="auto">
      <form onSubmit={form.onSubmit(values => handleAddVehicle(values))}>
        <TextInput
          label="vehicleTitle"
          placeholder="VehicleTitle"
          className="input-field"
          {...form.getInputProps("vehicleTitle")}
        />
        <TextInput
          label="floorCompany"
          placeholder="floorCompany"
          className="input-field"
          {...form.getInputProps("floorCompany")}
        />
        <TextInput 
          label="vehicleType"
          placeholder="VehicleType"
          className="input-field"
          {...form.getInputProps("vehicleType")}
        />
        {/* <Select
          data={["New", "Used"]}
          label="Select the current condition of car"
          withAsterisk
          {...form.getInputProps("condition")}
        /> */}
         <Select   className="input-field"
      label="Car condition"
      placeholder="Pick one"
      data={[
        { value: 'New', label: 'New' },
        { value: 'Used', label: 'Used' },
       
       
      ]}
      {...form.getInputProps("condition")}
    />










        <TextInput
          label="VIN"
          placeholder="VIN"
          className="input-field"
          {...form.getInputProps("VIN")}
        />
        <TextInput
          label="state"
          placeholder="state"
          className="input-field"
          {...form.getInputProps("state")}
        />
        <NumberInput
          mt="sm"
          label="vehiclePurchasePrice"
          placeholder="vehiclePurchasePrice"
          min={0}
          max={100000000000000}
          className="input-field"
          {...form.getInputProps("vehiclePurchasePrice")}
        />
        <NumberInput
          mt="sm"
          label="vehicleRetailPrice"
          placeholder="vehicleRetailPrice"
          min={0}
          className="input-field"
          max={99999999999999}
          {...form.getInputProps("vehicleRetailPrice")}
        />

        <TextInput
          mt="sm"
          label="make"
          className="input-field"
          placeholder="make"
          {...form.getInputProps("make")}
        />
        <TextInput
          mt="sm"
          label="model"
          placeholder="model"
          className="input-field"
          {...form.getInputProps("model")}
        />
        <TextInput
          mt="sm"
          label="auctionCompany"
          placeholder="auctionCompany"
          className="input-field"
          {...form.getInputProps("auctionCompany")}
        />

        <NumberInput
          mt="sm"
          label="year"
          placeholder="year"
          min={1900}
          max={2024}
          className="input-field"
          {...form.getInputProps("year")}
        />
        <Button type="submit" mt="sm" className="submit-button">
          Submit
        </Button>

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
