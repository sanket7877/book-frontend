import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
function AddBook() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(Number);
  const [authorId, setAuthorId] = useState(Number);
  const [authors, setAuthors] = useState([]); // State to hold the fetched authors
  const [category, setCategory] = useState([]); // State to hold the fetched authors
  const [selectedDate, setSelectedDate] = useState('');
 const [bookdData,setBookData] = useState([])
  const { bookId } = useParams();
const handleSubmit = async (e) => {

    e.preventDefault();
    if(bookId==null){
    const formData = {
        title: title,
        description: description,
        categoryId:categoryId,
        authorId:authorId,
        releaseData:selectedDate    
      };
    try {
        const response = await fetch('http://localhost:8080/book/add-book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
            alert("Book Added");
          // Reset the form after successful submission
          
         } else {
          console.error('Failed to add Book');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }   else{
        const formData = {
            bookId:bookId,
            title: title,
            description: description,
            categoryId:categoryId,
            authorId:authorId,
            releaseData:selectedDate,
            edit:true  
          };
        try {
            console.log(formData);
            const response = await fetch('http://localhost:8080/book/add-book', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (response.ok) {
                alert("Book Edited");
                setTitle('');
                setDescription('');
                setAuthorId('');
                setCategoryId('');
              // Reset the form after successful submission
             } else {
              console.error('Failed to add Book');
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

  };

  useEffect(() => {
    fetch('http://localhost:8080/author/get-all-authors')
      .then(response => response.json())
      .then(data => setAuthors(data))
      .catch(error => console.error('Error fetching authors:', error));

      fetch('http://localhost:8080/category/get-all-category')
      .then(response => response.json())
      .then(data => setCategory(data))
      .catch(error => console.error('Error fetching authors:', error));

     if(bookId!=null){
        fetch('http://localhost:8080/book/find-by-book/'+bookId)
        .then(response => response.json())
        .then(data => {
            setTitle(data.title);
            setDescription(data.description);
            setAuthorId(data.author.authorId);
            setCategoryId(data.category.categoryId);
            setSelectedDate(data.releaseDate);
        })
        .catch(error => console.error('Error fetching authors:', error));
        setTitle(bookdData.title);
    }
      
  }, []); 

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  return (
    <div>
      <h2>Add Book  </h2><div class="container text-center">

      <form onSubmit={handleSubmit}>
      <div class="col-8">

          <label for="exampleFormControlInput1" class="form-label">Title </label>
          <input
            type="text"
            id="title"
            class="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="col-8">
          <label for="exampleFormControlInput1" class="form-label">Description</label>
          <input
            type="text"
            class="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div class="col-8">
          <label for="exampleFormControlInput1" class="form-label">Select Author:</label>
          <select id="selectAuthor" class="form-control" value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
            <option value="">Select an author...</option>
            {authors.map(author => (
              <option key={author.authorId} value={author.authorId}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div class="col-8">
          <label for="exampleFormControlInput1" class="form-label">Select Author:</label>
          <select id="selectAuthor" class="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select a Category</option>
            {category.map(cat => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          
          <div class="col-8">
          <label for="exampleFormControlInput1" class="form-label">Select Date:</label>
                <input
                type="date" class="form-control"
                value={selectedDate}
                onChange={handleDateChange}
                />
          </div>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default AddBook;
