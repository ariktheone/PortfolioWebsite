"use client"

import { useRef, useEffect } from "react"

export default function PremiumBackground() {
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
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Base gradient - cleaner, more subtle
      const baseGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      baseGradient.addColorStop(0, "#0f172a")
      baseGradient.addColorStop(0.5, "#1e293b")
      baseGradient.addColorStop(1, "#0f172a")
      ctx.fillStyle = baseGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle animated mesh
      const meshSize = 120
      for (let x = 0; x < canvas.width + meshSize; x += meshSize) {
        for (let y = 0; y < canvas.height + meshSize; y += meshSize) {
          const wave1 = Math.sin((x + time * 0.0008) * 0.008) * 15
          const wave2 = Math.cos((y + time * 0.001) * 0.008) * 10
          const opacity = (Math.sin(time * 0.0015 + x * 0.008 + y * 0.008) + 1) * 0.015

          const gradient = ctx.createRadialGradient(x + wave1, y + wave2, 0, x + wave1, y + wave2, meshSize * 0.6)
          gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
          gradient.addColorStop(0.7, `rgba(99, 179, 237, ${opacity * 0.3})`)
          gradient.addColorStop(1, "transparent")

          ctx.fillStyle = gradient
          ctx.fillRect(x - meshSize / 2, y - meshSize / 2, meshSize, meshSize)
        }
      }

      // Minimal geometric shapes
      const shapes = [
        { x: canvas.width * 0.15, y: canvas.height * 0.25, size: 180, rotation: time * 0.0003 },
        { x: canvas.width * 0.85, y: canvas.height * 0.75, size: 140, rotation: -time * 0.0002 },
      ]

      shapes.forEach((shape) => {
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)

        // Simple circle
        ctx.beginPath()
        ctx.arc(0, 0, shape.size, 0, Math.PI * 2)

        const shapeGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size)
        shapeGradient.addColorStop(0, "rgba(59, 130, 246, 0.02)")
        shapeGradient.addColorStop(0.8, "rgba(147, 197, 253, 0.01)")
        shapeGradient.addColorStop(1, "transparent")

        ctx.fillStyle = shapeGradient
        ctx.fill()

        ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.restore()
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

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -2 }} />

      {/* Minimal overlay elements */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Clean radial gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-blue-950/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-slate-950/10 via-transparent to-transparent" />
      </div>
    </>
  )
}
