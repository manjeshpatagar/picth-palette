import React, { useEffect, useState, Suspense, useRef } from "react";
import "./index.css";
import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import ProductItem from "../ProductItem/ProductItem";
import book from "./images/book.png";
import computer from "./images/computer.png";
import mobile from "./images/mobile.png";
import fridge from "./images/fridge.png";
import headphone from "./images/headphone.png";

import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import AlertComp from "../AlertComp";


const Navbar = () => {
  const navigate = useNavigate();
  const [shouldShowToast, setShouldShowToast] = useState(false)
  const [clipboardAlertText, setClipboardAlertText] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('48fb1367-0396-442b-8203-0b339bcecbd5');
  const [products, setProducts] = useState([]);
  const [tmpProducts, settmpProducts] = useState([]);
  const meshRef = useRef()
  const intervalRef = useRef({ currentId: null, previousId: null })

  useEffect(() => {
    if (selectedProduct) navigate(`/${selectedProduct}`, { replace: true });
    console.log('selectedProduct::: ', selectedProduct)
    if (intervalRef.current.previousId !== null) {
      clearInterval(intervalRef.current.previousId)
    }
  }, [selectedProduct])

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      // naviƒ¸gator.clipboard API method
      return navigator.clipboard.writeText(text).then(function () {
        setClipboardAlertText('Text copied to clipboard successfully!');
      }, function (err) {
        setClipboardAlertText('Could not copy text: ', err);
      });
    }
  }

  const renderContent = (product) => {
    return (
      <div>

        {/* selectedProduct:{(JSON.stringify(selectedProduct))} */}
        {selectedProduct
          ? <div>
            {/* Product:{(JSON.stringify(product))} */}
            {/* { */}
            <Suspense fallback={<div>Loading</div>}>
              <div style={{
                display: 'grid',
                gridTemplateAreas:
                  `'desc button'
                   'desc .'`,
                justifyContent: 'space-between'
              }}>
                <div style={{ textAlign: 'left', gridArea: 'desc' }}>
                  <p><strong>Title:</strong> {product?.name}</p>
                  <p><strong>Description:</strong> {product?.description}</p>
                </div>
                <div style={{ gridArea: 'button' }}>
                  <Button onClick={() => {
                    setShouldShowToast(true)
                    setTimeout(() => setShouldShowToast(false), 3000)
                    copyToClipboard(window.location.origin + `/embed/${selectedProduct}`)
                    console.log('asdfasfd')
                  }}>Embed Link</Button>
                </div>
              </div>
              {product && product.s3path &&
                <Canvas style={{ width: 600, height: 500, border: '1px solid red' }}>
                  <ambientLight intensity={Math.PI / 5} />
                  <spotLight position={[0, -100, -300]} angle={0.10} penumbra={1} decay={0} intensity={Math.PI} />
                  <pointLight position={[0, -100, -300]} decay={0} intensity={Math.PI} />
                  <Scene position={[product?.["3dConfig"]?.x ?? 0.1, product?.["3dConfig"]?.y ?? -170, product?.["3dConfig"]?.z ?? -340]}
                    path={product.s3path} scale={product?.["3dConfig"]?.scale ?? 0.5} />

                </Canvas>}
            </Suspense>
            {/* } */}
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
    settmpProducts([...products])
  }, [products])
  return (
    <>
      <div style={{ position: 'relative', width: "calc(100vw - 2.5rem)" }}>
        <AlertComp open={shouldShowToast} text={clipboardAlertText} setOpen={setShouldShowToast} />

        <div
          className="container"
          style={{
            margin: "5rem 0 0 5rem",

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
      </div>
    </>
  );
};

export default Navbar;
