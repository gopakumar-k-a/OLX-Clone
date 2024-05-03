import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { doc, getDoc } from "firebase/firestore";
import { FireBaseContext } from '../../Store/Context'
import { collection, getDocs } from "firebase/firestore";
import {PostContext} from '../../Store/PostContext'
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([])
  const { FireBaseConfig } = useContext(FireBaseContext)
  const {setPostDetails}=useContext(PostContext)
  const navigate=useNavigate()
  useEffect(() => {
    getProductData()
    console.log('products are ', products); 
  }, [])

  async function getProductData() {

    const productSnapshot = await getDocs(collection(FireBaseConfig, "products"));
    const fetchedProducts = productSnapshot.docs.map((doc) => doc.data());
    setProducts(fetchedProducts)


  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {/* card start */}
          {
            products ? products.map((product) => {
              // Extract the timestamp object from createdAt
              const timestamp = product.createdAt;

              // Convert timestamp to milliseconds
              const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

              // Create a Date object
              const date = new Date(milliseconds);

              // Format the date using toLocaleDateString (adjust formatting as needed)
              const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });
              return(
                 <div className="card" key={product.id} onClick={()=>{

                   setPostDetails(product)
                   navigate('/viewpost')
                 }
                 }>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.imgUrl} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <p className="name"> {product.category}</p>
                  <span className="kilometer">{product.name}</span>
                </div>
                <div className="date">
                  <span>{formattedDate}</span>
                </div>
              </div>
              )
            }) : ''
          }

          {/* card end */}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
