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
        <br></br>
        <PontosTitle text='TELEFONES ÚTEIS'/>
        <div className='div_container_cards_emergencia'>
          
          <CardEmergencia 
            nome='SAMU' 
            numero='192' 
            url_img='https://www.true.com.br/wp-content/uploads/2022/05/Ativo-5-300x300.png'
            />
          <CardEmergencia 
            nome='Corpo de bombeiros' 
            numero='193' 
            url_img='https://upload.wikimedia.org/wikipedia/commons/5/5e/Brasao_bombeiros_parana_decada_90.png'
            />
          <CardEmergencia 
            nome='Polícia militar' 
            numero='190' 
            url_img='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Logo_PMPR_2.svg/1200px-Logo_PMPR_2.svg.png'
            />
          <CardEmergencia 
            nome='polícia civil' 
            numero='197' 
            url_img='https://upload.wikimedia.org/wikipedia/commons/2/2d/Logo_policia_civil.gif'
            />
          <CardEmergencia 
            nome='polícia rodovíaria' 
            numero='191' 
            url_img='https://logodownload.org/wp-content/uploads/2016/10/policia-rodoviaria-logo-1-1.png'
            />
            <CardEmergencia 
            nome='Defesa cívil' 
            numero='199' 
            url_img='https://cdn-icons-png.flaticon.com/512/126/126341.png'
            />
        </div>
      </div>
    </div>
  )
}

export default Emergencia
