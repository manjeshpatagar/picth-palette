import React, { useEffect, useState, Suspense, useRef } from "react";
import "./index.css";
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import ProductItem from "../ProductItem/ProductItem";

import { useParams } from 'react-router-dom';


const Navbar = () => {
  const { id } = useParams();
  const [product, setProduct] = useState()
  const meshRef = useRef()
  const intervalRef = useRef({ currentId: null, previousId: null })

  useEffect(() => {
    console.log('selectedProduct::: ', id)
    if (intervalRef.current.previousId !== null) {
      clearInterval(intervalRef.current.previousId)
    }
    fetch(`https://1pqa07f6jj.execute-api.ap-south-1.amazonaws.com/default/PP_EmbeddedFetchProducts?id=${id}`, { //48fb1367-0396-442b-8203-0b339bcecbd5
      method: 'GET',
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
        setProduct(data)
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])

  const renderContent = (product) => {
    return (
      <div>
        {product
          ? <div>
            {/* Product:{(JSON.stringify(product))} */}
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
          : "Loading..."}
      </div>
    );
  };




  function Scene(props) {
    const fbx = useLoader(FBXLoader, props.path)
    intervalRef.current.previousId = intervalRef.current.currentId
    const intervalId = setInterval(() => {
      try {
        if (meshRef?.current && meshRef.current?.rotation)
          meshRef.current.rotation.y += 0.01
      } catch (e) {
        console.log(e)
        clearInterval(intervalId)
      }
      intervalRef.current.currentId = intervalId
    }, 100)
    return (
      <>
        {props.path &&
          <primitive   {...props} scale={0.5} ref={meshRef} object={fbx} />}
      </>

    )

  }

  return (



    <>{renderContent(product)}</>

  );
};

export default Navbar;
