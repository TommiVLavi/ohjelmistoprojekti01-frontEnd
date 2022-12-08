import './App.css';
import Navbar from './Navbar';
import ManufacturerList from './pages/ManufacturerList';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './components/LoginForm';
import { useState } from 'react';

function App() {
  const [hasRole, setHasRole] = useState('');

  if (hasRole === '') {
    return (
      <LoginForm hasRole={hasRole} setHasRole={setHasRole} />
    )
  }
  return <>
    <BrowserRouter>
      <Navbar hasRole={hasRole} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductForm" element={<ProductForm />} />
          <Route path="/ProductList" element={<ProductList hasRole={hasRole}/>} />
          <Route path="/ManufacturerList" element={<ManufacturerList />} />
          <Route path="/Login" element={
            <LoginForm hasRole={hasRole} setHasRole={setHasRole} />}
          />
        </Routes>
        
      </div>
    </BrowserRouter>

  </>
}

export default App;