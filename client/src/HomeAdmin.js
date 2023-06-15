import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallHeader from "./components/small_header";

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
      <SmallHeader/>
      <div className='div_register_local'>
        <div className='form_container'>
        <form action="" id="login" method="post" className="admin_container">
          <h1>ADMINISTRADOR</h1>
          <Link to='/pontos'>
            <button className="buttons_admin">Pontos</button>
          </Link>
          <Link to='/faq'>
            <button className="buttons_admin">Faq</button>
          </Link>
          <Link to='/emergencia'>
            <button className="buttons_admin">Emergencia</button>
          </Link>
          <Link to='/registerlocal'>
            <button className="buttons_admin">Registrar Locais</button>
          </Link>
          <Link to='/UpdateDeleteLocal'>
            <button className="buttons_admin">Atualizar Locais</button>
          </Link>
          <Link to='/register'>
            <button className="buttons_admin">Registrar Usuarios</button>
          </Link>
          <Link to='/UpdateDeleteUsuario'>
            <button className="buttons_admin">Atualizar Usuarios</button>
          </Link>
          
        </form>

      </div>
    </div>
    </div>
  );
}

export default HomeAdmin;
