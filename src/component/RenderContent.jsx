import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Scene from '../Scene';

const RenderContent = (selectedProduct, product, intervalRef, meshRef) => {
  console.log(selectedProduct, product, intervalRef, meshRef);
  return (
    <div>
      {selectedProduct ? (
        <div>
          Product:{JSON.stringify(product.s3path)}
          <>
            <div style={{ textAlign: 'left' }}>
              <p>
                <strong>Title:</strong> {product?.name}
              </p>
              <p>
                <strong>Description:</strong> {product?.description}
              </p>
            </div>
            {product.s3path && (
              <Canvas
                style={{ width: 600, height: 500, border: '1px solid red' }}
              >
                <ambientLight intensity={Math.PI / 5} />
                <spotLight
                  position={[0, -100, -300]}
                  angle={0.1}
                  penumbra={1}
                  decay={0}
                  intensity={Math.PI}
                />
                <pointLight
                  position={[0, -100, -300]}
                  decay={0}
                  intensity={Math.PI}
                />
                {/* <Box position={[0, 0, -100]} /> */}

                <Scene
                  position={[
                    product?.['3dConfig']?.x ?? 0.1,
                    product?.['3dConfig']?.y ?? -170,
                    product?.['3dConfig']?.z ?? -340,
                  ]}
                  path={product.s3path}
                  scale={product?.['3dConfig']?.scale ?? 0.5}
                  intervalRef={intervalRef}
                  meshRef={meshRef}
                />
              </Canvas>
            )}
          </>
          {/* <div>
              <button onClick={e => { meshRef.current.rotation.x += 0.01 }}>+</button>
              <button onClick={e => { meshRef.current.rotation.x -= 0.01 }}>-</button>
              <button onClick={e => { meshRef.current.position.z -= 10 }}>z</button>
              <button onClick={e => { meshRef.current.position.x -= 10 }}>x</button>
              <button onClick={e => { meshRef.current.position.y -= 10 }}>y</button>
              <button onClick={e => { meshRef.current.rotation.x -= 0.01 }}>-</button>

            </div> */}
        </div>
      ) : (
        'Please select a product.'
      )}
    </div>
  );
};

export default RenderContent;
