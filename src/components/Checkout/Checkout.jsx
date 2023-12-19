
import "./Checkout.css"
import React, { useState, useEffect } from 'react';

export const Checkout = ()=> {
    const [data, setData] = useState({});
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
  useEffect(() => {

    // Función para cargar datos desde el servidor
    const fetchData = async () => {
      try {
        // Obtener el token de la cookie
        const token = await tokenStractor()
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
        const response2 = await fetch(`https://backendfinalcuenca-production.up.railway.app/api/checkout`, {
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