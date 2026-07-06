import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Global flowing-ink gradient — a single full-viewport WebGL layer that lives
 * behind the entire site. A domain-warped fbm field paints a slow, painterly
 * wash in the brand palette (cream · vermilion · graphite), evolving with time,
 * scroll and cursor. Rendered at reduced resolution and CSS-upscaled (the field
 * is smooth, so it stays crisp) to keep it effectively free on the GPU.
 *
 * Pro touches: half-res render target, pixel-ratio cap, tab-hidden pause,
 * prefers-reduced-motion fallback, full WebGL disposal on unmount.
 */
export default function SceneBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    // render scale — gradient is smooth, upscales invisibly; lighter on phones
    const RES = window.innerWidth < 768 ? 0.4 : 0.55;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5) * RES);
    renderer.setSize(W(), H());
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera(); // pass-through, vertex outputs clip coords

    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(W(), H()) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform float uTime;
        uniform float uScroll;
        uniform vec2  uMouse;
        uniform vec2  uRes;

        float hash(vec2 p){
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float noise(vec2 p){
          vec2 i = floor(p), f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
                     mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
        }
        float fbm(vec2 p){
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 5; i++){
            v += a * noise(p);
            p = p * 2.0 + 17.3;
            a *= 0.5;
          }
          return v;
        }

        void main(){
          vec2 uv = gl_FragCoord.xy / uRes;
          // aspect-correct, gentle zoom
          vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 2.4;

          float t = uTime * 0.035;
          p += (uMouse - 0.5) * 0.5;
          p.y -= uScroll * 0.9;

          // Domain warping (IQ) — flowing ink folds
          vec2 q = vec2(fbm(p + vec2(0.0, t)),
                        fbm(p + vec2(5.2, 1.3) - t));
          vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 0.5),
                        fbm(p + 3.5 * q + vec2(8.3, 2.8) - t * 0.4));
          float f = fbm(p + 3.5 * r);

          // Brand palette
          vec3 cream = vec3(0.980, 0.976, 0.957);
          vec3 sand  = vec3(0.953, 0.910, 0.860);
          vec3 blush = vec3(0.965, 0.847, 0.812);
          vec3 red   = vec3(0.878, 0.141, 0.106);
          vec3 ink   = vec3(0.094, 0.094, 0.106);

          vec3 col = cream;
          col = mix(col, sand,  smoothstep(0.15, 0.85, f));
          col = mix(col, blush, smoothstep(0.35, 0.9, r.x) * 0.6);
          // Soft vermilion blooms where the warp folds tightest
          col = mix(col, red,   smoothstep(0.62, 0.98, r.y) * 0.34);
          // Faint graphite haze for depth
          col = mix(col, ink,   smoothstep(0.78, 1.05, q.y) * 0.10);

          // Paper grain
          float g = hash(gl_FragCoord.xy + t) - 0.5;
          col += g * 0.015;

          // Soft vignette keeps the centre calm for text
          float vig = smoothstep(1.25, 0.35, length(uv - 0.5));
          col = mix(col * 0.985, col, vig);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // --- Interaction ----------------------------------------------------
    const targetM = new THREE.Vector2(0.5, 0.5);
    const onPointerMove = (e) => {
      targetM.set(e.clientX / W(), 1.0 - e.clientY / H());
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let targetScroll = 0;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight || 1;
      targetScroll = window.scrollY / max;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onResize = () => {
      renderer.setSize(W(), H());
      uniforms.uRes.value.set(W() * renderer.getPixelRatio(), H() * renderer.getPixelRatio());
    };
    onResize();
    window.addEventListener("resize", onResize);

    // --- Loop -----------------------------------------------------------
    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;
    let curScroll = 0;

    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(targetM, 0.04);
      curScroll += (targetScroll - curScroll) * 0.06;
      uniforms.uScroll.value = curScroll;
      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(render);
    };

    if (reduce) renderer.render(scene, camera);
    else raf = requestAnimationFrame(render);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce && !running) {
        running = true;
        clock.getDelta();
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- Cleanup --------------------------------------------------------
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-screen w-screen"
    />
  );
}
