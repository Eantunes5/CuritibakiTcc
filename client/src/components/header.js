import '../App.css'
import React from "react";

import userIcon from '../imgs/user-solid.svg'
import { Link } from 'react-router-dom';

function Header(){
    return(
        <div id="div_header">
            <Link to='/login'>
                <button id='button_login' title='Fazer Login'>
                    <img className='icon_buttons' src={userIcon} alt=''/>
                </button>
            </Link>
        </div>
    )
}

export default Header;