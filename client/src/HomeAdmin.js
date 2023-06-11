import './App.css';
import React from "react"
//import Routes from "./Routes";

function HomeAdmin() {


  return (

    <div>
        <h1>Ola administrador</h1>
      <div>
        <a href="http://localhost:3000/Pontos">Acesse os pontos turisticos</a>
      </div>
      <div>
        <a href="http://localhost:3000/Faq">Acesse as perguntas frequentes</a>
      </div>
      <div>
        <a href="http://localhost:3000/Emergencia">Acesse os numeros de emergencia</a>
      </div>
      <div>
        <a href="http://localhost:3000/RegisterLocal">Cadastre novos locais</a>
      </div>
      <div>
        <a href="http://localhost:3000/UpdateDeleteLocal">Atualize ou Exclua locais</a>
      </div>
      <div>
        <a href="http://localhost:3000/Register">Cadastre novos usuarios</a>
      </div>
      <div>
        <a href="http://localhost:3000/UpdateDeleteUsuario">Atualize ou Exclua usuarios</a>
      </div>
    </div>

  )
}

export default HomeAdmin

