import React, { useEffect, useState, Suspense, useRef } from "react";
import "./index.css";
import searchIcon from "./images/searchbar.png";
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import ProductItem from "../ProductItem/ProductItem";
import book from "./images/book.png";
import computer from "./images/computer.png";
import mobile from "./images/mobile.png";
import fridge from "./images/fridge.png";
import headphone from "./images/headphone.png";

import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState();
  const [products, setProducts] = useState([]);
  const [tmpProducts, settmpProducts] = useState([]);
  const meshRef = useRef()
  const intervalRef = useRef({ currentId: null, previousId: null })

  useEffect(() => {
    // if (selectedProduct) navigate(`/${selectedProduct}`, { replace: true });
    console.log('selectedProduct::: ', selectedProduct)
    if (intervalRef.current.previousId !== null) {
      clearInterval(intervalRef.current.previousId)
    }
  }, [selectedProduct])

  const renderContent = (product) => {
    return (
      <div>
        {selectedProduct
          ? <div>
            {/* Product:{(JSON.stringify(product.s3path))} */}
            {
              <Suspense fallback={<div>Loading</div>}>
                <div style={{ textAlign: 'left' }}>
                  <p><strong>Title:</strong> {product?.name}</p>
                  <p><strong>Description:</strong> {product?.description}</p>
                </div>
                <Canvas style={{ width: 600, height: 500, border: '1px solid red' }}>
                  <ambientLight intensity={Math.PI / 5} />
                  <spotLight position={[0, -100, -300]} angle={0.10} penumbra={1} decay={0} intensity={Math.PI} />
                  <pointLight position={[0, -100, -300]} decay={0} intensity={Math.PI} />
                  {/* <Box position={[0, 0, -100]} /> */}
                  <Scene position={[product?.["3dConfig"]?.x ?? 0.1, product?.["3dConfig"]?.y ?? -170, product?.["3dConfig"]?.z ?? -340]}
                    path={product.s3path} scale={product?.["3dConfig"]?.scale ?? 0.5} />

                </Canvas>
                {/* <div>
                  <button onClick={e => { meshRef.current.rotation.x += 0.01 }}>+</button>
                  <button onClick={e => { meshRef.current.rotation.x -= 0.01 }}>-</button>
                  <button onClick={e => { meshRef.current.position.z -= 10 }}>z</button>
                  <button onClick={e => { meshRef.current.position.x -= 10 }}>x</button>
                  <button onClick={e => { meshRef.current.position.y -= 10 }}>y</button>
                  <button onClick={e => { meshRef.current.rotation.x -= 0.01 }}>-</button>

                </div> */}
              </Suspense>
            }
          </div>
          : "Please select a product."}
      </div>
    );
  };
  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    fetch('https://3jue1fo3z9.execute-api.ap-south-1.amazonaws.com/dev/PP_FetchProducts', {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        // Include other headers if necessary
        'Authorization': "Bearer " + localStorage.getItem("token")
      },

    })
      .then(response => {
        if (response.status === 401) {
          clearInterval(intervalRef.current.currentId)
          clearInterval(intervalRef.current.previousId)
          navigate('/login')
        }
        if (!response.ok) {
          clearInterval(intervalRef.current.currentId)
          clearInterval(intervalRef.current.previousId)
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Handle the response data
        setProducts(data)
        console.log('Success:', data);

      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
  }

  function Scene(props) {


    // const fbx = useLoader(FBXLoader, "/cot.fbx")//'https://pitch-palette-3d-assets.s3.ap-south-1.amazonaws.com/Trolley.FBX'
    const fbx = useLoader(FBXLoader, props.path)//'https://pitch-palette-3d-assets.s3.ap-south-1.amazonaws.com/Trolley.FBX'
    intervalRef.current.previousId = intervalRef.current.currentId
    const intervalId = setInterval(() => {
      // meshRef.current.rotation.x += 0.01
      // if (meshRef.current?.rotation?.y)
      try {
        if (meshRef?.current && meshRef.current?.rotation)
          meshRef.current.rotation.y += 0.01
        // meshRef.current.rotation.x += 0.01
      } catch (e) {
        console.log(e)
        clearInterval(intervalId)
      }
      intervalRef.current.currentId = intervalId
      // console.log('ll')
    }, 100)
    return (
      <>
        {props.path &&
          <primitive   {...props} scale={0.5} ref={meshRef} object={fbx} />}
      </>

    )

  }


  const products1 = [
    {
      id: 1,
      img: book,
      name: "Book",
      description: "Product description",
    },
    {
      id: 2,
      name: "Computer",
      img: computer,
      description: "Product description",
    },
    {
      id: 3,
      name: "Fridge",
      img: fridge,
      description: "Product description",
    },
    {
      id: 4,
      name: "Headphone",
      img: headphone,
      description: "Product description",
    },
    {
      id: 5,
      name: "Mobile",
      img: mobile,
      description: "Product description",
    },
    {
      id: 6,
      img: book,
      name: "Book",
      description: "Product description",
    },
    {
      id: 7,
      name: "Computer",
      img: computer,
      description: "Product description",
    },
    {
      id: 8,
      name: "Fridge",
      img: fridge,
      description: "Product description",
    },
    {
      id: 9,
      name: "Headphone",
      img: headphone,
      description: "Product description",
    },
    {
      id: 10,
      name: "Mobile",
      img: mobile,
      description: "Product description",
    },
    {
      id: 11,
      name: "Fridge",
      img: fridge,
      description: "Product description",
    },
    {
      id: 12,
      name: "Headphone",
      img: headphone,
      description: "Product description",
    },
    {
      id: 13,
      name: "Mobile",
      img: mobile,
      description: "Product description",
    },
    {
      id: 14,
      name: "Fridge",
      img: fridge,
      description: "Product description",
    },


  ];

  useEffect(() => {
    settmpProducts([...products, { id: 1, name: "pot", s3path: "/pot.fbx", description: "flower pot. Show plant!!!" }])
  }, [products])
  return (

    <div
      className="container"
      style={{
        margin: "5rem 0 0 5rem",
        width: "100%"
      }}
    >
      <div className="sidebar">

        <div className="product-list">
          {/* {JSON.stringify([...products, { id: 1, name: "pot", s3path: "/pot.fbx" }])} */}
          {tmpProducts.map((product) => (
            <ProductItem
              selectedProduct={selectedProduct}
              key={product.id}
              product={product}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      <div className="content">{renderContent(tmpProducts.filter(d => d.id === selectedProduct)[0])}</div>
    </div>
  );
};

export default Navbar;
