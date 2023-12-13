import "./CartorProducts.css";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export const CartorProducts = ()=> {
  const [data, setData] = useState({});
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
        const response = await fetch(`http://localhost:8080/api/cart/${cid}/product/${pid}/cant/${b}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
          },
          withCredentials: true
        });
        if (response.ok) {
          const a = await response.json()
          setData(a)
        } else {
          const a = await response.json()
          setData(a)
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    }

    fetchData();
  }, []);
    return (
      <div>
        <h1>{data.status}</h1>
        <div>
        <a href="/api/products">Seguir Comprando</a>
        <a href="/api/cart">Ir al Carrito</a>
          </div>
      </div>
    );
  }
  