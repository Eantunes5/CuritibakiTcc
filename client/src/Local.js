import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Local() {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [sobre, setSobre] = useState('');
    const [horarios, setHorarios] = useState('');
    const [ingressos, setIngressos] = useState('');
    const [endereco, setEndereco] = useState('');
    const [foto, setFoto] = useState('');
  
    const { id } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/locals/${id}`);
          const data = response.data;
  
          setNome(data.nome);
          setTipo(data.tipo);
          setSobre(data.sobre);
          setHorarios(data.horarios);
          setIngressos(data.ingressos);
          setEndereco(data.endereco);
          setFoto(data.foto);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }, [id]);
  
    return (
      <div>
        <h1>{nome}</h1>
        <p>Tipo: {tipo}</p>
        <p>Sobre: {sobre}</p>
        <p>Horários: {horarios}</p>
        <p>Ingressos: {ingressos}</p>
        <p>Endereço: {endereco}</p>
        <img src={foto} alt="Foto do local" />
      </div>
    );
  }
  
  export default Local;