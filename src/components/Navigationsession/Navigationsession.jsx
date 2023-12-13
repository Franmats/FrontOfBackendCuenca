import "./Navigationsession.css"
import React from 'react';

export const NavigationSession = ()=> {
  return (
    <div>
      <div>
      <a href="/api/session/login">Login</a>
      <a href="/api/session/register">Registro</a>
      <a href="/api/session/profile">Perfil</a>
      <a href="/api/session/currentDTO">DTO</a>
        </div>
    </div>
  );
}

