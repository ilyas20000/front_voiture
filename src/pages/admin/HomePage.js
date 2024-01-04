import { useState, useEffect } from 'react';
import styles from './HomePage.module.scss';
import Loading from '../../components/Loading/Loading';
import Search from './components/search/Search';
import Car from './components/cars/Car';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [cars, setCars] = useState([]);

  useEffect(() => {
    let cancel = false;

    async function fetchCars() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8082/SERVICE-VOITURE/voitures/all"); 
        if (response.ok && !cancel) {
          const newCars = await response.json();
          setCars(newCars);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      <Header />
      <div className="flex-fill container d-flex flex-column p-20">
        <h1 className="my-30">
          ALL CARS <small className={styles.small}>- {cars.length}</small>
        </h1>
        <Link className='btn btn-primary mb-20 ml-800 mr-40 justify-content' to={"/carForm"} > Ajouter voiture </Link>

        <div
          className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
        >
          <Search setFilter={setFilter} /> 
          {isLoading && !cars.length ? (
            <Loading />
          ) : (
            <div className={styles.grid}>
              {cars
                .filter((r) => r.marque.toLowerCase().startsWith(filter))
                .map((r) => (
                  <Car key={r.id} car={r} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
