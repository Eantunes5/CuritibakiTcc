import '../App.css'
import React from "react";

import userIcon from '../imgs/user-solid.svg'
import logoutIcon from '../imgs/logout-solid.svg'
import { Link, useNavigate } from 'react-router-dom';

function Header(){

    const handleLogout = () => {
        // Limpar o token de autenticação armazenado
        localStorage.removeItem("token");
        
        // Limpar o userId e o adm armazenados
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
      
        // Redirecionar para a página de login
        navigate("/");
      };

    const isUserLoggedIn = !!localStorage.getItem("token");
    const navigate = useNavigate();

    return(
        <div id="div_header">
            {isUserLoggedIn && (
            <div>
              <button onClick={handleLogout} id='button_logout' title='Logout'>
                <img className='icon_buttons' src={logoutIcon} alt=''/>
              </button>
            </div>
            )}
            {!isUserLoggedIn && (
            <Link to='/login'>
                <button id='button_login' title='Fazer Login'>
                    <img className='icon_buttons' src={userIcon} alt=''/>
                </button>
            </Link>
            )}
        </div>
    )
}

export default Header;