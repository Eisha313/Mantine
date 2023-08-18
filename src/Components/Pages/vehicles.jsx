import React from "react";
import { Link } from "react-router-dom";
import "./vehicles.css";

function Vehicles() {
  return (
    <div className="vehicles-container">
      <h2>Vehicle Management</h2>
      <div className="buttons-container">
        <Link to="/Addvehicle">
          <button>ADD VEHICLE</button>
        </Link>
        <Link to="/Viewvehicles">
          <button>VIEW VEHICLES</button>
        </Link>
      </div>
    </div>
  );
}

export default Vehicles;







