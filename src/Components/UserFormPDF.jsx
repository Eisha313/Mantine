import React from "react";
import { Document, Page,  View, StyleSheet } from "@react-pdf/renderer";
import { Text,Flex } from "@mantine/core";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
});

const UserFormPDF = ({ formData }) => {
  return (
    <Document>
      {/* <Page size="A4" style={styles.page}> */}
        {/* <View style={styles.section}> */}
        
        <Text style={{marginLeft:"250px",fontWeight:"bold"}}>User Form Data</Text> 
        <Flex>
            <Text >UserType:</Text>
        </Flex>
           {Object.entries(formData).map(([field, value], index) => (
            <React.Fragment key={index}>
              <Text style={styles.label}>{field}</Text>
              <View style={styles.line} /> 
              <br />
              {/* <Text style={styles.value}>{value}</Text> */}
            </React.Fragment>
          ))} 

          {/* Add other form fields here */}
        {/* </View> */}
      {/* </Page> */}
    </Document>
  );
};

export default UserFormPDF;