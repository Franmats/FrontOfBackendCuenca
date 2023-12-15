import "./Cart.css"
import React, { useState, useEffect } from 'react';

export const Cart = ()=> {
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
        const response = await fetch('https://backendfinalcuenca-production.up.railway.app/api/session/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
          },
          withCredentials: true
        });

        if (response.ok) {
          const userData = await response.json();
          const response2 = await fetch(`https://backendfinalcuenca-production.up.railway.app/api/cart/${userData.user.cart}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.value}`
            },
            withCredentials: true
          });
          const userCart = await response2.json()
          console.log(userCart)
          setData(userCart);
        } else {
          console.log('Error al cargar datos');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();


    
  }, []);

  const deleteProduct = async (cid,id) => {
    try {
      console.log('Delete button clicked');
      const deleteProd = await fetch(`https://backendfinalcuenca-production.up.railway.app/api/cart/${cid}/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      console.log("Delete response:", deleteProd.status);
    if (deleteProd.ok) {
      window.location.reload();
    } else {
      console.log("Error en el response")
    }
    } catch (error) {
      console.log(error)
    }

  }
    return (
      <div>
        <div className="cart-container">
            <div className="cart-title"><h2>Tu Carrito</h2></div>

            <div className="cart-box">
                <div className="cart-detail">
                {data.products &&(data.products.map((item) => (
                    <div key={item._id} className="product-detail">
                        <div className="img"><img src={item.pid.imagen} alt="" /></div>
                        <div  className="product-title">{item.pid.nombre}</div>
                        <div className="product-cant">{item.quantity}</div>
                        <div className="product-price">{item.pid.precio}</div>
                        <div className="btn-delete">
                            <button onClick={() => deleteProduct(data._id,item.pid._id)}>Eliminar</button>
                        </div>
                    </div>
                    )))}
                </div>
                {data &&(
                <div className="cart-total">
                  <h3>TOTAL:{data.total} </h3>
                  <div><a href="/api/checkout">Seguir con el Checkout</a></div>
                </div>
                )}
            </div>
        </div>
      </div>
    );
  }