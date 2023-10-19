import React, { useEffect, useState } from 'react';
import Header from './components/header';
import logo from './imgs/logo-escuro.png';
import ImageCarousel from './components/carrossel';
import MainButton from './components/main_buttons';
import Logo from './components/logo';
import SelectButtons from './components/select_page';
import PontosTitle from './components/pontos_title';
import CardsPontos from './components/cards_pontos';
import SmallHeader from './components/small_header';

function Pontos() {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipo, setTipo] = useState('todos');

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const url = process.env.REACT_APP_API_URL;
      const response = await fetch(`${url}/locals`);
      const data = await response.json();
      setUsers(data);
      setOriginalUsers(data); // Salvar uma cópia dos locais originais
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
    }
  }

  const handleSearch = () => {
    searchLocaisByName();
  };

  const searchLocaisByName = async () => {
    try {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm) {
        const filteredLocais = originalUsers.filter((local) =>
          local.nome.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
        );
        setUsers(filteredLocais);
      } else {
        // Se a barra de pesquisa estiver vazia, restaurar a lista original
        setUsers(originalUsers);
      }
    } catch (error) {
      console.error('Erro ao buscar locais por nome:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="logo-central-carousel">
        <img src={logo} alt="logo" />
        VENHA CONHECER CURITIBA!
        <MainButton ativo="pontos" />
      </div>
      <ImageCarousel />

      <div className="div_container_cards_pontos">
        <div className="divider" />
        <div className="sidebar-filters-search">
          <div>
            <label htmlFor="tipo">Tipo do Local</label>
            <br />
            <select
              style={{ cursor: 'pointer' }}
              name="tipo"
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="todos">Todos</option>
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
            />{' '}
            <br />
            {/* Botão de pesquisa */}
            <button onClick={handleSearch}>Procurar</button>
          </div>
        </div>

        <PontosTitle text={tipo === 'ponto' ? 'PONTOS TURISTICOS' : tipo === 'parque' ? 'PARQUES' : 'SHOPPINGS'} />
        <CardsPontos tipo={tipo} locais={users} />
      </div>
    </div>
  );
}

export default Pontos;
