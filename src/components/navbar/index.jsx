import React from 'react'
import logo from "../../assets/icon.png"
import { VscDebugRestart } from "react-icons/vsc";
import "./style.css"


const Navbar = ({refresh,isDisabled}) => {
  return (
    <div className='navbar'>
        <div className='logo'>
            <img src={logo} alt="logo" />
            <span>Spider</span>
        </div>
        <div className='btns'>
            <button disabled={isDisabled} onClick={refresh}>
                Actualizar
                <VscDebugRestart/>
            </button>

        </div>
    </div>
  )
}

export default Navbar