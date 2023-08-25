// export default AboutUs=()=>{
//     return(
//         <Text>Usquare Solutions is the leading digital platform for all business firms across the world and an one stop automated solution for your trade and industry. No more and no less. We work with you to develop the solutions that you need and that will carry you into the digital future. Individual and tailor-made. Depending on the size and field of your organization, we have different products and services to meet your requirements. We provide the optimum and customized solutions made for your organization.</Text>
//     )
// }
import React from "react";
import GoogleMapReact from 'google-map-react';
import { Text ,Title} from "@mantine/core";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const AboutUs=()=>{
  const defaultProps = {
    center: {
      lat: 33.667063057243,
      lng: 73.07332256931441
    },
    zoom: 20
  };

  return (
    <><Title style={{color:"orange"}}>USquare:</Title>
    <Text style={{marginTop:"20px",fontStyle:"italic",}}>Usquare Solutions is the leading digital platform for all business firms across the world and an one stop automated solution for your trade and industry. No more and no less. We work with you to develop the solutions that you need and that will carry you into the digital future. Individual and tailor-made. Depending on the size and field of your organization, we have different products and services to meet your requirements. We provide the optimum and customized solutions made for your organization</Text>
   <Title style={{color:"orange"}}>Location</Title>
    <div style={{ height: '400px', width: '500px',marginLeft:"200px",}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        
        <AnyReactComponent
          lat={33.667063057243}
          lng={73.07332256931441}
          
         
          text="My Marker"
        />
      </GoogleMapReact>
      <Title style={{marginRight:"600px",marginTop:"20px",color:"orange"}}>RoadMap</Title>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/HcOc7P5BMi4?si=x7YDVoHSOky2l7Qv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 

    </div>
    </>
  );
}
export default AboutUs;