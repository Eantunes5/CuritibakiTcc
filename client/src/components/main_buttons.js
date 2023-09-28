import React from "react";
import { Link } from 'react-router-dom';
import './main_button.css'

function MainButton(ativo){
    return (
        <div className='main-buttons'>
            <Link to='/pontos'>
            <button className={`button-option ${ativo.ativo=='pontos' ? 'button-on' : 'button-off'}`}>
                Pontos Turisticos
            </button>
            </Link>
            <Link to='/emergencia'>
            <button className={`button-option ${ativo.ativo=='emergencia' ? 'button-on' : 'button-off'}`}>
                Emergências
            </button>
            </Link>
            <Link to='/faq'>
            <button className={`button-option ${ativo.ativo=='faq' ? 'button-on' : 'button-off'}`}>
                Perguntas Frequentes
            </button>
            </Link>
        </div>
        );
    };

export default MainButton;