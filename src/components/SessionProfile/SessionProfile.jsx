import React, { useState, useEffect } from 'react';

export const SessionProfile = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const tokenStractor = async() => {
      const stract = window.localStorage.getItem("tokenUser")
      if(stract) {
        const user = JSON.parse(stract)
        console.log(user)
        return user
      }else {
        console.log("error")
      }
    }

    
    // Función para cargar datos desde el servidor
    const fetchData = async () => {
      try {
        // Obtener el token de la cookie
        const token = await tokenStractor()
        const response = await fetch('https://backendfinalcuenca-production.up.railway.app/api/session/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
          },
          withCredentials: true
        });

        console.log(response);

        if (response.ok) {
          const userData = await response.json();
          console.log(userData.user);
          setData(userData.user);
        } else {
          // Mostrar un mensaje de error
          
         
console.log('Error al cargar datos');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
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