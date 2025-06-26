"use client"

import { useRef, useEffect } from "react"

export default function ModernBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Sophisticated gradient background with blue theme
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#0f172a")
      gradient.addColorStop(0.3, "#1e293b")
      gradient.addColorStop(0.7, "#0f172a")
      gradient.addColorStop(1, "#020617")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Animated grid pattern with blue accent
      const gridSize = 60
      const offsetX = (time * 0.02) % gridSize
      const offsetY = (time * 0.015) % gridSize

      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"
      ctx.lineWidth = 1

      for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Floating orbs with blue glow
      const orbs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 120, speed: 0.0008 },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, size: 80, speed: 0.0012 },
        { x: canvas.width * 0.6, y: canvas.height * 0.2, size: 100, speed: 0.0006 },
      ]

      orbs.forEach((orb, index) => {
        const x = orb.x + Math.sin(time * orb.speed + index) * 30
        const y = orb.y + Math.cos(time * orb.speed + index) * 20
        const opacity = 0.03 + Math.sin(time * 0.001 + index) * 0.02

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, orb.size)
        orbGradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
        orbGradient.addColorStop(0.5, `rgba(147, 197, 253, ${opacity * 0.3})`)
        orbGradient.addColorStop(1, "transparent")

        ctx.fillStyle = orbGradient
        ctx.beginPath()
        ctx.arc(x, y, orb.size, 0, Math.PI * 2)
        ctx.fill()
      })

      time += 16
    }

    const animate = () => {
      drawBackground()
      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }} />
}
