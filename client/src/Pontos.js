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
    fetch("http://localhost:3001/locals").then((result) => {
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
          <CardsPontos tipo='Parque'/>
        <PontosTitle text='SHOPPINGS'/>
          <CardsPontos tipo='Shopping'/>
      </div>
    </div>
  );
}

export default Pontos;

/*
{users.map((item, i) => (
        <div class="row">
          <div class="card">
            <h2>{item.nome}</h2>
            <p>{item.foto}</p>
            <img src={`${item.foto}`} alt="" />
            <a href={`http://localhost:3000/Local/${item._id}`}>Acessar</a>
          </div>
        </div>
      ))}
*/