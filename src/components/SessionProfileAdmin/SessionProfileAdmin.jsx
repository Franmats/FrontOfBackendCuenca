import React, { useState, useEffect } from 'react';

export const SessionProfileAdmin = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const tokenStractor = async() => {
      try {
        const storedToken = window.localStorage.getItem("tokenUser");
    
        if (storedToken) {
          const user = JSON.parse(storedToken)
          console.log("Usuario recuperado:", user)
          return user
        } else {
          console.log("No se encontró un token en el Local Storage")
          return null; 
        }
      } catch (error) {
        console.error("Error al extraer el token:", error);
        return null;
      }
    }
    // Función para cargar datos desde el servidor
    const fetchData = async () => {
      try {
        // Obtener el token de la cookie
        const token = await tokenStractor()
        const response = await fetch('https://backendfinalcuenca-production.up.railway.app/api/session/profile/admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
      {data && data.role=="admin" && (
        <div>
          <h1>Profile :{data.role}</h1>
          <p>Age: {data.age}</p>
          <p>Email: {data.email}</p>
          <br />
          <a href="/api/products/admin" > Gestion de Productos</a><br />
          <a href="/api/carts/admin" > Gestion de Carritos</a><br />
          <a href="/api/tickets/admin" > Gestion de Tickets</a><br />
          <a href="/api/orders/admin"> Gestion de Ordenes</a><br />
          <a href="/api/users/admin"> Gestion de Usuarios</a><br />

         </div>
      ) }
     
    </div>
  );
};