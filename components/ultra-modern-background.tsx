"use client"

import { useRef, useEffect } from "react"

export default function UltraModernBackground() {
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

      // Ultra-modern gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height),
      )
      gradient.addColorStop(0, "#0a0a0a")
      gradient.addColorStop(0.4, "#111111")
      gradient.addColorStop(0.8, "#0f0f0f")
      gradient.addColorStop(1, "#000000")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Sophisticated mesh pattern
      const meshSize = 100
      const offsetX = Math.sin(time * 0.0005) * 20
      const offsetY = Math.cos(time * 0.0007) * 15

      for (let x = 0; x < canvas.width + meshSize; x += meshSize) {
        for (let y = 0; y < canvas.height + meshSize; y += meshSize) {
          const wave = Math.sin((x + y + time * 0.001) * 0.01) * 0.5 + 0.5
          const opacity = wave * 0.03

          const meshGradient = ctx.createRadialGradient(
            x + offsetX,
            y + offsetY,
            0,
            x + offsetX,
            y + offsetY,
            meshSize * 0.8,
          )
          meshGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
          meshGradient.addColorStop(0.6, `rgba(255, 255, 255, ${opacity * 0.3})`)
          meshGradient.addColorStop(1, "transparent")

          ctx.fillStyle = meshGradient
          ctx.beginPath()
          ctx.arc(x + offsetX, y + offsetY, meshSize * 0.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Floating geometric shapes
      const shapes = [
        { x: canvas.width * 0.1, y: canvas.height * 0.2, size: 60, rotation: time * 0.0003 },
        { x: canvas.width * 0.9, y: canvas.height * 0.8, size: 80, rotation: -time * 0.0002 },
        { x: canvas.width * 0.8, y: canvas.height * 0.3, size: 40, rotation: time * 0.0004 },
      ]

      shapes.forEach((shape) => {
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)

        // Draw hexagon
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          const x = Math.cos(angle) * shape.size
          const y = Math.sin(angle) * shape.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()

        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
        ctx.lineWidth = 1
        ctx.stroke()

        const shapeGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size)
        shapeGradient.addColorStop(0, "rgba(255, 255, 255, 0.02)")
        shapeGradient.addColorStop(1, "transparent")
        ctx.fillStyle = shapeGradient
        ctx.fill()

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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }} />
}
