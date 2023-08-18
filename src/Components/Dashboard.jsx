import { Box, SimpleGrid } from "@mantine/core";
import React from "react";
import DashboardStat from "./DashboardStat";
import BarChart from "../../utils/BarChart";
import PieChartData from "../../utils/PieChartData";
import { Car, MessageCircle, MessageReport, ShoppingCart, Users } from "tabler-icons-react";

const Dashboard = () => {

    const dashboardStats = [
        {
          Heading: "Total Users",
          Count: 7,
          icon: <Users strokeWidth={2} color="orange" size={20} />,
        },
        {
          Heading: "Total Orders",
          Count: 5,
          icon: <ShoppingCart size={20} strokeWidth={2} color={"orange"} />,
        },
        {
          Heading: "Total Vehicles",
          Count: 7,
          icon: <Car size={20} strokeWidth={2} color={"orange"} />,
        },
        {
          Heading: "Total Payments",
          Count: 7,
          icon: <Users strokeWidth={2} color="orange" size={20} />,
        },
        {
          Heading: "Total Complaints",
          Count: 7,
          icon: <MessageReport size={20} strokeWidth={2} color={"orange"} />,
        },
        {
          Heading: "Total Reviews",
          Count: 7,
          icon: <MessageCircle size={20} strokeWidth={2} color={"orange"} />,
        },
        {
          Heading: "Total Accounts",
          Count: 7,
          icon: <Users strokeWidth={2} color="orange" size={20} />,
        },
        {
          Heading: "Total Vehicles Delivered",
          Count: 7,
          icon: <Car size={20} strokeWidth={2} color={"orange"} />,
        },
      ];
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
        {dashboardStats.map((item, index) => (
          <DashboardStat
            heading={item.Heading}
            count={item.Count}
            icon={item.icon}
          />
        ))}
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
