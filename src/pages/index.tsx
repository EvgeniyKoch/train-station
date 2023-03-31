import Head from 'next/head';
import Link from 'next/link';

const Home: React.FC = () => (
    <>
      <Head>
        <title>Train Departures</title>
        <meta name="description" content="Train Departures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Train Departures</h1>
        <ul>
          <li>
            <Link href="/departures/basel">
              Basel
            </Link>
          </li>
          <li>
            <Link href="/departures/geneva">
              Geneva
            </Link>
          </li>
        </ul>
      </div>
    </>
);

export default Home;
