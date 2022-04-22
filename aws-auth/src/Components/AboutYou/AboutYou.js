import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AboutYou.module.css'

const AboutYou = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lan) => {
    i18n.changeLanguage(lan)
  } 

  return (
    <div className={styles.body}>
      <div className={styles.container}>
      <button onClick={() => {changeLanguage("fr")}}>French</button>
      <button onClick={() => {changeLanguage("en")}}>English</button>
        <h1>{t('Welcome to React')}</h1>
      </div>
    </div>
  )
}

export default AboutYou
