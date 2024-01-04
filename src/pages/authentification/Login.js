import React, { useState } from 'react'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';

export default function Login() {
    const navigate = useNavigate();
    const[user , setUser] = useState({})
    

    const defaultValues = {
        email: '',
        passsword: '',
       
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
          const response = await fetch("http://localhost:8082/api/v1/auth/authenticate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          if (response.ok) {
            reset(defaultValues);
            setUser(response)
            console.log(user)
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
       
      };


    
    return (
        <div className={`d-flex flex-column align-items-center   ${styles.loginContainer}`}>
            <form onSubmit={handleSubmit(submit)} className={styles.loginForm}>
                <h2>Login</h2>
                <label htmlFor="email">email:</label>
                <input  {...register('email')} type="text" id="email" name="email" required />
                <label htmlFor="password">Password:</label>
                <input  {...register('password')} type="password" id="password" name="password" required />
                <button disabled={isSubmitting} className='btn btn-primary' type="submit">Login</button>
            </form>
           <Link to={"/register"} > <button className='btn btn-primary' >Register</button> </Link>
        </div>
    )
}
