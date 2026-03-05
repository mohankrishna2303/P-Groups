"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

/* ═══════════════ Shared Real Estate 3D Elements ═══════════════ */

/* ── Rotating House Model ── */
function RotatingHouse() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15
    }
  })
  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.4}>
        {/* Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.7, 1.0]} />
          <meshStandardMaterial color="#e8e0d4" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Pitched roof */}
        <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[1.05, 0.5, 4]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0.3} />
        </mesh>
        {/* Front window */}
        <mesh position={[-0.25, 0.05, 0.51]}>
          <planeGeometry args={[0.35, 0.35]} />
          <meshStandardMaterial color="#7cc8e8" emissive="#7cc8e8" emissiveIntensity={0.6} transparent opacity={0.85} />
        </mesh>
        {/* Second window */}
        <mesh position={[0.3, 0.05, 0.51]}>
          <planeGeometry args={[0.25, 0.35]} />
          <meshStandardMaterial color="#7cc8e8" emissive="#7cc8e8" emissiveIntensity={0.5} transparent opacity={0.8} />
        </mesh>
        {/* Door */}
        <mesh position={[0.02, -0.15, 0.51]}>
          <planeGeometry args={[0.2, 0.4]} />
          <meshStandardMaterial color="#8B6914" roughness={0.6} />
        </mesh>
        {/* Chimney */}
        <mesh position={[0.4, 0.85, -0.15]}>
          <boxGeometry args={[0.12, 0.35, 0.12]} />
          <meshStandardMaterial color="#993333" roughness={0.7} />
        </mesh>
        {/* Lawn */}
        <mesh position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.2, 1.8]} />
          <meshStandardMaterial color="#4a7c59" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Blueprint/Floor Plan 3D ── */
