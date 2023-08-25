import React, { useEffect, useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
// import { auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithRedirect ,RecaptchaVerifier} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate ,Link} from "react-router-dom";


const Welcome = () => {
  const navigate = useNavigate();
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  

  const [user] = useAuthState(auth);
  const[number,setNumber]=useState("")

  useEffect(() => {
    console.log("user", user)
    if (user) navigate("/Chat-box");
  }, [user]);

  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>
      
      <p>Sign in with Google to chat with with your fellow React Developers.</p>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
        />
      </button>
      <Link to="/phone">
      <button >SignUp with phone</button></Link>
    </main>
  );
};

export default Welcome;
