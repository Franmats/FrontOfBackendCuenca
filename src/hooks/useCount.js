import { useState } from "react";

export const useCount = (ValInicial = 1, min, max ) => {

    if (ValInicial < min || ValInicial > max) {
        ValInicial = min
    }
    const [count, setCount] = useState(ValInicial)

    const sumar = ()=> count < max && setCount(count +1)

    const restar = ()=> count > min && setCount(count -1)

    const reset = () => setCount(ValInicial)

    return {count, sumar, restar, reset}

} 