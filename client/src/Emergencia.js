import './App.css';
import React from "react"
import SmallHeader from './components/small_header';
import SelectButtons from './components/select_page';
import PontosTitle from './components/pontos_title';
import CardEmergencia from './components/cards_emergencia';
//import Routes from "./Routes";

function Emergencia() {

  return (
    <div>
      <SmallHeader/>
      <SelectButtons page='emergencia'/>
      <div className='div_container_cards_pontos'>
        <PontosTitle text='TELEFONES ÚTEIS'/>
        <div className='div_container_cards_emergencia'>
          
          <CardEmergencia 
            nome='SAMU' 
            numero='192' 
            url_img='https://www.true.com.br/wp-content/uploads/2022/05/Ativo-5-300x300.png'
            />
          <CardEmergencia 
            nome='corpo de bombeiros' 
            numero='193' 
            url_img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Logo_PMPR_2.svg/1200px-Logo_PMPR_2.svg.png'
            />
          <CardEmergencia 
            nome='polícia militar' 
            numero='190' 
            url_img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Logo_PMPR_2.svg/1200px-Logo_PMPR_2.svg.png'
            />
          <CardEmergencia 
            nome='polícia militar' 
            numero='190' 
            url_img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Logo_PMPR_2.svg/1200px-Logo_PMPR_2.svg.png'
            />
          <CardEmergencia 
            nome='polícia militar' 
            numero='190' 
            url_img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Logo_PMPR_2.svg/1200px-Logo_PMPR_2.svg.png'
            />
          <CardEmergencia 
            nome='polícia militar' 
            numero='190' 
            url_img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Logo_PMPR_2.svg/1200px-Logo_PMPR_2.svg.png'
            />
        </div>
      </div>
    </div>
  )
}

export default Emergencia
