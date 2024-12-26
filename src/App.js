import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import UsersPage from './components/user';
import Search from './components/search';
import Card from './components/card';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/userPage" element={<UsersPage/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/card" element={<Card/>} />
          </Routes>
      </BrowserRouter>
  );
  
}

export default App;
