import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';

const img = (slug) => `${import.meta.env.BASE_URL}images/${slug}.svg`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', slug: 'snake-plant', cost: 15, description: 'Produces oxygen at night and removes toxins.' },
      { name: 'Spider Plant', slug: 'spider-plant', cost: 12, description: 'Filters formaldehyde and xylene from the air.' },
      { name: 'Peace Lily', slug: 'peace-lily', cost: 18, description: 'Elegant white blooms that clean indoor air.' },
      { name: 'Boston Fern', slug: 'boston-fern', cost: 14, description: 'Adds humidity and removes pollutants.' },
      { name: 'Rubber Plant', slug: 'rubber-plant', cost: 22, description: 'Bold glossy leaves that purify the air.' },
      { name: 'Areca Palm', slug: 'areca-palm', cost: 25, description: 'A natural humidifier with feathery fronds.' },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', slug: 'lavender', cost: 16, description: 'Calming fragrance that promotes relaxation.' },
      { name: 'Jasmine', slug: 'jasmine', cost: 20, description: 'Sweet-scented flowers for a cosy space.' },
      { name: 'Rosemary', slug: 'rosemary', cost: 10, description: 'Fragrant herb loved in the kitchen.' },
      { name: 'Mint', slug: 'mint', cost: 8, description: 'Refreshing scent and great for teas.' },
      { name: 'Lemon Balm', slug: 'lemon-balm', cost: 11, description: 'Citrus aroma that soothes stress.' },
      { name: 'Eucalyptus', slug: 'eucalyptus', cost: 19, description: 'Invigorating aroma that clears the mind.' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'Aloe Vera', slug: 'aloe-vera', cost: 9, description: 'Soothing gel and almost impossible to kill.' },
      { name: 'Jade Plant', slug: 'jade-plant', cost: 13, description: 'A lucky succulent that stores its own water.' },
      { name: 'ZZ Plant', slug: 'zz-plant', cost: 24, description: 'Thrives on neglect and in low light.' },
      { name: 'Echeveria', slug: 'echeveria', cost: 7, description: 'Rosette-shaped succulent that loves the sun.' },
      { name: 'Haworthia', slug: 'haworthia', cost: 8, description: 'Compact, striped and very forgiving.' },
      { name: 'Pothos', slug: 'pothos', cost: 10, description: 'Trailing vines that grow almost anywhere.' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: img(plant.slug), cost: plant.cost }));
  };

  return (
    <div className="product-page">
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <span>🌿</span> Paradise Nursery
        </div>
        <div className="navbar-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#cart" className="cart-link" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            <svg width="30" height="30" viewBox="0 0 256 256" aria-label="Shopping cart">
              <circle cx="80" cy="216" r="12" fill="currentColor" />
              <circle cx="184" cy="216" r="12" fill="currentColor" />
              <path d="M42 64h30l24 96h96l20-72H84" fill="none" stroke="currentColor" strokeWidth="16"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid" id="plants">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="category-row">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={img(plant.slug)} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <div className="product-cost">${plant.cost.toFixed(2)}</div>
                    <button
                      className="product-button"
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
