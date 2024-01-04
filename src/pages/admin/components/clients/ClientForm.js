import styles from './ClientForm.module.scss';
import { useForm } from 'react-hook-form';
import Header from '../../../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

function ClientForm() {
  const navigate = useNavigate();

  const defaultValues = {
    nom: '',
    prenom: '',
    age: 0,
    phone: '',
  };

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
  });

  async function submit(data) {
    try {
      clearErrors();
  
      const response = await fetch("http://localhost:8082/SERVICE-CLIENT/clients/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        reset(defaultValues);
        navigate('/client');
      } else {
        setError('generic', {
          type: 'generic',
          message: 'Il y a eu une erreur',
        });
      }
    } catch (e) {
      setError('generic', { type: 'generic', message: 'Il y a eu une erreur' });
    }
  }
  

  return (
    <>
      <Header />
      <div className="d-flex flex-column flex-fill align-items-center p-20">
        <form
          onSubmit={handleSubmit(submit)}
          className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
        >
          <h2 className="mb-20">Ajouter une voiture</h2>
          <div className="d-flex flex-column mb-20">
            <label>Nom</label>
            <input {...register('nom')} type="text" />
            {errors.nom && <p className="form-error">{errors.nom.message}</p>}
          </div>
          <div className="d-flex flex-column mb-20">
            <label>Prenom</label>
            <input {...register('prenom')} type="text" />
            {errors.prenom && <p className="form-error">{errors.prenom.message}</p>}
          </div>
          <div className="d-flex flex-column mb-20">
            <label>Age</label>
            <input {...register('age')} type="text" />
            {errors.age && <p className="form-error">{errors.age.message}</p>}
          </div>
          <div className="d-flex flex-column mb-20">
            <label>Phone</label>
            <input {...register('phone')} type="text" />
            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          </div>
          {errors.generic && <p className="form-error">{errors.generic.message}</p>}
          <div>
            <button disabled={isSubmitting} className="btn btn-primary">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ClientForm;
