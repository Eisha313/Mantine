import { Box, SimpleGrid } from "@mantine/core";
import {React,useEffect,useState} from "react";
import DashboardStat from "./DashboardStat";
import BarChart from "../../utils/BarChart";
import PieChartData from "../../utils/PieChartData";
import { Car, MessageCircle, MessageReport, ShoppingCart, Users } from "tabler-icons-react";
import axios from "axios";


const Dashboard = () => {

  const [statData, setStatData] = useState(null); 

    // const dashboardStats = [
    //     {
    //       Heading: "Total Users",
    //       Count: 7,
    //       icon: <Users strokeWidth={2} color="orange" size={20} />,
    //     },
    //     {
    //       Heading: "Total Orders",
    //       Count: 5,
    //       icon: <ShoppingCart size={20} strokeWidth={2} color={"orange"} />,
    //     },
    //     {
    //       Heading: "Total Vehicles",
    //       Count: 7,
    //       icon: <Car size={20} strokeWidth={2} color={"orange"} />,
    //     },
    //     {
    //       Heading: "Total Payments",
    //       Count: 7,
    //       icon: <Users strokeWidth={2} color="orange" size={20} />,
    //     },
    //     {
    //       Heading: "Total Complaints",
    //       Count: 7,
    //       icon: <MessageReport size={20} strokeWidth={2} color={"orange"} />,
    //     },
    //     {
    //       Heading: "Total Reviews",
    //       Count: 7,
    //       icon: <MessageCircle size={20} strokeWidth={2} color={"orange"} />,
    //     },
    //     {
    //       Heading: "Total Accounts",
    //       Count: 7,
    //       icon: <Users strokeWidth={2} color="orange" size={20} />,
    //     },
    //     {
    //       Heading: "Total Vehicles Delivered",
    //       Count: 7,
    //       icon: <Car size={20} strokeWidth={2} color={"orange"} />,
    //     },
    //   ];
    useEffect(() => {
      const JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNyZWF0ZWRBdCI6MTY4ODM4ODQ3MDg4OCwidXBkYXRlZEF0IjoxNjkyOTY5ODcxMTEyLCJpZCI6IjY0YTJjMzc2YTIzNjQ5MDAxNDkyZjIzMSIsInN0YXR1cyI6IkFjdGl2ZSIsInVzZXJUeXBlIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1pc3RlciIsIm1pZGRsZU5hbWUiOm51bGwsImxhc3ROYW1lIjoiQWRtaW4iLCJwaG9uZU51bWJlciI6IisxKDExMSktMTExLTExMTEiLCJzdGF0ZUxvY2F0aW9uIjoiSUwiLCJ6aXBDb2RlIjoiMjEwNzYiLCJwcm9maWxlUGljdHVyZSI6Imh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvY2FyZmx5cy1iMWI1Ny5hcHBzcG90LmNvbS9vL3Byb2ZpbGUtcGljdHVyZXMlMkYyMGY5Zjg5Ni1hOTZkLTQzZjUtYWE4Ni1hMmIxYmYyNDdlZjBpbWFnZXMucG5nP2FsdD1tZWRpYSZ0b2tlbj03Njk3OGU4Yi05NTg0LTQxNjYtYjc2NC02Yzc1MmRiM2ZlNTEiLCJlbWFpbFZlcmlmaWVkIjpmYWxzZSwidmVyaWZpY2F0aW9uVG9rZW4iOiIiLCJ2ZXJpZmljYXRpb25Ub2tlbkV4cGlyZXNBdCI6IiIsInN0cmlwZUNvbm5lY3RlZEFjY291bnRJZCI6ImFjY3RfMU5qMDAxREJkb1hZaFM5YSIsInJpZ2h0cyI6eyJtYW5hZ2VFbXBsb3llZXMiOnRydWUsIm1hbmFnZVZlaGljbGVzIjp0cnVlLCJtYW5hZ2VPcmRlcnMiOnRydWUsIm1hbmFnZVBheW1lbnRzIjp0cnVlLCJtYW5hZ2VBY2NvdW50cyI6dHJ1ZSwibWFuYWdlUmV2aWV3cyI6dHJ1ZSwibWFuYWdlQ29tcGxhaW50cyI6dHJ1ZSwibWFuYWdlU2V0dGluZ3MiOnRydWV9LCJkZWFsZXJzaGlwIjpudWxsfSwiaWF0IjoxNjkzNDgwNzg0LCJleHAiOjE2OTYwNzI3ODR9.xU2xbjAaf3o4H41VLmEUlC1dCeypIiVCvGYKUxFxO2Q";
       const fetchData = async () => {
         
         try {
           const response = await axios.get('https://carflys.herokuapp.com/dashboard/get-stats', {

             
             headers: {
               Authorization: JWT, 
             },
           });
           if (response.data.message === "Success") {
            setStatData(response.data.data);
          } else {
            console.error('Failed to fetch data');
          }
   
          //  if (response.ok) {
          //    const data = await response.json();
          //    setStatData(data);
          //  } else {
          //    console.error('Failed to fetch data');
          //  }
         } catch (error) {
           console.error('Error fetching data:', error);
         }
       };
   
       fetchData();
     }, []);
      const Data = [
        {
          id: 1,
          year: 2016,
          userGain: 80000,
          userLost: 823,
        },
        {
          id: 2,
          year: 2017,
          userGain: 45677,
          userLost: 345,
        },
        {
          id: 3,
          year: 2018,
          userGain: 78888,
          userLost: 555,
        },
        {
          id: 4,
          year: 2019,
          userGain: 90000,
          userLost: 4555,
        },
        {
          id: 5,
          year: 2020,
          userGain: 4300,
          userLost: 234,
        },
      ];
      const chartData = {
        labels: Data.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained ",
            data: Data.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75, 192, 192, 1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };
  return (
    <>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "xs", cols: 1, spacing: "md" },
        ]}
      >
        {/* {dashboardStats.map((item, index) => (
          <DashboardStat
            heading={item.Heading}
            count={item.Count}
            icon={item.icon}
          />
        ))} */}
         {/* {statData &&
    statData.map((item, index) => (
      <DashboardStat
        key={index} 
        heading={item.Heading}
        count={item.Count}
        icon={item.icon}
      />
    ))} */}
    {statData && (
  <>
    <DashboardStat
      heading="Total Users"
      count={statData.users}
      icon={<Users strokeWidth={2} color="orange" size={20} />}
    />
    <DashboardStat
      heading="Total Orders"
      count={statData.orders}
      icon={<ShoppingCart size={20} strokeWidth={2} color={"orange"} />}
    />
    <DashboardStat
      heading="Total Vehicles"
      count={statData.vehicles}
      icon={<Car size={20} strokeWidth={2} color={"orange"} />}
    />
    
    <DashboardStat
      heading="Total Payments"
      count={statData.payments}
      icon={<Users strokeWidth={2} color="orange" size={20} />}
    />
    <DashboardStat
      heading="Total Complaints"
      count={statData.complaints}
      icon={<MessageReport size={20} strokeWidth={2} color={"orange"} />}
    />
    <DashboardStat
      heading="Total Reviews"
      count={statData.reviews}
      icon={<MessageCircle size={20} strokeWidth={2} color={"orange"} />}
    />
    <DashboardStat
      heading="Total Accounts"
      count={statData.accounts}
      icon={<Users strokeWidth={2} color="orange" size={20} />}
    />
    <DashboardStat
      heading="Total Vehicles Delivered"
      count={statData.receivedVehicles}
      icon={<Car size={20} strokeWidth={2} color={"orange"} />}
    />
   
  </>
)}
      </SimpleGrid>
      <Box
        p="md"
        backgroundColor="white"
        borderRadius={8}
        boxShadow="sm"
        mt="md"
      >
        <BarChart chartData={chartData} />

        <PieChartData />
      </Box>
    </>
  );
};

export default Dashboard;
