import React, { useState, useEffect } from "react";
import "./ViewVehicles.css";
import AddVehicle from "./Addvehicle"
import { useNavigate } from "react-router-dom";


import { Link } from "react-router-dom";

function ViewVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [editVehicle, setEditVehicle] = useState(null);
  const navigate=useNavigate();
  const jwtToken = localStorage.getItem("jwtToken");
  const fetchVehicles = () => {
    fetch("https://usquare-test-apis.onrender.com/vehicle", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setVehicles(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  };

  useEffect(() => {
    fetchVehicles(); // Fetch vehicles when the component mounts
  }, []);

  fetch("https://usquare-test-apis.onrender.com/vehicle", {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((response) => response.json())
    .then(({ data }) => {
      setVehicles(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching vehicles:", error);
    });

  const handleDeleteVehicle = (index) => {
    const vehicleToDelete = vehicles[index];
    
    fetch(`https://usquare-test-apis.onrender.com/vehicle/${vehicleToDelete.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete vehicle.");
        }
        return response.json();
      })
      .then(() => {
        const updatedVehicles = [...vehicles];
        updatedVehicles.splice(index, 1);
        setVehicles(updatedVehicles);
      })
      .catch((error) => {
        console.error("Error deleting vehicle:", error);
      });
  };

  const handleUpdateVehicle = (vehicle) => {
    setEditVehicle(vehicle);

    // Use navigate to navigate to the AddVehicle component and pass the data as state
    navigate("/addvehicle", { state: { vehicleData: vehicle } });
    return <AddVehicle vehicleData={vehicle} />;
  };
  

  const handleUpdateSubmit = (updatedVehicle) => {
    if (!jwtToken) {
      console.error("Authentication required. Please login first.");
      return;
    }

    fetch(`https://usquare-test-apis.onrender.com/vehicle/${updatedVehicle.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updatedVehicle),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update vehicle.");
        }
        return response.json();
      })
      .then(({ data }) => {
        if (data) {
          setVehicles((prevVehicles) =>
            prevVehicles.map((vehicle) =>
              vehicle.id === data.id ? data : vehicle
            )
          );
          setEditVehicle(null); // Reset the editVehicle state after updating
        }
      })
      .then(() => {
        fetchVehicles(); 
      })
      .catch((error) => {
        console.error("Error updating vehicle:", error);
      });
  };

  return (
    <div className="view-vehicles-container">
        <div className="add-vehicles-button-container">
        <Link to="/addvehicle">
          <button className="add-vehicles-button">Add Vehicles</button>
        </Link>
        </div>
      <h2>All Vehicles</h2>
      {/* <ul className="vehicle-list">
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
           
            <button onClick={() => handleDeleteVehicle(index)}>Delete</button>
            <button onClick={() => handleUpdateVehicle(vehicle)}>Update</button>
          </li>
        ))}
      </ul> */}



<table className="vehicle-table">
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Floor Company</th>
            <th>Condition</th>
            <th>VIN</th>
            <th>State</th>
            <th>Vehicle Purchase Price</th>
            <th>Vehicle Retail Price</th>
            <th>Make</th>
            <th>Model</th>
            <th>Auction Company</th>
            <th>Year</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={vehicle.id}>
              <td>{vehicle.vehicleType}</td>
              <td>{vehicle.floorCompany}</td>
              <td>{vehicle.condition}</td>
              <td>{vehicle.VIN}</td>
              <td>{vehicle.state}</td>
              <td>{vehicle.vehiclePurchasePrice}</td>
              <td>{vehicle.vehicleRetailPrice}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.auctionCompany}</td>
              <td>{vehicle.year}</td>
              <td>
                <button onClick={() => handleDeleteVehicle(index)}>Delete</button>
                <button onClick={() => handleUpdateVehicle(vehicle)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {editVehicle && (
        <div className="edit-vehicle-form">
          <input
            type="text"
            value={editVehicle.vehicleTitle}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                vehicleTitle: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editVehicle.floorCompany}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                floorCompany: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editVehicle.vehicleType}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                vehicleType: e.target.value,
              })
            }
          />
            <input
            type="text"
            value={editVehicle.condition}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                condition: e.target.value,
              })
            }
          />
          
          <input
            type="text"
            value={editVehicle.VIN}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                VIN: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editVehicle.state}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                state: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editVehicle.vehiclePurchasePrice}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                vehiclePurchasePrice: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editVehicle.vehicleRetailPrice}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                vehicleRetailPrice: e.target.value,
              })
            }
          />
         
          <input
            type="text"
            value={editVehicle.make}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                make: e.target.value,
              })
            }
          />
           <input
            type="text"
            value={editVehicle.model}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                model: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editVehicle.auctionCompany}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                auctionCompany: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={editVehicle.year}
            onChange={(e) =>
              setEditVehicle({
                ...editVehicle,
                year :e.target.value,
              })
            }
          />

         
          <button onClick={() => handleUpdateSubmit(editVehicle)}>Save</button>
        </div>
      )} */}
       {editVehicle ? (
        <AddVehicle
          editVehicle={editVehicle}
          setEditVehicle={setEditVehicle}
          fetchVehicles={fetchVehicles} // Pass the fetchVehicles function as a prop to update the vehicle list after update
        />
      ) : (
        <Link to="/addvehicle">Add Vehicle</Link>
      )}
    </div>
  );
}

export default ViewVehicles;
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
   