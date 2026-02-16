import React, { useState } from "react";

function UseState() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="bg-slate-500 h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[500px] h-[400px] flex flex-col justify-center items-center gap-4">
        
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2 w-full"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

      </div>
    </div>
  );
}

export default UseState;
