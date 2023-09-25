import React, { useState } from 'react';
import { db, auth } from '../../firebase'; // Import Firebase auth and Firestore
import { useNavigate, Link } from 'react-router-dom';
import './ArticleNew.css';

function ArticleNew() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a user is logged in
    const user = auth.currentUser;
    if (!user) {
      // User is not logged in, handle accordingly (e.g., show an error message)
      return;
    }

    const { title, author, content, tags } = formData;

    try {
      // Add a new article to Firestore
      const articleRef = await db.collection('articles').add({
        title,
        content,
        tags: tags.split(',').map((tag) => tag.trim()), // Split tags by comma and trim whitespace
        author, // You can use the user's display name or other user data
        authorId: user.uid, // Store the user's UID for reference
        createdAt: new Date(),
      });

      console.log('Article created with ID:', articleRef.id);

      // Redirect to the user's article list page ("/article-list")
      navigate('/article-list');
    } catch (error) {
      // Handle article creation error
      console.error('Article creation error:', error);
    }
  };

  return (
    <div className='newArticleContainer'>
      <h2 className='newArticleHeader'>Create New Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
      <Link to={`/article-list`}>
        <button>Back to your articles List</button>
      </Link>
    </div>
  );
}

export default ArticleNew;
