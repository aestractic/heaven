import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {

    const token = localStorage.getItem('token');

    const [product, setProduct] = useState({
        products: '',
        name: '',
        price: '',
        type: '',
        ml: '',
        imagen: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('products', product.products);
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('type', product.type);
            formData.append('ml', product.ml);
            formData.append('imagen', product.imagen);

            // Include token in Authorization header if it exists
            if (token) {
                await axios.post('https://api-heaven.onrender.com/api/products', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                console.warn('No token found in local storage. Authorization header omitted.');
            }

            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto my-10">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Crear Producto</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="products" className="block text-gray-700">Producto:</label>
                    <input
                        type="text"
                        id="products"
                        name="products"
                        value={product.products}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="name" className="block text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-gray-700">Precio:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="type" className="block text-gray-700">Tipo:</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={product.type}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="ml" className="block text-gray-700">ml:</label>
                    <input
                        type="number"
                        id="ml"
                        name="ml"
                        value={product.ml}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="imagen" className="block text-gray-700">Imagen:</label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleFileChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {product.imagen && (
                        <div className="mt-2 flex justify-center">
                            <img
                                src={URL.createObjectURL(product.imagen)}
                                alt={product.name}
                                className="h-auto max-h-24 w-full object-contain"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Crear Producto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;