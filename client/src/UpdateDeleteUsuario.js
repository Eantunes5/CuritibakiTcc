import './App.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import SmallHeader from './components/small_header';


function UpdateDeleteUsuario() {
  const navigate = useNavigate();

  const [users, setUser] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [_id, setId]=useState(null) 

  useEffect(() => {
    getUsers();
  }, [])

  function getUsers() {
    fetch("http://localhost:3001/user").then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp)
        setNome(resp[0].nome)
        setEmail(resp[0].email)
        setId(resp[0]._id)
      })
    })
  }

  function deleteUser(_id) {
    fetch(`http://localhost:3001/user/${_id}`, {
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
        setId(item._id)
  }

  function updateUser()
  {
    let item={nome,email}
    console.warn("item",item)
    fetch(`http://localhost:3001/user/${_id}`, {
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
      <div className='colored_background_opacity container_selector_admin'>
        <label>
          <span>Nome</span>
          <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}} /> 
        </label>
        <label>
          <span>Email</span>
          <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        </label>
        <div style={{width: '100%', textAlign: 'center'}}>
          <button className='att_local btn_submit' onClick={updateUser} >Update User</button>  
        </div>
      </div>
      <div style={{marginLeft: '5%', width: '90%', height: 'fit-content', display: 'flex', justifyContent: 'center'}}>
        <table className='table_admin'>
          <thead>
            <tr>
              <td colSpan={2}>Operations</td>
              <td>Indice</td>
              <td>ID</td>
              <td>Nome</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {
              users.map((item, i) =>
                <tr key={i}>
                  <td><button className='att_local btn_submit' onClick={() => deleteUser(item._id)}>Delete</button></td>
                  <td><button className='att_local btn_submit' onClick={() => selectUser(i)}>Select</button></td>
                  <td>{i}</td>
                  <td>{item._id}</td>
                  <td>{item.nome}</td>
                  <td>{item.email}</td>

                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UpdateDeleteUsuario;