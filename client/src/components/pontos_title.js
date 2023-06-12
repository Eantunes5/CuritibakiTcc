import '../App.css'
import React from "react";

import PointerLeft from '../imgs/iconE.png'
import { Link } from 'react-router-dom';

function PontosTitle(text){
    return(
        <div className='div_separator'>
            <img className='icon_left' src={PointerLeft} alt=''/>
            {text.text}
            <img className='icon_right' src={PointerLeft} alt=''/>
        </div>
    )
}

export default PontosTitle;