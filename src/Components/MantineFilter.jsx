import React, { useState } from "react";
import {
  Container,
  Flex,
  Input,
  Text,
  Space,
  Select,
} from "@mantine/core";

const MantineFilter = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserChange = (value) => {
    setSelectedUser(value);
  };


  

  return (
    <Container mt={120}>
      <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
       
          
        
        <Space h="md" />
        <Select
    //   label="Filter By User"
      placeholder="Filter By User"
      data={[
        { value: "Seller", label: "Seller" },
        { value: "Customer", label: "Customer" },
        { value: "Inventory Manager", label: "Inventory Manager" },
        { value: "Accountant", label: "Accountant" },
        { value: "Dispatcher", label: "Dispatcher" },
      ]}
    />
      </Flex>
    </Container>
  );
};

export default MantineFilter;