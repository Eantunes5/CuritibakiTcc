import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';
import Header from './components/header';
import defaultIcon from './imgs/user-solid.svg';
import { Link } from 'react-router-dom'; // Importe o componente Link

function Perfil() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [idadeUsuario, setIdadeUsuario] = useState('');
  const [sexoUsuario, setSexoUsuario] = useState('');
  const [favoritos, setFavoritos] = useState([]); // Novo estado para a lista de favoritos
  const [favoritosDetalhes, setFavoritosDetalhes] = useState([]); // Novo estado para os detalhes dos locais favoritos


  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('Usuário não logado');
          return;
        }

        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/user/${userId}`);
        const data = response.data;

        setNomeUsuario(data.nome);
        setEmailUsuario(data.email);
        setIdadeUsuario(data.idade);
        setSexoUsuario(data.sexo);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchFavoritos = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('Usuário não logado');
          return;
        }

        const url = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${url}/user/${userId}`);

        if (response.data && response.data.favoritos) {
          setFavoritos(response.data.favoritos);
          // Para cada local favorito, obtenha seus detalhes
          const detalhesPromises = response.data.favoritos.map(async (localId) => {
            const localResponse = await axios.get(`${url}/locals/${localId}`);
            return localResponse.data;
          });
          // Aguarde todas as solicitações para obter detalhes dos locais favoritos
          const detalhesLocais = await Promise.all(detalhesPromises);
          setFavoritosDetalhes(detalhesLocais);
        }
      } catch (error) {
        console.error('Error fetching favoritos:', error);
      }
    };

    fetchUsuario();
    fetchFavoritos();
  }, []);

  const navigateToLocal = (localId) => {
    // Crie a URL apropriada para a página do local
    const localUrl = `localhost:3000/pontos/Local/${localId}`;

    // Use o componente Link para navegar para a página do local
    return (
      <Link to={localUrl}>
      </Link>
    );
  };

  return (
    <div>
      <Header />
      <div style={{ height: '75px' }}></div>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src={defaultIcon}
              alt="Imagem de Perfil"
              className="avatar-image"
            />
          </div>
          <div className="profile-info">
            <h2>{nomeUsuario}</h2>
            <p>Email: {emailUsuario}</p>
            <p>Idade: {idadeUsuario} anos</p>
            <p>Sexo: {sexoUsuario}</p>
          </div>
        </div>
        <div className="profile-sections">
          <div className="profile-section">
            <h3>Conquistas</h3>
            <ul>
              <li>Conquista 1</li>
              <li>Conquista 2</li>
              <li>Conquista 3</li>
            </ul>
          </div>
          <div className="profile-section">
            <h3>Favoritos</h3>
            <ul>
              {favoritosDetalhes.map((local, index) => (
                <li key={local._id}>
                  {/* Use o componente Link para fazer a imagem clicável */}
                  <Link to={`/pontos/Local/${local._id}`}>
                    <img src={local.foto} alt={`Local ${local.nome}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
