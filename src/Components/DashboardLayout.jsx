import React, { useState } from "react";
import {
  Text,
  Header,
  Footer,
  AppShell,
  Navbar,
  List,
  NavLink,
  Box,
  Flex,
  Group,
  SimpleGrid,
  Menu,
  Divider,
  ScrollArea,
} from "@mantine/core";
import PieChartComponent from "../../utils/PieChartComponent";
import PieChartData from "../../utils/PieChartData";
import AddUserForm from "./AddUser";
import ViewUser from "./ViewUser";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithRedirect } from "firebase/auth";

// import BarChart from "../utils/BarChart";
// import {BarChart} from "../utils/BarChart";
import BarChart from "../../utils/BarChart";
import {
  CurrencyDollar,
  LayoutDashboard,
  Mail,
  Note,
  Notes,
  Phone,
  Settings,
  ShoppingCart,
  BrandShopee,
  Users,
  Car,
  ReportMoney,
  Focus2,
  MoodAngry,
  Briefcase,
  ShieldCheck,
  ClipboardList,
  Tool,
  Key,
  MessageCircle,
  MessageReport,
  UserPlus,
  ShoppingCartPlus,
  HomeQuestion,
  // Users as ViewUser,
} from "tabler-icons-react";

import "./db.css";
import DashboardStat from "./DashboardStat";
import { Outlet, useNavigate, Link } from "react-router-dom";

const navbarLinks = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={32} strokeWidth={2} color={"white"} />,
    link:"dash-board"
  },
  {
    label: "User Management",
    icon: <Users size={48} strokeWidth={2} color={"white"} />,
    children: [
      {
        label: "Add User",
        icon: <UserPlus size={20} strokeWidth={2} color="white" />,
        link: "/add-user",
      },
      {
        label: "View User",
        icon: <Users size={48} strokeWidth={2} color={"white"} />,
        link: "/view-user",
      },
    ],
  },

  {
    label: "View Dealership",
    icon: <ClipboardList size={48} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Vehicle",
    icon: <Car size={48} strokeWidth={2} color={"white"} />,
    children: [
      {
        label: "Add Vehicle",
        icon: <ShoppingCartPlus size={48} strokeWidth={2} color={"white"} />,
        link: "/adding-vehicle",
      },
      {
        label: "View Vehicle",
        icon: <Car size={48} strokeWidth={2} color={"white"} />,
        link: "/view-vehicle",
      },
    ],
  },
  {
    label: "View Service",

    icon: <Tool size={48} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Warranty",
    icon: <ShieldCheck size={48} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Payment",

    icon: <ReportMoney size={40} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Order",

    icon: <BrandShopee size={40} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Leads",

    icon: <Settings size={48} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Financial Institutions",

    icon: <Settings size={48} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Accounting",

    icon: <Briefcase size={48} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Reviews",

    icon: <Focus2 size={40} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Complaints",
    icon: <MoodAngry size={40} strokeWidth={2} color={"white"} />,
  },
  {
    label: "Settings",
    icon: <Settings size={40} strokeWidth={2} color={"white"} />,

    children: [
      {
        label: "Change Password",
        icon: <Tool size={48} strokeWidth={2} color={"white"} />,
        link: "/change-password",
      },
      {
        label: "profile",
        icon: <Users size={48} strokeWidth={2} color={"white"} />,
        link: "/get-profile",
      },
    ],
  },
  {
    label: "Chat",
    icon: <MessageCircle size={48} strokeWidth={2} color={"white"} />,
    link: "/Chat-box",
    // link: "welcome",
    // href:"welcome"
  },

  {
    label: "About Us",
    icon: <HomeQuestion size={40} strokeWidth={2} color={"White"} />,
    link: "/about-us",
    // navigate:("/about-us")
  },
];

// const pieChartData = {
//   labels: ["New","Intransit","received"],
//   datasets: [
//     {
//       data: [100,0],
//       backgroundColor: ["orange","black"],
//       percentage:"100%"
//     },
//     {
//       data: [100,0],
//       backgroundColor: ["#orange","black"],
//       percentage:"100%"
//     },
//     {
//       data: [98.4,11.6],
//       backgroundColor: ["#orange", "black"],
//       percentage:"98.4%%"
//     },
//     {
//       data: [0,100],
//       backgroundColor: ["orange","black"],
//       percentage:"100%"
//     },

//   ],
// };

const Dashboard = () => {
  const [opened, setOpened] = useState(false);
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    auth.signOut();
  };
  const navigate = useNavigate();
  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          style={{ overflowY: "auto" }}
          bg={"black"}
        >
          {navbarLinks.map((link, index) => (
            <NavLink
              label={`${index + 1}. ${link.label}`}
              // onClick={() => {
              //   if (link.label === "2.1 Add User") {
              //     <Link to="/add-user"></Link>
              //     // navigate("/add-user");
              //   } else if (link.label === "2.2 View User") {
              //     // navigate("/view-user");
              //     <Link to="/view-user"></Link>
              //   }
              // }}
              onClick={() => {
                link?.link && navigate(link.link);
              }}
              icon={link.icon}
              childrenOffset={28}
              styles={{
                label: {
                  color: "white",
                },
                icon: {
                  height: 30,
                  width: 30,
                },
                root: {
                  ":hover": {
                    background: "#444",
                  },
                },
              }}
            >
              {link.children &&
                link.children.map((childLink, childIndex) => (
                  <NavLink
                    label={`${index + 1}.${childIndex + 1} ${childLink.label}`}
                    onClick={() => {
                      childLink?.link && navigate(childLink.link);
                    }}
                    icon={childLink.icon}
                    styles={{
                      label: {
                        color: "white",
                      },
                      icon: {
                        height: 30,
                        width: 30,
                      },
                      root: {
                        ":hover": {
                          background: "#444",
                        },
                      },
                    }}
                  />
                ))}
            </NavLink>
          ))}
        </Navbar>
      }
      header={
        <Header
          height={100}
          p="xs"
          bg={"black"}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Flex justify={"space-between"} w={"100%"} px={20} py={10}>
            <Group spacing={"md"}>
              a
              <Flex align={"center"}>
                <Phone size={36} strokeWidth={2} color={"white"} />
                <Text color="white">+1(240)307-3416</Text>
              </Flex>
              <Flex align={"center"}>
                <Mail size={36} strokeWidth={2} color={"white"} />
                <Text color="white">info@carflys.com</Text>
              </Flex>
            </Group>

            <Group spacing={"md"}>
              <Text color="white">Home</Text>
              <Text color="white">Vehicles</Text>
              <Text color="white">Dashboard</Text>
              <Text color="white">Finance Calculator</Text>
            </Group>
          </Flex>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Footer className="Footer" height={60} p="md">
        <Flex align={"center"}></Flex>
        <Text>Contact us today</Text>
      </Footer>
      <Outlet />

      {/* Pie Charts */}
      {/* <Flex justifyContent="space-between" mt="md">
          <PieChartComponent
            chartData={pieChartData}
            style={{ width: "25%", minHeight: "50px", maxHeight: "100%" }}
          />
          <PieChartComponent
            chartData={pieChartData}
            style={{ width: "25%", minHeight: "50px", maxHeight: "100%" }}
          />
          <PieChartComponent
            chartData={pieChartData}
            style={{ width: "25%", minHeight: "50px", maxHeight: "100%" }}
          />
          <PieChartComponent
            chartData={pieChartData}
            style={{ width: "25%", minHeight: "50px", maxHeight: "100%" }}
          />
        </Flex> */}
    </AppShell>
  );
};

export default Dashboard;
