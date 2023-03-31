import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Flight} from "./flightsSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface FlightsTableProps {
    flights: Flight[]
    direction: "dep" | "arr"
}

export default function FlightsTable({flights, direction}: FlightsTableProps) {
    const getTimeFromDateTime = (dateTime: string)=>{
        return dateTime.split(' ')[1]
    }
    return (
        <TableContainer component={Paper}>
            <Table  aria-label="customized table">
                {/*sx={{ minWidth: 700 }}*/}
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Time</StyledTableCell>
                        <StyledTableCell align="center">Flight</StyledTableCell>
                        <StyledTableCell align="center">{direction === "dep" ? 'Destination' : 'Origin'}</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">Location</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {flights.map((row) => (
                        <StyledTableRow key={row.flight_icao}>
                            <StyledTableCell align="center">{direction === "dep" ? getTimeFromDateTime(row.dep_time) : getTimeFromDateTime(row.arr_time)}</StyledTableCell>
                            <StyledTableCell align="center">{row.flight_icao}</StyledTableCell>
                            <StyledTableCell align="center">{direction === "dep" ? row.arr_iata : row.dep_iata}</StyledTableCell>
                            <StyledTableCell align="center">{row.status}</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}