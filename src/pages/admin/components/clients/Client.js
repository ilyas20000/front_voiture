import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../../components/Header/Header';
import styles from './Client.module.scss';
import CarSelectionPopup from './CarSelectionPopUp';

function Client() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to manage pop-up visibility
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null); // New state to store the selected car
  const[client_id,setClient_id] = useState()

  async function handleClickDelete(id) {
    try {
      const response = await fetch(`http://localhost:8082/SERVICE-CLIENT/clients/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Refresh the client list or perform any other necessary actions
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }



  

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

  const handleAffecterVoitureClick = (c) => {
    // Show the pop-up
    setShowPopup(true);
    setClient_id(c)
  };

  const handleCarSelect = (carId) => {
    // Handle the selected car
    const selectedCar = cars.find((car) => car.id === carId);
    setSelectedCar(selectedCar);
  };

  const handleCarPopupClose = () => {
    // Close the pop-up
    setShowPopup(false);
  };

  useEffect(() => {
    let cancel = false;

    async function fetchClients() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8082/SERVICE-CLIENT/clients/all");
        if (response.ok && !cancel) {
          const newClients = await response.json();
          setClients(newClients);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }

    fetchClients();
    return () => {
      cancel = true;
    };
  }, [clients]);

  return (
    <>
      <Header />
      <div className='flex-fill container d-flex flex-column p-20'>
        <Link className='btn btn-primary mb-20 ml-800 mr-40 justify-content' to={"/clientForm"}> Ajouter client </Link>

        <div className={`card flex-fill d-flex flex-column p-20 mb-20 my_30 ${styles.table_container}`}>
          {clients.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>First Name</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Action</th>
                  <th>Action 1</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id}>
                    <td>{c.nom}</td>
                    <td>{c.prenom}</td>
                    <td>{c.age}</td>
                    <td>{c.phone}</td>
                    <td>
                      <button onClick={() => handleClickDelete(c.id)}>Delete</button>
                    </td>
                    <td>
                      <button onClick={()=> handleAffecterVoitureClick(c.id)}>Affecter voiture</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1>NO DATA</h1>
          )}
        </div>
      </div>

      {showPopup && (
        // Use the CarSelectionPopup component
        <CarSelectionPopup
          cars={cars}
          onSelect={handleCarSelect}
          onClose={handleCarPopupClose}
          client={client_id}
          setShowPopup={setShowPopup}
        />
      )}

      
    </>
  );
}

export default Client;
