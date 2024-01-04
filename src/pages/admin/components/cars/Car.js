// import { useContext } from 'react';
// import { ApiContext } from '../../../../context/ApiContext';
import styles from './Car.module.scss';

function Car({ car: { marque, matricule, model, image,id } }) {
//const BASE_URL_API = useContext(ApiContext);

async function handleClickDelete(e) {
  e.stopPropagation();
  try {
    const response = await fetch(`http://localhost:8082/SERVICE-VOITURE/voitures/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      // console.log("deleted successfull")
      window.location.reload();
    }
  } catch (e) {
    console.log('Erreur');
  }
}

  return (
    <div  className={styles.car}>
      <i onClick={handleClickDelete}  className="fa-solid fa-xmark"></i>
      <div className={styles.imageContainer}>
        <img src={image} alt={matricule} />
      </div>
      <div
        className={`${styles.carTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{marque}</h3>
        <i className={`fa-solid fa `}>{model}</i>
      </div>
    </div>
  );
}

export default Car;