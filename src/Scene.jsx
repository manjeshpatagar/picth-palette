import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const Scene = (props, intervalRef, meshRef) => {
  // const fbx = useLoader(FBXLoader, "/cot.fbx")//'https://pitch-palette-3d-assets.s3.ap-south-1.amazonaws.com/Trolley.FBX'
  const fbx = useLoader(FBXLoader, props.path); //'https://pitch-palette-3d-assets.s3.ap-south-1.amazonaws.com/Trolley.FBX'
  if (
    intervalRef.current &&
    intervalRef.current.previousId &&
    intervalRef.current.currentId
  )
    intervalRef.current.previousId = intervalRef.current.currentId;
  const intervalId = setInterval(() => {
    // meshRef.current.rotation.x += 0.01
    // if (meshRef.current?.rotation?.y)
    try {
      if (meshRef?.current && meshRef.current?.rotation)
        meshRef.current.rotation.y += 0.01;
      // meshRef.current.rotation.x += 0.01
    } catch (e) {
      console.log(e);
      clearInterval(intervalId);
    }
    intervalRef.current.currentId = intervalId;
    // console.log('ll')
  }, 100);
  return (
    <>
      {props.path && (
        <primitive {...props} scale={0.5} ref={meshRef} object={fbx} />
      )}
    </>
  );
};

export default Scene;
