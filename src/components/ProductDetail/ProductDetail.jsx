import "./ProductDetail.css";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemCount } from "../ItemCount/ItemCount.jsx";
import { useNavigate } from "react-router-dom";


const cookiesStractor = async () => {
  const cookie = window.cookieStore.get('coderCookie');
  const cookieValue = await cookie;
  console.log('El valor de la cookie auth_token es:', cookieValue);
  return cookieValue;
};

export const ProductDetail = () => {
  const [data, setData] = useState({});
  const [itemCount, setItemCount] = useState(1);
  const { id } = useParams();
  const navigate= useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await cookiesStractor();

        // Fetch user profile data
        const response1 = await fetch('https://backendfinalcuenca-production.up.railway.app/api/session/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`,
          },
          credentials: 'include', // Use credentials here
        });

        if (response1.ok) {
          const userData = await response1.json();
          console.log("aaaa", userData);
          setData((prevData) => ({ ...prevData, user: userData.user }));

          // Fetch product data
          const response2 = await fetch(`https://backendfinalcuenca-production.up.railway.app/api/products/product/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.value}`,
            },
            credentials: 'include', // Use credentials here
          });

          if (response2.ok) {
            const productData = await response2.json();
            console.log("bbb", productData);
            setData((prevData) => ({ ...prevData, product: productData }));
            console.log(data)
          } else {
            console.error('Error al cargar datos:', response2.status);
          }
        } else {
          console.error('Error al cargar datos:', response1.status);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [id]);
  const handleAddToCart = () => {
    const a = document.getElementById("counter")
    const b = a.textContent
    console.log("sasdas",b)
    const cartRoute = `/api/cart/${data.user.cart}/product/${data.product._id}/cant/${b}`;
    navigate(cartRoute)
  };

  

  return (
    <div>
      {data.user && data.product && (
        <div className="containerdetail">
        <div className="block1">
          <div><img src={data.product.imagen} alt={data.product.nombre} /></div>
          <h2><b>{data.product.nombre}</b></h2>
        </div>
        <div className="block2">
          <b><div className="normal">${data.product.precio}</div></b>
          <ItemCount ValInicial={1} min={1} max={data.product.stock}  />
          <div className="add" >
            <button onClick={() => {handleAddToCart(); }}>AÑADIR AL CARRITO</button></div>
          <div className="normal">Detalles{data.product.descripcion}</div> 
          <div className="normal">Stock:{data.product.stock}</div> 
        </div>
      </div>
      )}
    </div>
  );
};