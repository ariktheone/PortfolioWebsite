"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface Panel {
  id: number
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  speed: number
  color: string
}

export default function MovingPanelsBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  const panels: Panel[] = [
    {
      id: 1,
      x: -200,
      y: -100,
      width: 400,
      height: 200,
      rotation: 45,
      opacity: 0.1,
      speed: 0.5,
      color: "rgba(59, 130, 246, 0.3)",
    },
    {
      id: 2,
      x: 200,
      y: 100,
      width: 350,
      height: 180,
      rotation: -30,
      opacity: 0.08,
      speed: 0.3,
      color: "rgba(147, 197, 253, 0.2)",
    },
    {
      id: 3,
      x: -100,
      y: 200,
      width: 500,
      height: 250,
      rotation: 60,
      opacity: 0.12,
      speed: 0.7,
      color: "rgba(99, 179, 237, 0.25)",
    },
    {
      id: 4,
      x: 300,
      y: -150,
      width: 300,
      height: 150,
      rotation: -45,
      opacity: 0.09,
      speed: 0.4,
      color: "rgba(191, 219, 254, 0.15)",
    },
    {
      id: 5,
      x: -300,
      y: 50,
      width: 450,
      height: 220,
      rotation: 30,
      opacity: 0.11,
      speed: 0.6,
      color: "rgba(59, 130, 246, 0.2)",
    },
    {
      id: 6,
      x: 100,
      y: -200,
      width: 380,
      height: 190,
      rotation: -60,
      opacity: 0.07,
      speed: 0.35,
      color: "rgba(147, 197, 253, 0.18)",
    },
    {
      id: 7,
      x: -150,
      y: -50,
      width: 320,
      height: 160,
      rotation: 75,
      opacity: 0.13,
      speed: 0.8,
      color: "rgba(99, 179, 237, 0.22)",
    },
    {
      id: 8,
      x: 250,
      y: 250,
      width: 420,
      height: 210,
      rotation: -15,
      opacity: 0.06,
      speed: 0.25,
      color: "rgba(191, 219, 254, 0.12)",
    },
  ]

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        zIndex: -1,
      }}
    >
      {/* Animated Panels */}
      {panels.map((panel) => (
        <motion.div
          key={panel.id}
          className="absolute"
          initial={{
            x: panel.x,
            y: panel.y,
            rotate: panel.rotation,
            opacity: 0,
          }}
          animate={{
            x: [panel.x, panel.x + 100, panel.x - 50, panel.x],
            y: [panel.y, panel.y - 80, panel.y + 60, panel.y],
            rotate: [panel.rotation, panel.rotation + 10, panel.rotation - 5, panel.rotation],
            opacity: [0, panel.opacity, panel.opacity * 0.7, panel.opacity],
          }}
          transition={{
            duration: 20 / panel.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: panel.id * 0.5,
          }}
          style={{
            width: panel.width,
            height: panel.height,
            background: `linear-gradient(135deg, ${panel.color}, transparent, ${panel.color})`,
            borderRadius: "8px",
            filter: "blur(1px)",
            boxShadow: `0 0 20px ${panel.color}`,
          }}
        />
      ))}

      {/* Additional Geometric Shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(59, 130, 246, 0.1), transparent, rgba(147, 197, 253, 0.1), transparent)",
          borderRadius: "50%",
          filter: "blur(2px)",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          background:
            "conic-gradient(from 180deg, rgba(99, 179, 237, 0.08), transparent, rgba(191, 219, 254, 0.12), transparent)",
          borderRadius: "50%",
          filter: "blur(1.5px)",
        }}
      />

      {/* Diagonal Lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute"
          initial={{
            x: -200 + i * 300,
            y: -100,
            rotate: 45,
            opacity: 0,
          }}
          animate={{
            x: [-200 + i * 300, -100 + i * 300, -200 + i * 300],
            y: [-100, 100, -100],
            opacity: [0, 0.05, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 2,
          }}
          style={{
            width: "2px",
            height: "120vh",
            background: "linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.3), transparent)",
          }}
        />
      ))}

      {/* Floating Orbs */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
            ],
            y: [
              Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
              Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
              Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
            ],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            width: 100 + i * 20,
            height: 100 + i * 20,
            background: `radial-gradient(circle, rgba(59, 130, 246, ${0.05 + i * 0.02}), transparent)`,
            filter: "blur(3px)",
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/50 via-transparent to-slate-950/80" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-purple-950/20" />
    </div>
  )
}
