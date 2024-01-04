// RegisterForm.js
import React, { useContext } from 'react';
import styles from './Register.module.scss';
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';


export default function Register(setPage){
  const navigate = useNavigate();
  const page = useContext("page")

  const defaultValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };


  const {
    formState: {  isSubmitting },
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
  });

  async function submit(values){
    
    try {
      clearErrors();
      const response = await fetch("http://localhost:8082/api/v1/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        reset(defaultValues);
        navigate('/login');
        

      } else {
        setError('generic', {
          type: 'generic',
          message: 'Il y a eu une erreur',
        });
      }
    } catch (e) {
      setError('generic', { type: 'generic', message: 'Il y a eu une erreur' });
    }
   
  };

  return (
    <div className={`  ${styles.register_form_container}`}>
   
      <form onSubmit={handleSubmit(submit)}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            {...register('firstname')}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            {...register('lastname')}

          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            {...register('email')}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            {...register('password')}
          />
        </label>

        <button disabled={isSubmitting} >Register</button>
      </form>
    </div>
  );
};


