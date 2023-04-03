import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Flight} from "./flightsSlice";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import {Box, Modal, useMediaQuery} from "@mui/material";

import FlightsLocation from "./FlightLocation";
import {useState} from "react";
import {devices} from './device';


interface FlightsTableProps {
    flights: Flight[]
    direction: "dep" | "arr"
}

export default function FlightsTable({flights, direction}: FlightsTableProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
    const mobile = useMediaQuery('(max-width: 800px)');
    const StyledTableCell = styled(TableCell)(({theme}) => ({

        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#424242',
            color: theme.palette.common.white,
            [`@media ${devices.mobileS}`]: {
                fontSize: 10,
                padding: 9
            },
            [`@media ${devices.mobileM}`]: {
                fontSize: 12,
                padding: 10
            },
            [`@media ${devices.laptop}`]: {
                fontSize: 14,
                padding: 16
            },
        },
        [`&.${tableCellClasses.body}`]: {
            [`@media ${devices.mobileS}`]: {
                fontSize: 10,
                padding: 8
            },
            [`@media ${devices.mobileM}`]: {
                fontSize: 11,
                padding: 8
            },
            [`@media ${devices.laptop}`]: {
                fontSize: 11,
                padding: 12
            },
            [`@media ${devices.laptopL}`]: {
                fontSize: 13,
                padding: 14
            },
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    const handleOpenModalWithMap = (flight: Flight) => {
        setOpen(true);
        setSelectedFlight(flight)
    }
    const handleCloseModalWithMap = () => setOpen(false);

    return (
        <>
            <Paper sx={{width: '100%'}}>
                <TableContainer sx={{maxHeight: mobile ? '50vh' : '100vh'}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Time</StyledTableCell>
                                <StyledTableCell align="center">Flight</StyledTableCell>
                                <StyledTableCell
                                    align="center">{direction === "dep" ? 'Destination' : 'Origin'}</StyledTableCell>
                                <StyledTableCell align="center">Status</StyledTableCell>
                                <StyledTableCell align="center">Location</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {flights.map((row) => (
                                <StyledTableRow key={row.flight_icao} role={direction+'FlightRow'}>
                                    <StyledTableCell
                                        align="center">{direction === "dep" ? row.dep_time : row.arr_time}</StyledTableCell>
                                    <StyledTableCell align="center">{row.flight_icao}</StyledTableCell>
                                    <StyledTableCell
                                        align="center">{direction === "dep" ? row.arr_iata : row.dep_iata}</StyledTableCell>
                                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                                    <StyledTableCell align="center">{row.lng ?
                                        <AddLocationIcon sx={{color: "rgb(25, 118, 210)", fontSize: mobile ? 22 : 24}}
                                                         onClick={() => handleOpenModalWithMap(row)}/> : ""}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Modal
                open={open}
                onClose={handleCloseModalWithMap}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: mobile ? 400 : 600,
                    height: mobile ? 300 : 400,
                    border: '1px solid gray',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4
                }}>
                    {selectedFlight && <FlightsLocation flight={selectedFlight}/>}
                </Box>
            </Modal>
        </>
    );
}