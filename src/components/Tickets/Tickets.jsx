import "./Tickets.css";
import React, { useState, useEffect } from 'react';

export const Tickets = () => {
  const [data, setData] = useState({});
  
  useEffect(() => {
    let isMounted = true;

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
        const token = await tokenStractor();

        if (!token || !isMounted) {
          return; // Si el componente ya no está montado, evitamos hacer más solicitudes
        }

        const response = await fetch('https://backendfinalcuenca-production.up.railway.app/api/session/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });

        if (response.ok) {
          const userData = await response.json();

          const response2 = await fetch(`https://backendfinalcuenca-production.up.railway.app/api/cart/${userData.user.cart}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true
          });

          if (response2.ok) {
            const userCart = await response2.json();
            const dataForTicket = {
              amount: userCart.total,
              purchaser: userData.user.email
            };

            const response3 = await fetch('https://backendfinalcuenca-production.up.railway.app/api/tickets', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
              body: JSON.stringify(dataForTicket),
            });

            if (response3.ok) {
              const ticketResponse = await response3.json();

              if (isMounted) {
                setData(ticketResponse);
              }
            } else {
              console.log("Error al crear ticket");
            }
          }
        } else {
          console.log('Error al cargar datos');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Establecer la variable de montaje a falso cuando el componente se desmonta
    };
  }, []);

  return (
    <div>
      <div className="checkout-container">
        <h2>EXITO GRACIAS POR SU COMPRA</h2>

        {data && (
          <div className="generate-ticket">
            <h3>Numero del Pedido {data.code} </h3>
            <h2>Comprado por {data.purchaser}</h2>
          </div>
        )}
      </div>
    </div>
  );
};