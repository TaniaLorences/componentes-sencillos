import React, { useContext } from 'react';
import CartContext from './CartContext';

function ProductList() {

  const { cartItems, addToCart } = useContext(CartContext);

  const products = [
    { id: 1, name: 'Producto 1', price: 10 },
    { id: 2, name: 'Producto 2', price: 20 },
    // ... más productos
  ];

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product)}>Añadir al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
