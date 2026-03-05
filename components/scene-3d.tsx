"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

/* ────── Modern Skyscraper with glowing windows ────── */
function Skyscraper({
  position,
  height,
  width,
  depth,
  color,
  windowColor,
  rows,
  cols,
}: {
  position: [number, number, number]
  height: number
  width: number
  depth: number
  color: string
  windowColor: string
  rows: number
  cols: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.08
    }
  })

  const windows = useMemo(() => {
    const wins: { pos: [number, number, number]; side: "front" | "right" }[] = []
    const wSpacing = width / (cols + 1)
    const hSpacing = height / (rows + 1)
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        wins.push({
          pos: [
            -width / 2 + c * wSpacing,
            -height / 2 + r * hSpacing,
            depth / 2 + 0.01,
          ],
          side: "front",
        })
        wins.push({
          pos: [
            width / 2 + 0.01,
            -height / 2 + r * hSpacing,
            -depth / 2 + c * (depth / (cols + 1)),
          ],
          side: "right",
        })
      }
    }
    return wins
  }, [width, height, depth, rows, cols])

  return (
    <group ref={groupRef} position={position}>
      {/* Building body */}
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Roof accent */}
      <mesh position={[0, height / 2 + 0.04, 0]}>
        <boxGeometry args={[width + 0.08, 0.08, depth + 0.08]} />
        <meshStandardMaterial color="#c9a050" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Windows */}
      {windows.map((w, i) => (
        <mesh
          key={i}
          position={w.pos}
          rotation={w.side === "right" ? [0, Math.PI / 2, 0] : [0, 0, 0]}
        >
          <planeGeometry args={[width / (cols + 1) * 0.6, height / (rows + 1) * 0.55]} />
          <meshStandardMaterial
            color={windowColor}
            emissive={windowColor}
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ────── Modern House with roof ────── */
function ModernHouse({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.12
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        {/* Main body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.9, 1.2]} />
          <meshStandardMaterial color="#e8e0d4" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Second floor / upper section */}
        <mesh position={[-0.25, 0.65, 0]}>
          <boxGeometry args={[1.2, 0.4, 1.1]} />
          <meshStandardMaterial color="#f0ebe3" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Flat modern roof */}
        <mesh position={[-0.25, 0.88, 0]}>
          <boxGeometry args={[1.4, 0.06, 1.3]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Lower roof overhang */}
        <mesh position={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.9, 0.05, 1.35]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Glass front window - large */}
        <mesh position={[0, 0.05, 0.61]}>
          <planeGeometry args={[0.9, 0.55]} />
          <meshStandardMaterial
            color="#7cc8e8"
            emissive="#7cc8e8"
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Upper window */}
        <mesh position={[-0.25, 0.65, 0.56]}>
          <planeGeometry args={[0.7, 0.25]} />
          <meshStandardMaterial
            color="#7cc8e8"
            emissive="#7cc8e8"
            emissiveIntensity={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Door */}
        <mesh position={[0.6, -0.18, 0.61]}>
          <planeGeometry args={[0.25, 0.55]} />
          <meshStandardMaterial color="#8B6914" roughness={0.6} metalness={0.3} />
        </mesh>
        {/* Ground / lawn */}
        <mesh position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.8, 2.0]} />
          <meshStandardMaterial color="#4a7c59" roughness={0.9} />
        </mesh>
        {/* Pool */}
        <mesh position={[0, -0.44, -0.7]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.0, 0.4]} />
          <meshStandardMaterial
            color="#5bb8d4"
            emissive="#5bb8d4"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>
      </group>
    </Float>
  )
}

