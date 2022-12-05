import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  fetchProducts,
  fetchCategory,
  selectUser,
} from "./features/generalSlice";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import Product from "./pages/Product";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    // On app starts run the required fetchs
    dispatch(fetchProducts());
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<Product />} />

      {/* Protected routes */}
      <Route
        path="/purchases"
        element={user.token ? <Purchases /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
