import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";

function ListAuthorBook() {
    const { authorId } = useParams();
    const [books, setBooks] = useState([]);

    const fetchBooks = () =>{
        axios.get('http://localhost:8080/book/get-author-books/'+authorId) // Replace with your actual API endpoint
        .then(response => setBooks(response.data))
        .catch(error => console.error('Error fetching books:', error));
  
    }
    useEffect(() => {
        fetchBooks();
      }, []);

      const handleDelete = (bookId) => {
        axios.delete(`http://localhost:8080/book/delete-boook-by-id/${bookId}`)
          .then(() => {
            console.log('Book deleted successfully.');
            alert("Book deleted");
            fetchBooks(); // Fetch updated book list
          })
          .catch(error => console.error('Error deleting book:', error));
      };
    return (
      <div class="container">
            
            <h2>Book List</h2>
            
            <div>
                {books.map(book => (
                <div class="card" style={{width: "18rem"}}>
                   <div class="card-body">
                    <h5 class="card-title">{book.title}</h5>
                    <p class="card-text">Description: {book.description}</p>
                    <p class="card-text">Author: {book.author.name}</p>
                    <p class="card-text">Category : {book.category.categoryName}</p>
                    <p class="card-text">Release Date: {book.releaseDate}</p>
                    <button class="btn btn-danger"  onClick={() => handleDelete(book.bookId)}>Delete</button>
                    <button class="btn btn-info"><Link to={`/editBook/${book.bookId}`}>Edit</Link></button>
                    </div>
                </div>
                ))}
            </div>
        </div>
      );
}

export default ListAuthorBook;
