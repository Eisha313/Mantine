import {
  AppShell,
  Badge,
  Text,
  Navbar,
  Header,
  Grid,
  Footer,
  MediaQuery,
  rem,
  em,
  Box,
  NavLink,
} from "@mantine/core";
import {Link} from "react-router-dom"
import {
  IconCircleOff,
  IconGauge,
  IconChevronRight,
} from "@tabler/icons-react";
import {
  LayoutDashboard,
  BrandShopee,
  Settings,
  MoodAngry,
  Focus2,
  ReportMoney,
  FileDollar,
  BabyCarriage,
  ClipboardList,
  Help,
  Location,
  InfoCircle,
  Man,Car
} from "tabler-icons-react";
import "./Dashboard.css";
import "./Addvehicle.jsx";

export default function Dashboard() {
  return (
    <AppShell
      padding="md"
      navbar={
        //     <Navbar className="Navbar"width={{ base: 300 }} height={500} p="xs">
        //       <Text>Profile</Text>
        //       <Text> About us</Text>
        //       <Text>Contact Us</Text>
        //       <Text>Add Vehicles</Text>
        //       <Text>View Vehicles</Text>
        //     </Navbar>
        <Box className="box" w={240}>
          {/* <NavLink
            label="With right section"
            icon={<IconGauge size="1rem" stroke={1.5} />}
            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
          />
          <NavLink
            label="Disabled"
            icon={<IconCircleOff size="1rem" stroke={1.5} />}
            disabled
          /> */}
          <NavLink
            label="With description"
            description="Additional information"
            icon={
              <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                3
              </Badge>
            }
          />
          <NavLink
            label="Dashboard"
            icon={<LayoutDashboard size={40} strokeWidth={2} color={"white"} />}
          />
          <NavLink
            label="Order"
            icon={<BrandShopee size={40} strokeWidth={2} color={"white"} />}
          />
          <NavLink
            label="Complain"
            icon={<MoodAngry size={40} strokeWidth={2} color={"white"} />}
          />
          <NavLink
            label="Review"
            icon={<Focus2 size={40} strokeWidth={2} color={"white"} />}
          />
          <NavLink
            label="Payment"
            icon={<ReportMoney size={40} strokeWidth={2} color={"white"} />}
          />
          <div className="add">
          {<Car size={40} strokeWidth={2} color={"white"} />}
        
            <Link to ="/Addvehicle"> Add vehicle</Link>
            </div>
{/*             
          /> */}

          <NavLink
            label="Settings"
            icon={<Settings size={48} strokeWidth={2} color={"white"} />}
          />

          {/* <NavLink
        label="Active subtle"
        icon={<IconActivity size="1rem" stroke={1.5} />}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
        variant="subtle"
        active
      />
      <NavLink
        label="Active light"
        icon={<IconActivity size="1rem" stroke={1.5} />}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
        active
      />
      <NavLink
        label="Active filled"
        icon={<IconActivity size="1rem" stroke={1.5} />}
        rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
        variant="filled"
        active
      /> */}
        </Box>
      }
      header={
        <Header className="header" height={60} p="xs">
          <div className="babyheader">
            <BabyCarriage size={40} strokeWidth={2} color={"White"} />
            <Text> Logo</Text>
          </div>
          <div className="babyheader">
            <ClipboardList size={40} strokeWidth={2} color={"white"} />

            <Text> Features </Text>
          </div>
          <div className="babyheader">
            <Help size={40} strokeWidth={2} color={"white"} />

            <Text> Help</Text>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          display: "flex",
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],

          [`@media (max-width: 768px)`]: {
            marginLeft: 0,
            paddingLeft: 0,
          },
        },
      })}
    >
      {/* <MediaQuery
    query="(min-width: 768px)"
    styles={(theme) => ({
      Navbar: {
        backgroundColor: theme.colorScheme === "dark" ? "#585252" : "#333333",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "85%",
      },
    })}
  >
    <Navbar className="Navbar">
      <Text>Profile</Text>
      <Text>About us</Text>
      <Text>Contact Us</Text>
      <Text>Add Vehicles</Text>
      <Text>View Vehicles</Text>
    </Navbar>
  </MediaQuery> */}

      {/* Second Navbar for screen sizes < 768px */}
      {/* <MediaQuery
    query="(max-width: 767px)"
    styles={(theme) => ({
      Navbar: {
        backgroundColor: theme.colorScheme === "dark" ? "#585252" : "#333333",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "85%",
      },
    })}
  >
    <Navbar className="Navbar">
      <Text>Profile (Mobile)</Text>
      <Text>About us (Mobile)</Text>
      <Text>Contact Us (Mobile)</Text>
      {/* Add any other links for mobile Navbar */}
      {/* </Navbar>
  </MediaQuery> */}

      <Footer className="Footer" height={60} p="md">
        <div className="babyfooter">
          <Location size={40} strokeWidth={2} color={"white"} />
          <Text>Location</Text>
        </div>

        <div className="babyfooter">
          <InfoCircle size={40} strokeWidth={2} color={"white"} />
          <Text>About us</Text>{" "}
        </div>
        <div className="babyfooter">
          <Man size={40} strokeWidth={2} color={"white"} />
          <Text>Sponsors</Text>
        </div>
      </Footer>

      <div className="MobileNavbar">
        <Navbar className="Navbar">
          <Text>Profile (Mobile)</Text>
          <Text>About us (Mobile)</Text>
          <Text>Contact Us (Mobile)</Text>
          {/* Add any other links for mobile Navbar */}
        </Navbar>
      </div>

      {/* <div className="grid-container"> */}
      <Grid
        className="Grid"
        style={{
          flex: 1,
          display:"flex",
          // flex:  1,
        }}
      ><div className="first">
        <Grid.Col span={12} className="class">
          <FileDollar size={40} strokeWidth={2} color={"black"} />
        </Grid.Col>
        <Grid.Col span={12} className="class">
          <FileDollar size={40} strokeWidth={2} color={"black"} />
        </Grid.Col>
        <Grid.Col span={12} className="class">
          <FileDollar size={40} strokeWidth={2} color={"black"} />
        </Grid.Col>
        </div>
        <div className="secondclass">

       

        <Grid.Col span={10} className="class">
          <FileDollar size={40} strokeWidth={2} color={"black"} />
        </Grid.Col>
        <Grid.Col span={10} className="class">
          <FileDollar size={40} strokeWidth={2} color={"black"} />
        </Grid.Col>
        <Grid.Col span={10} className="class">
          <FileDollar size={40} strokeWidth={2} color={"black"} />
        </Grid.Col>
        </div>
        <div className="thirdclass">

        <Grid.Col span={10} className="class">
          <FileDollar size={40} strokeWidth={2} color={"black"} />
        </Grid.Col>
        <Grid.Col span={10} className="class">
          <FileDollar size={40} strokeWidth={2} color={"black"} />
        </Grid.Col>
        <Grid.Col span={10} className="class">
          <FileDollar size={40} strokeWidth={2} color={"black"} />
        </Grid.Col>
        </div>
      </Grid>
      {/* </div> */}
    </AppShell>
  );
}
