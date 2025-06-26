"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Sphere, Environment, Float, MeshDistortMaterial } from "@react-three/drei"
import { useRef, useMemo, Suspense } from "react"
import * as THREE from "three"

function Particles({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null!)
  const light = useRef<THREE.PointLight>(null!)

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      temp[i3] = (Math.random() - 0.5) * 100
      temp[i3 + 1] = (Math.random() - 0.5) * 100
      temp[i3 + 2] = (Math.random() - 0.5) * 100
    }
    return temp
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = time * 0.05
      mesh.current.rotation.y = time * 0.075
    }
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.5) * 30
      light.current.position.y = Math.cos(time * 0.5) * 40
      light.current.position.z = Math.sin(time * 0.3) * 20
    }
  })

  return (
    <group>
      <pointLight ref={light} distance={40} intensity={8} color="#3b82f6" />
      <Points ref={mesh} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#93c5fd"
          size={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function FloatingOrbs() {
  return (
    <group>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[2, 64, 64]} position={[-25, 10, -15]}>
          <MeshDistortMaterial color="#3b82f6" transparent opacity={0.6} distort={0.3} speed={2} roughness={0} />
        </Sphere>
      </Float>

      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.5, 64, 64]} position={[25, -10, -10]}>
          <MeshDistortMaterial color="#8b5cf6" transparent opacity={0.4} distort={0.4} speed={1.5} roughness={0} />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <Sphere args={[1, 64, 64]} position={[0, 25, -20]}>
          <MeshDistortMaterial color="#06b6d4" transparent opacity={0.5} distort={0.2} speed={3} roughness={0} />
        </Sphere>
      </Float>
    </group>
  )
}

function AnimatedMesh() {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(time * 0.2) * 0.1
      mesh.current.rotation.y = Math.sin(time * 0.1) * 0.1
      mesh.current.position.y = Math.sin(time * 0.4) * 2
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -30]} scale={[40, 40, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <MeshDistortMaterial color="#1e293b" transparent opacity={0.8} distort={0.1} speed={1} roughness={0.2} />
    </mesh>
  )
}

function CameraController() {
  const { camera } = useThree()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    camera.position.x = Math.sin(time * 0.1) * 2
    camera.position.y = Math.cos(time * 0.1) * 1
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: "linear-gradient(to bottom, #0f172a, #1e293b)" }}
      >
        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

          <Particles />
          <FloatingOrbs />
          <AnimatedMesh />
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  )
}
