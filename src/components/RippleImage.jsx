import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Renders an SVG artwork as a WebGL texture with a cursor-driven ripple and a
 * subtle RGB split — the premium gallery-hover effect, used in the lightbox.
 * Falls back to the raw SVG if WebGL is unavailable. Disposes on unmount.
 */
export default function RippleImage({ svg }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      mount.innerHTML = svg; // graceful fallback
      return;
    }

    const W = () => mount.clientWidth || 1;
    const H = () => mount.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W(), H());
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const texture = new THREE.Texture();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const image = new Image();
    image.onload = () => {
      texture.image = image;
      texture.needsUpdate = true;
    };
    image.src =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

    const uniforms = {
      uTex: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uStrength: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uTex;
        uniform float uTime;
        uniform float uStrength;
        uniform vec2  uMouse;
        void main(){
          vec2 uv = vUv;
          float d = distance(uv, uMouse);
          float ring = sin(d * 34.0 - uTime * 4.0) * exp(-d * 7.0);
          vec2 dir = normalize(uv - uMouse + 1e-4);
          vec2 disp = dir * ring * 0.03 * uStrength;
          // gentle ambient drift, always alive
          disp += vec2(sin(uv.y * 9.0 + uTime) , cos(uv.x * 9.0 + uTime)) * 0.0016;
          vec2 uvd = uv + disp;
          float split = 0.005 * uStrength;
          float r = texture2D(uTex, uvd + dir * split).r;
          float g = texture2D(uTex, uvd).g;
          float b = texture2D(uTex, uvd - dir * split).b;
          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // Interaction
    const targetM = new THREE.Vector2(0.5, 0.5);
    let targetStrength = 0;
    const move = (e) => {
      const r = mount.getBoundingClientRect();
      targetM.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
      targetStrength = 1;
    };
    const leave = () => (targetStrength = 0);
    mount.addEventListener("pointermove", move);
    mount.addEventListener("pointerleave", leave);

    const onResize = () => renderer.setSize(W(), H());
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(targetM, 0.08);
      uniforms.uStrength.value +=
        (targetStrength - uniforms.uStrength.value) * 0.06;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    if (reduce) {
      image.onload = () => {
        texture.image = image;
        texture.needsUpdate = true;
        renderer.render(scene, camera);
      };
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", move);
      mount.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", onResize);
      quad.geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [svg]);

  return <div ref={mountRef} className="h-full w-full" />;
}
