import "./Header.css"
import React, { useEffect, useState } from 'react';

export const Header = ()=> {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const toggleMenu = () => {
        const nav = document.getElementById("toggle");
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);

        if (nav) {
          if (!isMenuOpen) {
            nav.classList.add("on");
            
          } else {

            nav.classList.remove("on");

          }
        }
      };
    
    
    
  return (
    <div>
            <div className="center">
                <header>
                    <div className="containerfull">
                        <div className="top">
                            <div className="logo"><h1>SUPERCOMMERCE</h1>{/* <img src="" alt="logo"> */}</div>
                            <div className="navegate">
                            <span><a href="/api/products" >PRODUCTOS /</a></span>
                            <span><a href ="/api/products/super">SUPER / </a></span>
                            <span><a href="/api/products/electronics">ELECTRONICA /</a></span>
                            <span><a href="/api/products/pcescritorio">PC ESCRITORIO /</a></span>
                            <span><a href="/api/products/notebook">NOTEBOOKS</a></span>
                            </div>
                            <div className="items">
                            <div className="search"><img src="https://firebasestorage.googleapis.com/v0/b/e-commerce-39665.appspot.com/o/search.png?alt=media&token=c932dbe5-6c81-4ab5-9ae2-9370c2ede4f4" alt="search" /></div>
                            <div className="user"><a href="/api/session"><img src="https://firebasestorage.googleapis.com/v0/b/e-commerce-39665.appspot.com/o/user.png?alt=media&token=21059657-1989-4341-8df5-3dd0e11e97e0" alt="user" /></a></div>
                            <div className="cart"><a href="/api/cart"><img src="https://firebasestorage.googleapis.com/v0/b/e-commerce-39665.appspot.com/o/cart.png?alt=media&token=88105018-7c1a-4566-ad9a-ab19f24bd4e2" alt="cart" /></a></div> 
                            <div className="admin"><a href="/api/session/profile/admin"><img src="https://w7.pngwing.com/pngs/257/93/png-transparent-settings-gear-icon-gear-configuration-set-up-thumbnail.png" alt="admin" /></a></div> 
                            <div className="premium"><a href="/api/session/profile/premium"><img src="https://cdn-icons-png.flaticon.com/512/3972/3972726.png" alt="premium" /></a></div> 
                            </div>
                        </div>
                    <div className="buttom">
                        <div className="promotions">
                        <div className="banner"><b>10% DESCUENTO EN COMPRAS MAYORES A $100000 </b></div>
                        </div>
                    </div>
                    </div>
                    <div className="containerphone">
                            <div className="top">
                                <div className="logo"><h2>SUPERCOMMERCE</h2></div>
                                <button onClick={()=>{toggleMenu()}}><div className="hambur"><img src="https://firebasestorage.googleapis.com/v0/b/super-ecommerce-f7347.appspot.com/o/png-transparent-hamburger-button-computer-icons-menu-menu-rectangle-desktop-wallpaper-button.png?alt=media&token=3da67a29-358e-431e-a81b-656273e8b3ed" alt="hambu" /></div></button>

                                <div className="nav-toggle" id="toggle"> 
                                <div className="menu">
                                    <div><a href="/api/products" >PRODUCTOS </a></div>
                                    <div><a href ="/api/products/super">SUPER  </a></div>
                                    <div><a href="/api/products/electronics">ELECTRONICA </a></div>
                                    <div><a href="/api/products/pcescritorio">PC ESCRITORIO </a></div>
                                    <div><a href="/api/products/notebook">NOTEBOOKS</a></div>
                                </div>
                                <div className="items">
                                    <div className="search"><img src="https://firebasestorage.googleapis.com/v0/b/e-commerce-39665.appspot.com/o/search.png?alt=media&token=c932dbe5-6c81-4ab5-9ae2-9370c2ede4f4" alt="search" /></div>
                                    <div className="user"><a href="/api/session"><img src="https://firebasestorage.googleapis.com/v0/b/e-commerce-39665.appspot.com/o/user.png?alt=media&token=21059657-1989-4341-8df5-3dd0e11e97e0" alt="user" /></a></div>
                                    <div className="cart"><a href="/api/cart"><img src="https://firebasestorage.googleapis.com/v0/b/e-commerce-39665.appspot.com/o/cart.png?alt=media&token=88105018-7c1a-4566-ad9a-ab19f24bd4e2" alt="cart" /></a></div> 
                                    <div className="admin"><a href="/api/session/profile/admin"><img src="https://w7.pngwing.com/pngs/257/93/png-transparent-settings-gear-icon-gear-configuration-set-up-thumbnail.png" alt="admin" /></a></div> 
                                    <div className="premium"><a href="/api/session/profile/premium"><img src="https://cdn-icons-png.flaticon.com/512/3972/3972726.png" alt="premium" /></a></div> 
                                    </div>
                                 </div>
                                 </div>
                    </div>
                    <div className="buttom">
                        <b>10% DESCUENTO EN COMPRAS MAYORES A $40000 </b>
                    </div>
                
                </header>

                
        </div>
        
    </div>

    
  );
}