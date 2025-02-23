import React from 'react';

const Header = () => {
    return (
        <header className="bg-dark">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" style={{ height: '100%' }}>
                    <div className="carousel-item active" style={{ height: '100%' }}>
                        <img src="/img/frothy-pint-beer-wooden-table-pub-generated-by-artificial-intelligence.jpg" className="d-block w-100" style={{ height: '100%', objectFit: 'cover' }} alt="..." />
                    </div>
                    <div className="carousel-item" style={{ height: '100%' }}>
                        <img src="/img/wp9254925-alcohol-4k-wallpapers.jpg" className="d-block w-100" style={{ height: '100%', objectFit: 'cover' }} alt="..." />
                    </div>
                    <div className="carousel-item" style={{ height: '100%' }}>
                        <img src="/img/Huincha_Cerveza_Categorias.jpg" className="d-block w-100" style={{ height: '100%', objectFit: 'cover' }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </header>
    );
};

export default Header;