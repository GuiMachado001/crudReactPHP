import './App.css'
import { useState, useEffect } from 'react' // ✅ adicionar useEffect
import { motion } from "framer-motion";

import Formulario from './assets/components/Formulario/Formulario'

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-gray-900">
        {/* Cursor animado */}
<motion.div
  className="cursor"
  animate={{ x: pos.x - 15, y: pos.y - 15 }}
  transition={{ duration: 0 }} // 0 segundos, sem atraso
/>
      </div>

      <Formulario />
    </>
  )
}

export default App
