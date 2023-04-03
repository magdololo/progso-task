import Typography from "@mui/material/Typography";
import {useAppSelector} from "../app/hooks";
import { selectArrivals} from "./flightsSlice";
import {selectDepartures} from "./flightsSlice";
import {useParams} from "react-router-dom";
import FlightsTable from "./FlightsTable";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Container} from "@mui/material";

export default function FlightsSchedule() {
    const {airportName} = useParams()
    const departures = useAppSelector(selectDepartures(airportName??""))
    const arrivals = useAppSelector(selectArrivals(airportName??""))



    return(
        <>
            <Container sx={{margin: '0 auto'}}>
                <Grid2 container spacing={{md: 2}}>
                    <Grid2 xs={12} md={6} >
                        <Typography sx={{fontSize: '1.8em', padding: '.8em 0', color: 'gray', position: 'sticky'}}>Arrivals</Typography>
                        <FlightsTable flights={arrivals} direction={"arr"}/>
                    </Grid2>
                    <Grid2 xs={12} md={6}>
                        <Typography sx={{fontSize: '1.8em', padding: '.8em 0', color: 'gray', position: 'sticky'}}>Departures</Typography>
                        <FlightsTable flights={departures} direction={"dep"}/>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}