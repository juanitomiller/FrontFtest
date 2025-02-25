import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Slider from 'react-slick';
import './Reviews.css'; // Asegúrate de crear este archivo para los estilos
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Reviews = () => {
    const { user } = useContext(UserContext);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            name: user.username, // Asegúrate de pasar el nombre del usuario
            email: user.email,
            rating: rating, // Asegúrate de pasar el rating correcto
            comment: comment,
        };
        setReviews((prevReviews) => [...prevReviews, newReview]);
        setRating(0);
        setComment('');
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false, // Eliminar las flechas
        customPaging: (i) => (
            <div className="dot">
                {i + 1}
            </div>
        ),
        dotsClass: "slick-dots custom-dots",
    };

    return (
        <div className="reviews-container">
            <h2>Opiniones</h2>
            {user ? (
                <form onSubmit={handleSubmit}>
                    <div className="rating-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${rating >= star ? 'selected' : ''}`}
                                onClick={() => handleRatingChange(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Escribe tu opinión..."
                        required
                    />
                    <button type="submit">Enviar</button>
                </form>
            ) : (
                <p>Inicia sesión para dejar una opinión.</p>
            )}
            <div className="reviews-carousel">
                <Slider {...settings}>
                    {reviews.slice(0, 4).map((review, index) => (
                        <div key={index} className="review">
                            <p><strong>{review.name}</strong></p> {/* Renderizar el nombre del usuario */}
                            <div className="rating-display">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className={`star ${review.rating >= star ? 'selected' : ''}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Reviews;
