import React, { useState } from 'react'
import Register from './pages/authentification/Register'
import styles from "./App.module.scss"

export default function Application() {
    
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
     
    {/* <Header setPage={setPage} />
    {page === 'homepage' && <HomePage />}
    {/* {page === 'admin' && <Admin />} */}
    {/* <Footer/>   */}
    <Register />
  
  </div>
  )
}
