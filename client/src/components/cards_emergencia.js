import '../App.css'
import React from "react";


function CardEmergencia(nome, numero, url_img){
    return(
        <div className='card_emergencia'>
            <div className='card_emergencia_img'>
                <img src={nome.url_img}/>
            </div>
            <p className='card_text'>{nome.numero}</p>
            <p className='card_text' style={{fontSize : '25px'}}>{nome.nome}</p>
        </div>
    )
}

export default CardEmergencia;