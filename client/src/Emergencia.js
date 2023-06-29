import React, { useEffect, useState } from 'react';

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
      {users.map((user) => (
        <div key={user._id}>
          <h2>{user.nome}</h2>
          <img src={user.logo} alt={user.nome} />
          <p>{user.numero}</p>
        </div>
      ))}
    </div>
  );
}

export default Emergencia;
