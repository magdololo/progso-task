import React from "react";
import FlightIcon from "@mui/icons-material/Flight";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {Flight} from "./flightsSlice";


export default function FlightMarker({flight, lng, lat}: {flight: Flight, lng: number, lat: number}) {
    const [popupEl, setPopupEl] = React.useState<SVGElement | null>(null);
    const showInfo = (event: React.MouseEvent<SVGElement>)=>{
        setPopupEl(event.currentTarget);
    }

    const hideInfo = () => {
        setPopupEl(null);
    };
    const open = Boolean(popupEl);
    const id = open ? 'simple-popover' : undefined;
    return(
        <div style={{
            width: "50px",
            height: "50px",
            position: "relative",
            top: "-50px",
            left: "-25px",
        }}>
            <FlightIcon onClick={showInfo}/>
            <Popover
                id={id}
                open={open}
                anchorEl={popupEl}
                onClose={hideInfo}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ pt: 2, pl: 2, pr: 2, fontSize: 12  }}>Długość geograficzna: {flight.lng}</Typography>
                <Typography sx={{ pl: 2, pr: 2, fontSize: 12 }}>Szerokość geograficzna: {flight.lat}</Typography>
                <Typography sx={{ pl: 2, pr: 2, fontSize: 12 }}>Czas przylotu: {flight.arr_time}</Typography>
                <Typography sx={{ pb: 2, pl: 2, pr: 2, fontSize: 12 }}>Status: {flight.status}</Typography>
            </Popover>
        </div>
        )

}