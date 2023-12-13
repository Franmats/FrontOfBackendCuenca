import { useCount } from "../../hooks/useCount.js";

export const ItemCount = ({ValInicial, min, max, onAdd}) => {
    
    const {count, sumar, restar, reset} = useCount(ValInicial,min,max)
    
    return (
        <>
            <button onClick={restar}>-</button><div id="counter">
            {count}</div>
            <button onClick={sumar}>+</button>
            <button onClick={reset}>Reset</button>
            {/* <button className="btn" onClick={() => onAdd(count)}>Agregar al Carrito</button> */}
        </>
    );
}


