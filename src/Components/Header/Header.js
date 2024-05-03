import React, { useContext, useEffect } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { userContext } from '../../Store/Context'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user,setUser } = useContext(userContext)
  const auth = getAuth();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully.');
      setUser(null)
      navigate('/login')
      // ... Handle successful logout (e.g., redirect to login page)
    } catch (error) {
      console.error('Error signing out:', error);
      // ... Handle logout errors (e.g., display error message to user)
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>navigate('/')}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          {/* {user?<h1>{user.displayName}</h1>:''} */}
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user? <span>{user.displayName}</span>:<span onClick={()=>navigate('/login')}>Login</span>}
          <hr />
        </div>
        {user && <span onClick={handleLogout}>log out</span>}
        <div className="sellMenu" onClick={()=>navigate('/create')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
