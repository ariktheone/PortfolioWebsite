"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function MovingPanel({
  position,
  rotation,
  scale,
  color,
  speed,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  color: string
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(time * speed) * 2
      meshRef.current.position.y = position[1] + Math.cos(time * speed * 0.7) * 1.5
      meshRef.current.rotation.z = rotation[2] + Math.sin(time * speed * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[4, 2]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
    </mesh>
  )
}

function ThreeDPanels() {
  const panels = useMemo(
    () => [
      { position: [-8, 4, -5], rotation: [0, 0, Math.PI / 4], scale: [1, 1, 1], color: "#3b82f6", speed: 0.5 },
      { position: [6, -2, -3], rotation: [0, 0, -Math.PI / 6], scale: [1.2, 0.8, 1], color: "#93c5fd", speed: 0.3 },
      { position: [-4, -6, -7], rotation: [0, 0, Math.PI / 3], scale: [1.5, 1, 1], color: "#63b3ed", speed: 0.7 },
      { position: [10, 2, -4], rotation: [0, 0, -Math.PI / 4], scale: [0.8, 1.2, 1], color: "#bfdbfe", speed: 0.4 },
      { position: [-12, -1, -6], rotation: [0, 0, Math.PI / 6], scale: [1.3, 0.9, 1], color: "#3b82f6", speed: 0.6 },
    ],
    [],
  )

  return (
    <>
      {panels.map((panel, index) => (
        <MovingPanel key={index} {...panel} />
      ))}
    </>
  )
}

export default function EnhancedThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#3b82f6" />
        <ThreeDPanels />
      </Canvas>
    </div>
  )
}
