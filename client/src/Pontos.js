import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Logo from './components/logo';
import SelectButtons from './components/select_page';
import PontosTitle from './components/pontos_title';
import CardsPontos from './components/cards_pontos';
import SmallHeader from './components/small_header';

function Pontos() {
  // eslint-disable-next-line
  const [users, setUser] = useState([]);
  // eslint-disable-next-line
  const [nome, setNome] = useState('');
  // eslint-disable-next-line
  const [foto, setFoto] = useState('');
  // eslint-disable-next-line
  const [_id, setId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/locals`).then((result) => {
      result.json().then((resp) => {
        setUser(resp);
        setNome(resp[0].nome);
        setFoto(resp[0].foto);
        setId(resp[0]._id);
      });
    });
  }

  return (
    <div className="App">
      <SmallHeader/>
      <SelectButtons page='pontos'/>
      <div className='div_container_cards_pontos'>
        <PontosTitle text='PONTOS TURISTICOS'/>
          <CardsPontos tipo='ponto'/>
        <PontosTitle text='PARQUES'/>
          <CardsPontos tipo='parque'/>
        <PontosTitle text='SHOPPINGS'/>
          <CardsPontos tipo='shopping'/>
      </div>
    </div>
  );
}

export default Pontos;