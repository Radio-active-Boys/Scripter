import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import './Workspace.css'

const Workspace = () => {
  const canvasRef = useRef(null);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  let renderer;

  useEffect(() => {
    if (canvasRef.current) {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true
      });

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshMatcapMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);

      cube.rotateX(0.5);
      cube.rotateY(0.5);
      scene.add(cube);

      camera.position.z = 5;
        renderer.render(scene, camera);
    }
  }, [canvasRef]);

  return <div className='workspace'>
    sdfd
    <canvas ref={canvasRef} id="canvas" />
  </div>;
}

export default Workspace;