import React, { useState } from "react";
import { Text } from "@mantine/core";
import { useForm } from '@mantine/form';
export default Otp=()=>{
    const form=useForm();
    const[otp,setOtp]=useState("");
    const verifyOtp=(e)=>{
        e.preventDefault()

    }
    return(
        <form onSubmit={form.onSubmit(verifyOtp)}>
            
        <Text>
            placeholder="enter your otp"
            onChange={(e)=>setOtp(e.target.value)}
        </Text>
        <div id='recaptcha-container'/>
        <Flex>
            <Link to="/">
            <Button>Cancel</Button></Link>
            <Button type="submit">Verify</Button>
        </Flex>

    </form>

   
)
}

