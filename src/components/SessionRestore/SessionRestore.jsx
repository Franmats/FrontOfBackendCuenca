import React, { useState } from 'react';

export const SessionRestore = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('backendfinalcuenca-production.up.railway.app/api/session/reset-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer yourAccessToken',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();

        console.log("aaaaa",responseData);
        setResponseMessage(responseData.status);
      } else {
        const errorData = await response.json();
        console.log('Error al enviar datos:', errorData);
        setResponseMessage('Error al enviar datos');
      }
    } catch (error) {
      // Manejar errores de la solicitud.
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
            <button type="submit">Enviar Email</button>
          </form>

          {responseMessage && (
            <div className={responseMessage.includes('Error') ? 'error-message' : 'success-message'}>
              {responseMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};