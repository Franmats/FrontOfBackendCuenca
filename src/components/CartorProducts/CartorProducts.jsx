import "./CartorProducts.css";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export const CartorProducts = ()=> {
  const [data, setData] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);
  const { cid } = useParams();
  const { pid } = useParams();
  const { b } = useParams();

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
        const response = await fetch(`https://backendfinalcuenca-production.up.railway.app/api/cart/${cid}/product/${pid}/cant/${b}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
          },
          withCredentials: true
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
        console.error('Error en la solicitud:', error);
        setResponseMessage('Error en la solicitud');
        console.error('Error al cargar datos:', error);
      }
    }

    fetchData();
  }, []);
    return (
      <div>
        {responseMessage && (
            <div className={responseMessage.includes('Error') ? 'error-message' : 'success-message'}>
              {responseMessage}
            </div>
          )}
        <h1>{data.status}</h1>
        
        <a href="/api/products">Seguir Comprando</a>
        <a href="/api/cart">Ir al Carrito</a>
         
     
      </div>
    );
  }
  