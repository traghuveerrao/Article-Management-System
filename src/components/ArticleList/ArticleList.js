import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase'; // Import Firebase auth and Firestore
import { Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the CSS for the pop-up
import './ArticleList.css';


function ArticleList() {
  const [authUser, setAuthUser] = useState(null);
  const [userArticles, setUserArticles] = useState([]);
  const navigate = useNavigate(); 

  // Check if a user is currently signed in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe(); // Unsubscribe from the onAuthStateChanged listener
  }, []);

  // Fetch the user's articles from Firestore when authUser changes
  useEffect(() => {
    if (authUser) {
      const userUid = authUser.uid;
      const userArticlesRef = db.collection('articles').where('authorId', '==', userUid);
      // console.log(userUid);

      userArticlesRef.onSnapshot((snapshot) => {
        const articles = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          articles.push({ id: doc.id, ...data });
        });
        setUserArticles(articles);
        console.log(articles);
      });
    } else {
      // Clear the articles if no user is signed in
      setUserArticles([]);
    }
  }, [authUser]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign the user out
      navigate('/login'); // Navigate to the login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Function to confirm and delete an article
  const handleDeleteArticle = (articleId) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this article?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await db.collection('articles').doc(articleId).delete();
            } catch (error) {
              console.error('Error deleting article:', error);
            }
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className='listContainer'>
      <div className="top-bar">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2 className="articleListHeader">List of Articles</h2>
      <div className="articleAddButton"> 
        <Link to="/new">
          <button> 
          <span>&#43;</span> Add
          </button>
        </Link>
      </div>
      {userArticles.length === 0 ? (
        <p className='emptyArticleNotification'>You don't have any articles listed yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userArticles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>{new Date(article.createdAt.seconds * 1000).toLocaleString()}</td>
                <td>
                  <Link to={`/article-detail/${article.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDeleteArticle(article.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ArticleList;
