import React from 'react'
import style from '../styles/modules/title.module.scss'

const PageTiltle = ({children}) => {
  return (
    <p className={style.title}>{children}</p>
  )
}

export default PageTiltle