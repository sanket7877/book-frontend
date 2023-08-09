import React, { useState } from 'react';

function AuthorForm() {

  const [authorId, setAuthorId] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const formData = {
        authorId: authorId,
        authorName: authorName,
      };
    console.log('Author ID:', authorId);
    console.log('Author Name:', authorName);
    try {
        const response = await fetch('http://localhost:8080/author/add-author', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
            alert("Author Added");
            setAuthorId('');
            setAuthorName('');
         } else {
          console.error('Failed to add author');
        }
      } catch (error) {
        console.error('Error:', error);
      }

  };

  return (
    <div>
      <h2>Add Author</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="authorId">Author ID:</label>
          <input
            type="text"
            id="authorId"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="authorName">Author Name:</label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AuthorForm;
