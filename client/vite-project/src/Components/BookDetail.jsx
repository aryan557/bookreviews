import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css'; // Import the CSS

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [review, setReview] = useState("");
    const [allReviews, setAllReviews] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);

    // Fetch Book Details
    useEffect(() => {
        async function fetchBook() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/books/${id}`);
                setBook(response.data.book);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        }
        fetchBook();
    }, [id]);

    // Fetch All Reviews
    useEffect(() => {
        async function fetchAllReviews() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/reviews/${id}`);
                setAllReviews(response.data.reviews);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        }
        fetchAllReviews();
    }, [id]);

    // Submit Review
    async function submitReview(e) {
        e.preventDefault();
        if (!review.trim()) {
            alert("Review cannot be empty!");
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/reviews/${id}`, {
                comment: review,
                user: "65fabd...2f",  // Replace with actual user ID
                rating: 5
            });
            if (response.status === 201) {
                alert("Review added successfully!");
                setAllReviews([...allReviews, response.data.review]);
                setReview("");
            }
        } catch (error) {
            alert("Error while submitting review");
            console.error("Error:", error);
        }
    }

    return (
        <div className="book-detail-container">
            <div>
                <h1>Book Details</h1>
                <img src={book.ImageURL} alt={book.title} className="book-image" />
                <h1 className="book-title">{book.title}</h1>
                <h2 className="book-author">Author: {book.author}</h2>
                <h3 className="book-year">Published Year: {book.year}</h3>
            </div>

            <div className="reviews-section">
                <h1>Reviews</h1>
                <div className="reviews-container">
                    {allReviews.slice(0, showAllReviews ? allReviews.length : 3).map((rev, index) => (
                        <div key={index} className="review-card">
                            <p><strong>Comment:</strong> {rev.comment}</p>
                        </div>
                    ))}
                </div>
                {allReviews.length > 3 && !showAllReviews && (
                    <button className="read-more-btn" onClick={() => setShowAllReviews(true)}>Read More</button>
                )}
                {showAllReviews && allReviews.length > 5 && (
                    <button className="read-more-btn" onClick={() => setShowAllReviews(false)}>Show Less</button>
                )}
            </div>

            <form onSubmit={submitReview} className="review-form">
                <textarea
                    placeholder="Add a review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <button type="submit">Add Review</button>
            </form>
        </div>
    );
};

export default BookDetail;
