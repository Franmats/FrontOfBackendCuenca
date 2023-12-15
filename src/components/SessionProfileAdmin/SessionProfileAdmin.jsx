import React, { useState, useEffect } from 'react';

export const SessionProfileAdmin = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const cookiesStractor = async() => {
      const cookie = window.cookieStore.get("coderCookie")
      cookie.then((value) => {
      console.log("El valor de la cookie auth_token es:", value);
      return value
      }, (error) => {
      console.log("Error al obtener el valor de la cookie auth_token:", error);
});
      console.log(cookie)
      return cookie
    }
    // Función para cargar datos desde el servidor
    const fetchData = async () => {
      try {
        // Obtener el token de la cookie
        const token = await cookiesStractor()
        const response = await fetch('http://localhost:8080/api/session/profile/admin', {
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
  );
};