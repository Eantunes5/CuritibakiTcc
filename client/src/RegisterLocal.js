import './App.css';
import axios from "axios"
import { useRef, useState } from "react"
import SmallHeader from './components/small_header';
import { useNavigate } from "react-router-dom";
import alertIcon from './imgs/circle-exclamation-solid.svg'

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
        alert("Local registrado com sucesso!");
        // Handle response
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert("Insira todos os campos");
        } else {
          console.error(error);
          // Handle other errors
        }
      });
  }

  const handleChangeNome = (event) => {
    const nomeValue = event.target.value;
    const slugValue = nomeValue.toLowerCase().replace(/\s/g, '-')
    setNome(nomeValue);
    setSlug(slugValue);
  }

  const fileInputRef = useRef(null);

  function convertToBase64(e) {
    const file = e.target.files[0];

    var reader = new FileReader();
    reader.onload = () => {
      if (file.size > 80240) {
        alert("A imagem não pode ter mais de 80KB.");
        e.target.value = ""; // Limpa o valor do campo de arquivo
        return;
      }
      console.log(reader.result); //base64 string
      setFoto(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };

    reader.readAsDataURL(file);
  }
  

  function cleanIframeString(string) {
    const regex = /<iframe.*src=["'](.*?)["']/;
    const match = regex.exec(string);
    const cleanedUrl = match ? match[1] : "";
    return cleanedUrl;
  }

  const handleIframeChange = (event) => {
    const cleanedUrl = cleanIframeString(event.target.value);
    setIframe(cleanedUrl);
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
              onChange={handleChangeNome}
              required
            />
          </p>

          <p className="item">
            <label for="slug"> Slug </label><br/>
            <input
              style={{cursor: 'text'}}
              disabled
              type="slug"
              name="slug"
              id="slug"
              value={slug}
              readOnly
            />
          </p>

          <p className="item">
            <label for="tipo"> Tipo </label><br/>
            <select
              style={{cursor: 'pointer'}}
              name="tipo"
              id="tipo"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              required
            >
              <option value="">-Selecione Tipo-</option>
              <option value="pontos">Pontos</option>
              <option value="parque">Parque</option>
              <option value="shopping">Shopping</option>
            </select>
          </p>

          <p className="item">
            <label for="sobre"> Sobre </label><br/>
            <textarea
              type="sobre"
              name="sobre"
              id="sobre"
              value={sobre}
              onChange={e => setSobre(e.target.value)}
              required
            />
          </p>

          <p className="item">
            <label for="horarios"> Horários <img  title='Horários de funcionamento:&#10;"xx:xx às xx:xx"&#10;ou&#10;"Aberto 24 horas"'className="icon_alert_admin" src={alertIcon}/></label><br/>
            <textarea
              type="horarios"
              name="horarios"
              id="horarios"
              value={horarios}
              onChange={e => setHorarios(e.target.value)}
              required
            />
          </p>

          <p className="item">
            <label for="ingressos"> Ingressos <img  title='Caso seja gratuito apenas "Entrada franca"'className="icon_alert_admin" src={alertIcon}/></label><br/>
            <textarea
              type="ingressos"
              name="ingressos"
              id="ingressos"
              value={ingressos}
              onChange={e => setIngressos(e.target.value)}
              required
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
              required
            />
          </p>

          <p className="item">
            <label for="foto"> Foto </label><br/>
            <input
              type="file"
              accept='image/*'
              name="foto"
              id="foto"
              ref={fileInputRef}
              style={{border: 'none'}}
              onChange={convertToBase64}
              required
            />
          </p>

          <p className="item">
            <label for="iframe"> Iframe </label><br/>
            <input
              type="iframe"
              name="iframe"
              id="iframe"
              value={iframe}
              onChange={e => setIframe(cleanIframeString(e.target.value))}
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

export default RegisterLocal
