# Paradise Nursery 🌿

**Project name:** Paradise Nursery – Online Plant Shop Shopping Cart Application

Paradise Nursery is a single-page e-commerce app built with **React**, **Redux Toolkit** and **Vite**.
Browse houseplants by category, add them to a cart, and manage quantities and totals.

## Features
- Landing page with company name, background image, "Get Started" button and an About Us section
- Product listing: 18 unique houseplants in 3 categories (Air Purifying, Aromatic, Low Maintenance), each with thumbnail, name and price
- "Add to Cart" buttons that add the plant, disable themselves once added, and update the cart icon count
- Navbar (Home / Plants / Cart) on both the product listing and cart pages
- Cart page: thumbnail, name, unit price, per-plant subtotal, total cart amount, +/- quantity buttons, delete button
- Checkout button (shows "Coming Soon") and Continue Shopping button

## Project structure
```
src/
  App.jsx          Landing page
  App.css          Styles (landing background image, navbar, cards, cart)
  AboutUs.jsx      Company details
  ProductList.jsx  Navbar + plant catalogue (+ cart view toggle)
  CartItem.jsx     Shopping cart page
  CartSlice.jsx    Redux slice (addItem, removeItem, updateQuantity)
  store.js         Redux store
  main.jsx         Entry point
```

## Run locally
```bash
npm install
npm run dev
```
Build for production: `npm run build`
