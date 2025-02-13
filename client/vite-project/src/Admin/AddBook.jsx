import './AddBook.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [ImageURL, setImageURL] = useState(null);

  const navigate = useNavigate();

  const UploadFile = async () => {
    if (!ImageURL) {
      console.log('No image selected');
      return null;
    }
    const data = new FormData();
    data.append('file', ImageURL);
    data.append('upload_preset', 'images_preset');

    try {
      let cloudName = 'dv3vxqkwd';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  async function addBook(e) {
    e.preventDefault();
    const uploadedImageURL = await UploadFile();
    if (!uploadedImageURL) {
      alert('Error uploading Image');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/books/`,
        {
          title,
          author,
          year,
          ImageURL: uploadedImageURL,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.status == 200) {
        alert('Book added successfully!!');
        navigate('/admin/dashboard');
        return;
      }
      alert('Error adding book!!');
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="add-book-container">
      <h1 className="add-book-title">Add New Book</h1>
      <form onSubmit={addBook} className="add-book-form">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          required
          className="add-book-input"
        />
        <input
          type="text"
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="add-book-input"
        />
        <input
          type="text"
          placeholder="Launched Year"
          onChange={(e) => setYear(e.target.value)}
          required
          className="add-book-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageURL(e.target.files[0])}
          required
          className="add-book-file-input"
        />
        <button type="submit" className="add-book-button">
          Add Book
        </button>
      </form>
    </div>
  );
}
