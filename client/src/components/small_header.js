import '../App.css'
import React from "react";

import userIcon from '../imgs/user-solid.svg'
import logoHeader from '../imgs/logo-escuro.png'
import { Link } from 'react-router-dom';

function SmallHeader(){
    return(
        <div>
            <div id="div_header">
                <div id='div_header_img'>
                    <Link to='/'>
                        <img src={logoHeader}></img>
                    </Link>
                </div>
                <Link to='/login'>
                    <button id='button_login' title='Fazer Login'>
                        <img className='icon_buttons' src={userIcon} alt=''/>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default SmallHeader;