import React from 'react'


function NavBar({val}) 
{
  return (
    <div className = "h-20 bg-teal-600 flex justify-between items-center px-10 text-white">
      <h1 className="text-xl font-bold">Cart Items: {val.totalItems}</h1>
      <h1 className="text-xl font-bold">Total Price: ${val.totalPrice}</h1>
      
    </div>
  )
}

export default NavBar