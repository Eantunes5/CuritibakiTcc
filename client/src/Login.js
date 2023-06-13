import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
  });

  const navigate = useNavigate(); // Hook useNavigate para redirecionamento

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/auth", { email, senha })
      .then((response) => {
        console.log(response);
        const token = response.data.token; // Extrair o token de autenticação da resposta
        const userId = response.data.id;
        // Armazenar o token no local storage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);

        // Redirecionar para a página "Home"
        navigate("/HomeAdmin");
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
    <div>
      <form action="" id="login" method="post" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p className="item">
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p className="item">
          <label htmlFor="password"> Password </label>
          <input
            type="password"
            name="password"
            id="password"
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p className="item">
          <input type="submit" value="Login" />
        </p>
      </form>
      <a href="http://localhost:3000/Home">Não quer criar um login? Entre sem login por esse link</a>
      <br></br>
      <a href="http://localhost:3000/Register">Não tem uma conta? Crie aqui</a>
    </div>
  );
}

export default Login;
