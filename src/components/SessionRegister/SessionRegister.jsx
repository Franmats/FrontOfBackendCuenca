import React, { useState, useCallback } from 'react';

export const SessionRegister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      // Registrar un nuevo usuario
      const response = await fetch('https://backendfinalcuenca-production.up.railway.app/api/session/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer yourAccessToken'
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
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="login-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          First Name: <input type="text" name="first_name" onChange={handleChange} />
          Last Name: <input type="text" name="last_name" onChange={handleChange} />
          Age: <input type="text" name="age" onChange={handleChange} />
          Email: <input type="text" name="email" onChange={handleChange} />
          Password: <input type="text" name="password" onChange={handleChange} />
          <button type="submit">Enviar</button>
        </form>
        {responseMessage && (
            <div className={responseMessage.includes('Error') ? 'error-message' : 'success-message'}>
              {responseMessage}
            </div>
          )}
      </div>
    </div>
  );
};