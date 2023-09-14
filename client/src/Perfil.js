import React from 'react';
import './Perfil.css';

function Perfil() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src="link-para-sua-imagem-de-perfil.jpg"
            alt="Imagem de Perfil"
            className="avatar-image"
          />
        </div>
        <div className="profile-info">
          <h2>Nome</h2>
          <p>Email: email@example.com</p>
          <p>Idade: 25 anos</p>
          <p>Sexo: Masculino</p>
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
  );
}

export default Perfil;