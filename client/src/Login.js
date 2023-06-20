import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./components/logo";

function Login() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

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

  const navigate = useNavigate(); // Hook useNavigate para redirecionamento

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
    .post("/auth", { email, senha })
    .then(async (response) => {
      console.log(response);
      const token = response.data.token;
      const userId = response.data.id;
  
      // Armazenar o token no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
  
      try {
        // Buscar os dados do usuário com base no userId
        const userResponse = await axiosInstance.get(`/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const userData = userResponse.data;
  
        // Verificar o atributo "adm" do usuário e armazenar no localStorage
        const isAdmin = userData.adm;
        localStorage.setItem("isAdmin", isAdmin);
  
        // Redirecionar para a página correta com base no atributo "adm"
        if (isAdmin) {
          navigate("/homeAdmin");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    })
      .catch((error) => {
        if (error.response) {
          // O servidor respondeu com um status de erro (por exemplo, 400, 401, 500, etc.)
          console.error(error.response.data); // Exibe a mensagem de erro do servidor
          console.error(error.response.status); // Exibe o status de erro do servidor
        } else if (error.request) {
          // A solicitação foi feita, mas não houve resposta do servidor
          console.error(error.request); // Exibe o objeto de solicitação
        } else {
          // Ocorreu um erro durante a configuração da solicitação
          console.error("Erro:", error.message); // Exibe a mensagem de erro
        }
      });
  };

  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");

  return (
    <div id='page_login'>
      <Logo/>
      <div className="div_container_login_info">
        <div className="form_container">
          <form action='' id='login' method='' onSubmit={handleSubmit}>
            <h1>Login</h1>
            <br/><br/>
            <span className="legenda">EMAIL:</span>
            <br/>
            <input
              className="inp_login"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <span className="legenda">SENHA:</span>
            <br/>
            <input
              className="inp_login"
              type="password"
              name="password"
              id="password"
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br/><br/>
            <input type="submit" value="Login" className='btn_submit'/>
            <br/><br/>
            <Link to='/Register'>
              <span className="to_register">Não tem uma conta? Clique aqui!</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

/*
<form action="" id="login" method="post" onSubmit={handleSubmit}>
        <h1>Registrar</h1>
        <p className="item">
          <label for="nome"> Nome </label>
          <input
            type="nome"
            name="nome"
            id="nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </p>
        <p className="item">
          <label for="email"> Email </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </p>
        <p className="item">
          <label for="password"> Password </label>
          <input
            type="password"
            name="password"
            id="password"
            value={senha}
            onChange={e => setPassword(e.target.value)}
          />
        </p>
        <p className="item">
          <input type="submit" value="Registrar" />
        </p>
      </form>
      {isLoggedIn && (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
*/