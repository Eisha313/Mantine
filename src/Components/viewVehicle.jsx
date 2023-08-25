import {
    Table,
    TextInput,
    Text,
    Select,
    Flex,
    Button,
    Popover,
    Paper,
    Divider,
    Menu,
    Pagination,
    Container,
    Modal,
    Title,
    Input,
  } from "@mantine/core";
  // import { useDisclosure } from '@mantine/hooks';
  // import { Modal, Group, Button } from '@mantine/core';
  import download from "downloadjs";
  import axios from "axios";
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  import { toast } from "react-hot-toast";
  import AddingVehicle from "./AddingVehicle";
  import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
    IconArrowBarToRight,
    IconArrowBarToLeft,
    IconArrowLeft,
    IconArrowRight,
    IconGripHorizontal,
  } from "@tabler/icons-react";
  import { Edit, Eye, Trash, Checks, Forms } from "tabler-icons-react";
  import { FileDownload } from "tabler-icons-react";
  // import { Icon } from "tabler-icons-react";
  import { useNavigate } from "react-router-dom";
  import "./AddUser";
  import { Link } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { useDisclosure } from "@mantine/hooks";
  
  // import { Title } from "chart.js";
  
  export default function ViewVehicle() {
    const navigate = useNavigate();
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedVehicleType, setSelectedVehicleType] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [opened, { open, close }] = useDisclosure(false);
  
    const [modalData, setModalData] = useState(null);
  
    const [selectedOption, setSelectedOption] = useState("");
    const [editedVehicleData, setEditedVehicleData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const vehiclesPerPage = 10; // Number of users to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * vehiclesPerPage;
    const endIndex = startIndex + vehiclesPerPage;
   
    const [downloadOption, setDownloadOption] = useState();
  
    const handleDownload = (option) => {
      setDownloadOption(option);
    };
  
    const handleClearDownload = () => {
      setDownloadOption(null);
    };
    const Check = () => {
      return (
        <Button size="xs" variant="outline" border="none">
          <Checks size={22} strokeWidth={2} color={"green"} />
        </Button>
      );
    };
    const edit = () => {
      return <Button size="xs" variant="outline" border="none"></Button>;
    };
    const Status = () => {
      return (
        <Button
          style={{
            color: "green",
            border: "1px solid lightgray",
            backgroundColor: "white",
          }}
        >
          Active
        </Button>
      );
    };
    const ActionsColumn = ({ vehicles }) => {
  
      const handleDelete = async () => {
        console.log("vehicles", vehicles);
        console.log(vehicles._id, "this was vehicleid");
        try {
          let response = await axios.delete(
            `http://localhost:3000/vehicles/${vehicles._id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setVehicles((prev) => prev.filter((v) => v._id !== vehicles._id));
          toast.success(" deleted successfully");
        } catch (error) {
          console.error("Error deleting vehicle:", error);
        }
      };
    
        const handleEdit = () => {
          // navigate(`/add-user`);
          console.log(vehicles._id)
          navigate(`/adding-vehicle`,{state:{
            id:vehicles._id
          }})
          // /${vehicles._id}`);
  
          
            open(); 
            setEditedVehicleData(vehicles); 
          }; 
        
    ;
      
      return (
        <Flex>
          <Button onClick={handleDelete} style={{ backgroundColor: "White" }}>
            <Trash
              size={18}
              strokeWidth={1.5}
              color="red"
              style={{ cursor: "pointer" }}
            />
          </Button>
          <Button 
          onClick={() => {
            setModalData(vehicles);
            open();
          }}
          style={{ backgroundColor: "White" }}>
            <Eye
              size={18}
              strokeWidth={1.5}
              color="blue"
              style={{ cursor: "pointer", marginLeft: "8px" }}
              
            />
          </Button>
          
          <Button onClick={handleEdit} style={{ backgroundColor: "white" }}>
            <Edit
              size={18}
              strokeWidth={1.5}
              color="green"
              style={{ cursor: "pointer", marginLeft: "8px" }}
              
            />
          </Button>
        </Flex>
      );
        };
    const performDownload = () => {
      console.log("helllo");
      
      
      const pdf = new jsPDF();
  
      // Define the table content (rows) as an array of arrays
      const tableContent = vehicles.map((vehicle) => [
        vehicle.vin,
        vehicle.make,
        vehicle.model,
        vehicle.year,
        vehicle.color,
        vehicle.mileage,
        vehicle.price,
    
        
        
  
  
        
      ]);
  
      // Add a header row to the table content
      tableContent.unshift([
        "Vin #",
        "Make",
        "Model",
        "Year",
        "Color",
        "Mileage",
        "Price",

  
        
      ]);
  
      
      const startY = 10;
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
      const pageHeight = pdf.internal.pageSize.getHeight() - 2 * margin;
  
      // Generate the PDF table using autotable
      pdf.autoTable({
        head: [tableContent[0]],
        body: tableContent.slice(1),
        startY,
        margin: { top: margin, right: margin, bottom: margin, left: margin },
        pageBreak: "auto",
        styles: { overflow: "linebreak" },
        headStyles: { fillColor: [0, 0, 0] },
      });
  
      // Save the PDF file with a given name
      pdf.save("vehicles.pdf");
      
      handleClearDownload();
    };
  
    const token = localStorage.getItem("jwtToken");
  
    console.log("this is my token", token);
  
    useEffect(() => {
      const fetchVehicles = async () => {
        console.log("about to fetch");
        try {
          console.log("about to try");
          const response = await axios.get("http://localhost:3000/vehicles", {
            headers: {
              Authorization: token,
            },
          });
          console.log("token", response);
          setVehicles(response.data.vehicles);
          console.log(setVehicles);
        } catch (error) {
          console.error("Error fetching vehicles:", error);
          // console.log(users.error)
        }
      };
  
      fetchVehicles();
    }, []);
  
    console.log("VehicleData", vehicles);
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
  
  
    const rows = vehicles.map((vehicle, index) => (
      <tr key={vehicle._id}>
        <td>{index + 1}</td>
        <td>{vehicle.vin}</td>
        <td>{vehicle.year}</td>
        <td>{vehicle.make}</td>
        <td>{vehicle.model}</td>
        <td>{vehicle.color}</td>
        <td>{vehicle.price}</td>
     
        <td>{vehicle.bodyType}</td>

        <td>
          <Status />
        </td>
        <td>
          <ActionsColumn vehicles={vehicle} />
        </td>
  
        <td>
          <Check />
        </td>
      </tr>
    ));
  
    console.log(rows);
    const filteredVehicles = vehicles
    .filter((vehicle) =>
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((vehicle) =>
      selectedVehicleType ? vehicle.bodyType === selectedVehicleType : true
    )
    
    const handleSort = (column) => {
      if (sortBy === column) {
        console.log(column)
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortBy(column);
        setSortOrder("asc");
      }
      console.log("sortBy:", sortBy, "sortOrder:", sortOrder);
    };
  
    const sortedVehicles = [...filteredVehicles].sort((a, b) => {
      if (sortBy) {
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
    const handleSortButtonClick = () => {
      handleSort("make");
      console.log("Sorting button clicked");
    };
    const filteredAndSortedVehicles = sortedVehicles.filter((user) =>
      user.make.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  
   
    const vehiclesToShow = filteredAndSortedVehicles.slice(startIndex, endIndex);
    console.log(currentPage);
    const totalPages = Math.ceil(filteredAndSortedVehicles.length / vehiclesPerPage);
    const usersOnPage = vehicles.slice(startIndex, endIndex);
    const handlePageChange = (newPage) => {
      console.log(newPage,"this is new")
      setCurrentPage(newPage);
      console.log("page", startIndex, endIndex, currentPage)
    };
  
    
  
    return (
      <>
        <Modal
          style={
            opened
              ? {
                  zIndex: "100000",
                  position: "absolute",
                  top: "5%",
                  left: "3%",
                  width: "94%",
                  height: "86%",
                }
              : {}
          }
          opened={opened}
          onClose={close}
          withCloseButton={true}
          
          >
           
        
          <Flex  direction={"column"}>
            <Title>Vehicle Details</Title>
            {modalData && (
              <div>
                <Text>
                  Vin #: {modalData.vin} 
                </Text>
                <Text>Body Type: {modalData.bodyType}</Text>
                <Text>Year:{modalData.year}</Text>
                <Text>Make:{modalData.make}</Text>
                <Text>Model:{modalData.model}</Text>
                <Text>Color:{modalData.color}</Text>
                <Text>Mileage:{modalData.mileage}</Text>
                <Text>Price:{modalData.price}</Text>

              </div>
            )}
            {/* <Button onClick={close}>Close</Button> */}
          </Flex>
        </Modal>
  
        <h1 style={{ marginLeft: "440px" }}>View Vehicle</h1>
        <h4
          style={{
            color: "GrayText",
            marginLeft: "350px",
          }}
        >
          Viewdetails of all the Vehicles added in the system
        </h4>
        <Flex direction={{ base: "row", sm: "row" }} justify={"space-between"}>
          <TextInput
            style={{ width: 500 }}
            icon={<IconSearch size={18} />}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            radius="sm"
          />
  
          <Select style={{width:480}}
            //   label="Filter By User"
            
            placeholder="Filter By Body"
            data={[
                { value: "Minivan", label: "Minivan" },
                { value: "Convertibe", label: "Convertible" },
                { value: "Van", label: "Van" },
                { value: "Car", label: "Car" },
                { value: "Suv", label: "Suv" },

            ]}
            value={selectedVehicleType}
            // {getInputProps("userType")}
          
            
            onChange={(value) => setSelectedVehicleType(value)}
            
          />
         
          
        </Flex>
        <Flex justify={"space-between"}>
          <Text
            size="md"
            weight={700}
            style={{
              border: "1px solid #ccc",
              padding: "5px 10px",
              borderRadius: "4px",
              color: "orange",
              cursor: "pointer",
              width: 500,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            Clear Filters
          </Text>
          <Link to="/adding-Vehicle">
            <Button
              style={{
                width: 473,
                backgroundColor: "orange",
                marginTop: "20px",
                fontSize: "lg",
              }}
            >
              + ADD Vehicle
            </Button>
          </Link>
        </Flex>
  
        <Container
          style={{
            border: "1px solid #ccc",
            width: "1800px",
            marginTop: "15px",
            marginLeft: "5px",
          }}
        >
          {" "}
          <Flex>
            {" "}
            <Button
              style={{
                marginTop: "5px",
                backgroundColor: "white",
                color: "blue",
                border: "1px solid blue",
              }}
              onClick={() => {
                handleSortButtonClick();
              }}
            >
              Sort{" "}
            </Button>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  onClick={performDownload}
                  style={{
                    marginLeft: "735px",
                    marginTop: "5px",
                    backgroundColor: "white",
                    color: "blue",
                    border: "1px solid blue",
                  }}
                >
                  Download Pdf
                </Button>
              </Menu.Target>
  
              
            </Menu>
          </Flex>
          
          <Table
            style={{
    
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th>Sr.No</th>
                <th style={{marginLeft:"20px"}}>Vin#</th>
                <th >Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Color</th>
                <th>Mileage</th>
                <th>Price</th>
                
              
                
                <th>Actions</th>
                <th>Access</th>
              </tr>
            </thead>
  
            <tbody>
              
                         {vehiclesToShow.map((vehicle, index) => ( 
                <tr key={vehicle._id}>
                  <td>{index + 1}</td>
                  <td>{vehicle.vin}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.color}</td>
                  <td>{vehicle.mileage}</td>
                  <td>{vehicle.price}</td>
                  
                 
                  <td>
                    <ActionsColumn vehicles={vehicle} />
                  </td>
                  <td>
                    <Check />
                  </td>
  
                  <td>
                    {/* <Button onClick={() => handleDelete(user)}>Delete</Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Pagination
            // total={10}
            total={totalPages}
            withEdges
            nextIcon={IconArrowRight}
            previousIcon={IconArrowLeft}
            firstIcon={IconArrowBarToLeft}
            lastIcon={IconArrowBarToRight}
            dotsIcon={IconGripHorizontal}
            value={currentPage} // Set the current page
            onChange={setCurrentPage}
            // onPageChange={handlePageChange} 
          />
        </div>
      </>
    );
  }
  