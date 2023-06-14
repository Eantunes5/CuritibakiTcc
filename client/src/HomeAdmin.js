import React from "react";
import { useNavigate } from "react-router-dom";

function HomeAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpar o token de autenticação armazenado
    localStorage.removeItem("token");
    
    // Limpar o userId e o adm armazenados
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  
    // Redirecionar para a página de login
    navigate("/");
  };

  const isUserLoggedIn = !!localStorage.getItem("token"); // Verifica se o token está presente

  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Verifica se o usuário é um administrador

  if (!isAdmin) {
    // Se o usuário não for um administrador, redirecionar para outra página
    navigate("/"); // Redireciona para a página inicial
    return null; // Evita a renderização da página atual
  }

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
        <a href="http://localhost:3000/Emergencia">
          Acesse os números de emergência
        </a>
      </div>
      {isUserLoggedIn && (
        <div>
          <a href="http://localhost:3000/RegisterLocal">
            Cadastre novos locais
          </a>
        </div>
      )}
      {isUserLoggedIn && (
        <div>
          <a href="http://localhost:3000/UpdateDeleteLocal">
            Atualize ou Exclua locais
          </a>
        </div>
      )}
      {isUserLoggedIn && (
        <div>
          <a href="http://localhost:3000/Register">
            Cadastre novos usuários
          </a>
        </div>
      )}
      {isUserLoggedIn && (
        <div>
          <a href="http://localhost:3000/UpdateDeleteUsuario">
            Atualize ou Exclua usuários
          </a>
        </div>
      )}
      {isUserLoggedIn && (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default HomeAdmin;
