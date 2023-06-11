import './App.css';
import React from "react"
//import Routes from "./Routes";

function Faq() {

  function handleLogout() {
    // Limpar o token do local storage
    localStorage.removeItem("token");

    // Redirecionar para a página de login
    window.location.href = "http://localhost:3000/";
  }

  const isLoggedIn = !!localStorage.getItem("token"); // Verificar se o usuário está logado

  return (

    <div>
      <div>
        <p>Pergunta 1</p>
      </div>
      <div>
        <p>Pergunta 2</p>
      </div>
      <div>
        <p>Pergunta 3</p>
      </div>
      {isLoggedIn && (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>

  )
}

export default Faq