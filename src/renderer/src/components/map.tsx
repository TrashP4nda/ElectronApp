import React from "react";
import GoogleMapReact from 'google-map-react';
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const navigate = useNavigate();

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '90vh', width: '100%' , marginTop:'3.5rem' , marginBottom:'3.5rem'}}>
        <div style={{position:'fixed', zIndex:'10', padding:'10px'}}><Button onClick={() => navigate('/dashboard')}>Go back</Button></div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAunXUhsqrtJ9CLEP2pvmw5pcsChTInLSc" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
      </GoogleMapReact>
    </div>
  );
}