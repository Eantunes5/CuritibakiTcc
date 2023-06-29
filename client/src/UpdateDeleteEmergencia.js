import './App.css';
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import SmallHeader from './components/small_header';


function UpdateDeleteEmergencia() {
  const [users, setUser] = useState([])
  const [nome, setNome] = useState('')
  const [logo, setlogo] = useState('')
  const [numero, setnumero] = useState('')
  const [_id, setId]=useState(null) 

  useEffect(() => {
    getUsers();
  }, [])

  const navigate = useNavigate();

  function getUsers() {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/emergency`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp)
        setNome(resp[0].nome)
        setlogo(resp[0].logo)
        setnumero(resp[0].numero)
        setId(resp[0]._id)
      })
    })
  }

  function deleteUser(_id) {
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/emergency/${_id}`, {
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
        setlogo(item.logo)
        setnumero(item.numero)
        setId(item._id)
  }

  function updateUser()
  {
    let item={nome,logo,numero}
    const url = process.env.REACT_APP_API_URL;
    console.warn("item",item)
    fetch(`${url}/emergency/${_id}`, {
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

  const fileInputRef = useRef(null);

  function convertToBase64(e) {
    const file = e.target.files[0];

    var reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result); //base64 string
      setlogo(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };

    reader.readAsDataURL(file);
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
      <h1 className='card_text'>Update e Delete - Emergencia </h1>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center',justifyContent: 'center', flexDirection: 'row'}}>
        <div className='colored_background_opacity container_selector_admin'>
          <label>
            <span>Nome</span>
            <input 
            type="text" 
            value={nome} 
            onChange={(e)=>{setNome(e.target.value)}} 
            required
            /> 
          </label>
          <label>
            <span>Foto</span>
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
          </label>
          <label>
            <span>Número</span>
            <input 
            type="number" 
            value={numero} 
            max={999}
            onChange={(e)=>{setnumero(e.target.value)}} /> 
          </label>
          <div style={{width: '100%', textAlign: 'center'}}>
            <button className='att_local btn_submit' onClick={updateUser} >Atualizar</button>  
          </div>
        </div>
        <div style={{width: '100%', height: '500px', overflowX: 'scroll', overflowY: 'scroll'}}>
        <table className='table_admin'>
          <thead>
            <tr>
              <td colSpan={2}>Operations</td>
              <td>Nome</td>
              <td>Indice</td>
              <td>ID</td>
              <td>logo</td>
              <td>numero</td>
            </tr>
          </thead>
          <tbody style={{marginTop: '10px'}}> 
            {
              users.map((item, i) =>
              
                <tr key={i}>
                  <td><button className='att_local btn_submit' onClick={() => deleteUser(item._id)}>Delete</button></td>
                  <td><button className='att_local btn_submit' onClick={() => selectUser(i)}>Select</button></td>
                  <td style={{padding: '0 15px'}}>{item.nome}</td>
                  <td style={{padding: '0 15px'}}>{i}</td>
                  <td style={{padding: '0 15px'}}>{item._id}</td>
                  <td style={{padding: '0 15px'}}><div className='td_sobre td_break'>{item.logo}</div></td>
                  <td style={{padding: '0 15px'}}>{item.numero}</td>
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
export default UpdateDeleteEmergencia;