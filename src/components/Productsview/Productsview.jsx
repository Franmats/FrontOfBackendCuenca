import "./Productsview.css"
import React, { useState, useEffect } from 'react';

export const Productsview =()=> {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Función para cargar datos desde el servidor
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products?page=${page}`);
        if (!response.ok) {
          throw new Error('Respuesta no exitosa');
        }
        const datos = await response.json();
        setData(datos.docs);
        setTotalPages(datos.info.totalPages);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <div className="container">
    {data.map((item) => (
      <div key={item._id} className="card">
        <div className="card1">
          <div className="image">
            <img src={item.imagen} alt="imagen" />
          </div>
          <div className="title">{item.nombre}</div>
        </div>
        <div className="card2">
          <b>
            <div className="normal">${item.precio}</div>
          </b>
          <button className="add">
            <a href={`/api/products/${item.id}`}> VER PRODUCTO</a>
          </button>
          <div className="normal">Stock: {item.stock}</div>
          <div className="normal">Categoria: {item.idCategoria}</div>
        </div>
      </div>
    ))}

<div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Anterior
        </button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>
  </div>
  );
}

