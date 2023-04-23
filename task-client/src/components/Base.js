import React from 'react'
import AppHeader from './AppHeader'
import Lists from './Lists'
import PageTiltle from './PageTiltle'

const Base = () => {
  return (
    <div className="container">
    <PageTiltle>Todo App</PageTiltle>
    <AppHeader></AppHeader>
    <Lists></Lists>
    </div>
  )
}

export default Base