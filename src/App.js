import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ArticleList from './components/ArticleList/ArticleList';
import ArticleActions from './components/ArticleActions/ArticleActions';
import ArticleNew from './components/ArticleNew/ArticleNew';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route path="/article-detail/:id" element={<ArticleActions />} />
          <Route path="/new" element={<ArticleNew />} />
          <Route path="/article-list" element={<ArticleList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
