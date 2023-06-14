import './App.css';
import React, { useEffect, useState } from 'react'


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

  return (
    <div className="App">
      <h1>Update e Delete </h1>
      <table border="1" style={{ float: 'left' }}>
        <tbody>
          <tr>
            <td>Indice</td>
            <td>ID</td>
            <td>Nome</td>
            <td>Slug</td>
            <td>Tipo</td>
            <td>Sobre</td>
            <td>Horarios</td>
            <td>Ingressos</td>
            <td>Endereco</td>
            <td>Foto</td>
            <td>Iframe</td>
            <td>Operations</td>
          </tr>
          {
            users.map((item, i) =>
              <tr key={i}>
                <td>{i}</td>
                <td>{item._id}</td>
                <td>{item.nome}</td>
                <td>{item.slug}</td>
                <td>{item.tipo}</td>
                <td>{item.sobre}</td>
                <td>{item.horarios}</td>
                <td>{item.ingressos}</td>
                <td>{item.endereco}</td>
                <td>{item.foto}</td>
                <td>{item.iframe}</td>
                <td><button onClick={() => deleteUser(item._id)}>Delete</button></td>
                <td><button onClick={() => selectUser(i)}>Select</button></td>

              </tr>
            )
          }
        </tbody>
      </table>
      <div>
        <p>Nome</p>
        <input type="text" value={nome} onChange={(e)=>{setNome(e.target.value)}} /> <br /><br />
        <p>Slug</p>
        <input type="text" value={slug} onChange={(e)=>{setSlug(e.target.value)}} /> <br /><br />
        <p>Tipo</p>
        <input type="text" value={tipo} onChange={(e)=>{setTipo(e.target.value)}} /> <br /><br />
        <p>Sobre</p>
        <input type="text" value={sobre} onChange={(e)=>{setSobre(e.target.value)}} /> <br /><br />
        <p>Horarios</p>
        <input type="text" value={horarios} onChange={(e)=>{setHorarios(e.target.value)}} /> <br /><br />
        <p>Ingressos</p>
        <input type="text" value={ingressos} onChange={(e)=>{setIngressos(e.target.value)}} /> <br /><br />
        <p>Endereco</p>
        <input type="text" value={endereco} onChange={(e)=>{setEndereco(e.target.value)}} /> <br /><br />
        <p>Foto</p>
        <input type="text" value={foto} onChange={(e)=>{setFoto(e.target.value)}} /> <br /><br />
        <p>Iframe</p>
        <input type="text" value={iframe} onChange={(e)=>{setIframe(e.target.value)}} /> <br /><br />
        <button onClick={updateUser} >Update Local</button>  
      </div>
    </div>
  );
}
export default UpdateDeleteLocal;