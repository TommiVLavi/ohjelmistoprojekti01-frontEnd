import './App.css';
import Navbar from './Navbar';
import ManufacturerList from './pages/ManufacturerList';
import ProductList from './pages/ProductList';
import Home from './pages/Home';
import { Route, Routes } from "react-router-dom";

function App() {
  return <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/ManufacturerList" element={<ManufacturerList />} />
      </Routes>
    </div>
    
  
  </>
}

export default App;
