import React from 'react'
import styles from './Loading.module.scss'

export default function Loading() {
  return (
    <div className="d-flex flex-row  justify-content-center align-item-center flex-fill" >
      <i className={`fa-solid fa-spinner  ${styles.spinner}`}></i>
    </div>
  )
}
