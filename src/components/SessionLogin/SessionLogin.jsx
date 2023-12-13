import React, { useState } from 'react';

export const SessionLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/session/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer yourAccessToken',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log(response)
        // Mostrar un mensaje de éxito
        console.log('Usuario logueado correctamente');
      } else {
        // Mostrar un mensaje de error
        console.log('Error al iniciar sesión');
      }
    } catch (error) {
      // Manejar errores de la solicitud.
      console.error('Error en la solicitud:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="center2">
        <div className="login-container">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Iniciar Sesión</button>
          </form>
          <button>
            <a href="/api/session/register">Registro</a>
          </button>
        </div>
      </div>
    </div>
  );
};