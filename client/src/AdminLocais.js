import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterLocal from "./RegisterLocal";
import MenuAdmin from "./components/menu_admin";

function AdminLocais(){
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Verifica se o usuário é um administrador

  if (!isAdmin) {
    navigate("/"); 
    return null;
  }

  return(
    <div>
      <MenuAdmin/>
      <RegisterLocal/>
    </div>
  )
}

export default AdminLocais;