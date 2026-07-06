import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Light-theme WebGL halo for the loading screen — a ring of soft particles
 * (graphite with vermilion accents) that assembles, breathes and slowly
 * rotates around the centred logo. Transparent so the cream backdrop shows.
 */
export default function PreloaderScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const W = () => mount.clientWidth || window.innerWidth;
    const H = () => mount.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(W(), H());
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W() / H(), 0.1, 100);
    camera.position.z = 11;

    // --- Particle ring --------------------------------------------------
    const COUNT = 820;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const graphite = new THREE.Color("#27272A");
    const vermilion = new THREE.Color("#E0241B");
    const R = 4.3;

    for (let i = 0; i < COUNT; i++) {
      const ang = Math.random() * Math.PI * 2;
      // Two thin bands + scattered dust for depth
      const band = Math.random();
      const rr =
        band < 0.8
          ? R + (Math.random() - 0.5) * 0.7
          : R * (0.45 + Math.random() * 1.1); // sparse halo
      positions[i * 3 + 0] = Math.cos(ang) * rr;
      positions[i * 3 + 1] = Math.sin(ang) * rr;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;

      const c = Math.random() < 0.22 ? vermilion : graphite;
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 2.2 + 0.8;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const uniforms = {
      uOpacity: { value: 0 },
      uDpr: { value: dpr },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: /* glsl */ `
        attribute float aSize;
        attribute vec3 color;
        uniform float uDpr;
        varying vec3 vColor;
        void main(){
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * uDpr * (90.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform float uOpacity;
        varying vec3 vColor;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.08, d) * uOpacity;
          gl_FragColor = vec4(vColor, a);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    points.scale.setScalar(0.7);
    scene.add(points);

    const onResize = () => {
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const render = () => {
      const t = clock.getElapsedTime();
      const assemble = ease(Math.min(t / 1.2, 1));
      uniforms.uOpacity.value = assemble * 0.95;
      points.scale.setScalar(0.7 + 0.32 * assemble);
      points.rotation.z = t * 0.22;
      points.rotation.x = Math.sin(t * 0.35) * 0.16;
      // gentle breathing
      const breathe = 1 + Math.sin(t * 1.4) * 0.02;
      points.scale.multiplyScalar(breathe / 1);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };

    if (reduce) {
      uniforms.uOpacity.value = 0.9;
      points.scale.setScalar(1);
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