/* ────── Construction Crane ────── */
function ConstructionCrane({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const armRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.25) * 0.05
    }
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.4
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Vertical mast */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.12, 3.0, 0.12]} />
        <meshStandardMaterial color="#c9a050" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Rotating arm */}
      <group ref={armRef} position={[0, 3.0, 0]}>
        {/* Horizontal jib */}
        <mesh position={[1.0, 0, 0]}>
          <boxGeometry args={[2.2, 0.08, 0.08]} />
          <meshStandardMaterial color="#c9a050" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Counter-jib */}
        <mesh position={[-0.5, 0, 0]}>
          <boxGeometry args={[0.8, 0.08, 0.08]} />
          <meshStandardMaterial color="#c9a050" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Counter weight */}
        <mesh position={[-0.85, -0.12, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.15]} />
          <meshStandardMaterial color="#555" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Cable */}
        <mesh position={[1.8, -0.5, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 1.0, 8]} />
          <meshStandardMaterial color="#888" roughness={0.5} metalness={0.7} />
        </mesh>
        {/* Hook block */}
        <mesh position={[1.8, -1.0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#c9a050" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#444" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  )
}

/* ────── Floating Floor Plan Grid ────── */
function FloorPlanGrid({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = -Math.PI / 6 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  const lines = useMemo(() => {
    const pts: { start: [number, number, number]; end: [number, number, number] }[] = []
    const size = 1.5
    const divisions = 5
    const step = size / divisions
    for (let i = 0; i <= divisions; i++) {
      const pos = -size / 2 + i * step
      pts.push({ start: [pos, 0, -size / 2], end: [pos, 0, size / 2] })
      pts.push({ start: [-size / 2, 0, pos], end: [size / 2, 0, pos] })
    }
    return pts
  }, [])

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        {lines.map((line, i) => {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...line.start),
            new THREE.Vector3(...line.end),
          ])
          return (
            <lineSegments key={i} geometry={geometry}>
              <lineBasicMaterial color="#c9a050" transparent opacity={0.4} />
            </lineSegments>
          )
        })}
        {/* Room outlines */}
        <mesh position={[-0.35, 0.01, -0.35]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.55, 0.55]} />
          <meshStandardMaterial
            color="#c9a050"
            transparent
            opacity={0.15}
            emissive="#c9a050"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0.2, 0.01, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.85, 0.85]} />
          <meshStandardMaterial
            color="#3eb8a0"
            transparent
            opacity={0.12}
            emissive="#3eb8a0"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Label dot */}
        <mesh position={[0.2, 0.04, 0.2]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#3eb8a0" emissive="#3eb8a0" emissiveIntensity={1} />
        </mesh>
      </group>
    </Float>
  )
}

/* ────── Floating Key (real estate symbol) ────── */
function FloatingKey({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.3
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={position}>
        {/* Key ring (torus) */}
        <mesh position={[0, 0.35, 0]}>
          <torusGeometry args={[0.12, 0.025, 16, 32]} />
          <meshStandardMaterial color="#c9a050" roughness={0.1} metalness={0.95} />
        </mesh>
        {/* Key shaft */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#c9a050" roughness={0.1} metalness={0.95} />
        </mesh>
        {/* Key teeth */}
        <mesh position={[0.04, -0.2, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.025]} />
          <meshStandardMaterial color="#c9a050" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[0.04, -0.12, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.025]} />
          <meshStandardMaterial color="#c9a050" roughness={0.1} metalness={0.95} />
        </mesh>
      </group>
    </Float>
  )
}

/* ────── Location Pin Marker ────── */
function LocationPin({ position, color }: { position: [number, number, number]; color: string }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 2) * 0.15
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        {/* Pin head sphere */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial
            color={color}
            roughness={0.1}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Pin point cone */}
        <mesh position={[0, -0.06, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.06, 0.18, 16]} />
          <meshStandardMaterial color={color} roughness={0.15} metalness={0.8} />
        </mesh>
        {/* Glow ring at base */}
        <mesh position={[0, -0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.06, 0.12, 24]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  )
}

