import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { useContext } from 'react';
import { FireBaseContext } from '../../Store/Context'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
// import { auth } from '../../Firebase/config'
import { doc, setDoc, Timestamp } from "firebase/firestore";
import {Link} from 'react-router-dom'

export default function Signup() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { FireBaseConfig } = useContext(FireBaseContext)
  const [error, setError] = useState(null); // To store error messages
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const addUserData = async (user) => {
    try {
      const data = {
        uid: user.uid,
        userName: userName,
        phone: phone,
        email: user.email,
      };

      await setDoc(doc(FireBaseConfig, "users", user.uid), data);
      navigate('/login')
    } catch (error) {
      console.error('Error adding user data:', error);
      setError(error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('user name is ', userName);
    console.log('email is ', email);
    console.log('password is ', password);
    console.log('getFirebase is ', FireBaseConfig);
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('user credentials are ', user);
        console.log('user UID', user.uid);
        updateProfile(user, { displayName: userName }).then(() => {
          addUserData(user)
        })


        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError(errorCode)
        console.log(errorMessage);
        // ..
      });
  }
  return (
    <div>
      <div className="signupParentDiv">
        <Link to='/'>
        <img width="200px" height="200px" src={Logo}></img>
        </Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <br />
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="Password">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login'><a>Login</a></Link>
      </div>
    </div>
  );
}
