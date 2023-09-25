import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../../firebase';
import './ArticleActions.css';

function ArticleActions() {
  const { id } = useParams(); // Get the article ID from the URL
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    title: '',
    author: '',
    content: '',
    tags: '',
    // Add other properties here as needed
  });

  useEffect(() => {
    // Fetch the article data from Firebase based on the ID
    const fetchArticle = async () => {
      try {
        const docRef = db.collection('articles').doc(id);
        const doc = await docRef.get();

        if (doc.exists) {
          // Update the article state with the fetched data
          const data = doc.data();
          setArticle({
            title: data.title || '',
            author: data.author || '',
            content: data.content || '',
            tags: data.tags ? data.tags.join(', ') : '', // Convert tags array to a string
            // Add other properties here as needed
          });
        } else {
          console.log('Article not found');
          // Handle the case where the article doesn't exist
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle(); // Call the fetchArticle function when the component mounts
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSave = async () => {
    // Update the article data in Firebase
    try {
      await db.collection('articles').doc(id).update({
        title: article.title,
        author: article.author,
        content: article.content,
        tags: article.tags.split(',').map((tag) => tag.trim()), // Convert tags string to an array
        // Update other properties as needed
      });

      console.log('Article updated successfully');
      // Navigate back to the article list page ("/article-list")
      navigate('/');
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <div className='articleActionsContainer'>
      <h2 className='articleActionsHeader'>Edit Article</h2>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={article.title} onChange={handleChange} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={article.author} onChange={handleChange} />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content" value={article.content} onChange={handleChange} rows="4" />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input type="text" name="tags" value={article.tags} onChange={handleChange} />
        </div>
        <div className="editArticleButton">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <Link to={`/article-list`}>
            <button>Back to your articles List</button>
          </Link>
        </div>
      </form>
      <div className='propertyRights'>
        <p>Property of Raghuveer</p>
      </div>
    </div>
  );
}

export default ArticleActions;