/* ────── Apartment Tower with balconies ────── */
function ApartmentTower({ position, floors }: { position: [number, number, number]; floors: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.35 + position[0]) * 0.06
    }
  })

  const totalH = floors * 0.35
  const balconies = useMemo(() => {
    const b: { y: number; side: number }[] = []
    for (let f = 0; f < floors; f++) {
      b.push({ y: -totalH / 2 + f * 0.35 + 0.18, side: 1 })
      if (f % 2 === 0) {
        b.push({ y: -totalH / 2 + f * 0.35 + 0.18, side: -1 })
      }
    }
    return b
  }, [floors, totalH])

  return (
    <group ref={groupRef} position={position}>
      {/* Main structure */}
      <mesh>
        <boxGeometry args={[0.6, totalH, 0.5]} />
        <meshStandardMaterial color="#d4cdc4" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Glass facade stripe */}
      <mesh position={[0, 0, 0.251]}>
        <planeGeometry args={[0.15, totalH * 0.9]} />
        <meshStandardMaterial
          color="#7cc8e8"
          emissive="#7cc8e8"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Balconies */}
      {balconies.map((b, i) => (
        <mesh key={i} position={[b.side * 0.38, b.y, 0]}>
          <boxGeometry args={[0.18, 0.03, 0.35]} />
          <meshStandardMaterial color="#aaa" roughness={0.3} metalness={0.6} />
        </mesh>
      ))}
      {/* Rooftop element */}
      <mesh position={[0, totalH / 2 + 0.06, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.12, 8]} />
        <meshStandardMaterial color="#c9a050" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  )
}

/* ────── Particles (golden dust) ────── */
function GoldenParticles({ count = 100 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.015
      points.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#c9a050" transparent opacity={0.45} sizeAttenuation />
    </points>
  )
}

/* ────── Floating "SOLD" sign ────── */
function SoldSign({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        {/* Sign board */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.5, 0.25, 0.03]} />
          <meshStandardMaterial
            color="#c9a050"
            roughness={0.15}
            metalness={0.85}
            emissive="#c9a050"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Post */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
          <meshStandardMaterial color="#8B6914" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

/* ────── Glowing Sphere accent ────── */
function GlowSphere({
  position,
  color,
  size,
}: {
  position: [number, number, number]
  color: string
  size: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.05}
          metalness={0.95}
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

/* ═══════════════ Main Hero 3D Scene ═══════════════ */
export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[8, 8, 5]} intensity={1.2} color="#c9a050" />
        <directionalLight position={[-5, 4, -5]} intensity={0.5} color="#3eb8a0" />
        <pointLight position={[0, 4, 3]} intensity={0.6} color="#c9a050" />
        <pointLight position={[-4, -1, 2]} intensity={0.3} color="#3eb8a0" />
        <spotLight position={[3, 6, 2]} angle={0.4} penumbra={1} intensity={0.4} color="#ffe4a0" />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        {/* City skyline cluster (right side) */}
        <group position={[3.5, -1.2, -2]}>
          <Skyscraper position={[0, 1.2, 0]} height={2.4} width={0.6} depth={0.5} color="#2a2a4a" windowColor="#ffe4a0" rows={6} cols={2} />
          <Skyscraper position={[0.9, 0.9, 0.4]} height={1.8} width={0.5} depth={0.45} color="#3a3a5a" windowColor="#7cc8e8" rows={5} cols={2} />
          <Skyscraper position={[-0.7, 0.7, 0.3]} height={1.4} width={0.45} depth={0.4} color="#2d2d4d" windowColor="#ffe4a0" rows={4} cols={2} />
          <ApartmentTower position={[1.6, 0.8, -0.3]} floors={5} />
        </group>

        {/* Modern house (center-left) */}
        <ModernHouse position={[-1.5, -0.3, 1]} />

        {/* Construction crane */}
        <ConstructionCrane position={[1.5, -0.5, 0.5]} />

        {/* Floor plan grid */}
        <FloorPlanGrid position={[-4, 0.5, -1]} />

        {/* Real estate symbols */}
        <FloatingKey position={[-3, 2.5, 0]} />
        <SoldSign position={[5, 0.5, 1]} />

        {/* Location pins */}
        <LocationPin position={[-5, -0.5, 1.5]} color="#c9a050" />
        <LocationPin position={[4.5, 2, -1]} color="#3eb8a0" />
        <LocationPin position={[-2.5, -2, -0.5]} color="#c9a050" />

        {/* Accent spheres */}
        <GlowSphere position={[-5.5, 1.5, -2]} color="#3eb8a0" size={0.2} />
        <GlowSphere position={[5.5, -1.5, 0.5]} color="#c9a050" size={0.18} />

        {/* Golden particles */}
        <GoldenParticles count={120} />
      </Canvas>
    </div>
  )
}
