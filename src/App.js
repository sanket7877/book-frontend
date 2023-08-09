import logo from './logo.svg';
import './App.css';
import { Outlet, Link,useNavigate } from "react-router-dom";
import AuthorForm from './components/AuthorForm';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8080/author/bookCounts') // Change the URL to your backend endpoint
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = async (e) =>{
    console.log(e);
    navigate('/listAuthorBook/'+e);
  }
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
          <Link class="nav-link" to={`addAuthor`}>Add Author</Link> 
          </li>
          <li class="nav-item">
            <Link class="nav-link"  to={`addBook`}>Add Book</Link> 
          </li>
        </ul>
      </div>
    </nav>

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
              <td><button class="btn btn-primary" onClick={()=>handleSubmit(author[3])}>Show Books</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>

    
  );
}

export default App;
