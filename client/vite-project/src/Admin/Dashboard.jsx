import './dashboard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/books`);
      console.log(response.data);
      setBooks(response.data.books);
    }

    fetchBooks();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/Login"); // Redirect to login
  };

  // Filter and search logic
  const filteredBooks = books.filter((book) => {
    const matchesSearchQuery =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilterYear = filterYear ? book.year === filterYear : true;

    return matchesSearchQuery && matchesFilterYear;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">ADMIN DASHBOARD</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <button className="add-book-button" onClick={() => navigate('/addbook')}>
        ADD BOOK
      </button>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filter by Year */}
      <div className="filter-container">
        <select className="filter-select" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
          <option value="">Filter by Year</option>
          {Array.from(new Set(books.map((book) => book.year))).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Books container with flex layout */}
      <div className="books-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.ImageURL} alt={book.title} className="book-image" />
              <h2 className="book-title">{book.title}</h2>
              <h3 className="book-author">Author: {book.author}</h3>
              <p className="book-year">Published Year: {book.year}</p>
            </div>
          ))
        ) : (
          <p>No books found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}
