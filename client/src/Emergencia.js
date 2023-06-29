import './App.css';
import React, { useEffect, useState } from 'react';
import SmallHeader from './components/small_header';
import SelectButtons from './components/select_page';
import PontosTitle from './components/pontos_title';
import CardEmergencia from './components/cards_emergencia';

function Emergencia() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/emergency`).then((result) => {
      result.json().then((resp) => {
        setUsers(resp);
      });
    });
  }

  return (
    <div>
      <SmallHeader/>
      <SelectButtons page='emergencia'/>
      <div className='div_container_cards_pontos'>
        <br></br>
        <PontosTitle text='TELEFONES ÚTEIS'/>
        <div className='div_container_cards_emergencia'>
        {users.map((user) => (

            <CardEmergencia
              nome={user.nome}
              numero={user.numero}
              url_img={user.logo}
              />
              
          ))}
        </div>
      </div>
    </div>
  )
}

export default Emergencia;
