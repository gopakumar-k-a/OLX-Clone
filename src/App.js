
import './App.css';
// import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js'
import Login from './Pages/Login.js'
import SignUp from './Pages/Signup.js'
import Create from './Pages/Create.js'
import ViewPost from './Pages/ViewPost.js'
import { userContext } from './Store/Context.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Post from './Store/PostContext.js'


function App() {
  const { setUser } = useContext(userContext)
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('user is ', user);
      setUser(user);
    });
  }, [])

  return (

    <div className="App">
      <Post>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Signup' element={<SignUp />} />
          <Route path='/create' element={<Create />} />
          <Route path='/viewpost' element={<ViewPost />} />
        </Routes>
      </Post>



    </div>

  );
}

export default App;
