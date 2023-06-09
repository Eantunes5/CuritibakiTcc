import './App.css';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./components/logo";
import alertIcon from './imgs/circle-exclamation-solid.svg'

function Register() {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [confirmarSenha, setConfirmarPassword] = useState('');
  //
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    var alert_div = document.getElementsByClassName('div_alert_error')[0];
    var alert_text = document.getElementsByClassName('text_alert')[0];
    if (email !== confirmarEmail) {
      alert_div.style = 'display: flex'
      alert_text.innerHTML = 'OS EMAILS DEVEM SER IGUAIS'
      return;
    }

    if (senha !== confirmarSenha) {
      alert_div.style = 'display: flex'
      alert_text.innerHTML = 'AS SENHAS DEVEM SER IGUAIS'
      return;
    }

    // Verifica se o email já está em uso
    var alert_div = document.getElementsByClassName('div_alert_error')[0];
    var alert_text = document.getElementsByClassName('text_alert')[0];

    const url = process.env.REACT_APP_API_URL;
    axiosInstance
    .get(`${url}/user?email=${email}`)
    .then(response => {
      if (response.data.error) {
        alert(response.data.error);
      } else if (response.data.emailExists) {
        alert('Este email já está em uso. Por favor, escolha outro email.');
      } else {
        // Realiza o registro se o email estiver disponível
        axiosInstance
          .post(`${url}/user`, { nome, email, senha })//
          .then(response => {
            console.log(response.statusText);
            if (response.statusText === 'Created') {
              alert('Registro realizado com sucesso!');
              navigate("/login");
            }
          })
          .catch(error => {
            console.error(error.response);
            console.error(error.response.data);
            alert_div.style = 'display: flex'
            alert_text.innerHTML = 'EMAIL JÁ REGISTRADO'
            //alert("Cadastro Incorreto")
            // Trate o erro de registro aqui, se necessário
          });
      }
    })
    .catch(error => {
      console.error(error);
      alert("Cadastro Incorreto")
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

            <div className="div_alert_error">
              <img className="icons_alert" src={alertIcon}/>
              <div className="text_alert"></div>
              <img className="icons_alert" src={alertIcon}/>
            </div>

            <br/><br/>
            {/*  */}
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a> NOME:</span>
            <br/>
            <input
              className="inp_login"
              type="text"
              name="nome"
              id="nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
            <br/>
            {/*  */}
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a> EMAIL:</span>
            <br/>
            <input
              className="inp_login"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <br/>
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a> CONFIRMAR EMAIL:</span>
            <br/>
            <input
              className="inp_login"
              type="email"
              name="email"
              id="email_conf"
              value={confirmarEmail}
              onChange={e => setConfirmarEmail(e.target.value)}
              required
            />
            <br/>
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a> SENHA:</span>
            <br/>
            <input
              className="inp_login"
              type="password"
              name="password"
              id="password"
              value={senha}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <br/>
            <span className="legenda"><a style={{color: '#ff4747'}}>*</a> CONFIRMAR SENHA:</span>
            <br/>
            <input
              className="inp_login"
              type="password"
              name="password"
              id="password_conf"
              value={confirmarSenha}
              onChange={e => setConfirmarPassword(e.target.value)}
              required
            />
            <br/><br/>
            <input type="submit" value="Registrar" className='btn_submit'/>
            <br/><br/>
            <Link to='/Login'>
              <span className="to_register">Já tem uma conta? Clique aqui!</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;