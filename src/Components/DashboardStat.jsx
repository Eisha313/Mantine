import { Flex, Text } from '@mantine/core'
import {React,useEffect} from 'react'
import { Users } from 'tabler-icons-react';
import axios from 'axios';

const DashboardStat = ({ heading , count,icon}) => {
  // useEffect(() => {
  //  const JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNyZWF0ZWRBdCI6MTY4ODM4ODQ3MDg4OCwidXBkYXRlZEF0IjoxNjkyOTY5ODcxMTEyLCJpZCI6IjY0YTJjMzc2YTIzNjQ5MDAxNDkyZjIzMSIsInN0YXR1cyI6IkFjdGl2ZSIsInVzZXJUeXBlIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1pc3RlciIsIm1pZGRsZU5hbWUiOm51bGwsImxhc3ROYW1lIjoiQWRtaW4iLCJwaG9uZU51bWJlciI6IisxKDExMSktMTExLTExMTEiLCJzdGF0ZUxvY2F0aW9uIjoiSUwiLCJ6aXBDb2RlIjoiMjEwNzYiLCJwcm9maWxlUGljdHVyZSI6Imh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2FyZmx5cy1iMWI1Ny5hcHBzcG90LmNvbS9vL3Byb2ZpbGUtcGljdHVyZXMlMkYyMGY5Zjg5Ni1hOTZkLTQzZjUtYWE4Ni1hMmIxYmYyNDdlZjBpbWFnZXMucG5nP2FsdD1tZWRpYSZ0b2tlbj03Njk3OGU4Yi05NTg0LTQxNjYtYjc2NC02Yzc1MmRiM2ZlNTEiLCJlbWFpbFZlcmlmaWVkIjpmYWxzZSwidmVyaWZpY2F0aW9uVG9rZW4iOiIiLCJ2ZXJpZmljYXRpb25Ub2tlbkV4cGlyZXNBdCI6IiIsInN0cmlwZUNvbm5lY3RlZEFjY291bnRJZCI6ImFjY3RfMU5qMDAxREJkb1hZaFM5YSIsInJpZ2h0cyI6eyJtYW5hZ2VFbXBsb3llZXMiOnRydWUsIm1hbmFnZVZlaGljbGVzIjp0cnVlLCJtYW5hZ2VPcmRlcnMiOnRydWUsIm1hbmFnZVBheW1lbnRzIjp0cnVlLCJtYW5hZ2VBY2NvdW50cyI6dHJ1ZSwibWFuYWdlUmV2aWV3cyI6dHJ1ZSwibWFuYWdlQ29tcGxhaW50cyI6dHJ1ZSwibWFuYWdlU2V0dGluZ3MiOnRydWV9LCJkZWFsZXJzaGlwIjpudWxsfSwiaWF0IjoxNjkzNDgwNzg0LCJleHAiOjE2OTYwNzI3ODR9.xU2xbjAaf3o4H41VLmEUlC1dCeypIiVCvGYKUxFxO2Q";
  //   const fetchData = async () => {
      
  //     try {
  //       const response = await axios.get('https://carflys.herokuapp.com/dashboard/get-stats', {
          
  //         headers: {
  //           Authorization: JWT, 
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setStatData(data);
  //       } else {
  //         console.error('Failed to fetch data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  





  
  return (
    
    <Flex justify={"space-between"}  style={{
        backgroundColor:"orange",
        padding:20,
        borderRadius: 10
      }}>
        <Flex
          direction={"column"}
          justify={'space-between'}
          style={{
            flex: 1,
          }}
        >
          <Text fz="lg" fw={600}>{heading}</Text>
          <Text>{count}</Text>
        </Flex>


       


          <Flex align={'center' } justify={'center'} style={{
            width:40,
            height:40,
            borderRadius:'50%',
            backgroundColor:"black"
          }}>
            {/* <Users strokeWidth={2} color="orange" size={20} /> */}
            {icon}
          </Flex>
      </Flex>







      





  )
}

export default DashboardStat