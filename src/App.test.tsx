import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {airportsData} from "./config";
import {BrowserRouter} from "react-router-dom";
import {rest} from "msw";
import {setupServer} from "msw/node";
import App from "./App";

export const handlers = [
    rest.get(`https://airlabs.co/api/v9/schedules`, (req, res, ctx)=>{
        let depIata = req.url.searchParams.get('dep_iata')
        let arrIata = req.url.searchParams.get('arr_iata')
        if(depIata){
            return res(
                ctx.json({
                    response : [
                        {
                            "airline_iata": "AA",
                            "airline_icao": "AAL",
                            "flight_iata": "AA1675",
                            "flight_icao": "AAL1675",
                            "dep_iata": "CDG",
                            "dep_icao": "KMIA",
                            "dep_time": "2023-04-03 06:00",
                            "dep_time_utc": "2023-04-03 10:00",
                            "dep_estimated": "2023-04-03 05:55",
                            "dep_estimated_utc": "2023-04-03 09:55",
                            "dep_actual": "2023-04-03 05:55",
                            "dep_actual_utc": "2023-04-03 09:55",
                            "arr_iata": "CLT",
                            "arr_icao": "KCLT",
                            "arr_time": "2023-04-03 08:05",
                            "arr_time_utc": "2023-04-03 12:05",
                            "arr_estimated": "2023-04-03 07:55",
                            "arr_estimated_utc": "2023-04-03 11:55",
                            "status": "active"
                        },
                        {
                            "airline_iata": "BB",
                            "airline_icao": "BAWL",
                            "flight_iata": "BB1675",
                            "flight_icao": "BAL1675",
                            "dep_iata": "CDG",
                            "dep_icao": "KMIA",
                            "dep_time": "2023-04-03 06:00",
                            "dep_time_utc": "2023-04-03 10:00",
                            "dep_estimated": "2023-04-03 05:55",
                            "dep_estimated_utc": "2023-04-03 09:55",
                            "dep_actual": "2023-04-03 05:55",
                            "dep_actual_utc": "2023-04-03 09:55",
                            "arr_iata": "CLT",
                            "arr_icao": "KCLT",
                            "arr_time": "2023-04-03 08:05",
                            "arr_time_utc": "2023-04-03 12:05",
                            "arr_estimated": "2023-04-03 07:55",
                            "arr_estimated_utc": "2023-04-03 11:55",
                            "status": "active"
                        }
                    ]
                })
        )}
        if(arrIata){
            return res(
                ctx.json( {
                    response : [
                        {
                            "airline_iata": "AA",
                            "airline_icao": "AAL",
                            "flight_iata": "AA1600",
                            "flight_icao": "AAL1600",
                            "dep_iata": "MIA",
                            "dep_icao": "KMIA",
                            "dep_time": "2023-04-03 06:00",
                            "dep_time_utc": "2023-04-03 10:00",
                            "dep_estimated": "2023-04-03 05:55",
                            "dep_estimated_utc": "2023-04-03 09:55",
                            "dep_actual": "2023-04-03 05:55",
                            "dep_actual_utc": "2023-04-03 09:55",
                            "arr_iata": "CDG",
                            "arr_icao": "KCLT",
                            "arr_time": "2023-04-03 08:05",
                            "arr_time_utc": "2023-04-03 12:05",
                            "arr_estimated": "2023-04-03 07:55",
                            "arr_estimated_utc": "2023-04-03 11:55",
                            "status": "active"
                        },
                        {
                            "airline_iata": "BB",
                            "airline_icao": "BAWL",
                            "flight_iata": "BB1611",
                            "flight_icao": "BAL1611",
                            "dep_iata": "MIA",
                            "dep_icao": "KMIA",
                            "dep_time": "2023-04-03 06:00",
                            "dep_time_utc": "2023-04-03 10:00",
                            "dep_estimated": "2023-04-03 05:55",
                            "dep_estimated_utc": "2023-04-03 09:55",
                            "dep_actual": "2023-04-03 05:55",
                            "dep_actual_utc": "2023-04-03 09:55",
                            "arr_iata": "CDG",
                            "arr_icao": "KCLT",
                            "arr_time": "2023-04-03 08:05",
                            "arr_time_utc": "2023-04-03 12:05",
                            "arr_estimated": "2023-04-03 07:55",
                            "arr_estimated_utc": "2023-04-03 11:55",
                            "status": "active"
                        }
                    ]
                })
            )}
        return res(
            ctx.json({})
        )
    }),
    rest.get(`https://airlabs.co/api/v9/flights`, (req, res, ctx)=>{
        let depIata = req.url.searchParams.get('dep_iata')
        let arrIata = req.url.searchParams.get('arr_iata')
        if(depIata){
            return res(
                ctx.json({
                    response : [
                        {
                            "airline_iata": "AA",
                            "airline_icao": "AAL",
                            "flight_iata": "AA1675",
                            "flight_icao": "AAL1675",
                            "dep_iata": "CDG",
                            "dep_icao": "KMIA",
                            "dep_time": "2023-04-03 06:00",
                            "dep_time_utc": "2023-04-03 10:00",
                            "dep_estimated": "2023-04-03 05:55",
                            "dep_estimated_utc": "2023-04-03 09:55",
                            "dep_actual": "2023-04-03 05:55",
                            "dep_actual_utc": "2023-04-03 09:55",
                            "arr_iata": "CLT",
                            "arr_icao": "KCLT",
                            "arr_time": "2023-04-03 08:05",
                            "arr_time_utc": "2023-04-03 12:05",
                            "arr_estimated": "2023-04-03 07:55",
                            "arr_estimated_utc": "2023-04-03 11:55",
                            "status": "active",
                            "lat": 50.65,
                            "lng": 67.98,
                            "dir": 200
                        }
                    ]
                })
            )}
        if(arrIata){
            return res(
                ctx.json({
                    response : [
                        {
                            "airline_iata": "AA",
                            "airline_icao": "AAL",
                            "flight_iata": "AA1675",
                            "flight_icao": "BAL1611",
                            "dep_iata": "CLT",
                            "dep_icao": "KMIA",
                            "dep_time": "2023-04-03 06:00",
                            "dep_time_utc": "2023-04-03 10:00",
                            "dep_estimated": "2023-04-03 05:55",
                            "dep_estimated_utc": "2023-04-03 09:55",
                            "dep_actual": "2023-04-03 05:55",
                            "dep_actual_utc": "2023-04-03 09:55",
                            "arr_iata": "CDG",
                            "arr_icao": "KCLT",
                            "arr_time": "2023-04-03 08:05",
                            "arr_time_utc": "2023-04-03 12:05",
                            "arr_estimated": "2023-04-03 07:55",
                            "arr_estimated_utc": "2023-04-03 11:55",
                            "status": "active",
                            "lat": 50.65,
                            "lng": 67.98,
                            "dir": 200
                        }
                    ]
                })
            )}
        return res(
            ctx.json({})
        )
    })
]


