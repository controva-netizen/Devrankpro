import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { platformImages } from '@/data/content';
import BorderButton from '@/components/shared/BorderButton';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  #define PI 3.141592653

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    float distanceX = abs(worldPosition.x - 0.0);
    float numStacks = 8.0;
    float stackIdx = 0.0;
    for (float i = 0.0; i < numStacks; i++) {
      if (distanceX >= i && distanceX < i + 1.0) {
        stackIdx = i;
        break;
      }
    }
    float delay = stackIdx * 0.125;
    float t = fract(uTime * 0.35 + delay) * (1.0 / 0.7);
    float yProgress = smoothstep(0.0, 0.3, t);
    float scaleProgress = smoothstep(0.0, 0.25, t);
    yProgress = 1.0 - pow(1.0 - yProgress, 3.0);
    scaleProgress = 1.0 - pow(1.0 - scaleProgress, 3.0);
    vec2 centeredUv = (uv - 0.5) * 2.0;
    float angle = atan(centeredUv.y, centeredUv.x);
    float radius = length(centeredUv);
    float bulgeStrength = (1.0 - pow(radius, 3.0)) * 0.175 * sin(yProgress * PI);
    pos.z += bulgeStrength;
    pos.y *= scaleProgress;
    pos.y += (-1.0 + yProgress) * 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uGrayScale;
  uniform vec2 uPlaneSizes;
  uniform vec2 uImageSizes;
  varying vec2 vUv;

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec4 texColor = texture2D(uTexture, uv);
    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 finalColor = mix(vec3(gray), texColor.rgb, uGrayScale);
    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;

const CarouselConfig = {
  imageSize: [1.8, 1.2] as [number, number],
  radius: 6.2,
  gap: 0.15,
  speed: 0.2,
  direction: 'horizontal' as const,
  dragFactor: 0.003,
  wheelFactor: 0.005,
  tilt: 0.55,
};

function ImageCard({
  imgUrl,
  position,
  rotationY,
  imageSize,
  tilt,
}: {
  imgUrl: string;
  position: [number, number, number];
  rotationY: number;
  imageSize: [number, number];
  radius: number;
  gap: number;
  tilt: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imgUrl);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(imageSize[0], imageSize[1], 32, 32);
    geo.computeVertexNormals();
    return geo;
  }, [imageSize]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uGrayScale: { value: 1.0 },
      uPlaneSizes: { value: new THREE.Vector2(imageSize[0], imageSize[1]) },
      uImageSizes: { value: new THREE.Vector2((texture.image as HTMLImageElement)?.width || 600, (texture.image as HTMLImageElement)?.height || 400) },
    }),
    [texture, imageSize]
  );

  useFrame(() => {
    if (groupRef.current) {
      const targetTiltX = rotationY * tilt;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetTiltX,
        0.08
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -targetTiltX * 0.05,
        0.08
      );
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += 0.016;
    }
  });

  return (
    <group ref={groupRef} position={new THREE.Vector3(...position)} rotation={[0, rotationY, 0]}>
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <primitive object={geometry} attach="geometry" />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>
    </group>
  );
}

function OrbitalScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

  const imageUrls = platformImages;
  const config = useMemo(() => ({ ...CarouselConfig, imageCount: imageUrls.length }), [imageUrls.length]);
  const angleStep = (2 * Math.PI) / config.imageCount;

  const cards = useMemo(
    () =>
      imageUrls.map((url, index) => ({
        imgUrl: url,
        position: [0, Math.cos(index * angleStep) * config.radius, Math.sin(index * angleStep) * config.radius] as [number, number, number],
        rotationY: index * angleStep,
      })),
    [imageUrls, angleStep, config.radius]
  );

  const scroll = useRef({ speed: 0.2, delta: 0, target: 0 });
  const isHovering = useRef(false);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;

    scroll.current.speed = THREE.MathUtils.lerp(scroll.current.speed, config.speed, 0.03);
    if (!isHovering.current) {
      scroll.current.delta += scroll.current.speed * 0.005;
    }
    scroll.current.target = THREE.MathUtils.lerp(scroll.current.target, scroll.current.delta, 0.04);
    groupRef.current.rotation.x = scroll.current.target;
  });

  const handlePointerMove = (e: THREE.Event) => {
    if (!isDragging.current) return;
    const native = (e as unknown as { nativeEvent: PointerEvent }).nativeEvent;
    scroll.current.delta -= (native.clientY - lastPointer.current.y) * config.dragFactor;
    lastPointer.current = { x: native.clientX, y: native.clientY };
  };

  const handlePointerDown = (e: THREE.Event) => {
    isDragging.current = true;
    const native = (e as unknown as { nativeEvent: PointerEvent }).nativeEvent;
    lastPointer.current = { x: native.clientX, y: native.clientY };
    gl.domElement.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    gl.domElement.style.cursor = 'grab';
  };

  const handleWheel = (e: WheelEvent) => {
    scroll.current.delta += e.deltaY * config.wheelFactor * 0.15;
  };

  useMemo(() => {
    gl.domElement.addEventListener('wheel', handleWheel, { passive: true });
    return () => gl.domElement.removeEventListener('wheel', handleWheel);
  }, [gl]);

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => (isHovering.current = true)}
      onPointerLeave={() => {
        isHovering.current = false;
        isDragging.current = false;
        gl.domElement.style.cursor = 'grab';
      }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      rotation={[0, 0, Math.PI / 2]}
    >
      {cards.map((card, i) => (
        <ImageCard key={i} {...card} {...config} tilt={config.tilt} />
      ))}
    </group>
  );
}

export default function OrbitalEcosystemSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <motion.div
        className="text-center mb-8 relative z-10 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ pointerEvents: 'none' }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent-1)' }}>
          INTEGRATED ECOSYSTEM
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          One Team. Every Platform.
        </h2>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          We don't just understand these platforms — we engineer at the API level.
        </p>
      </motion.div>

      <div className="w-full h-[60vh] md:h-[70vh]" style={{ cursor: 'grab' }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <OrbitalScene />
        </Canvas>
      </div>

      <motion.div
        className="mt-8 relative z-10"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <BorderButton>Explore Our Stack</BorderButton>
      </motion.div>
    </section>
  );
}
