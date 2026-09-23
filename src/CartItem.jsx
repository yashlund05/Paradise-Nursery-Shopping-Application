import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = (item) => item.cost * item.quantity;
  const totalAmount = items.reduce((sum, item) => sum + subtotal(item), 0);

  const increment = (item) => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  const decrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <h3 className="cart-total">Total Cart Amount: ${totalAmount.toFixed(2)}</h3>
          {items.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit price: ${item.cost.toFixed(2)}</div>
                <div className="cart-item-quantity">
                  <button className="qty-button" onClick={() => decrement(item)}>−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-button" onClick={() => increment(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${subtotal(item).toFixed(2)}</div>
                <button className="delete-button" onClick={() => dispatch(removeItem(item.name))}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      <div className="cart-actions">
        <button className="continue-button" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout-button" onClick={() => alert('Checkout: Coming Soon!')}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
