import './App.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import SmallHeader from './components/small_header';


function UpdateDeleteLocal() {
  const [users, setUser] = useState([])
  const [nome, setNome] = useState('')
  const [slug, setSlug] = useState('')
  const [tipo, setTipo] = useState('')
  const [sobre, setSobre] = useState('')
  const [horarios, setHorarios] = useState('')
  const [ingressos, setIngressos] = useState('')
  const [endereco, setEndereco] = useState('')
  const [foto, setFoto] = useState('')
  const [iframe, setIframe] = useState('')
  const [_id, setId]=useState(null) 

  useEffect(() => {
    getUsers();
  }, [])

  const navigate = useNavigate();

  function getUsers() {
    fetch("http://localhost:3001/locals").then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp)
        setNome(resp[0].nome)
        setSlug(resp[0].slug)
        setTipo(resp[0].tipo)
        setSobre(resp[0].sobre)
        setHorarios(resp[0].horarios)
        setIngressos(resp[0].ingressos)
        setEndereco(resp[0].endereco)
        setFoto(resp[0].foto)
        setIframe(resp[0].iframe)
        setId(resp[0]._id)
      })
    })
  }

  function deleteUser(_id) {
    fetch(`http://localhost:3001/locals/${_id}`, {
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
        setSlug(item.slug)
        setTipo(item.tipo)
        setSobre(item.sobre)
        setHorarios(item.horarios)
        setIngressos(item.ingressos)
        setEndereco(item.endereco)
        setFoto(item.foto)
        setIframe(item.iframe)
        setId(item._id)
  }

  function updateUser()
  {
    let item={nome,slug,tipo,sobre,horarios,ingressos,endereco,foto,iframe}
    console.warn("item",item)
    fetch(`http://localhost:3001/locals/${_id}`, {
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
      <h1 className='card_text'>Update e Delete - Local </h1>
      <div className='colored_background_opacity container_selector_admin'>
        <label>
          <span>Nome</span>
          <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}} /> 
        </label>
        <label>
          <span>Slug</span>
          <input type="text" value={slug} onChange={(e)=>{setSlug(e.target.value)}} /> 
        </label>
        <label>
          <span>Tipo</span>
          <input type="text" value={tipo} onChange={(e)=>{setTipo(e.target.value)}} /> 
        </label>
        <label>
          <span>Foto</span>
          <input type="text" value={foto} onChange={(e)=>{setFoto(e.target.value)}} /> 
        </label>
        <label className='input_bigger'>
          <span>Sobre</span><br></br>
          <textarea type="text" value={sobre} onChange={(e)=>{setSobre(e.target.value)}} /> 
        </label>
        <label className='input_bigger'>
          <span >Horários</span> <br></br>
          <textarea type="text" value={horarios} onChange={(e)=>{setHorarios(e.target.value)}} /> 
        </label>
        <label className='input_bigger'>
          <span>Ingressos</span><br></br>
          <textarea type="text" value={ingressos} onChange={(e)=>{setIngressos(e.target.value)}} />  
        </label>
        <label className='input_bigger'>
          <span>Endereços</span><br></br>
          <textarea type="text" value={endereco} onChange={(e)=>{setEndereco(e.target.value)}} />
        </label>
        
        <label>
          <span>Iframe</span>
          <input type="text" value={iframe} onChange={(e)=>{setIframe(e.target.value)}} /> 
        </label>
        <div style={{width: '100%', textAlign: 'center'}}>
          <button className='att_local btn_submit' onClick={updateUser} >Update Local</button>  
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
            <td>Slug</td>
            <td>Tipo</td>
            <td>Sobre</td>
            <td>Horarios</td>
            <td>Ingressos</td>
            <td>Endereco</td>
            <td>Foto</td>
            <td>Iframe</td>
          </tr>
        </thead>
        <tbody style={{marginTop: '10px'}}>
          {
            users.map((item, i) =>
            
              <tr key={i}>
                <td><button className='att_local btn_submit' onClick={() => deleteUser(item._id)}>Delete</button></td>
                <td><button className='att_local btn_submit' onClick={() => selectUser(i)}>Select</button></td>
                <td>{item.nome}</td>
                <td>{i}</td>
                <td>{item._id}</td>
                <td>{item.slug}</td>
                <td>{item.tipo}</td>
                <td>{item.sobre}</td>
                <td>{item.horarios}</td>
                <td>{item.ingressos}</td>
                <td>{item.endereco}</td>
                <td>{item.foto}</td>
                <td>{item.iframe}</td>
                

              </tr>
            )
          }
        </tbody>
      </table>
      </div>
      
      
    </div>
  );
}
export default UpdateDeleteLocal;