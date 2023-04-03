import React from 'react';
import {Flight} from "./flightsSlice";
import GoogleMapReact from 'google-map-react'
import FlightMarker from "./FlightMarker";


interface  FlightsLocationProps {
    flight: Flight
}

function FlightsLocation({flight}: FlightsLocationProps){

    return (

        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY as string }}
            defaultCenter={{lat: flight.lat, lng:flight.lng}}
            defaultZoom={6}
        >
            <FlightMarker
                lat={flight.lat}
                lng={flight.lng}
                flight={flight}
            />
        </GoogleMapReact>

    )
}

export default FlightsLocation