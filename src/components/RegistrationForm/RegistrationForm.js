import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for navigation
import { auth } from '../../firebase'; // Import the Firebase auth object
import './RegistrationForm.css';

function RegistrationForm() {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    try {
      // Create a user in Firebase Authentication
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);

      // Set the display name for the user
      await userCredential.user.updateProfile({
        displayName: name,
      });

      // User registration successful
      const user = userCredential.user;
      console.log('User registered:', user);

      // Redirect the user to the root route ("/article-list") upon successful registration
      navigate('/');

      // You can add additional logic here, such as creating a user profile in Firestore

    } catch (error) {
      // Handle registration error
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Registration error:', errorCode, errorMessage);
    }
  };

  return (
    <div className='registrationContainer'>
      <h2 className='loginWelcome'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name' />
        </div>
        <div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' />
        </div>
        <div>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' />
        </div>
        <div>
          <button type="submit" >Register</button>
        </div>
      </form>
      <div className="registerButton">
        <h2>Have an Account ?</h2>
        <Link to={`/login`}>
          <button>Login</button>
        </Link>
      </div>
      <div className='propertyRights'>
        <p>Property of Raghuveer</p>
      </div>
    </div>
  );
}

export default RegistrationForm;
