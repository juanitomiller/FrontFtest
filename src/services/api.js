import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tu-servicio.onrender.com', // Reemplaza con tu URL de Render
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getProducts = async () => {
    try {
        const response = await api.get('/api/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};

export default api;
