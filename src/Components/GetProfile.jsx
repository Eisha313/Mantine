import React, { useState, useEffect } from "react";
import { Text, Button, Box } from "@mantine/core";
import "./GetProfile.css"

function GetProfile() {
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const token =localStorage.getItem('jwtToken')
   
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

  return (
    <Box maw={300} mx="auto">
      <div className="profile">
        <div className="heading">
          <Text>USER PROFILE</Text>
        </div>
        {profileData && (
          <div className="profile-data">
            <Text className="record">UserType: {profileData.userType}</Text>
            <Text className="record">
              First Name:   {profileData.firstName} 
            </Text>
            <Text className="record">
              Last Name:  {profileData.lastName}
            </Text>
            <Text className="record">
            Full Name:   {profileData.firstName} {profileData.lastName}
            </Text>
            
            <Text className="record">Email:   {profileData.email}</Text>
          
            
          </div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </Box>
  );
}

export default GetProfile;