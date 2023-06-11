import './App.css';
import axios from "axios"
import { useState } from "react"

function Register() {

  const axiosInstance = axios.create({
    baseURL:"http://localhost:3001"
  }) 

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations 
    axiosInstance
      .post("http://localhost:3001/user", { nome, email, senha })
      .then(response => {
        console.log(response)
        // Handle response
      })
  }
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setPassword] = useState('')

  function handleLogout() {
    // Limpar o token do local storage
    localStorage.removeItem("token");

    // Redirecionar para a página de login
    window.location.href = "http://localhost:3000/";
  }

  const isLoggedIn = !!localStorage.getItem("token"); // Verificar se o usuário está logado

  return (
    <div>
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
    </div>
  )
}

export default Register

