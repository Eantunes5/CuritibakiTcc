import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';

function CardsPontos({ tipo, locais }) {
  return (
    <div className='div_container_card'>
      {locais.map((item, i) => {
        if (item.nome.length > 20) {
          var font_size = { fontSize: '25px' };
        }
        if (tipo === 'todos' || tipo === item.tipo) {
          return (
            <div className="card" key={item._id}>
              <Link to={`Local/${item._id}`} className='card_content'>
                <img src={item.foto} alt={item.nome}></img>
                <p className='card_text' style={font_size}>{item.nome}</p>
              </Link>
            </div>
          );
        }
        return null; // Não retornar nada se não corresponder ao tipo
      })}
    </div>
  );
}

export default CardsPontos;
