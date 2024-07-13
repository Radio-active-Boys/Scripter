import './Workspace.css'
import { createRef, useEffect } from 'react';
import { mat4 } from 'gl-matrix';

const Workspace = () => {
  const canvasRef = createRef();

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
      alert('WebGL not supported');
      return;
    }

    // Create a vertex buffer object (VBO) for the cube
    const cubeVertices = new Float32Array([
      -1, -1, -1,
       1, -1, -1,
       1,  1, -1,
      -1,  1, -1,
      -1, -1,  1,
       1, -1,  1,
       1,  1,  1,
      -1,  1,  1,
    ]);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);

    // Create an index buffer object (IBO) for the cube
    const cubeIndices = new Uint16Array([
      0, 1, 2, 2, 3, 0,
      4, 5, 6, 6, 7, 4,
      0, 4, 5, 5, 1, 0,
      1, 5, 6, 6, 2, 1,
      2, 6, 7, 7, 3, 2,
      3, 7, 4, 4, 0, 3,
    ]);

    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeIndices, gl.STATIC_DRAW);

    // Create a shader program
    const vertexShaderSource = `
      attribute vec3 aVertexPosition;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
      }
    `;

    const fragmentShaderSource = `
      void main() {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error: ', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error: ', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Get attribute location, enable it
    const vertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);

    // Set up the camera and model view matrices
    const modelViewMatrix = mat4.create();
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);
    gl.useProgram(program);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uModelViewMatrix'), false, modelViewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uProjectionMatrix'), false, projectionMatrix);

    // Render the scene
    function animate() {
      requestAnimationFrame(animate);

      // Update the model view matrix
      mat4.rotate(modelViewMatrix, modelViewMatrix, 0.01, [0, 1, 0]);
      gl.uniformMatrix4fv(gl.getUniformLocation(program, 'uModelViewMatrix'), false, modelViewMatrix);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0);
    }

    animate();
  }, [canvasRef]);

  return <div className='workspace'>
    <canvas ref={canvasRef} id="canvas" width="1920" height="1024" />
  </div>;
}

export default Workspace;
