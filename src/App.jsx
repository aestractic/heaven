import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const token = localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedLayout token={token} />}>
                    <Route index element={<ProductList />} />
                    <Route path="create" element={<CreateProduct />} />
                    <Route path="edit/:id" element={<EditProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


function ProtectedLayout({ token }) {
    const location = useLocation();

    return (
        <div>
            {location.pathname === '/' && token && <Navbar />}
            <Outlet />
        </div>
    );
}

export default App;