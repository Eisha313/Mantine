import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./signup.css";

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
          <input
            type="text"
            id="fname"
            placeholder="Enter your first name"
            name="fname"
            onChange={onhandleFname}
            value={fName}
          />
          {fNameError && (
            <p
              style={{
                color: "red",
              }}
            >
              enter the First name
            </p>
          )}

          <br />
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            placeholder="Enter your last name"
            name="lname"
            onChange={onhandleLname}
            value={lname}
          />
          {lnameError && (
            <p
              style={{
                color: "red",
              }}
            >
              enter the last field
            </p>
          )}
          <br />
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            disabled // Disabling the input to prevent direct editing
          />

          <label htmlFor="email">Email</label>
          {/* <i className="fas fa-envelope icon"></i> */}

          <input
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
            <p
              style={{
                color: "red",
              }}
            >
              enter the field
            </p>
          )}
          <br />
          <label htmlFor="number">Phone Number</label>

          <input
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
            <p
              style={{
                color: "red",
              }}
            >
              enter a valid 11-digit number
            </p>
          )}

          <br />

          <label htmlFor="zip">Zip Code</label>

          <input
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
            <p style={{ color: "red" }}>
              Invalid zip code. Please enter 5 digits.
            </p>
          )}
          <br />

          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            onChange={onhandlePassword}
            value={password}
          />
          {passwordError ? (
            <p
              style={{
                color: "red",
              }}
            >
              enter the password
            </p>
          ) : null}
          <br />
          <label htmlFor="cpassword">Confirm Password</label>

          <input
            type="password"
            id="cpassword"
            placeholder="Enter your confirmation password"
            name="cpassword"
            onChange={onhandleConfirmpassword}
            value={ConfirmPassword}
          />
          {ConfirmPasswordError ? (
            <p
              style={{
                color: "red",
              }}
            >
              {" "}
              confirm the password
            </p>
          ) : null}
          {!passwordMatch ? (
            <p
              style={{
                color: "red",
              }}
            >
              password do not match
            </p>
          ) : (
            ""
          )}
          <br />
        </div>
        <div className="logs">
          <button
            type="submit"
            onClick={() => {
              signingIn();
            }}
          >
            Submit
          </button>
          <button onClick={() => handlelogs()}>LOGIN</button>
        </div>
      </body>
    </>
  );
}
