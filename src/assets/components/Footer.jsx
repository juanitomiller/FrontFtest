import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="py-4 bg-dark">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <p className="m-0 text-white">Copyright &copy; Los Pitiaos 2025</p>
                    </div>
                    <div className="col-md-4 text-center d-flex flex-column align-items-center">
                        <img 
                            src="img/pngwing.com.png" 
                            alt="Logo" 
                            style={{ 
                                height: '54px',
                                marginBottom: '10px'
                            }} 
                        />
                        <span className="text-white">Clandestino.cl</span>
                    </div>
                    <div className="col-md-4">
                        <div className="social-icons justify-content-end">
                            <a href="https://www.facebook.com" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="social-link">
                                <i className="fab fa-facebook-f fa-2x"></i>
                            </a>
                            <a href="https://wa.me/+56912345678" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="social-link">
                                <i className="fab fa-whatsapp fa-2x"></i>
                            </a>
                            <a href="https://www.instagram.com" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="social-link">
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;