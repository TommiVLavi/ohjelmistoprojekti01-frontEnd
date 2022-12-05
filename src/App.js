import './App.css';
import Navbar from './Navbar';
import ManufacturerList from './pages/ManufacturerList';
import ProductList from './pages/ProductList';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return <>
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/ManufacturerList" element={<ManufacturerList />} />
        </Routes>
        
      </div>
    </BrowserRouter>

  </>
}

export default App;