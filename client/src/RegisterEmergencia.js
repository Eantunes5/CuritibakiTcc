import './App.css';
import axios from "axios"
import { useState, useRef } from "react"
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
      setlogo(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };

    reader.readAsDataURL(file);
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
          <h1>REGISTRAR EMERGÊNCIA</h1>
          <p className="item">
            <label for="nome"><a style={{color: '#ff4747'}}>*</a> Nome </label><br/>
            <input
              name="nome"
              id="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </p>

          <p className="item">
            <label for="logo"><a style={{color: '#ff4747'}}>*</a> Imagem </label><br/>
            <input
              type="file"
              accept='image/*'
              name="foto"
              id="foto"
              ref={fileInputRef}
              style={{border: 'none', color: 'white'}}
              onChange={convertToBase64}
              required
            />
          </p>

          <p className="item">
            <label for="numero"><a style={{color: '#ff4747'}}>*</a> Número </label><br/>
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

