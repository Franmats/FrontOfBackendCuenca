import React, { useState } from 'react';

export const SessionDelete = () => {

 

    const deleteCookie = async () => {
      try {
        // Obtén la cookie
        const tokenU = await window.localStorage.getItem("tokenUser")
    
        // Verifica si la cookie existe antes de intentar eliminarla
        if (tokenU) {
          // Elimina la cookie estableciendo una fecha de expiración pasada
          window.localStorage.clear()
    
          console.log("Token eliminada exitosamente");
        } else {
          console.log("El token no existe");
        }
      } catch (error) {
        console.error("Error al eliminar el token:", error);
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