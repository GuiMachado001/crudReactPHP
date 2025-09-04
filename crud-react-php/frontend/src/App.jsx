import './App.css'
import { useState, useEffect } from 'react' // ✅ adicionar useEffect
import { motion } from "framer-motion";

import Formulario from './assets/components/Formulario/Formulario'
import ListarUsuarios from './assets/components/ListarUsuarios/ListarUsuarios';

function App() {
  return (
    <>

      <Formulario />
      <ListarUsuarios />
    </>
  )
}

export default App
