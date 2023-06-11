import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Register from './Register';
import Login from './Login';
import RegisterLocal from './RegisterLocal';
import UpdateDeleteUsuario from './UpdateDeleteUsuario';
import UpdateDeleteLocal from './UpdateDeleteLocal';
import App from './App';
import Pontos from './Pontos';
import Faq from './Faq';
import Emergencia from './Emergencia';
import Local from './Local';
import HomeAdmin from './HomeAdmin';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<App  />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/RegisterLocal" element={<RegisterLocal />} />
      <Route path="/UpdateDeleteUsuario" element={<UpdateDeleteUsuario />} />
      <Route path="/UpdateDeleteLocal" element={<UpdateDeleteLocal />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/HomeAdmin" element={<HomeAdmin />} />
      <Route path="/Pontos" element={<Pontos />} />
      <Route path="/Faq" element={<Faq />} />
      <Route path="/Emergencia" element={<Emergencia />} />
      <Route path="/local/:id" element={<Local />}
      
/>


    </Routes>
    </BrowserRouter>
  </React.StrictMode>
); 


