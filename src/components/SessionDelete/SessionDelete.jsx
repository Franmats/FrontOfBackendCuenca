import React, { useState } from 'react';

export const SessionDelete = () => {

 

    const deleteCookie = async () => {
      try {
        // Obtén la cookie
        const cookie = await window.cookieStore.get("coderCookie");
    
        // Verifica si la cookie existe antes de intentar eliminarla
        if (cookie) {
          // Elimina la cookie estableciendo una fecha de expiración pasada
          cookie.value = "";
          cookie.expires = 0;
          await window.cookieStore.set(cookie);
    
          console.log("Cookie eliminada exitosamente");
        } else {
          console.log("La cookie no existe");
        }
      } catch (error) {
        console.error("Error al eliminar la cookie:", error);
      }
    };
    
    // Llama a la función para eliminar la cookie
    deleteCookie();
    

  return (
    <div>
      <div>Sesion cerrada</div>
    </div>
  );
}