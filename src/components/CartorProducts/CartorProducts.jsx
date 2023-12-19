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
        const response = await fetch(`https://backendfinalcuenca-production.up.railway.app/api/cart/${cid}/product/${pid}/cant/${b}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
  