import './App.css';
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Logo from "./components/logo";

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
        console.log(response.statusText)
        if(response.statusText == 'Created'){
          alert('Registro realizado com sucesso!')
          navigate("/login");
        }
        // Handle response
      })
  }
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setPassword] = useState('')
  const navigate = useNavigate();

  return (
    <div id='page_register'>
      <Logo/>
      <div className="div_container_login_info">
        <div className="form_container">
          <form action='' id='login' method='' onSubmit={handleSubmit}>
            <h1>Registrar</h1>
            <br/><br/>
            <span className="legenda">NOME:</span>
            <br/>
            <input
              className="inp_login"
              type="nome"
              name="nome"
              id="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
            <br/>
            <span className="legenda">EMAIL:</span>
            <br/>
            <input
              className="inp_login"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
            />
            <br/><br/>
            <input type="submit" value="Registrar" className='btn_submit'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;

