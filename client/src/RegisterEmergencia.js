import './App.css';
import axios from "axios"
import { useState } from "react"
import SmallHeader from './components/small_header';
import { useNavigate } from "react-router-dom";

function RegisterEmergencia() {

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  }) 

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations 
    const url = process.env.REACT_APP_API_URL;
    axiosInstance
      .post(`${url}/emergency`, { nome, logo, numero})
      .then(response => {
        console.log(response)
        alert("Dados de emergencia registrados com sucesso!");
        // Handle response
      })
  }


  const [nome, setNome] = useState('')
  const [logo, setlogo] = useState('')
  const [numero, setnumero] = useState('')


  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Verifica se o usuário é um administrador

  if (!isAdmin) {
    // Se o usuário não for um administrador, redirecionar para outra página
    navigate("/"); // Redireciona para a página inicial
    return null; // Evita a renderização da página atual
  }

  return (
    <div>
      <SmallHeader/>
      <div className='div_register_Emergencia'>
        <div className='form_container'>
        <form action="" id="login" method="post" onSubmit={handleSubmit}>
          <h1>REGISTRAR Emergencia</h1>
          <p className="item">
            <label for="nome"> Nome </label><br/>
            <input
              name="nome"
              id="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </p>

          <p className="item">
            <label for="logo"> logo </label><br/>
            <input
              name="logo"
              id="logo"
              value={logo}
              onChange={e => setlogo(e.target.value)}
              required
            />
          </p>

          <p className="item">
            <label for="numero"> numero </label><br/>
            <input
              name="numero"
              id="numero"
              value={numero}
              onChange={e => setnumero(e.target.value)}
              required
            />
          </p>

          <p className="item">
            <input type="submit" value="Registrar" />
          </p>
        </form>
        </div>
      </div>
    </div>

    
  
  )
}

export default RegisterEmergencia

