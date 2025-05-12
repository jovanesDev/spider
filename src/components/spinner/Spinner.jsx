import React from 'react'
import img from "../../assets/icon.png"
import "./style.css"

export default function Spinner() {
  return (
    <div className='spinnerContainer'>
        <img src={img} className='spinner' alt='spinner' />
        <span>Espere...</span>
    </div>
  )
}
