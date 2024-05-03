import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../Store/PostContext'
import { collection, query, where, getDocs } from "firebase/firestore";
import { FireBaseContext } from '../../Store/Context';
function View() {
  const { postDetails } = useContext(PostContext)
  const { FireBaseConfig } = useContext(FireBaseContext)
  const [sellerDetails, setSellerDetails] = useState(null)


  useEffect(() => {
    console.log('post details ', postDetails);
    userDetails()
    
  }, [])
useEffect(()=>{
  console.log('sellerDetails ',sellerDetails);
},[sellerDetails])
  async function userDetails() {
    const userId = postDetails.userId
    const q = query(collection(FireBaseConfig, "users"), where("uid", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setSellerDetails(doc.data())
    });
    
  }

  // Extract the timestamp object
  const timestamp = postDetails.createdAt;

  // Convert timestamp to milliseconds
  const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

  // Create a Date object and format it
  const date = new Date(milliseconds);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',  // Include year
    month: 'short',   // Abbreviated month name
    day: 'numeric',   // Numeric day
  });
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imgUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>

          <span>{formattedDate}</span>

        </div>
        {sellerDetails &&
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{sellerDetails.userName}</p>
            <p>{sellerDetails.phone}</p>
          </div>}
      </div>
    </div>
  );
}
export default View;
