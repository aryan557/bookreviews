import './home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState(""); // State for author search
  const [searchYear, setSearchYear] = useState(""); // State for year filter
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/books`);
      setBooks(response.data.books);
    }
    fetchBooks();
  }, []);

  // Filter books based on search criteria
  const filteredBooks = books.filter((book) => {
    const matchesAuthor = book.author.toLowerCase().includes(searchAuthor.toLowerCase());
    const matchesYear = searchYear ? book.year === searchYear : true;
    return matchesAuthor && matchesYear;
  });

  return (
    <div className="home-container">
      <h1 className="home-title">BOOKS</h1>
      
      {/* Admin Login and Logout Buttons */}
      <button className="admin-login-button" onClick={() => navigate('/adminlogin')}>
        Admin Login
      </button>
      <button onClick={() => {
        localStorage.removeItem('token');
        navigate('/');
      }}>
        Logout
      </button>
      
      <br />
      <br />
      <hr />

      {/* Search Filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
          className="search-input"
        />
        <select
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
          className="year-select"
        >
          <option value="">Filter by Year</option>
          {Array.from(new Set(books.map((book) => book.year))).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Books Container */}
      <div className="books-container">
        {filteredBooks.map((book) => {
          return (
            <div
              key={book._id}
              className="book-card"
              onClick={() => {
                navigate(`/book/${book._id}`);
              }}
            >
              <img src={book.ImageURL} alt={book.title} className="book-image" />
              <h1 className="book-title">{book.title}</h1>
              <h2 className="book-author">Author: {book.author}</h2>
              <h3 className="book-year">Published Year: {book.year}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
