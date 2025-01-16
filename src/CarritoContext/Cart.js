import React from "react";
import { useContext } from "react";
import CartContext from "./CartContext";

function Cart() {
    const { cartItems } = useContext(CartContext);
  
    return (
      <div>
        <h2>Carrito de compras</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  export default Cart;