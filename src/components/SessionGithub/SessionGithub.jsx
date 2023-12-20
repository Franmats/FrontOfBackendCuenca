import React, { useState, useEffect } from 'react';

export const SessionGithub = () => {
  const [data, setData] = useState({});
  const localStorageSetitem =async (item) => {
    const set = window.localStorage.setItem("tokenUser",JSON.stringify(item))
    return set
  }

  useEffect(() => {
    // Función para cargar datos desde el servidor
    const fetchData = async () => {
      try {
        // Obtener el token de la cookie
        const token = await tokenStractor()
        const response = await fetch('https://backendfinalcuenca-production.up.railway.app/api/session/login-github', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        console.log(response);

        if (response.ok) {
            const responseData = await response.json();
    
            console.log("aaaaa",responseData);
            await localStorageSetitem(responseData.payload)
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

    fetchData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>First Name: {data.first_name}</p>
      <p>Last Name: {data.last_name}</p>
      <p>Age: {data.age}</p>
      <p>Email: {data.email}</p>
      <p>cartID: {data.cart}</p>
      <p>Role: {data.role}</p>
      <br />

      <a href="/api/products">Productos</a>
      <a href="/api/session/delete">Cerrar Sesion</a>
    
    </div>
  );
};