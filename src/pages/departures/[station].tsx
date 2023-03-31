import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDepartures } from "../api/departures";

interface Departure {
  to: string;
  time: string;
}

interface Props {
  departures: Departure[];
}

const Departures: React.FC<Props> = ({ departures }) => {
  const router = useRouter();
  const { station } = router.query;
  const [filteredDepartures, setFilteredDepartures] = useState(departures);

  useEffect(() => {
    setFilteredDepartures(departures);
  }, [departures]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = departures.filter((departure) =>
      departure.to.toLowerCase().includes(value)
    );
    setFilteredDepartures(filtered);
  };

  return (
    <div>
      <h1>Departures from {station}</h1>
      <input type="text" onChange={handleFilter} placeholder="Filter by destination" />
      <ul>
        {filteredDepartures.map((departure, index) => (
          <li key={index}>
            <span>{departure.time.toLocaleString()}</span> - <span>{departure.to}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


export const getStaticPaths = async() => ({
    paths: [
      { params: { station: "basel" } },
      { params: { station: "geneva" } },
    ],
    fallback: false,
});

export const getStaticProps = async ({ params }) => {
  const departures = await getDepartures(params.station);
  return {
    props: {
      departures,
    },
    revalidate: 60,
  };
}

export default Departures;
