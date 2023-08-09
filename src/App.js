import logo from './logo.svg';
import './App.css';
import { Outlet, Link } from "react-router-dom";
import AuthorForm from './components/AuthorForm';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/author/bookCounts') // Change the URL to your backend endpoint
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>

      <Link to={`addAuthor`}>Add Author</Link> 
      <br></br>
      <Link to={`addBook`}>Add Book</Link> 
      <div>
      <table class="table">
        <thead>
          <tr>
            <th>Author ID</th>
            <th>Author Name</th>
            <th>Book Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((author, index) => (
            <tr key={index}>
              <td>{author[0]}</td>
              <td>{author[1]}</td>
              <td>{author[2]}</td>
              <td><button class="btn btn-primary"><Link to={`/listAuthorBook/${author[3]}`}>Show Books</Link></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>

    
  );
}

export default App;
