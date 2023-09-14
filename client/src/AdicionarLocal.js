import React, { useState } from 'react';
import './AdicionarLocal.css'; // Importe o arquivo CSS de estilo

function AdicionarLocal() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [foto, setFoto] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui, você pode enviar os dados para o administrador ou realizar outras ações necessárias
    console.log('Dados enviados:', { nome, endereco, foto, descricao });
    // Limpar os campos após o envio
    setNome('');
    setEndereco('');
    setFoto('');
    setDescricao('');
  };

  return (
    <div className="adicionar-local-container">
      <h2>Adicionar um Novo Local</h2>
      <form onSubmit={handleSubmit} className="adicionar-local-form">
        <div className="form-group">
          <label htmlFor="nome">Nome do Local:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="foto">Foto:</label>
          <input
            type="file"
            id="foto"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default AdicionarLocal;