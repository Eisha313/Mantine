import React, { useState, useEffect } from "react";
import { Text, Button, Box, TextInput } from "@mantine/core";
import "./updateProfile.css";

function UpdateProfile() {
  const [profileData, setProfileData] = useState(null);
  const [updatedProfileData, setUpdatedProfileData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const token =localStorage.getItem("jwtToken")
    
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://localhost:3000/auth/get-profile", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const profile = await response.json();
          setProfileData(profile);
          setUpdatedProfileData(profile);
        } else {
          const errorText = await response.text();
          setErrorMessage(errorText);
          console.error("Profile fetch error:", errorText);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    }

    fetchProfile();
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/auth/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(updatedProfileData),
        }
      );

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfileData(updatedProfile);
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
        console.error("Profile update error:", errorText);
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <div className="profilee">
        <div className="heading">
          <Text>UPDATE PROFILE</Text>
        </div>
        {profileData && (
          <div className="profiledata">

            <div>
            <TextInput className="record"
              label="First Name"
              value={updatedProfileData.firstName || ""}
              onChange={handleInputChange}
              placeholder="Update First Name"
              name="firstName"
            />
            </div>
            <div>

            <TextInput className="record"
              label="Last Name"
              value={updatedProfileData.lastName || ""}
              onChange={handleInputChange}
              name="lastName"
              placeholder="Update Last Name"
            />
            </div>
            
          </div>
        )}
        {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
        <Button className="button" onClick={handleUpdateProfile}>Update Profile</Button>

      </div>
    </Box>
  );
}

export default UpdateProfile;