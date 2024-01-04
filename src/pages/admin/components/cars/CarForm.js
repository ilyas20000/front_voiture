import styles from './CarForm.module.scss';
import { useForm } from 'react-hook-form';
import Header from '../../../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

function CarForm() {
  const navigate = useNavigate();

  const defaultValues = {
    marque: '',
    matricule: '',
    model: '',
    image: null,
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

      const formData = new FormData();
      formData.append('marque', data.marque);
      formData.append('matricule', data.matricule);
      formData.append('model', data.model);
      formData.append('image', data.image[0]);

      const response = await fetch("http://localhost:8082/SERVICE-VOITURE/voitures/add", {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        reset(defaultValues);
        navigate('/home');

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
          encType="multipart/form-data"
        >
          <h2 className="mb-20">Ajouter une voiture</h2>
          <div className="d-flex flex-column mb-20">
            <label>marque de la voiture</label>
            <input {...register('marque')} type="text" />
            {errors.marque && <p className="form-error">{errors.marque.message}</p>}
          </div>
          <div className="d-flex flex-column mb-20">
            <label>matricule pour la voiture</label>
            <input {...register('matricule')} type="text" />
            {errors.matricule && <p className="form-error">{errors.matricule.message}</p>}
          </div>
          <div className="d-flex flex-column mb-20">
            <label>model pour la voiture</label>
            <input {...register('model')} type="text" />
            {errors.model && <p className="form-error">{errors.model.message}</p>}
          </div>
          <div className="d-flex flex-column mb-20">
            <label>image pour la voiture</label>
            <input {...register('image')} type="file" />
            {errors.image && <p className="form-error">{errors.image.message}</p>}
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

export default CarForm;
