import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FireBaseContext, userContext } from '../../Store/Context'
import { doc, setDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategoty] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(userContext)
  const { FireBaseConfig } = useContext(FireBaseContext)
  const navigate = useNavigate()
  const addProductData = async (imageUrl) => {
    try {
      const data = {
        userId: user.uid,
        name: name,
        category: category,
        price: price,
        imgUrl: imageUrl,
        createdAt: Timestamp.now()

      };

      // await setDoc(doc(FireBaseConfig, "products"), data);
      setIsSubmitting(false);

      setDoc(doc(collection(FireBaseConfig, "products")), data).then(() => {
        navigate('/ ')
      })

    } catch (error) {
      console.error('Error adding user data:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true);

    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + image.name); // Create a reference to the image in Firebase Storage
      uploadBytes(storageRef, image).then((snapshot) => {
        console.log('Image uploaded successfully');
        console.log('snap shot meta data.fullpath is ', snapshot.metadata.fullPath);
        const imagePath = snapshot.metadata.fullPath
        getDownloadURL(ref(storage, imagePath))
          .then((imageUrl) => {
            addProductData(imageUrl)
          })
          .catch((error) => {
            // Handle any errors
            console.log(error);
          });
        // addImageData(snapshot)
      }).catch((error) => {
        console.error('Error uploading image:', error);
        // Handle error
      });
    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              value={category}
              onChange={(e) => setCategoty(e.target.value)}
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input" type="number" id="fname" name="Price" />
            <br />
          </form>
          <br />
          {image && <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)}></img>}
          <form>
            <br />
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
