import './App.css';
import axios from "axios"
import { useState } from "react"
import SmallHeader from './components/small_header';
import { useNavigate } from "react-router-dom";

function RegisterLocal() {

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
      .post(`${url}/locals`, { nome, slug, tipo, sobre, horarios, ingressos, endereco, foto, iframe })
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
        <form action="" id="login" method="post" onSubmit={handleSubmit}>
          <h1>REGISTRAR LOCAL</h1>
          <p className="item">
            <label for="nome"> Nome </label><br/>
            <input
              type="nome"
              name="nome"
              id="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </p>

          <p className="item">
            <label for="slug"> Slug </label><br/>
            <input
              type="slug"
              name="slug"
              id="slug"
              value={slug}
              onChange={e => setSlug(e.target.value)}
            />
          </p>

          <p className="item">
            <label for="tipo"> Tipo </label><br/>
            <input
              type="tipo"
              name="tipo"
              id="tipo"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            />
          </p>

          <p className="item">
            <label for="sobre"> Sobre </label><br/>
            <input
              type="sobre"
              name="sobre"
              id="sobre"
              value={sobre}
              onChange={e => setSobre(e.target.value)}
            />
          </p>

          <p className="item">
            <label for="horarios"> Horarios </label><br/>
            <input
              type="horarios"
              name="horarios"
              id="horarios"
              value={horarios}
              onChange={e => setHorarios(e.target.value)}
            />
          </p>

          <p className="item">
            <label for="ingressos"> Ingressos </label><br/>
            <input
              type="ingressos"
              name="ingressos"
              id="ingressos"
              value={ingressos}
              onChange={e => setIngressos(e.target.value)}
            />
          </p>

          <p className="item">
            <label for="endereco"> Endereco </label><br/>
            <input
              type="endereco"
              name="endereco"
              id="endereco"
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
            />
          </p>

          <p className="item">
            <label for="foto"> Foto </label><br/>
            <input
              type="foto"
              name="foto"
              id="foto"
              value={foto}
              onChange={e => setFoto(e.target.value)}
            />
          </p>

          <p className="item">
            <label for="iframe"> Iframe </label><br/>
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
        </div>
      </div>
    </div>

    
  
  )
}

export default RegisterLocal

