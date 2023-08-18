import { useState } from "react"

function Login(){
    const[lemail,setLemail]=useState("")
    const[lpassword,setLpassword]=useState("")
    const[log,setLog]=useState("true")
    const handleEmailchange=(e)=>{
        setLemail(e.target.value);

    }
    const handlePasswordchange=(e)=>{
        setLpassword(e.target.value);

    } 
    const handleLogin=(e)=>{
        localStorage.getItem(JSON.parse(datakey));
        if(datakey.email===lemail && datakey.password===lpassword)
        setLog(true);

    }

    return(
        <>
<label htmlFor="email">Email</label>
<input type="email" id="lemail" name="email" placeholder="Enter the email you used for signing up" onChange={handleEmailchange} value={lemail}/>
<br />

<label htmlFor="password">Password</label>
<input type="password" id="lpassword" name="password" placeholder="Enter the password you used for signing up" onChange={handlePasswordchange} value={lpassword}/>
<br />
<button className="login" onClick={handleLogin}>LOGIN</button>
</>


    )

}