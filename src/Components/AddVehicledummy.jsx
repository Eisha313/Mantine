import React, { useState,useEffect } from "react";
import "./AddVehicle.css"; 
import {Link,useLocation} from "react-router-dom";

function AddVehicle() {
    const location = useLocation();
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    vehicleTitle: "",
    floorCompany: "",
    vehicleType: "",
    condition: "",
    VIN: "",
    state: "",
    vehiclePurchasePrice: "",
    vehicleRetailPrice: "",
    make: "",
    model: "",
    auctionCompany: "",
    year: "",
  });

  useEffect(() => {
    
    fetchVehicles();
    // If the location state has vehicleData, pre-fill the form with it
    if (location.state && location.state.vehicleData) {
      setNewVehicle(location.state.vehicleData);
    }
  }, []); 

  const fetchVehicles = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      console.error("Authentication token not found.");
      return;
    }

    fetch("https://usquare-test-apis.onrender.com/vehicle", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setVehicles(data);
        // Assuming the data received is an array of vehicles
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  };

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      console.error("Authentication token not found.");
      return;
    }

    if (
      newVehicle.vehicleTitle.trim() === "" ||
      newVehicle.floorCompany.trim() === "" ||
      newVehicle.vehicleType.trim() === "" ||
      newVehicle.condition.trim() === "" ||
      newVehicle.VIN.trim() === "" ||
      newVehicle.state.trim() === "" ||
      newVehicle.make.trim() === "" ||
      newVehicle.model.trim() === "" ||
      newVehicle.year.trim() === "" ||
      newVehicle.vehiclePurchasePrice.trim() === "" ||
      newVehicle.vehicleRetailPrice.trim() === "" ||
      newVehicle.auctionCompany.trim() === ""
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
      body: JSON.stringify(newVehicle),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        // Add the new vehicle data to the existing list of vehicles
        setVehicles([...vehicles, data]);
        // Reset the form fields after successful addition
        setNewVehicle({
          vehicleTitle: "",
          floorCompany: "",
          vehicleType: "",
          condition: "",
          VIN: "",
          state: "",
          vehiclePurchasePrice: "",
          vehicleRetailPrice: "",
          make: "",
          model: "",
          auctionCompany: "",
          year: "",
        });
      })
      .catch((error) => {
        console.error("Error sending vehicle data:", error);
      });
  };

  const handleDeleteButton = (index) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles.splice(index, 1);
    setVehicles(updatedVehicles);
  };

 
  const handleVehicleTitleChange = (e) => {
    setNewVehicle({
      ...newVehicle,
      vehicleTitle: e.target.value,
    });
  };

  const handleFloorCompanyChange = (e) => {
    setNewVehicle({
      ...newVehicle,
      floorCompany: e.target.value,
    });
  };

  const handleVehicleTypeChange = (e) => {
    setNewVehicle({
      ...newVehicle,
      vehicleType: e.target.value,
    });
  };

  const handlecondition = (e) => {
    setNewVehicle({
      ...newVehicle,
      condition: e.target.value,
    });
  };

  const handleVin = (e) => {
    setNewVehicle({
      ...newVehicle,
      VIN: e.target.value,
    });
  };

  const handleState = (e) => {
    setNewVehicle({
      ...newVehicle,
      state: e.target.value,
    });
  };

  const handleVehiclePurchase = (e) => {
    setNewVehicle({
      ...newVehicle,
      vehiclePurchasePrice: e.target.value,
    });
  };

  const handleMake = (e) => {
    setNewVehicle({
      ...newVehicle,
      make: e.target.value,
    });
  };

  const handleVehicleRetail = (e) => {
    setNewVehicle({
      ...newVehicle,
      vehicleRetailPrice: e.target.value,
    });
  };

  const handleModel = (e) => {
    setNewVehicle({
      ...newVehicle,
      model: e.target.value,
    });
  };

  const handleAuction = (e) => {
    setNewVehicle({
      ...newVehicle,
      auctionCompany: e.target.value,
    });
  };

  const handleYear = (e) => {
    setNewVehicle({
      ...newVehicle,
      year: e.target.value,
    });
  };







  

  return (
    <>
     <div className="view-vehicles-button-container">
        <Link to="/viewvehicles">
          <button className="view-vehicles-button">View Vehicles</button>
        </Link>
        </div>
      <fieldset>
        <form onSubmit={handleAddVehicle}>
          <input
            type="text"
            name="vehicleTitle"
            placeholder="Vehicle Title"
            value={newVehicle.vehicleTitle}
            onChange={handleVehicleTitleChange}
          />
          <input
            type="text"
            name="floorCompany"
            placeholder="Floor Company"
            value={newVehicle.floorCompany}
            onChange={handleFloorCompanyChange}
          />
          <input
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type"
            value={newVehicle.vehicleType}
            onChange={handleVehicleTypeChange}
          />
          <input
            type="text"
            name="condition"
            placeholder="Condition"
            value={newVehicle.condition}
            onChange={handlecondition}
          />
          <input
            type="text"
            name="VIN"
            placeholder="VIN"
            value={newVehicle.VIN}
            onChange={handleVin}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={newVehicle.state}
            onChange={handleState}
          />
          <input
            type="text"
            name="vehiclePurchasePrice"
            placeholder="Vehicle Purchase Price"
            value={newVehicle.vehiclePurchasePrice}
            onChange={handleVehiclePurchase}
          />
          <input
            type="text"
            name="vehicleRetailPrice"
            placeholder="Vehicle Retail Price"
            value={newVehicle.vehicleRetailPrice}
            onChange={handleVehicleRetail}
          />
          <input
            type="text"
            name="make"
            placeholder="Make"
            value={newVehicle.make}
            onChange={handleMake}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={newVehicle.model}
            onChange={handleModel}
          />
          <input
            type="text"
            name="auctionCompany"
            placeholder="Auction Company"
            value={newVehicle.auctionCompany}
            onChange={handleAuction}
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={newVehicle.year}
            onChange={handleYear}
          />

          <button type="submit">Add Vehicle</button>
        </form>
      </fieldset>
      {/* <ul>
        {vehicles.map((vehicle, index) => (
          <li key={vehicle.id}>
            <strong>Vehicle Type:</strong> {vehicle.vehicleType}
            <br />
            <strong>Floor Company:</strong> {vehicle.floorCompany}
            <br />
            <strong>Condition:</strong> {vehicle.condition}
            <br />
            <strong>VIN:</strong> {vehicle.VIN}
            <br />
            <strong>State:</strong> {vehicle.state}
            <br />
            <strong>Vehicle Purchase Price:</strong>{" "}
            {vehicle.vehiclePurchasePrice}
            <br />
            <strong>Vehicle Retail Price:</strong> {vehicle.vehicleRetailPrice}
            <br />
            <strong>Make:</strong> {vehicle.make}
            <br />
            <strong>Model:</strong> {vehicle.model}
            <br />
            <strong>Auction Company:</strong> {vehicle.auctionCompany}
            <br />
            <strong>Year:</strong> {vehicle.year}
            <br />
            <button onClick={() => handleDeleteButton(index)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default AddVehicle;
