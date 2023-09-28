import '../App.css'
import React, { useState } from "react";
import './langSelector.css'
import arrow from '../imgs/chevron-down-solid.svg'
import brazilFlag from '../imgs/br.svg'
import usFlag from '../imgs/us.svg'

import { Link } from 'react-router-dom';

function LangSelector(){
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("PT");
    const [selectedFlag, setSelectedFlag] = useState(brazilFlag);

    const languages = [
        { code: "PT", name: "Português", flag: brazilFlag},
        { code: "EN", name: "English", flag: usFlag},
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectLang = (flag, lang) => {
        setSelectedFlag(flag);
        setSelectedLang(lang);
        setIsOpen(false);
    };

    return (
        <div className="lang-selector">
        <div className={`dropdown ${isOpen ? "open" : ""}`}>
            <div className="selected-language" onClick={toggleDropdown}>
                <img src={selectedFlag}></img>
                {selectedLang}
                <img className={`arrow ${isOpen ? "up" : "down"}`} src={arrow}></img>
            </div>
            <ul className="language-list">
            {languages.map((lang) => (
                <li key={lang.code} onClick={() => selectLang(lang.flag, lang.code)}>
                {lang.name}
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
}

export default LangSelector;