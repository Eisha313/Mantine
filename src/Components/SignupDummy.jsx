import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import{Input,Button,Text,PasswordInput} from "@mantine/core"


import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [fName, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [fullName, setFullName] = useState("");
  const [number, setNumber] = useState();
  const [zip, setZip] = useState("");

  const [passwordMatch, setpasswordMatch] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [ConfirmPasswordError, setConfirmPasswordError] = useState(false);
  const [fNameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [numberError, setNumerError] = useState(false);
  const[zipError,setZipError]=useState(false);

  // const onhandleFname = (e) => {
  //   setFname(e.target.value);
  // };
  // const onhandleLname = (e) => {
  //   setLname(e.target.value);
  // };
  const onhandleFname = (e) => {
    setFname(e.target.value);
    setFullName(e.target.value + " " + lname);
  };

  const onhandleLname = (e) => {
    setLname(e.target.value);
    setFullName(fName + " " + e.target.value);
  };

  const onhandlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onhandleEmail = (e) => {
    setEmail(e.target.value);
  };
  const onhandleNumber = (e) => {
    setNumber(e.target.value);
  };
  const onhandleZip = (e) => {
    setZip(e.target.value);
  };

  const onhandleConfirmpassword = (e) => {
    setConfirmPassword(e.target.value);
    setpasswordMatch(e.target.value === password);
  };
  const navigate = useNavigate();
  // const signingIn = async () => {
  //   if (
  //     !email.length ||
  //     !password.length ||
  //     !ConfirmPassword.length ||
  //     !fName.length ||
  //     !lname.length
  //   ) {
  //     setEmailError(!email);
  //     setPasswordError(!password);
  //     setConfirmPasswordError(!ConfirmPassword);
  //     setFnameError(!fName);
  //     setLnameError(!lname);
  //   } else {
  //     let data = {
  //       email: email,
  //       password: password,
  //     };

  //     const storedStay=(localStorage.getItem("dataKey"))?JSON.parse(localStorage.getItem("dataKey")):[];
  //     let isEmailExists = false;

  //     for (let i = 0; i < storedStay.length; i++) {
  //     if (storedStay[i].email === email) {
  //       isEmailExists = true;
  //       break;
  //     }

  //   }

  //        if(isEmailExists){
  //           alert("email is already taken")

  //          }
  //          else{

  //     storedStay.push(data);
  //     localStorage.setItem("dataKey",JSON.stringify(storedStay));}}

  //     navigate("/login")}






  

  const handlelogs = () => {
    navigate("/Login");
  };




















  // const signingIn = async () => {
  // if (
  //   email.trim() === "" ||
  //   password.trim() === "" ||
  //   ConfirmPassword.trim() === "" ||
  //   fName.trim() === "" ||
  //   lname.trim() === ""
  // ) {
  //   setEmailError(email.trim() === "");
  //   setPasswordError(password.trim() === "");
  //   setConfirmPasswordError(ConfirmPassword.trim() === "");
  //   setFnameError(fName.trim() === "");
  //   setLnameError(lname.trim() === "");
  // }
  const signingIn = async () => {
    if (
      !email.length ||
      !password.length ||
      !ConfirmPassword.length ||
      !fName.length ||
      !lname.length ||
      !number.length||
      !zip.length
    ) {
      setEmailError(!email);
      setPasswordError(!password);
      setConfirmPasswordError(!ConfirmPassword);
      setFnameError(!fName);
      setLnameError(!lname);
      setNumerError(!number);
      setZipError(!zip)
    } else {
    //   let data = {
    //     email: email,
    //     password: password,
    //   };

    //   const storedStay = localStorage.getItem("dataKey")
    //     ? JSON.parse(localStorage.getItem("dataKey"))
    //     : [];
    //   let isEmailExists = false;

    //   for (let i = 0; i < storedStay.length; i++) {
    //     if (storedStay[i].email === email) {
    //       isEmailExists = true;
    //       break;
    //     }
    //   }

    //   if (isEmailExists) {
    //     alert("Email is already taken");
    //   } else {
    //     storedStay.push(data);
    //     localStorage.setItem("dataKey", JSON.stringify(storedStay));
    //     const tokenExists = localStorage.getItem("token");

    //     if (!tokenExists) {
    //       const token = "YOUR_TOKEN_VALUE"; // Replace "YOUR_TOKEN_VALUE" with your actual token
    //       localStorage.setItem("token", token);
    //     }
    //     navigate("/login");
    //   }
    // }
    const dataToSend = {
      email: email,
      password: password,
      phoneNumber:number,
      firstName:fName,
      lastName:lname,
      fullName:fullName,
      zipCode:zip,
      userType:"Customer"
      // Add other data properties here if needed
    };

    try {
      const response = await fetch("https://usquare-test-apis.onrender.com/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to fetch data from the backend");
      }

      const responseData = await response.json();
      // Do something with the responseData if needed
      console.log(responseData);

      // Redirect to the login page after successful signup
      navigate("/login");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  };
  return (
    <>
      <body class="light-theme">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        ></link>
        <div className="fields">
          <label htmlFor="fname">FirstName</label>
          <Input
            type="text"
            id="fname"
            placeholder="Enter your first name"
            name="fname"
            onChange={onhandleFname}
            value={fName}
          />
          {fNameError &&
           < Text style={{
                color: "red",
              }}> enter the First name</Text>
            
            
            
          }

          <br />
          <label htmlFor="lname">Last Name</label>
          <Input
            type="text"
            id="lname"
            placeholder="Enter your last name"
            name="lname"
            onChange={onhandleLname}
            value={lname}
          />
          {lnameError && 
            <Text style={{
                color: "red",
              }}>
            
              enter the last field
            </Text>
          }
          <br />
          <label htmlFor="fullName">Full Name</label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            disabled // Disabling the input to prevent direct editing
          />

          <label htmlFor="email">Email</label>
          {/* <i className="fas fa-envelope icon"></i> */}

          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            name="email"
            required
            onChange={onhandleEmail}
            value={email}
          />
          {emailError && (
            <Text 
              style={{
                color: "red",
              }}
            >
              enter the field
            </Text>
          )}
          <br />
          <label htmlFor="number">Phone Number</label>

          <Input
            type="number"
            id="number"
            placeholder="Enter your 11 digitnumber"
            name="number"
            onChange={onhandleNumber}
            value={number}
            pattern="[0-9]*"
            maxLength="11"
          />
          {numberError && (
            <Text
              style={{
                color: "red",
              }}
            >
              enter a valid 11-digit number
            </Text>
          )}

          <br />

          <label htmlFor="zip">Zip Code</label>

          <Input
            type="number"
            id="zip"
            placeholder="Enter your zip code"
            name="zip"
            pattern="[0-9]{5}"
            required
            onChange={onhandleZip}
            value={zip}
          />
          {zip.length > 0 && !/^[0-9]{5}$/.test(zip) && (
            <Text style={{ color: "red" }}>
              Invalid zip code. Please enter 5 digits.
            </Text>
          )}
          <br />

          <label htmlFor="password">Password</label>

          <PasswordInput
            // type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            onChange={onhandlePassword}
            value={password}
          />
          {passwordError ? (
            <Text
              style={{
                color: "red",
              }}
            >
              enter the password
            </Text>
          ) : null}
          <br />
          <label htmlFor="cpassword">Confirm Password</label>

          <PasswordInput
            // type="password"
            id="cpassword"
            placeholder="Enter your confirmation password"
            name="cpassword"
            onChange={onhandleConfirmpassword}
            value={ConfirmPassword}
          />
          {ConfirmPasswordError ? (
            <Text
              style={{
                color: "red",
              }}
            >
              {" "}
              confirm the password
            </Text>
          ) : null}
          {!passwordMatch ? (
            <Text
              style={{
                color: "red",
              }}
            >
              password do not match
            </Text>
          ) : (
            ""
          )}
          <br />
        </div>
        <div className="logs">
          <Button
            type="submit"
            onClick={() => {
              signingIn();
            }}
          >
            Submit
          </Button>
          <Button onClick={() => handlelogs()}>LOGIN</Button>
        </div>
      </body>
    </>
  );
}
