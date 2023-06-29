import './App.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import SmallHeader from './components/small_header';


function UpdateDeleteUsuario() {
  const navigate = useNavigate();

  const [users, setUser] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [adm, setAdm] = useState(Boolean)
  const [_id, setId]=useState(null) 
  //

  useEffect(() => {
    getUsers();
  }, [])

  function getUsers() {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/user`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp)
        setNome(resp[0].nome)
        setEmail(resp[0].email)
        setAdm(resp[0].adm)
        setId(resp[0]._id)
        //
      })
    })
  }

  function deleteUser(_id) {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/user/${_id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }

  function selectUser(i)
  {

    let item=users[i];
        setNome(item.nome)
        setEmail(item.email)
        setAdm(item.adm)
        setId(item._id)
        //
  }

  function updateUser()
  {
    if (!nome || !email || adm === "") {
      // Verifica se algum campo obrigatório está vazio
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    let item={nome,email,adm}
    const url = process.env.REACT_APP_API_URL;
    console.warn("item",item)
    fetch(`${url}/user/${_id}`, {
      method: 'PATCH',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }

  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Verifica se o usuário é um administrador

  if (!isAdmin) {
    // Se o usuário não for um administrador, redirecionar para outra página
    navigate("/"); // Redireciona para a página inicial
    return null; // Evita a renderização da página atual
  }

  return (
    <div>
      <SmallHeader/>
      <h1 className='card_text'>Update e Delete - Usuario</h1>
      <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
      <div className='colored_background_opacity container_selector_admin'>
        <label>
          <span>Nome</span>
          <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}} required /> 
        </label>
        <label>
          <span>Email</span>
          <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
        </label>
        <label>
          <span>Adm</span>
          <select
              name="adm"
              id="adm"
              value={adm}
              onChange={e => setAdm(e.target.value)}
              required
            >
              <option value="">-Selecione-</option>
              <option value="1">Administrador</option>
              <option value="0">Usuario</option>
            </select>
          
        </label>
        <div style={{width: '100%', textAlign: 'center'}}>
          <button className='att_local btn_submit' onClick={updateUser} >Update User</button>  
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: '850px', height: 'fit-content', display: 'flex', overflowX: 'scroll'}}>
        <table className='table_admin'>
          <thead>
            <tr>
              <td colSpan={2}>Operations</td>
              <td>Nome</td>
              <td>Email</td>
              <td>Adm</td>
              <td>Indice</td>
              <td>ID</td>
              {/*  */}
            </tr>
          </thead>
          <tbody>
            {
              users.map((item, i) =>
                <tr key={i}>
                  <td><button className='att_local btn_submit' onClick={() => deleteUser(item._id)}>Delete</button></td>
                  <td><button className='att_local btn_submit' onClick={() => selectUser(i)}>Select</button></td>
                  <td style={{padding: '0 15px'}}>{item.nome}</td>
                  <td style={{padding: '0 15px'}}>{item.email}</td>
                  <td style={{padding: '0 15px'}}>{item.adm == true ? 'Adm' : 'User'}</td>
                  <td style={{padding: '0 15px'}}>{i}</td>
                  <td style={{padding: '0 15px'}}>{item._id}</td>
                 {/*  */}

                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      </div>
      
    </div>
  );
}
export default UpdateDeleteUsuario;