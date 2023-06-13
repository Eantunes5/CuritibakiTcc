import './App.css';
import React from "react"
import Header from './components/header';

import Logo from './components/logo';
import { Link } from 'react-router-dom';
import PontosImg from './imgs/curitiba1.png'
import HospitalImg from './imgs/hospital.jpg'
import FaqImg from './imgs/faq.jpg'
//import Routes from "./Routes";

function App() {

  return (
    <div>
      <Header/>
      <Logo/>
      <div className='div_container_card_menu'>
        <Link to='/Pontos'>
          <div className='div_child_card_menu' title='Pontos Turisticos'>
            <img src={PontosImg} alt='' />
            <div className='text_center'>PONTOS TURISTICOS</div>
          </div>
        </Link>
        <Link to='/Emergencia'>
          <div className='div_child_card_menu' title='Números de Emergência'>
            <img src={HospitalImg} alt='' />
            <div className='text_center'>EMERGÊNCIA</div>
          </div>
        </Link>
        <Link to='/Faq'>
          <div className='div_child_card_menu' title='FAQ'>
            <img src={FaqImg} alt='' />
            <div className='text_center'>PERGUNTAS FREQUENTES</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default App

