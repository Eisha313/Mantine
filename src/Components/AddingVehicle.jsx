import React, { useState, useEffect } from "react";
import {
  TextInput,
  Select,
  Button,
 
  Group,
  Text,
  useMantineTheme,
  rem,
  Grid,
  Flex,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";


import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
const AddingVehicle = (vehicleId,vehicleData) => {
//   const [vehicleData, setUserData] = useState("");
  // const [editedUserData, setEditedUserData] = useState(null);

  
  const form = useForm({
   
        initialValues: {
           
            vin: "",
            color:"",
            price:"",
            mileage:"",
            
            make: "",
            model: "",
            
            year: "",
            StateLocation:"",
            fuelType:"",
            cylinder:"",
            engine:"",
            bodyType:"",
     
    },
    validate: {
        
          price: (value) =>
            value < 0 ? "Enter a valid amount" : null,
          year: (value) =>
            value < 0 ? "Enter a valid amount" : null,
            vin:(value)=>
            value < 17 ? <span style={{ color: 'red' }}>Enter 17 numbers</span> : null,
            
        },

   
  });
  

 
  const id = location?.state?.id;
  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    
    try {
      const response = axios
        .get(`http://localhost:3000/vehicles/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => form.setValues(res.data.vehicle));
      form.setValues(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [vehicleId, token]);

  const handleSubmit = async (values) => {
    console.log("hello");
    if (
        
        // values.mileage.trim() === "" ||
        values.color.trim() === "" ||
        // values.price.trim() === "" ||
      
        // values.vin.trim() === "" ||
        // values.price.trim() === "" ||

        // values.year.trim() === "" ||
        values.make.trim() === "" ||
        values.model.trim() === ""|| 
        values.StateLocation.trim()===""
        // values.cylinder.trim()===""||
        // values.engine.trim()===""||
        // values.bodyType.trim()===""
        
        
      
      )
       {
        console.error("Please fill all the fields.");
        return;
      }
    const dataToSend = {
        
        vin: values.vin,
       
        price: values.price,
       
        make: values.make,
        model: values.model,
        color:values.color,
        year: values.year,
        mileage:values.mileage,
        fuelType:values.mileage,
        StateLocation:values.StateLocation,
        cylinder:values.cylinder,
        engine:values.engine,
        bodyType:values.bodyType

      
    };
    console.log(dataToSend);
    if(id===null){
    try {

      const response = await axios.post(
        "http://localhost:3000/vehicles",
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("whats wrong")
      console.log("Vehicle Data:", form.values);
      console.log("Response:", response.data);
      toast.success("Vehicle added successfuly");

      form.reset();
    } catch (error) {
      console.error("Error:", error);
    }
}
    else {
      try{
      const response2 = await axios.patch(
        `http://localhost:3000/vehicles/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Response:", response2.data);
      toast.success("Vehicle updated successfully");
      form.reset()
    }
   catch (error) {
    console.error("Error:", error);
  }
}









  };

  console.log(form.values);

  return (
    <div>
      <h1 style={{ marginLeft: "440px" }}>Add Vehicle</h1>
      <h4
        style={{
          color: "GrayText",
          marginLeft: "420px",
        }}
      >
        Fill in the data to add Vehicle
      </h4>
      {/* <form onSubmit={form.onSubmit((values) => handleSubmit(values))}> */}
      {/* <form onSubmit={form.onSubmit((values) => handleSubmit(values))}> */}
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid>
         
          
          <Grid.Col span={4}>
            <TextInput 
              label="VIN"
              withAsterisk
              placeholder="enter you vin number"
              required
              {...form.getInputProps("vin")}
              
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Make"
              placeholder="make"
              required
              {...form.getInputProps("make")}
              
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Model"
              withAsterisk
              placeholder="model"
              required
              {...form.getInputProps("model")}
             
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Color"
              withAsterisk
              placeholder="red"
              {...form.getInputProps("color")}
              
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Mileage"
              withAsterisk
              placeholder="0"
              {...form.getInputProps("mileage")}
             
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Price"
              withAsterisk
              placeholder="2500"
              {...form.getInputProps("price")}
             
            />
          </Grid.Col>
          
          <Grid.Col span={4}>
            <TextInput
              label="Year"
              withAsterisk
              placeholder="2023"
              {...form.getInputProps("year")}
             
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
            <Select
              label="Fuel Type"
              placeholder="diesel"
              withAsterisk
              data={[
                { value: "Diesel", label: "Diesel" },
                { value: "Gasoline", label: "Gasoline" },
                { value: "Other", label: "Other" },
               
              ]}
               {...form.getInputProps("fuelType")}
              
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              label="Body Type"
              placeholder="minivan"
              withAsterisk
              data={[
                { value: "Minivan", label: "Minivan" },
                { value: "Convertibe", label: "Convertible" },
                { value: "Van", label: "Van" },
                { value: "Car", label: "Car" },
                { value: "Suv", label: "Suv" },

               
              ]}
               {...form.getInputProps("bodyType")}
              
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Cylinder"
              withAsterisk
              placeholder="2023"
              {...form.getInputProps("cylinder")}
             
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Engine"
              withAsterisk
              placeholder="2023"
              {...form.getInputProps("engine")}
             
            />
          </Grid.Col>


          
          <Flex justify={"space-around"} w={"100%"} px={320}>
            

            <Button
              type="submit"
              style={{ backgroundColor: "orange", width: "150px",marginTop:"40px",marginLeft:"930px",fontSize:"20px" }}
            >
              Add Vehicle
            </Button>
          </Flex>
        </Grid>
      </form>
    </div>
  );
};

export default AddingVehicle;