function BlueprintScene() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
      groupRef.current.rotation.x = -0.3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  const gridLines = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3 }[] = []
    const size = 2.5
    const divisions = 8
    const step = size / divisions
    for (let i = 0; i <= divisions; i++) {
      const p = -size / 2 + i * step
      lines.push({ start: new THREE.Vector3(p, 0, -size / 2), end: new THREE.Vector3(p, 0, size / 2) })
      lines.push({ start: new THREE.Vector3(-size / 2, 0, p), end: new THREE.Vector3(size / 2, 0, p) })
    }
    return lines
  }, [])

  return (
    <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Grid */}
        {gridLines.map((line, i) => {
          const geo = new THREE.BufferGeometry().setFromPoints([line.start, line.end])
          return (
            <lineSegments key={i} geometry={geo}>
              <lineBasicMaterial color="#c9a050" transparent opacity={0.25} />
            </lineSegments>
          )
        })}
        {/* Room 1 - Living */}
        <mesh position={[-0.45, 0.01, -0.45]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 0.9]} />
          <meshStandardMaterial color="#c9a050" transparent opacity={0.12} emissive="#c9a050" emissiveIntensity={0.15} />
        </mesh>
        {/* Room 2 - Bedroom */}
        <mesh position={[0.5, 0.01, -0.45]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.7, 0.9]} />
          <meshStandardMaterial color="#3eb8a0" transparent opacity={0.12} emissive="#3eb8a0" emissiveIntensity={0.15} />
        </mesh>
        {/* Room 3 - Kitchen */}
        <mesh position={[-0.45, 0.01, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshStandardMaterial color="#7cc8e8" transparent opacity={0.1} emissive="#7cc8e8" emissiveIntensity={0.15} />
        </mesh>
        {/* Room 4 - Bath */}
        <mesh position={[0.5, 0.01, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.7, 0.6]} />
          <meshStandardMaterial color="#c9a050" transparent opacity={0.08} emissive="#c9a050" emissiveIntensity={0.1} />
        </mesh>
        {/* Wall outlines (3D walls rising from floor plan) */}
        <mesh position={[0, 0.12, -0.9]}>
          <boxGeometry args={[2.0, 0.24, 0.04]} />
          <meshStandardMaterial color="#c9a050" transparent opacity={0.35} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.12, 0.1]}>
          <boxGeometry args={[2.0, 0.24, 0.04]} />
          <meshStandardMaterial color="#3eb8a0" transparent opacity={0.25} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[-0.9, 0.12, -0.2]}>
          <boxGeometry args={[0.04, 0.24, 1.4]} />
          <meshStandardMaterial color="#c9a050" transparent opacity={0.3} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0.15, 0.12, -0.4]}>
          <boxGeometry args={[0.04, 0.24, 1.0]} />
          <meshStandardMaterial color="#3eb8a0" transparent opacity={0.2} roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Marker dots */}
        <mesh position={[-0.45, 0.06, -0.45]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#c9a050" emissive="#c9a050" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.5, 0.06, 0.4]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#3eb8a0" emissive="#3eb8a0" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── City Skyline mini ── */
function MiniSkyline() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const buildings = useMemo(
    () => [
      { pos: [0, 0.6, 0] as [number, number, number], h: 1.2, w: 0.3, d: 0.3, color: "#2a2a4a" },
      { pos: [0.45, 0.45, 0.15] as [number, number, number], h: 0.9, w: 0.25, d: 0.25, color: "#3a3a5a" },
      { pos: [-0.4, 0.35, 0.1] as [number, number, number], h: 0.7, w: 0.28, d: 0.28, color: "#2d2d4d" },
      { pos: [0.2, 0.5, -0.3] as [number, number, number], h: 1.0, w: 0.22, d: 0.22, color: "#353555" },
      { pos: [-0.2, 0.7, -0.15] as [number, number, number], h: 1.4, w: 0.2, d: 0.2, color: "#2a2a4a" },
      { pos: [0.65, 0.3, -0.1] as [number, number, number], h: 0.6, w: 0.2, d: 0.2, color: "#3a3a5a" },
      { pos: [-0.65, 0.25, -0.05] as [number, number, number], h: 0.5, w: 0.22, d: 0.22, color: "#2d2d4d" },
    ],
    []
  )

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {buildings.map((b, i) => (
          <group key={i}>
            <mesh position={b.pos}>
              <boxGeometry args={[b.w, b.h, b.d]} />
              <meshStandardMaterial color={b.color} roughness={0.3} metalness={0.7} />
            </mesh>
            {/* Roof accent */}
            <mesh position={[b.pos[0], b.pos[1] + b.h / 2 + 0.015, b.pos[2]]}>
              <boxGeometry args={[b.w + 0.03, 0.03, b.d + 0.03]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#c9a050" : "#3eb8a0"} roughness={0.1} metalness={0.9} />
            </mesh>
            {/* Window glow */}
            <mesh position={[b.pos[0], b.pos[1], b.pos[2] + b.d / 2 + 0.005]}>
              <planeGeometry args={[b.w * 0.5, b.h * 0.7]} />
              <meshStandardMaterial color="#ffe4a0" emissive="#ffe4a0" emissiveIntensity={0.5} transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
        {/* Ground plane */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.5, 2.0]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Key floating ── */
function MiniKey() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
      <group ref={groupRef} scale={2.5}>
        <mesh position={[0, 0.25, 0]}>
          <torusGeometry args={[0.1, 0.025, 16, 32]} />
          <meshStandardMaterial color="#c9a050" roughness={0.05} metalness={0.95} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.35, 8]} />
          <meshStandardMaterial color="#c9a050" roughness={0.05} metalness={0.95} />
        </mesh>
        <mesh position={[0.035, -0.13, 0]}>
          <boxGeometry args={[0.05, 0.035, 0.02]} />
          <meshStandardMaterial color="#c9a050" roughness={0.05} metalness={0.95} />
        </mesh>
        <mesh position={[0.03, -0.07, 0]}>
          <boxGeometry args={[0.035, 0.03, 0.02]} />
          <meshStandardMaterial color="#c9a050" roughness={0.05} metalness={0.95} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Location Pins cluster ── */
function PinCluster() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  function Pin({ pos, color }: { pos: [number, number, number]; color: string }) {
    return (
      <group position={pos}>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.1} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.02, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.05, 0.14, 12]} />
          <meshStandardMaterial color={color} roughness={0.15} metalness={0.8} />
        </mesh>
      </group>
    )
  }

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Map base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
          <planeGeometry args={[2.5, 2.0]} />
          <meshStandardMaterial color="#1e1e3a" transparent opacity={0.5} roughness={0.8} />
        </mesh>
        {/* Roads */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.14, 0]}>
          <planeGeometry args={[2.2, 0.06]} />
          <meshStandardMaterial color="#3a3a5a" roughness={0.5} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.14, 0.4]}>
          <planeGeometry args={[2.2, 0.04]} />
          <meshStandardMaterial color="#3a3a5a" roughness={0.5} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0.3, -0.14, 0]}>
          <planeGeometry args={[1.8, 0.05]} />
          <meshStandardMaterial color="#3a3a5a" roughness={0.5} />
        </mesh>
        {/* Pins at project locations */}
        <Pin pos={[-0.5, 0, -0.3]} color="#c9a050" />
        <Pin pos={[0.4, 0, 0.2]} color="#3eb8a0" />
        <Pin pos={[-0.2, 0, 0.5]} color="#c9a050" />
        <Pin pos={[0.7, 0, -0.4]} color="#3eb8a0" />
        <Pin pos={[-0.6, 0, 0.3]} color="#c9a050" />
      </group>
    </Float>
  )
}

