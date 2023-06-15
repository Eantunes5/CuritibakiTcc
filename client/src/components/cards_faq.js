import '../App.css'
import React from "react";


function CardFaq(pergunta, resposta){
    return(
        <div className='card_faq'>
            <p className='card_text'>{pergunta.pergunta}</p>
            <p className='card_text ' style={{fontSize : '20px', lineHeight: '25px', color: '#f0f0f0', textTransform: 'none'}}>{pergunta.resposta}</p>
        </div>
    )
}

export default CardFaq;