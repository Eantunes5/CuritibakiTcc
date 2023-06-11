import './App.css';
import axios from "axios"
import { useState } from "react"

function RegisterLocal() {

  const axiosInstance = axios.create({
    baseURL:"http://localhost:3001"
  }) 

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations 
    axiosInstance
      .post("http://localhost:3001/locals", { nome, slug, tipo, sobre, horarios, ingressos, endereco, foto, iframe })
      .then(response => {
        console.log(response)
        // Handle response
      })
  }
  const [nome, setNome] = useState('')
  const [slug, setSlug] = useState('')
  const [tipo, setTipo] = useState('')
  const [sobre, setSobre] = useState('')
  const [horarios, setHorarios] = useState('')
  const [ingressos, setIngressos] = useState('')
  const [endereco, setEndereco] = useState('')
  const [foto, setFoto] = useState('')
  const [iframe, setIframe] = useState('')

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
        <h1>Registrar local</h1>

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
          <label for="slug"> Slug </label>
          <input
            type="slug"
            name="slug"
            id="slug"
            value={slug}
            onChange={e => setSlug(e.target.value)}
          />
        </p>

        <p className="item">
          <label for="tipo"> Tipo </label>
          <input
            type="tipo"
            name="tipo"
            id="tipo"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
          />
        </p>

        <p className="item">
          <label for="sobre"> Sobre </label>
          <input
            type="sobre"
            name="sobre"
            id="sobre"
            value={sobre}
            onChange={e => setSobre(e.target.value)}
          />
        </p>

        <p className="item">
          <label for="horarios"> Horarios </label>
          <input
            type="horarios"
            name="horarios"
            id="horarios"
            value={horarios}
            onChange={e => setHorarios(e.target.value)}
          />
        </p>

        <p className="item">
          <label for="ingressos"> Ingressos </label>
          <input
            type="ingressos"
            name="ingressos"
            id="ingressos"
            value={ingressos}
            onChange={e => setIngressos(e.target.value)}
          />
        </p>

        <p className="item">
          <label for="endereco"> Endereco </label>
          <input
            type="endereco"
            name="endereco"
            id="endereco"
            value={endereco}
            onChange={e => setEndereco(e.target.value)}
          />
        </p>

        <p className="item">
          <label for="foto"> Foto </label>
          <input
            type="foto"
            name="foto"
            id="foto"
            value={foto}
            onChange={e => setFoto(e.target.value)}
          />
        </p>

        <p className="item">
          <label for="iframe"> Iframe </label>
          <input
            type="iframe"
            name="iframe"
            id="iframe"
            value={iframe}
            onChange={e => setIframe(e.target.value)}
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

export default RegisterLocal

