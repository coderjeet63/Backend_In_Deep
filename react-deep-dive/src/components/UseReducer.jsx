import React, { useReducer } from 'react';
import NavBar from './NavBar';

// ✅ 1. THE INITIAL STATE
// Defines what our data looks like at the start.
const initialState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0
};

// ✅ 2. THE REDUCER FUNCTION (The "Brain")
// This function lives OUTSIDE the component.
// It takes current state + an action, and returns NEW state.
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state, // Always spread old state first!
        cart: [...state.cart, action.payload],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.price
      };

    case "REMOVE_PRODUCT":
      // Logic to filter out the item
      const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        cart: updatedCart,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - action.payload.price
      };

    case "CLEAR_CART":
      return initialState; // Reset everything

    default:
      return state;
  }
};

// ✅ 3. THE COMPONENT
function UseReducer() {
  // dispatch is the function used to send "orders" to the reducer
  const [state, dispatch] = useReducer(cartReducer, initialState);
  console.log(dispatch)

  // Mock Product Data
  const product = { id: 1, name: "MacBook Pro", price: 1200 };

  return (
    <div className="p-10 text-center">

      <NavBar val = {state} />

      <h1 className="text-3xl font-bold mb-6">Shopping Cart System</h1>
      
      {/* Dashboard - Shows Derived State automatically */}
      <div className="bg-gray-100 p-5 rounded mb-5 max-w-md mx-auto">
        <p className="text-xl">Items in Cart: <strong>{state.totalItems}</strong></p>
        <p className="text-xl">Total Price: <strong>${state.totalPrice}</strong></p>
      </div>

      <div className="flex gap-4 justify-center">
        {/* Button DISPATCHES an action */}
        <button 
          onClick={() => dispatch({ type: "ADD_PRODUCT", payload: product })}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Add MacBook ($1200)
        </button>

        <button 
          onClick={() => dispatch({ type: "REMOVE_PRODUCT", payload: product })}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          disabled={state.totalItems === 0}
        >
          Remove MacBook
        </button>

        <button 
          onClick={() => dispatch({ type: "CLEAR_CART" })}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Clear Cart
        </button>
      </div>

      {/* Visualizing the Cart Array */}
      <div className="mt-10 text-left max-w-md mx-auto">
        <h3 className="font-bold underline">Cart Logs:</h3>
        <pre className="bg-black text-green-400 p-4 rounded text-xs mt-2">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default UseReducer;