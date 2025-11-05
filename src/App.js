import React, { useState } from 'react';
import './App.css';

function App() {
  // Estado para almacenar las tareas
  const [tareas, setTareas] = useState([]);
  // Estado para el input de nueva tarea
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Función para agregar una tarea
  function agregarTarea() {
    if (nuevaTarea.trim() !== '') {
      setTareas([...tareas, {
        id: Date.now(),
        texto: nuevaTarea,
        completada: false
      }]);
      setNuevaTarea(''); // Limpiar el input
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  // Función para marcar como completada
  const toggleCompletada = (id) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    ));
  };

  return (
    <div className="app">
      <div className="contenedor">
        <h1>📝 Mi Lista de Tareas</h1>
        
        {/* Input para agregar tareas */}
        <div className="agregar-tarea">
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Escribe una nueva tarea..."
            onKeyPress={(e) => e.key === 'Enter' && agregarTarea()}
          />
          <button onClick={agregarTarea}>➕ Agregar</button>
        </div>

        {/* Lista de tareas */}
        <div className="lista-tareas">
          {tareas.length === 0 ? (
            <p>🎉 ¡No hay tareas! Agrega una nueva.</p>
          ) : (
            tareas.map(tarea => (
              <div key={tarea.id} className={`tarea ${tarea.completada ? 'completada' : ''}`}>
                <span 
                  onClick={() => toggleCompletada(tarea.id)}
                  className="texto-tarea"
                >
                  {tarea.texto}
                </span>
                <button 
                  onClick={() => eliminarTarea(tarea.id)}
                  className="btn-eliminar"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Contador de tareas */}
        <div className="estadisticas">
          <p>Total: {tareas.length} | Completadas: {tareas.filter(t => t.completada).length}</p>
        </div>
      </div>
    </div>
  );
}

export default App;