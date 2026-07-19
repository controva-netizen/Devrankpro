import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { aiFeatures } from '@/data/content';
import BorderButton from '@/components/shared/BorderButton';

export default function NeuralNetworkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 120;
    const connectionDistance = 2.5;
    const maxConnections = 3;
    const mouseDistance = 3.5;
    const nodeSize = 0.08;

    const colors = [
      new THREE.Color(0x4d6bfa),
      new THREE.Color(0x3b5bff),
      new THREE.Color(0x7b61ff),
      new THREE.Color(0x98a2ff),
    ];

    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colorsArray: number[] = [];
    const particlesData: { velocity: THREE.Vector3; connections: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 10 - 5;
      const y = Math.random() * 10 - 5;
      const z = Math.random() * 10 - 5;
      positions.push(x, y, z);

      const color = colors[Math.floor(Math.random() * colors.length)];
      colorsArray.push(color.r, color.g, color.b);

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        connections: 0,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorsArray), 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: nodeSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4d6bfa,
      transparent: true,
      opacity: 0.25,
      vertexColors: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);

    camera.position.z = 6;
    let animId: number;
    let isActive = true;

    const animate = () => {
      if (!isActive) return;
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const posArray = particles.geometry.attributes.position.array as Float32Array;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(particles);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        for (let i = 0; i < particleCount; i++) {
          const dx = posArray[i * 3] - point.x;
          const dy = posArray[i * 3 + 1] - point.y;
          const dz = posArray[i * 3 + 2] - point.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < mouseDistance && dist > 0) {
            const force = (mouseDistance - dist) / mouseDistance;
            posArray[i * 3] += (dx / dist) * force * 0.05;
            posArray[i * 3 + 1] += (dy / dist) * force * 0.05;
            posArray[i * 3 + 2] += (dz / dist) * force * 0.05;
          }
        }
      }

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += particlesData[i].velocity.x;
        posArray[i * 3 + 1] += particlesData[i].velocity.y;
        posArray[i * 3 + 2] += particlesData[i].velocity.z;

        if (Math.abs(posArray[i * 3]) > 6) posArray[i * 3] *= -0.9;
        if (Math.abs(posArray[i * 3 + 1]) > 6) posArray[i * 3 + 1] *= -0.9;
        if (Math.abs(posArray[i * 3 + 2]) > 6) posArray[i * 3 + 2] *= -0.9;

        particlesData[i].connections = 0;
      }

      particles.geometry.attributes.position.needsUpdate = true;

      const linePositions: number[] = [];
      for (let i = 0; i < particleCount - 1; i++) {
        if (particlesData[i].connections >= maxConnections) continue;
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            linePositions.push(
              posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
              posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
            );
            particlesData[i].connections++;
            particlesData[j].connections++;
          }
          if (particlesData[i].connections >= maxConnections) break;
        }
      }

      lines.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
      );
      lines.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isActive = false;
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isVisible]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'transparent' }}>
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.7,
        }}
      />

      <motion.div
        className="relative z-10 max-w-[560px] mx-auto px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: 'var(--accent-1)' }}
          >
            AI-POWERED AUTOMATION
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Intelligent Systems That Scale
          </h2>
          <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Our AI automation pipelines handle lead qualification, follow-up sequences, and
            conversion optimization — 24/7. Your sales machine never sleeps.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {aiFeatures.map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: 'var(--accent-subtle)',
                  color: 'var(--accent-1)',
                }}
              >
                {feature}
              </span>
            ))}
          </div>
          <BorderButton>See AI in Action</BorderButton>
        </div>
      </motion.div>
    </section>
  );
}
