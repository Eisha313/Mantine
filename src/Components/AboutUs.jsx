// export default AboutUs=()=>{
//     return(
//         <Text>Usquare Solutions is the leading digital platform for all business firms across the world and an one stop automated solution for your trade and industry. No more and no less. We work with you to develop the solutions that you need and that will carry you into the digital future. Individual and tailor-made. Depending on the size and field of your organization, we have different products and services to meet your requirements. We provide the optimum and customized solutions made for your organization.</Text>
//     )
// }
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const AboutUs=()=>{
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
   
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
export default AboutUs;