/* ── Glowing accent sphere ── */
function AccentSphere({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3
      ref.current.rotation.y = state.clock.elapsedTime * 0.4
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <MeshDistortMaterial color={color} roughness={0.05} metalness={0.95} distort={0.3} speed={2.5} />
      </mesh>
    </Float>
  )
}

/* ── Mini particles ── */
function MiniParticles({ count = 40, color = "#c9a050" }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [count])
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

/* ═══════════════ Exported Scene Components ═══════════════ */

function SceneWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} color="#c9a050" />
        <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#3eb8a0" />
        <pointLight position={[0, 2, 2]} intensity={0.4} color="#ffe4a0" />
        <Environment preset="city" />
        {children}
      </Canvas>
    </div>
  )
}

/* About section: Rotating house with particles */
export function AboutScene3D() {
  return (
    <SceneWrapper className="absolute inset-0 z-0 opacity-60">
      <RotatingHouse />
      <MiniParticles count={50} />
    </SceneWrapper>
  )
}

/* Specifications section: Blueprint floor plan */
export function SpecsScene3D() {
  return (
    <SceneWrapper className="absolute inset-0 z-0 opacity-50">
      <BlueprintScene />
      <MiniParticles count={30} color="#3eb8a0" />
    </SceneWrapper>
  )
}

/* CTA section: City skyline */
export function CTAScene3D() {
  return (
    <SceneWrapper className="absolute inset-0 z-0 opacity-45">
      <MiniSkyline />
      <MiniParticles count={40} />
    </SceneWrapper>
  )
}

/* Projects section: Pin cluster map */
export function ProjectsScene3D() {
  return (
    <SceneWrapper className="absolute inset-0 z-0 opacity-40">
      <PinCluster />
      <MiniParticles count={35} color="#3eb8a0" />
    </SceneWrapper>
  )
}

/* Team section: Golden key */
export function TeamScene3D() {
  return (
    <SceneWrapper className="absolute inset-0 z-0 opacity-50">
      <MiniKey />
      <MiniParticles count={30} />
    </SceneWrapper>
  )
}

/* Testimonials section: Accent sphere */
export function TestimonialsScene3D() {
  return (
    <SceneWrapper className="absolute inset-0 z-0 opacity-35">
      <AccentSphere color="#c9a050" />
      <MiniParticles count={25} />
    </SceneWrapper>
  )
}

/* Footer section: Mini skyline */
export function FooterScene3D() {
  return (
    <SceneWrapper className="absolute inset-0 z-0 opacity-25">
      <MiniSkyline />
      <MiniParticles count={20} color="#c9a050" />
    </SceneWrapper>
  )
}
