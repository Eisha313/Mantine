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
import AddUserForm from "./AddUser";
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

export default function ViewUser() {
  const navigate = useNavigate();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [opened, { open, close }] = useDisclosure(false);

  const [modalData, setModalData] = useState(null);

  const [selectedOption, setSelectedOption] = useState("");
  const [editedUserData, setEditedUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 10; // Number of users to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
 
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
  const ActionsColumn = ({ users }) => {

    const handleDelete = async () => {
      console.log("usersss", users);
      console.log(users._id, "this was userid");
      try {
        let response = await axios.delete(
          `http://localhost:3000/users/${users._id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUsers((prev) => prev.filter((u) => u._id !== users._id));
        toast.success(" deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
  
      const handleEdit = () => {
        // navigate(`/add-user`);
        console.log(users._id)
        navigate(`/add-user/${users._id}`);

        
          open(); // Open the modal with AddUserForm
          setEditedUserData(users); // Set the edited user data for pre-filling the form
        }; // Pass user ID as a parameter to the URL
      
  ;
    // console.log("hello",user)
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
          setModalData(users);
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
            // onClick={() => handleEdit(user.id)}
          />
        </Button>
      </Flex>
    );
      };
  const performDownload = () => {
    console.log("helllo");
    
    
    const pdf = new jsPDF();

    // Define the table content (rows) as an array of arrays
    const tableContent = users.map((user) => [
      user.firstName + " " + user.lastName,
      user.email,
      user.userType,
      user.Dealership,
,

      ,
    ]);

    // Add a header row to the table content
    tableContent.unshift([
      "Full Name",
      "Email",
      "UserType",

      
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
    pdf.save("users.pdf");
    // }
    // Clear the selected download option
    // handleClearDownload();
  };

  const token = localStorage.getItem("jwtToken");

  console.log("this is my token", token);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("about to fetch");
      try {
        console.log("about to try");
        const response = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: token,
          },
        });
        console.log("token", response);
        setUsers(response.data.users);
        console.log(setUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        // console.log(users.error)
      }
    };

    fetchUsers();
  }, []);

  console.log("usersData", users);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };



  const rows = users.map((user, index) => (
    <tr key={user._id}>
      <td>{index + 1}</td>
      <td>{user.firstName + " " + user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.userType}</td>
      <td>
        <Status />
      </td>
      <td>
        <ActionsColumn users={user} />
      </td>

      <td>
        <Check />
      </td>
    </tr>
  ));

  console.log(rows);
  const filteredUsers = users
  .filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((user) =>
    selectedUserType ? user.userType === selectedUserType : true
  )
  // .filter(
  //   (user) => (selectedStatus ? user.status === selectedStatus : true) // Apply status filter if a status is selected
  // );
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

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy) {
      const aValue = a[sortBy].toLowerCase();
      const bValue = b[sortBy].toLowerCase();
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });
  const handleSortButtonClick = () => {
    handleSort("firstName");
    console.log("Sorting button clicked");
  };
  const filteredAndSortedUsers = sortedUsers.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  // Extract users for the current page
  const usersToShow = filteredAndSortedUsers.slice(startIndex, endIndex);
  console.log(currentPage);
  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
  const usersOnPage = users.slice(startIndex, endIndex);
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
           {/* {editedUserData && (
        <AddUserForm userId={editedUserData._id} userData={editedUserData} />
      )} */}
      
        <Flex  direction={"column"}>
          <Title>User Details</Title>
          {modalData && (
            <div>
              <Text>
                Full Name: {modalData.firstName} {modalData.lastName}
              </Text>
              <Text>User Type: {modalData.userType}</Text>
              <Text>Emai:{modalData.email}</Text>
            </div>
          )}
          {/* <Button onClick={close}>Close</Button> */}
        </Flex>
      </Modal>

      <h1 style={{ marginLeft: "440px" }}>View User</h1>
      <h4
        style={{
          color: "GrayText",
          marginLeft: "350px",
        }}
      >
        Viewdetails of all the Users added in the system
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
          
          placeholder="Filter By User"
          data={[
            { value: "Admin", label: "Admin" },
            { value: "User", label: "User" },
          ]}
          value={selectedUserType}
          // {getInputProps("userType")}
        
          
          onChange={(value) => setSelectedUserType(value)}
          
        />
        {/* <Select
          placeholder="Filter By Status"
          data={[
            { value: "Pending", label: "Pending" },
            { value: "Active", label: "Active" },
            { value: "Block", label: "Block" },
          ]}
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value)} */}
        {/* /> */}
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
        <Link to="/add-user">
          <Button
            style={{
              width: 473,
              backgroundColor: "orange",
              marginTop: "20px",
              fontSize: "lg",
            }}
          >
            + ADD USER
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

            <Menu.Dropdown>
              {/* <Menu.Item icon={<FileDownload size={14} />}>As CVS</Menu.Item> */}
              {/* <Menu.Item icon={<FileDownload size={14} />}>As PDF</Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </Flex>
        {/* {downloadOption && ( */}
        {/* <Button onClick={performDownload}>Perform Download</Button> */}
        {/* )} */}
        <Table
          style={{
            // border: "1px solid gray",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th>Sr No.</th>
              <th >Full Name</th>
              <th>Email</th>
              <th>UserType</th>
              {/* <th>Dealership</th> */}
              <th>Status</th>
              <th>Actions</th>
              <th>Access</th>
            </tr>
          </thead>

          {/* <tbody>{rows}</tbody> */}
          <tbody>
            {/* {filteredUsers.map((user, index) => ( */}
                {/* {filteredAndSortedUsers.map((user,index) => ( 
                    
                       {/* {usersOnPage.map((user,index) => ( */}
                       
                       {/* {filteredAndSortedUsers.map((user,index) => (  */}
                       {usersToShow.map((user, index) => ( 
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  <Status />
                </td>
                <td>
                  <ActionsColumn users={user} />
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
