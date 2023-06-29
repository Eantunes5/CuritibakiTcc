import './App.css';
import React, { useEffect, useState, useRef } from 'react'
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
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/locals`).then((result) => {
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
    const url = process.env.REACT_APP_API_URL;
    fetch(`${url}/locals/${_id}`, {
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
    const url = process.env.REACT_APP_API_URL;
    console.warn("item",item)
    fetch(`${url}/locals/${_id}`, {
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
      <div className='container_update_table'>
        <div className='colored_background_opacity container_selector_admin'>
          <label>
            <span>Nome</span><br></br>
            <input
                type="nome"
                name="nome"
                id="nome"
                value={nome}
                onChange={handleChangeNome}
                required
              /></label>
          <label>
            <span>Slug</span><br></br>
            <input
                style={{cursor: 'text', color: 'white'}}
                disabled
                type="slug"
                name="slug"
                id="slug"
                value={slug}
                readOnly
              /> 
          </label>
          <label>
            <span>Tipo</span><br></br>
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
          </label>
          <label>
            <span>Foto</span><br></br>
            <input 
              type="file"
              accept='image/*'
              name="foto"
              id="foto"
              ref={fileInputRef}
              style={{border: 'none', color: 'white', cursor: 'pointer'}}
              onChange={convertToBase64}
              required
            /> 
          </label>
          <label>
            <span>Sobre</span><br></br>
            <textarea
                type="sobre"
                name="sobre"
                id="sobre"
                value={sobre}
                onChange={e => setSobre(e.target.value)}
                required
              />
          </label>
          <label>
            <span >Horários</span> <br></br>
            <textarea
                type="horarios"
                name="horarios"
                id="horarios"
                value={horarios}
                onChange={e => setHorarios(e.target.value)}
                required
              />
          </label>
          <label>
            <span>Ingressos</span><br></br>
            <textarea
                type="ingressos"
                name="ingressos"
                id="ingressos"
                value={ingressos}
                onChange={e => setIngressos(e.target.value)}
                required
              />
          </label>
          <label>
            <span>Endereços</span><br></br>
            <textarea 
              type="text" 
              name="endereco"
              id="endereco"
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Iframe</span>
            <input 
              type="iframe"
              name="iframe"
              id="iframe"
              value={iframe}
              onChange={e => setIframe(cleanIframeString(e.target.value))}
              required
            /> 
          </label>
          <div style={{width: '100%', textAlign: 'center'}}>
            <button className='att_local btn_submit' onClick={updateUser} >Update Local</button>  
          </div>
        </div>
        <div className='table_container'>
          <table className='table_admin'>
            <thead>
              <tr>
                <td colSpan={2} className='td_head_buttons'>Operations</td>
                <td>Nome</td>
                <td>Slug</td>
                <td>Tipo</td>
                <td>Sobre</td>
                <td>Horarios</td>
                <td>Ingressos</td>
                <td>Endereco</td>
                <td>Foto</td>
                <td>Iframe</td>
                <td>Indice</td>
                <td>ID</td>
              </tr>
            </thead>
            <tbody style={{marginTop: '10px'}}>
              {
                users.map((item, i) =>
                
                  <tr key={i}>
                    <td className='td_button'><button className='att_local btn_submit' onClick={() => deleteUser(item._id)}>Delete</button></td>
                    <td className='td_button'><button className='att_local btn_submit ' onClick={() => selectUser(i)}>Select</button></td>
                    <td className='td_name'>{item.nome}</td>
                    <td className='td_name'>{item.slug}</td>
                    <td>{item.tipo}</td>
                    <td><div className='td_sobre'>{item.sobre}</div></td>
                    <td><div className='td_sobre'>{item.horarios}</div></td>
                    <td><div className='td_sobre'>{item.ingressos}</div></td>
                    <td><div className='td_sobre'>{item.endereco}</div></td>
                    <td><div className='td_sobre td_break'>{item.foto}</div></td>
                    <td><div className='td_sobre td_break'>{item.iframe}</div></td>
                    <td>{i}</td>
                    <td>{item._id}</td>
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
export default UpdateDeleteLocal;