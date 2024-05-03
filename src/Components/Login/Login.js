import { useState, useEffect, useContext } from 'react'
import Logo from '../../olx-logo.png';
import './Login.css';
import { FireBaseContext } from '../../Store/Context'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {userContext} from '../../Store/Context'
import {Link} from 'react-router-dom'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error,setError]=useState('')
  const navigate=useNavigate()
  // const { FireBaseConfig } = useContext(FireBaseContext)
  // const userName=useContext(userContext)
  // useEffect(() => {
  //   console.log('email is ', email);
  //   console.log('password is ', password);
  // }, [email,password])
  const handleSignIn = (e) => {
    e.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('log in success');
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        setError('Email or password is incorrect')
        console.log(errorMessage);
      });
  }
  return (
    <div>
      <div className="loginParentDiv">
        <Link to='/'><img width="200px" height="200px" src={Logo}></img></Link>
        <form onSubmit={handleSignIn}>
          <label htmlFor="fname">Email</label>
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
          <label htmlFor="lname">Password</label>
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
          <br />
          <br />
         {error &&  <p style={{color:'red'}}>{error}</p>}
          <button>Login</button>
        </form>
        <a href='#' onClick={()=> navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
