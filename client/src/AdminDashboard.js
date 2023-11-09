import React, { useEffect, useRef } from 'react';

import { Link, useNavigate } from "react-router-dom";
import RegisterLocal from "./RegisterLocal";
import MenuAdmin from "./components/menu_admin";

const {tableau} = window;

function AdminDashboard(){
  const navigate = useNavigate();
  const ref = useRef(null);
  const url =  "https://public.tableau.com/views/Analytics_16995312670400/Painel1?:language=pt-BR&publish=yes&:display_count=n&:origin=viz_share_link";

  useEffect(() => {
    const vizUrl = url;
    const vizContainer = document.getElementById('vizContainer');
    const options = {
      hideTabs: true,
      width: '100%',
      height: '800px',
      onFirstInteractive: () => {
        console.log('Visualização do Tableau carregada');
      },
    };
    const viz = new window.tableau.Viz(vizContainer, vizUrl, options);

    return () => {
      viz.dispose();
    };
  }, []);

  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Verifica se o usuário é um administrador

  if (!isAdmin) {
    navigate("/"); 
    return null;
  }

  return(
    <div>
      <MenuAdmin/>
      <div id="vizContainer" style={{width: '100%', height: '100%'}}/>
    </div>
  )
}

export default AdminDashboard;