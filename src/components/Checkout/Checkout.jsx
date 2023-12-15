
import "./Checkout.css"
import React, { useState, useEffect } from 'react';

export const Checkout = ()=> {
    const [data, setData] = useState({});
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
  useEffect(() => {

    // Función para cargar datos desde el servidor
    const fetchData = async () => {
      try {
        // Obtener el token de la cookie
        const token = await cookiesStractor()
        const response = await fetch('backendfinalcuenca-production.up.railway.app/api/session/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
          },
          withCredentials: true
        });

        if (response.ok) {
          const userData = await response.json();
          const response2 = await fetch(`backendfinalcuenca-production.up.railway.app/api/cart/${userData.user.cart}`, {
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

  const checkout = async (id)=> {
    try {
        const cartId = {
            cart:id
        }
        console.log("iddds",cartId)
        const response2 = await fetch(`backendfinalcuenca-production.up.railway.app/api/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
          },
        withCredentials: true,
        body: JSON.stringify(cartId),
        });

        const checkoutRes = await response2.json()
        if(response2.ok){
            window.location.href = `${checkoutRes.url}`
        }
       else {
        console.log('Error al redirigir al checkout');
      }
    } catch (error) {
      console.error('Error hacer el checkout:', error);
    }

  }


  return (
    <div>
        <div className="checkout-container">
            <h2>Controla el pedido</h2>
            <div>
            {data.products &&(data.products.map((item) => (
                    <div key={item._id} className="product-detail">
                        <div className="img"><img src={item.pid.imagen} alt="" /></div>
                        <div  className="product-title">{item.pid.nombre}</div>
                        <div className="product-cant">{item.quantity}</div>
                        <div className="product-price">{item.pid.precio}</div>
                    </div>
                    )))}
            </div>
            {data &&(
                <div className="checkout-button">
                  <h3>TOTAL:{data.total} </h3>
                  <button onClick={() => {checkout(data.total)}}>Confirmar Compra</button>
                </div>
                )}
        </div>
    </div>
  );
}