import '../App.css'
import React, { useEffect, useState }from "react";

import { Link } from 'react-router-dom';



function CardsPontos(tipo){
    const [users, setUser] = useState([]);
    // eslint-disable-next-line
    const [nome, setNome] = useState('');
    // eslint-disable-next-line
    const [foto, setFoto] = useState('');
    // eslint-disable-next-line
    const [_id, setId] = useState(null);
  
    useEffect(() => {
      getUsers();
    }, []);
  
    function getUsers() {
      const url = process.env.REACT_APP_API_URL;
      fetch(`${url}/locals`).then((result) => {
        result.json().then((resp) => {
          setUser(resp);
          setNome(resp[0].nome);
          setFoto(resp[0].foto);
          setId(resp[0]._id);
        });
      });
    }  
    return(
        <div className='div_container_card'>
        {users.map((item, i) => {
            if(item.nome.length > 20){
              var font_size = {fontSize : '25px'};
            }
            if(item.tipo == tipo.tipo){
              return(
                <div className="card">
                  <Link to={`Local/${item._id}`} className='card_content'>
                    <img src={`${item.foto}`} alt=''></img>
                    <p className='card_text' style={font_size}>{item.nome}</p>
                  </Link>
                </div>
              )
            }
        })}          
      </div>
    )
}

export default CardsPontos;