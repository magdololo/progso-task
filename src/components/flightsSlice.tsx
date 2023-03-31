import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityState,
} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import axios from 'axios';
export interface Flight{
    dep_iata: string;
    dep_icao: number;
    arr_iata: string;
    arr_icao: string;
    arr_time_ts: number;
    flight_icao: string;
    status: string;
    flight_iata: string;
    arr_time: string;
    dep_time: string;



}
const flightsAdapter = createEntityAdapter<Flight>({
    selectId: (flight) => flight.flight_icao,
    sortComparer: (a: Flight, b: Flight) => {
        let aArrive = a.arr_time_ts;
        let bArrive = b.arr_time_ts;

        if (aArrive < bArrive) return -1;
        if (aArrive > bArrive) return 1;
        return 0

    }
});
type FlightsResponse = {
        response: Flight[]
}
export const fetchFlights = createAsyncThunk<Flight[], string>('flights/fetchFlights', async(airportIata)=> {

    const flightsData: Array<Flight> = [];
    const resultDepartures = await axios.get<FlightsResponse>(`https://airlabs.co/api/v9/schedules?dep_iata=${airportIata}&api_key=YOUR-API-KEY`)
    flightsData.push(...resultDepartures.data.response)
    const resultArrivals = await axios.get<FlightsResponse>(`https://airlabs.co/api/v9/schedules?arr_iata=${airportIata}&api_key=YOUR-API-KEY`)
    flightsData.push(...resultArrivals.data.response)
    return flightsData

})


const initialState: EntityState<Flight>& { error: null | string | undefined; status: string; } = flightsAdapter.getInitialState({
    status: 'idle',
    error: null

})
const flightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder
            .addCase(fetchFlights.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchFlights.fulfilled, (state, action) => {
                state.status = 'succeeded'
                flightsAdapter.upsertMany(state, action.payload as Flight[])
            })
            .addCase(fetchFlights.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
export const {
    selectAll: selectAllFlights,

} = flightsAdapter.getSelectors<RootState>((state) => state.flights);

export const selectDepartures = (dep_iata: string)=> createSelector(
    [(state: RootState) => selectAllFlights(state)],
    (flights) => flights.filter(flight => flight.dep_iata === dep_iata)
)
export const selectArrivals = (arr_iata: string)=> createSelector(
    [(state: RootState) => selectAllFlights(state)],
    (flights) => flights.filter(flight => flight.arr_iata === arr_iata)
)
export const {} = flightsSlice.actions
export default flightsSlice.reducer
