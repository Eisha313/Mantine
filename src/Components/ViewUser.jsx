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
} from "@mantine/core";
import download from "downloadjs";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
import { Edit, Eye, Trash, Checks } from "tabler-icons-react";
import { FileDownload } from "tabler-icons-react";
// import { Icon } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";
import "./AddUser";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ViewUser() {
  const navigate = useNavigate();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("")
  const [selectedStatus, setSelectedStatus] = useState(""); 
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [selectedOption, setSelectedOption] = useState("");
  //   const rows = elements.map((element) => (
  //     <tr key={element.name}>
  //       <td>{element.srNo}</td>
  //       <td>{element.name}</td>
  //       <td>{element.symbol}</td>
  //       <td>{element.mass}</td>
  //     </tr>
  //   ));
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
  const edit=()=>{
    return(
      <Button size="xs" variant="outline" border="none">
         </Button>
    )
  }
  const Status = () => {
    return (
      <Button
        style={{
          color: "green",
          border: "1px solid lightgray",
        }}
      >
        Active
      </Button>
    );
  };

  const handleDelete = async (user) => {
    console.log(user)
    console.log(user._id,"this was userid")
    try {
      let response=await axios.delete(`http://localhost:3000/users/${user._id}`,{
        header:token
      });
      setUsers(users.filter((u) => u._id !== user._id));
    } 
    catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  
  const ActionsColumn = ({user}) => {
    // console.log("hello",user)
    return (
        <Flex>
          <Button  onClick={()=>handleDelete(user)} style={{ backgroundColor: "White" }}>
            <Trash
              size={18}
              strokeWidth={1.5}
              color="red"
              style={{ cursor: "pointer" }}
              
            />
          </Button>
          
          <Button  style={{ backgroundColor: "White" }}>
            <Eye
              size={18}
              strokeWidth={1.5}
              color="blue"
              style={{ cursor: "pointer", marginLeft: "8px" }}
              // onClick={() => handleView(user.id)}
            />
          </Button>
          ,
          <Button style={{ backgroundColor: "white" }}>
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
    console.log("helllo")
    // if (downloadOption === "CSV") {
    //   // Create a Blob with the CSV content and create a URL for it
    //   const csvData = "your,csv,data,here";
    //   const blob = new Blob([csvData], { type: "text/csv" });
    //   const url = URL.createObjectURL(blob);

    //   // Create a temporary <a> element and trigger a click event to start the download
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.download = "data.csv";
    //   link.click();

    //   // Release the URL object
    //   URL.revokeObjectURL(url);
    // } else if (downloadOption === "PDF") {
    //   // Similar logic for PDF download
    //   const pdfData = "your,pdf,data,here";
    //   const blob = new Blob([pdfData], { type: "application/pdf" });
    //   const url = URL.createObjectURL(blob);
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.download = "data.pdf";
    //   link.click();
    //   URL.revokeObjectURL(url);
    // }
    // // Clear the selected download option
    // handleClearDownload();
    // if (downloadOption === "As PDF") {
      // Create a new PDF instance
      const pdf = new jsPDF();

      // Define the table content (rows) as an array of arrays
      const tableContent = users.map((user) => [
        user.firstName + " " + user.lastName,
        user.email,
        user.userType,
        user.Dealership,
        
        // <Status/>,
        // <ActionsColumn/>,
        // <Check/>,
        ,
      ]);

      // Add a header row to the table content
      tableContent.unshift([
        "Full Name",
        "Email",
        "UserType",
        "Dealership",
        // "Status",
        // "Actions",
        // "Access",
      ]);

      // Set the position and dimensions of the table
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

console.log("this is my token",token);

useEffect(() => {
  const fetchUsers = async () => {
    console.log("about to fetch")
    try {
      console.log("about to try")
      const response = await axios.get("http://localhost:3000/users", {
        
      

        headers: {
          Authorization: token
        
        },
        
      });
      console.log("token",response)
      setUsers(response.data.users);
      console.log(setUsers)
    } catch (error) {
      console.error("Error fetching users:", error);
      // console.log(users.error)
    }
  };

  fetchUsers();
}, []);


console.log("usersData",users)


  // return (
  //   <Flex>
  //     <Button style={{ backgroundColor: "White" }}>
  //       <Trash
  //         size={18}
  //         strokeWidth={1.5}
  //         color="red"
  //         style={{ cursor: "pointer" }}
  //          onClick={handleDelete}
  //       />
  //     </Button>
  //     ,
  //     <Button style={{ backgroundColor: "White" }}>
  //       <Eye
  //         size={18}
  //         strokeWidth={1.5}
  //         color="blue"
  //         style={{ cursor: "pointer", marginLeft: "8px" }}
  //         // onClick={() => handleView(user.id)}
  //       />
  //     </Button>
  //     ,
  //     <Button style={{ backgroundColor: "white" }}>
  //       <Edit
  //         size={18}
  //         strokeWidth={1.5}
  //         color="green"
  //         style={{ cursor: "pointer", marginLeft: "8px" }}
  //         // onClick={() => handleEdit(user.id)}
  //       />
  //     </Button>
  //   </Flex>
  // );


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
      <ActionsColumn />
    </td>s
    <td>
      <Check />
    </td>
  </tr>
));

console.log(rows);
const filteredUsers = users.filter((user) =>
user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
)
.filter((user) =>
selectedUserType ? user.userType === selectedUserType : true
)
.filter((user) =>
selectedStatus ? user.status === selectedStatus : true // Apply status filter if a status is selected
);


const handleSort = (column) => {
  if (sortBy === column) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortBy(column);
    setSortOrder("asc");
  }
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

return (
  <>
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

      <Select
        //   label="Filter By User"
        placeholder="Filter By User"
        data={[
          { value: "Admin", label: "Admin" },
          { value: "User", label: "User" },

          // { value: "Seller", label: "Seller" },
          // { value: "Customer", label: "Customer" },
          // { value: "Inventory Manager", label: "Inventory Manager" },
          // { value: "Accountant", label: "Accountant" },
          // { value: "Dispatcher", label: "Dispatcher" },

        ]}
        value={selectedUserType}
        onChange={(value) => setSelectedUserType(value)}
      />
      <Select
        placeholder="Filter By Status"
        data={[
          { value: "Pending", label: "Pending" },
          { value: "Active", label: "Active" },
          { value: "Block", label: "Block" },
        ]}
        value={selectedStatus}
        onChange={(value) => setSelectedStatus(value)}
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
    > <Flex> <Button  style={{ marginTop: "5px",
    backgroundColor: "white",
    color: "blue",
    border: "1px solid blue",}} onClick={() => {handleSortButtonClick}}>Sort </Button>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button onClick={performDownload}
            style={{
              marginLeft: "760px",
              marginTop: "5px",
              backgroundColor: "white",
              color: "blue",
              border: "1px solid blue",
            }}
          >
            Download
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<FileDownload size={14} />}>As CVS</Menu.Item>
          <Menu.Item icon={<FileDownload size={14} />}>As PDF</Menu.Item>
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
            <th onClick={() => handleSort("firstName")}>Full Name</th>
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
        {filteredUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.firstName + " " + user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              <td>
                <Status/>
              </td>
              <td><ActionsColumn/></td>
              <td><Check/></td>

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
        total={10}
        withEdges
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconGripHorizontal}
      />
    </div>
  </>
);
      }
