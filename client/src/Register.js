import './App.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./components/logo";

function Register() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001"
  });

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    // Verifica se o email já está em uso
    axiosInstance
      .get(`http://localhost:3001/user?email=${email}`)
      .then(response => {
        if (response.data.length > 0) {
          alert('Este email já está em uso. Por favor, escolha outro email.');
        } else {
          // Realiza o registro se o email estiver disponível
          axiosInstance
            .post("http://localhost:3001/user", { nome, email, senha })
            .then(response => {
              console.log(response.statusText);
              if (response.statusText === 'Created') {
                alert('Registro realizado com sucesso!');
                navigate("/login");
              }
            })
            .catch(error => {
              console.error(error);
              // Trate o erro de registro aqui, se necessário
            });
        }
      })
      .catch(error => {
        console.error(error);
        // Trate o erro de verificação de email aqui, se necessário
      });
  };

  return (
    <div id='page_register'>
      <Logo/>
      <div className="div_container_login_info">
        <div className="form_container">
          <form id='login' onSubmit={handleSubmit}>
            <h1>Registrar</h1>
            <br/><br/>
            <span className="legenda">NOME:</span>
            <br/>
            <input
              className="inp_login"
              type="text"
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
  );
}

export default Register;