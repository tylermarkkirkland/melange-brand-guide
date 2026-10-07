import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { raysVertex, raysFragment, dustVertex, dustFragment } from '../../lib/shaders.js';
import { sceneState } from '../../lib/sceneState.js';
import './GuideScene.css';

// Camera, pillar size and lighting are the website's landing values
const FOV = 35;
const CAM_Z = 10;
const MARK_HEIGHT = 2.5;
const MARK_Y = 0.55;
const LIGHT = {
  keyX: -6, keyY: 3.5, keyZ: 6.9, keyIntensity: 8.9,
  environment: 0.76, roughness: 0.34, bloomStrength: 0.19, bloomThreshold: 0.96,
};

const clamp01 = (x) => Math.min(1, Math.max(0, x));
// the logo chapter keeps only a trace of the landing's sunbeams
const BEAMS = 0.25;
const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/**
 * The one WebGL scene in the guide: the site's sunlit pillar, shown only in the
 * Logo chapter's title card, where it makes one slow turn. The chapter drives it
 * through `sceneState`; the rest of the time it stops rendering.
 * (The opening is a presentation title slide and does not use it.)
 */
export default function GuideScene({ reducedMotion }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const isSmall = window.innerWidth < 768;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, CAM_Z);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentRotation.set(Math.PI * 0.42, 0.5, 0);

    // fully lit from the start: the landing's sunrise belongs to the website
    const key = new THREE.DirectionalLight(0xffe2c0, LIGHT.keyIntensity);
    key.position.set(LIGHT.keyX, LIGHT.keyY, LIGHT.keyZ);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8fb6d4, 1.2);
    rim.position.set(4, 2, -5);
    scene.add(rim);
    scene.environmentIntensity = LIGHT.environment;

    const shared = {
      uRes: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uTime: { value: 0 },
      uSun: { value: 1 },
    };

    const makeRays = (depth, order) => {
      const mat = new THREE.ShaderMaterial({
        uniforms: { ...shared, uDepth: { value: depth }, uGain: { value: 1 } },
        vertexShader: raysVertex,
        fragmentShader: raysFragment,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
      mesh.frustumCulled = false;
      mesh.renderOrder = order;
      scene.add(mesh);
      return mesh;
    };
    const raysBack = makeRays(0.9999, -10);
    const raysFront = makeRays(0.0, 10);

    const count = isSmall ? 1400 : 3200;
    const box = new THREE.Vector3(7, 4.5, 6);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * box.x;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * box.y;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * box.z;
      for (let k = 0; k < 4; k++) seeds[i * 4 + k] = Math.random();
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dustGeo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 4));
    const dustMat = new THREE.ShaderMaterial({
      uniforms: {
        ...shared,
        uBox: { value: box },
        uFall: { value: new THREE.Vector3(0.42, -1, -0.1).normalize() },
        uMouse: { value: new THREE.Vector2(0, -3) },
        uMouseStrength: { value: 0 },
        uAspect: { value: camera.aspect },
        uTanHalf: { value: Math.tan(THREE.MathUtils.degToRad(FOV / 2)) },
        uCamZ: { value: CAM_Z },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uRayVis: { value: 1 },
        uAmbient: { value: 0 },
      },
      vertexShader: dustVertex,
      fragmentShader: dustFragment,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    dust.frustumCulled = false;
    scene.add(dust);

    const markGroup = new THREE.Group();
    markGroup.position.y = MARK_Y;
    scene.add(markGroup);
    new GLTFLoader().load('/models/melange-mark.glb', (gltf) => {
      const mark = gltf.scene;
      mark.scale.setScalar(MARK_HEIGHT / 600);
      mark.traverse((o) => {
        if (o.isMesh) {
          o.material.color = new THREE.Color(0x8c9196);
          o.material.metalness = 0.9;
          o.material.roughness = LIGHT.roughness;
        }
      });
      markGroup.add(mark);
    });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(mount.clientWidth, mount.clientHeight), LIGHT.bloomStrength, 0.5, LIGHT.bloomThreshold);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // Pointer, smoothed: the dust eases apart and the pillar leans rather than snaps
    const target = new THREE.Vector2(0, -3);
    const pointer = new THREE.Vector2(0, -3);
    let pointerIn = 0;
    let pointerStrength = 0;
    const tilt = { x: 0, y: 0 };
    const onMove = (e) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      pointerIn = 1;
    };
    const onLeave = () => { pointerIn = 0; };
    if (!reducedMotion) {
      window.addEventListener('pointermove', onMove);
      document.addEventListener('pointerleave', onLeave);
    }

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      shared.uRes.value.set(w, h);
      dustMat.uniforms.uAspect.value = camera.aspect;
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(mount);

    const start = performance.now();
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const { logo, logoTurn } = sceneState;
      mount.style.opacity = logo;
      if (logo < 0.001) return; // nothing to see: skip the render entirely

      const seconds = reducedMotion ? 12 : (performance.now() - start) / 1000;
      shared.uTime.value = seconds;

      pointer.lerp(target, 0.06);
      pointerStrength += ((pointerIn ? 1 : 0) - pointerStrength) * 0.04;
      dustMat.uniforms.uMouse.value.copy(pointer);
      dustMat.uniforms.uMouseStrength.value = pointerStrength;

      const beams = BEAMS * logo;
      raysBack.material.uniforms.uGain.value = beams;
      raysFront.material.uniforms.uGain.value = 0.22 * beams;
      dustMat.uniforms.uRayVis.value = beams;
      dustMat.uniforms.uAmbient.value = 0.3 * logo;


      if (!reducedMotion && finePointer) {
        const dx = pointer.x * camera.aspect;
        const dy = pointer.y - MARK_Y / 2.8;
        const near = clamp01(1 - Math.hypot(dx, dy) / 1.25) * pointerStrength;
        const proximity = near * near * (3 - 2 * near);
        tilt.y += (Math.max(-1, Math.min(1, dx / 1.25)) * 0.34 * proximity - tilt.y) * 0.07;
        tilt.x += (-Math.max(-1, Math.min(1, dy / 1.25)) * 0.24 * proximity - tilt.x) * 0.07;
      }

      // In the logo chapter the pillar makes one full, slow turn as you scroll
      const turn = reducedMotion ? 0 : easeInOutCubic(logoTurn) * Math.PI * 2;
      const idle = reducedMotion ? 0 : Math.sin(seconds * 0.22) * 0.04;
      markGroup.rotation.y = idle + turn + tilt.y;
      markGroup.rotation.x = tilt.x;
      markGroup.position.y = MARK_Y + (reducedMotion ? 0 : Math.sin(seconds * 0.5) * 0.02);

      composer.render();
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      resizeObserver.disconnect();
      dustGeo.dispose();
      dustMat.dispose();
      raysBack.material.dispose();
      raysFront.material.dispose();
      pmrem.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  return <div className="guide-scene" ref={mountRef} aria-hidden="true" />;
}
