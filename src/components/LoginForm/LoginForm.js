import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css';

// Create a separate component for the error popup
function ErrorPopup({ message, onClose }) {
  return (
    <div className="popup">
      <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <p>{message}</p>
    </div>
  );
}


function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showNoAccountPopup, setShowNoAccountPopup] = useState(false); // State for the "no account" popup
  const [loginError, setLoginError] = useState(null); // State for login error message

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      // Attempt to log in the user with Firebase Authentication
      await auth.signInWithEmailAndPassword(email, password);

      // Redirect to the root route ("/article-list") upon successful login
      navigate('/article-list');
    } catch (error) {
      // Handle login error
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/user-not-found') {
        // Show the "no account" popup if user not found
        setShowNoAccountPopup(true);
        setLoginError(null); // Clear any previous login error
      } else {
        // Show the login error message
        setShowNoAccountPopup(false); // Hide the "no account" popup
        setLoginError(errorMessage);
      }
    }
  };

  return (
    <div className='loginContainer'>
      <h2 className='loginWelcome'>Welcome</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder='Email' />
        </div>
        <div>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder='Password' />
        </div>
        <div>
          <button type="submit">LOGIN</button>
        </div>
      </form>
      <div className="registerButton">
        <h2>Don't have an Account ?</h2>
        <Link to={`/register`}>
          <button>Sign Up</button>
        </Link>
      </div>

      {/* Conditionally render the "No Account" popup */}
      {showNoAccountPopup && <ErrorPopup message="You don't have an account. Please register." onClose={() => setShowNoAccountPopup(false)} />}

      {/* Display login error message */}
      {loginError && <ErrorPopup message="Please Enter Valid Login Details" onClose={() => setLoginError(null)} />}
      <div className='propertyRights'>
        <p>Property of Raghuveer</p>
      </div>
    </div>
  );
}

export default LoginForm;
