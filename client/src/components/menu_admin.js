import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../HomeAdmin.css'
import logo from '../imgs/iconE.png'
import nomeLogo from '../imgs/nome-logo.png'
import buttonArrow from '../imgs/chevron-right-solid.svg'

const MenuAdmin = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const menuItems = [
      { path: '/homeAdmin', name: 'Dashboard' },
      { path: '/AdminLocais', name: 'Editar Locais' },
      { path: '/pagina3', name: 'Página 3' },
      // Adicione mais itens conforme necessário
    ];

  return (
    <div className={`sidebar_container ${isSidebarOpen ? 'open' : ''}`}> {/*TIRAR O SEGUNDO OPEN PARA FECHAR A SIDEBAR*/}
      <button className="toggle_button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar_admin ${isSidebarOpen ? 'open' : 'closed'}`}>
        <ul>
            <li className='logo_sidebar'>
              <img src={logo}></img>
            </li>
            <img className='nome_logo_sidebar' src={nomeLogo}></img>
            <div className="divider_sidebar" />
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className={`link_sidebar ${location.pathname === item.path ? 'active' : ''}`}>
                {item.name}
                <img src={buttonArrow}></img>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuAdmin;
