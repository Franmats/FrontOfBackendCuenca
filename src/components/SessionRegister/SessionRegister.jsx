import React, { useState, useCallback } from 'react';

export const SessionRegister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      // Registrar un nuevo usuario
      const response = await fetch('http://localhost:8080/api/session/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer yourAccessToken'
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(response)
        // Mostrar un mensaje de éxito
        console.log('Front: Usuario registrado correctamente');
      } else {
        // Mostrar un mensaje de error
        console.log('Front:Error al registrar el usuario');
      }
    } catch (error) {
      // Manejar errores de la solicitud
      console.error('Front: Error en la solicitud:', error);
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
      </div>
    </div>
  );
};