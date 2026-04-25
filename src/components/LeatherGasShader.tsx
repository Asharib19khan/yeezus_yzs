'use client';

import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;

  // Colors
  // Navy: #0D104F base, made lighter for visibility
  // Magenta: #FF0088 base, made softer/brighter
  const vec3 cNavy = vec3(0.150, 0.200, 0.550);
  const vec3 cMagenta = vec3(1.0, 0.15, 0.6);

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.15;

    // Organic fluid displacement
    vec2 q = vec2(0.0);
    q.x = fbm(p + vec2(t * 0.5, t * 0.2));
    q.y = fbm(p + vec2(t * 0.3, t * 0.4));

    vec2 r = vec2(0.0);
    r.x = fbm(p + 2.0 * q + vec2(t * 1.2, t * 0.8));
    r.y = fbm(p + 2.0 * q + vec2(t * 0.6, t * 1.5));

    float f = fbm(p + 2.0 * r);

    // Color mixing (Navy base, Magenta fluid highlights)
    float mixFactor = smoothstep(0.1, 0.9, f);
    // Push the mix to be more isolated blobs of magenta, but softer
    mixFactor = pow(mixFactor, 1.4); 
    
    vec3 color = mix(cNavy, cMagenta, mixFactor * 0.85);

    // Matte leather grain (high frequency noise)
    float grain = noise(p * 200.0);
    float fineGrain = noise(p * 400.0);
    float leatherTexture = mix(grain, fineGrain, 0.5);

    // Apply texture as a subtle shadowing to kill glossy highlights
    color *= (0.85 + 0.15 * leatherTexture);
    
    // Add depth shading based on the fluid density
    // Made significantly brighter so it stands out
    color *= (0.6 + 0.6 * f);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function LeatherGasShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      alpha: false, 
      antialias: false,
      powerPreference: "high-performance"
    });
    
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation = gl.getUniformLocation(program, 'uTime');
    const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      // MASSIVE GPU OPTIMIZATION: Render at 25% resolution and let CSS upscale it.
      // This reduces pixel shading cost by 16x.
      const scale = 0.25;
      const width = Math.floor(canvas.clientWidth * scale);
      const height = Math.floor(canvas.clientHeight * scale);
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      const currentTime = performance.now();
      gl.uniform1f(uTimeLocation, (currentTime - startTime) / 1000.0);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
