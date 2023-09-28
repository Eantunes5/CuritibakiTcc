import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';
import Header from './components/header';
import defaultIcon from './imgs/user-solid.svg';


function Perfil() {

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [idadeUsuario, setidadeUsuario] = useState('');
  const [sexoUsuario, setSexoUsuario] = useState('');


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
    
        setNomeUsuario(data.nome); // Armazene o nome do usuário no estado
        setEmailUsuario(data.email);
        setidadeUsuario(data.idade);
        setSexoUsuario(data.sexo)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

    fetchUsuario();
  }, []);
  return (
    <div>
      <Header/>
      <div style={{height: '75px'}}></div>
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
              <li>Favoritos 1</li>
              <li>Favoritos 2</li>
              <li>Favoritos 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;