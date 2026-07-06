import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Section-scoped dark "aurora" — a WebGL layer for the dark sections so the
 * flowing-ink treatment carries across the whole site. Slow vermilion glows
 * drift over a graphite fbm field. Absolutely positioned inside a `relative`
 * section, behind the content. Only renders while on screen (Intersection
 * Observer) to stay cheap. Honours reduced-motion; disposes on unmount.
 */
export default function SectionFlow() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const W = () => mount.clientWidth || 1;
    const H = () => mount.clientHeight || 1;
    const RES = 0.5;

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
    const camera = new THREE.Camera();

    const uniforms = {
      uTime: { value: 0 },
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
        uniform vec2  uRes;

        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p), f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i+vec2(0,0)),hash(i+vec2(1,0)),u.x),
                     mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
        }
        float fbm(vec2 p){
          float v=0.0,a=0.5;
          for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.0+11.1; a*=0.5; }
          return v;
        }
        float glow(vec2 p, vec2 c, float r){
          return smoothstep(r, 0.0, length(p - c));
        }

        void main(){
          vec2 uv = gl_FragCoord.xy / uRes;
          float aspect = uRes.x / uRes.y;
          vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
          float t = uTime * 0.12;

          // Graphite base with subtle organic variation
          float n = fbm(p * 2.2 + t * 0.3);
          vec3 base = mix(vec3(0.086,0.086,0.098), vec3(0.13,0.13,0.15), n);

          // Drifting vermilion glows
          vec2 c1 = vec2(sin(t*0.7)*0.55 - 0.2, cos(t*0.5)*0.32 + 0.1);
          vec2 c2 = vec2(cos(t*0.45)*0.5 + 0.35, sin(t*0.6)*0.4 - 0.15);
          float g = glow(p, c1, 0.75) * 0.55 + glow(p, c2, 0.6) * 0.4;
          g *= 0.5 + 0.5 * fbm(p * 3.0 - t); // break up the glow edges

          vec3 red = vec3(0.878,0.141,0.106);
          vec3 col = base + red * g * 0.28;

          // grain
          col += (hash(gl_FragCoord.xy + t) - 0.5) * 0.02;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const resize = () => {
      renderer.setSize(W(), H());
      uniforms.uRes.value.set(
        W() * renderer.getPixelRatio(),
        H() * renderer.getPixelRatio()
      );
    };
    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const loop = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Render one frame immediately so it's never blank
    renderer.render(scene, camera);

    // Only animate while the section is on screen
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(mount);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
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
      className="absolute inset-0 -z-10 h-full w-full"
    />
  );
}
