import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [product, setProduct] = useState({
        products: '',
        name: '',
        price: '',
        type: '',
        ml: '',
        imagen: null,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProduct(response.data.data);
        } catch (error) {
            setError(error.message || 'Error fetching product');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.products || !product.name || !product.price || !product.type || !product.ml) {
            setError('Please fill in all fields.');
            return;
        }

        try {

            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('products', product.products);
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('type', product.type);
            formData.append('ml', product.ml);
            if (product.imagen) {
                formData.append('imagen', product.imagen);
            }

            await axios.put(`${import.meta.env.VITE_BACK_URL}/api/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/');
        } catch (error) {
            setError(error.message || 'Error updating product');
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, imagen: e.target.files[0] });
    };


    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Editar Producto</h1>
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="products" className="block text-gray-700">Producto:</label>
                    <input
                        type="text"
                        id="products"
                        name="products"
                        value={product.products}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="imagen" className="block text-gray-700">Imagen:</label>
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {product.imagen && (
                        <div className="mt-2">
                            <img
                                src={`https://api-heaven.onrender.com${product.imagen}`}
                                alt={product.name}
                                className="h-auto max-h-24 w-full object-contain"
                            />
                        </div>
                    )}
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Actualizar Producto
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
