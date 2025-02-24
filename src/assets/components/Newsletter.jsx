import React, { useState } from 'react';
import '../styles/Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('https://backendtest-8l3s.onrender.com/newsletter', {  // Cambiado de /newsletters a /newsletter
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Respuesta del servidor no es JSON');
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al suscribirse');
            }

            setMessage({
                type: 'success',
                text: '¡Gracias por suscribirte!'
            });
            setEmail('');
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.message || 'Ocurrió un error al procesar tu suscripción'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="subscribe-newsletter">
            <img src="/img/pngwing.com.png" alt="Newsletter glasses toasting" />
            <div className="subscribe-title">
                <h3>Suscríbete</h3>
                <h2>¡Y entérate de todas nuestras ofertas!</h2>
            </div>
            <form onSubmit={handleSubmit} className="subscribe-form">
                <div className="subscribe-input">
                    <input 
                        type="email"
                        placeholder="Ingresa tu correo aquí"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="subscribe-btn">
                    <button 
                        type="submit"
                        className={`primary btn-action-ok ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Suscribiendo...' : 'Suscribirme'}
                        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 40 40">
                            <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                            <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z">
                                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/>
                            </path>
                        </svg>
                    </button>
                </div>
                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Newsletter;
