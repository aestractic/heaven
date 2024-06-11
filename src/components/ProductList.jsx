import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/api/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`https://api-heaven.onrender.com/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Lista de Productos</h1>
                    <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700">
                        Agregar Producto
                    </Link>
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Producto
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Precio
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tipo
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ml
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Imagen
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {product.products}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.ml}ml</td>
                                            <td className="px-6 py-4 whitespace-nowrap image-cell">
                                                <img
                                                    src={`https://api-heaven.onrender.com${product.imagen}`}
                                                    alt={product.name}
                                                    className="h-auto max-h-24 w-full object-contain"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link to={`/edit/${product._id}`}
                                                      className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    Editar
                                                </Link>
                                                <button onClick={() => deleteProduct(product._id)}
                                                        className="text-red-600 hover:text-red-900">
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;