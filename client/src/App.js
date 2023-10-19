import './App.css';
import React from "react"
import Header from './components/header';
import ImageCarouselIndex from './components/carrosselIndex';
import MainButton from './components/main_buttons';
import { useNavigate } from "react-router-dom";

import logo from './imgs/logo-escuro.png'
import icon from './imgs/iconE.png'


import Logo from './components/logo';
import { Link } from 'react-router-dom';
import PontosImg from './imgs/curitiba1.png'
import HospitalImg from './imgs/hospital.jpg'
import FaqImg from './imgs/faq.jpg'
import admIcon from './imgs/user-gear-solid.svg'
//import Routes from "./Routes";

function App() {
  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  const handleLogout = () => {
    // Limpar o token de autenticação armazenado
    localStorage.removeItem("token");
    
    // Limpar o userId e o adm armazenados
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  
    // Redirecionar para a página de login
    navigate("/");
  };

  const isUserLoggedIn = !!localStorage.getItem("token"); // Verifica se o token está presente

  return (
    <div>
      <Header/>
      <div className="logo-central-index">
        <img src={logo}></img>
        VENHA CONHECER CURITIBA!
        <MainButton ativo=""/>
      </div>
      <ImageCarouselIndex/>
      {/* <div className='info-container'>
        <div className='info-title'>
          <div className='info-text-icon'>
            <img src={icon}></img>
            <p>Sobre Curitiba!</p>
          </div>
          <div className='divider'></div>
          <div className='info-content'>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius nibh vitae finibus auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec nec luctus diam. Suspendisse arcu lacus, ullamcorper eget efficitur quis, iaculis et ipsum. Nullam sollicitudin urna et ligula ornare consequat. Aenean ac laoreet mauris, at porttitor arcu. Aliquam erat volutpat. Phasellus non rutrum massa.
            <br></br>
            Sed condimentum, dolor placerat dignissim dignissim, tortor nulla placerat mi, quis dictum lacus eros eget libero. Duis vitae nibh sollicitudin, pellentesque nibh at, lobortis elit. Etiam vitae tellus egestas, ornare felis in, pretium turpis. Proin nec nisl in est efficitur ornare. Sed fringilla ante a orci bibendum finibus. Ut ac ante ex. Sed ornare erat non tincidunt ullamcorper. Phasellus ut mi nulla. Mauris in eros sed massa facilisis sollicitudin nec sit amet ex. Suspendisse potenti. Nam placerat nibh et efficitur blandit.
            <br></br>
            Fusce lobortis sit amet nisl eget gravida. Sed volutpat nec lorem ac volutpat. Morbi quis tellus posuere diam varius rutrum eget id augue. Pellentesque commodo tempor nisl, a molestie nulla mattis vitae. Suspendisse vitae auctor diam. Donec blandit sagittis leo vitae elementum. Integer consequat quam enim, at venenatis sapien volutpat sed. Nulla eu auctor diam. Ut consectetur neque eu pellentesque malesuada. Aliquam pellentesque accumsan eleifend.
            <br></br>
            Maecenas interdum scelerisque quam at euismod. Aliquam molestie gravida purus, a mollis quam venenatis fermentum. Maecenas eget hendrerit lacus, sit amet convallis urna. Vestibulum et eros ligula. Aliquam pellentesque ultricies velit nec tincidunt. Aenean aliquet ultrices sollicitudin. Mauris aliquam diam quis euismod ultricies. Curabitur fringilla lectus nibh, at semper leo dignissim in. Maecenas viverra turpis nec gravida fermentum. Morbi fringilla ultrices tortor et porta. Nullam vel ipsum non neque egestas bibendum ut maximus elit. Maecenas iaculis nisi magna, sed mattis risus faucibus sit amet. Morbi congue feugiat tortor ut posuere. Proin ut sodales neque, sed mattis risus.
            </p>
          </div>
        </div>
      </div>  */}

    </div>
  )
}

export default App

