import React from "react";
import { Document, Page, View, StyleSheet,Image } from "@react-pdf/renderer";
import { Text, Flex} from "@mantine/core"; 
import image from "../Components/print.jpg"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    // padding: 20,
  },
  line: {
    // borderBottomWidth: 1,
    // borderBottomColor: "black",
    // width: "100%",
    // marginBottom: 10,
    // borderBottom: 1,
    flex: "1",
    height: "1px",
    background: "black",
    marginLeft: "120px",
    width:"400px"
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
    // marginBottom: 20,
//     flexDirection: "row",
//     alignItems: "center",
    fontWeight:"bold",
  
    // padding:"1px"
  },
  labelText: {
    marginRight: 5, 
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
  pictureBox: {
   
    padding: 10,
    border: "1px solid black",
    width: "200px",
    height:"150px",
    // textAlign: "center",
    marginLeft:"220px",
    marginTop:"40px",
  },
});


const UserFormPDF = ({ formData }) => {
  return (
    <Document>
        {/* {
       window.location.pathname!=="/pdf-conversion"? <Header/> : null
    } */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
        <style>
        {`
          
          @media print {
            // button[type="reset"],
            // button[type="submit"] ,
            // button [type="button"],
            form,h1,h4,
            .navbar,
            .footer,
            .dashboardLayout,
            .header{
              display: none;
            }
          }
        `}
      </style>
      {/* <Image
        source="./print.jpg" 
        style={{height:"100px",width:"100px"}}
      /> */}
      <img  style={{height:"70px" ,width:"70px",marginLeft:"270px",borderRadius:"50%"}}src={image} alt="picture" />
          <Text style={{ marginLeft: "280px", fontWeight: "bold",marginTop:"20px" }}>
            User Form Data
          </Text>
          {/* <Flex>
            <Text>UserType:</Text>
            
            <Text></Text>
          </Flex> */}
          {Object.entries(formData).map(([field, value], index) => (
            <React.Fragment key={index}>
                {/* <Flex style={{flexDirection:"row", gap:"20px"}}> */}
              <View style={styles.label}>
                <Text style={styles.labelText}>{field}</Text>
                </View>
                <View >

           <Text style={styles.line}></Text>
            
          </View>
          {/* </Flex> */}
                
              <Text style={styles.value}>{value}</Text>
              
              
        
            </React.Fragment>
          ))}
           <Text style={{marginLeft:"250px",fontWeight:"bold",marginTop:"40px"}}>Add Your Picture</Text>
          {/* <View style={{height:5000,width:5000,border:"1px solid black"}}> */}
          <View >

           <Text style={styles.pictureBox}></Text>
            
          </View>
          <Flex style={{flexDirection:"row", gap:"20px",marginTop:"60px"}}>
            <Flex>
          <Text style={{fontWeight:"bold",fontSize:"20px"}}>Approved by:</Text>
         <Text style={{  
                height: "0.5px", 
    background: "black",
    marginLeft: "30px",
    width:"160px",
    marginTop:"20px"}}></Text>
          </Flex>
          <Flex>

          <Text style={{fontWeight:"bold",fontSize:"20px"}}>Signature :</Text>
          <Text style={{ 
    height: "0.5px",
    background: "black",
    marginLeft: "30px",
    width:"160px",
    marginTop:"20px"}}></Text>
          </Flex>
          </Flex>
        </View>
      </Page>
    </Document>
  );
};

export default UserFormPDF;