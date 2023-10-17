import React, { useEffect, useState } from 'react';
import Header from './components/header';
import logo from './imgs/logo-escuro.png'
import ImageCarousel from './components/carrossel';
import MainButton from './components/main_buttons';


import Logo from './components/logo';
import SelectButtons from './components/select_page';
import PontosTitle from './components/pontos_title';
import CardsPontos from './components/cards_pontos';
import SmallHeader from './components/small_header';

function Pontos() {
  const [users, setUser] = useState([]);
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');
  const [_id, setId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocais, setFilteredLocais] = useState([]);

  const [tipo, setTipo] = useState('')

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

  useEffect(() => {
    const filteredLocais = users.filter((local) =>
      local.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocais(filteredLocais);
  }, [searchTerm, users]);

  // Remova a chamada getUsers() desta função
  const handleSearch = () => {
    console.log('Botão de pesquisa clicado');
  };

  return (
    <div className="App">
      <Header/>
      <div className="logo-central-carousel">
        <img src={logo}></img>
        VENHA CONHECER CURITIBA!
      <MainButton ativo="pontos"/>
      </div>
      <ImageCarousel/>

      

      <div className="div_container_cards_pontos">
        <div className='divider'></div>
        <div className='sidebar-filters-search'>
          <div>
            <label for="tipo">Tipo do Local</label><br/>
            <select
              style={{cursor: 'pointer'}}
              name="tipo"
              id="tipo"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              required
            >
              <option value="">Todos</option>
              <option value="ponto">Ponto</option>
              <option value="parque">Parque</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>
          <div>
            {/* Barra de pesquisa */}
            <input
              type="text"
              placeholder="Pesquisar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /> <br></br>
            {/* Botão de pesquisa */}
            <button onClick={handleSearch}>Procurar</button>
          </div>
        </div>
        
        
        <PontosTitle text="PONTOS TURISTICOS" />
        <CardsPontos tipo="ponto" locais={filteredLocais} />
        <PontosTitle text="PARQUES" />
        <CardsPontos tipo="parque" locais={filteredLocais} />
        <PontosTitle text="SHOPPINGS" />
        <CardsPontos tipo="shopping" locais={filteredLocais} />
      </div>
    </div>
  );
}

export default Pontos;
