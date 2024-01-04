import React, { useState } from 'react';
import styles from './Client.module.scss';

function CarSelectionPopup({ setShowPopup,client, cars, onSelect, onClose }) {
  const [selectedCarId, setSelectedCarId] = useState();

  const handleSubmitAffectation = async () => {
    try {
      const data = new URLSearchParams();
      data.append('id_client', client);
      data.append('id_voiture', selectedCarId);

      const response = await fetch(`http://localhost:8082/SERVICE-CLIENT/clients/allouer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });
  
      if (response.ok) {
        console.log('Car allocation successful');
        // Perform any additional actions if needed
        setShowPopup(false)
      } else {
        console.error('Car allocation failed');
        // Handle the error or show a message to the user
        console.log(client)
        console.log(selectedCarId)

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className={styles.popup}>
      <h2>Select a Car</h2>
      <select className={styles.dropdown} onChange={(e) => setSelectedCarId(e.target.value)}>
        <option value="" disabled>Select a car</option>
        {cars.map((car) => (
          <option key={car.id} value={car.id}>
            {car.marque} - {car.matricule}
          </option>
        ))}
      </select>
      <button onClick={handleSubmitAffectation}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default CarSelectionPopup;
