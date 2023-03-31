import Typography from "@mui/material/Typography";
import {useAppSelector} from "../app/hooks";
import {selectArrivals} from "./flightsSlice";
import {selectDepartures} from "./flightsSlice";
import {useParams} from "react-router-dom";
import FlightsTable from "./FlightsTable";
import {Box, Container} from "@mui/material";

export default function FlightsSchedule() {
    const {airportName} = useParams()

        const departures = useAppSelector(selectDepartures(airportName??""))
        const arrivals = useAppSelector(selectArrivals(airportName??""))



    return(
        <>
            <Container sx={{display: 'flex', margin: '0 auto'}}>
                <Box sx={{width: '50%', margin: '0 2em', display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '1.8em', paddingBottom: '1em', color: 'gray'}}>Arrivals</Typography>
                    <FlightsTable flights={arrivals} direction={"arr"}/>
                </Box>
                <Box sx={{width: '50%', margin: '0 2em', display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontSize: '1.8em', paddingBottom: '1em', color: 'gray'}}>Departures</Typography>
                    <FlightsTable flights={departures} direction={"dep"}/>
                </Box>
            </Container>
        </>
    )
}