const server = setupServer(...handlers);

beforeAll(()=>{
    server.listen();
});
afterEach(()=>{
});
afterAll(()=>{
    server.close()
});

const renderComponentWithProvider = ()=>{
    render(
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter >
    );
}

test('renders main page title', () => {
   renderComponentWithProvider()
   const chooseAirportEl = screen.getByText(/choose airport/i)
   expect(chooseAirportEl).toBeInTheDocument();
});

test('renders list of the airports from the config file', () => {
    renderComponentWithProvider();
    const links = screen.getAllByRole(/link/i)
    expect(links.length).toEqual(airportsData.length*2)
})
test('renders two flights in the arrivals and two in the departures', async()=>{
    renderComponentWithProvider()
    const user = userEvent.setup()
    await user.click(screen.getAllByText(/Paris Charles de Gaulle Airport/i)[0])

    const arrivalTitle = await screen.findByText(/arrivals/i)
    expect(arrivalTitle).toBeInTheDocument()


    const departures = await screen.findAllByRole(/depFlightRow/i)
    const arrives = await screen.findAllByRole(/arrFlightRow/i)
    expect(departures.length).toBe(2)
    expect(arrives.length).toBe(2)
})
test('renders icons location for active flight', async()=>{
    renderComponentWithProvider()
    const user = userEvent.setup()
    await user.click(screen.getAllByText(/Paris Charles de Gaulle Airport/i)[0])

    const mapIcons = await screen.findAllByTestId(/AddLocationIcon/i)
    expect(mapIcons.length).toBe(2)

})
