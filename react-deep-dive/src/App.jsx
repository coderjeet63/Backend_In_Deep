import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UseState from "./components/UseState";
import UseReducer from "./components/UseReducer";
import UseMemo from "./components/UseMemo";
import UseCallback from "./components/UseCallback";
import UseRef from "./components/UseRef";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/usestate" element={<UseState />} />
        <Route path="/usereducer" element={<UseReducer />} />
        <Route path="/usememo" element={<UseMemo />} />
        <Route path="/usecallback" element={<UseCallback />} />
        <Route path="/useref" element={<UseRef />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
