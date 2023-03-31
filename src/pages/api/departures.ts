import axios from "axios";

interface Departure {
  name: string;
  stop: string;
  time: string;
  category: string;
  operator: string;
}

const cache = new Map();
const BASE_URL = 'https://transport.opendata.ch/v1/stationboard';

export async function getDepartures(station: string): Promise<Departure[]> {
    if (cache.has(station)) {
        return cache.get(station);
    }

    const { data } = await axios.get(`${BASE_URL}?station=${station}&type=departure&transportations=train&limit=10`);
    
    const departures = data.stationboard.map((departure: any) => ({
        number: departure.number,
        time: departure.stop.departure,
        to: departure.to,
    }));

    cache.set(station, departures);

    return departures;
};
