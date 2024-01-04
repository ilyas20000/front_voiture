import React from 'react'
import styles from "./Footer.module.scss"

 function Footer() {
  return (
    <footer className={`${styles.footer} mr-5 d-flex flex-row aligh-items-center justify-content-center p-20`}>
      <p>Copyright © 2022 Cookchef Dyma, Inc.</p>
    </footer>
  )
}
export default Footer;