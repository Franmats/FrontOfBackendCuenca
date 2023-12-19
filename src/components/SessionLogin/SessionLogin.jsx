import React, { useState } from 'react';

export const SessionLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [responseMessage, setResponseMessage] = useState(null);
  const localStorageSetitem =async (item) => {
    const set = window.localStorage.setItem("token",JSON.stringify(item.payload))
    return set
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backendfinalcuenca-production.up.railway.app/api/session/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const responseData = await response.json();

        console.log("aaaaa",responseData);
        localStorageSetitem(response)
        setResponseMessage(responseData.status);
      } else {
        const errorData = await response.json();
        console.log('Error al enviar datos:', errorData);
        setResponseMessage('Error al enviar datos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setResponseMessage('Error en la solicitud');
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
        {responseMessage && (
            <div className={responseMessage.includes('Error') ? 'error-message' : 'success-message'}>
              {responseMessage}
            </div>
          )}
      </div>
    </div>
  );
};