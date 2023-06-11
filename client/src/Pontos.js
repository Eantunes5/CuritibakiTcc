import React, { useEffect, useState } from 'react';

function Pontos() {
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

  function handleLogout() {
    // Limpar o token do local storage
    localStorage.removeItem("token");

    // Redirecionar para a página de login
    window.location.href = "http://localhost:3000/";
  }

  const isLoggedIn = !!localStorage.getItem("token"); // Verificar se o usuário está logado

  return (
    <div className="App">
      <h1>Pontos turisticos</h1>
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
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}

export default Pontos;
