"use client"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0
    let particles: Array<{
      x: number
      y: number
      speed: number
      opacity: number
      size: number
      trail: Array<{ x: number; y: number; opacity: number }>
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 0.5 + Math.random() * 1.5,
          opacity: 0.3 + Math.random() * 0.7,
          size: 1 + Math.random() * 2,
          trail: [],
        })
      }
    }

    const drawGrid = () => {
      const gridSize = 50
      ctx.strokeStyle = "rgba(59, 130, 246, 0.03)"
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const drawBeams = () => {
      const beamCount = 20
      const beamWidth = canvas.width / beamCount

      for (let i = 0; i < beamCount; i++) {
        const x = i * beamWidth + beamWidth / 2
        const waveOffset = Math.sin(time * 0.001 + i * 0.8) * 40
        const waveOffset2 = Math.cos(time * 0.0015 + i * 0.6) * 20
        const opacity = 0.08 + Math.sin(time * 0.002 + i * 0.4) * 0.04
        const pulseOpacity = 0.15 + Math.sin(time * 0.003 + i * 0.2) * 0.1

        // Main beam gradient
        const gradient = ctx.createLinearGradient(x - beamWidth / 3, 0, x + beamWidth / 3, 0)
        gradient.addColorStop(0, `rgba(59, 130, 246, 0)`)
        gradient.addColorStop(0.3, `rgba(99, 179, 237, ${opacity})`)
        gradient.addColorStop(0.5, `rgba(147, 197, 253, ${pulseOpacity})`)
        gradient.addColorStop(0.7, `rgba(99, 179, 237, ${opacity})`)
        gradient.addColorStop(1, `rgba(59, 130, 246, 0)`)

        ctx.fillStyle = gradient

        // Draw main beam with complex wave
        ctx.beginPath()
        ctx.moveTo(x - beamWidth / 3 + waveOffset, 0)
        ctx.lineTo(x + beamWidth / 3 + waveOffset, 0)
        ctx.lineTo(x + beamWidth / 3 - waveOffset + waveOffset2, canvas.height)
        ctx.lineTo(x - beamWidth / 3 - waveOffset + waveOffset2, canvas.height)
        ctx.closePath()
        ctx.fill()

        // Add secondary beam for depth
        if (i % 3 === 0) {
          const secondaryGradient = ctx.createLinearGradient(x - beamWidth / 6, 0, x + beamWidth / 6, 0)
          secondaryGradient.addColorStop(0, `rgba(147, 197, 253, 0)`)
          secondaryGradient.addColorStop(0.5, `rgba(191, 219, 254, ${opacity * 2})`)
          secondaryGradient.addColorStop(1, `rgba(147, 197, 253, 0)`)

          ctx.fillStyle = secondaryGradient
          ctx.beginPath()
          ctx.moveTo(x - beamWidth / 6 + waveOffset * 0.5, 0)
          ctx.lineTo(x + beamWidth / 6 + waveOffset * 0.5, 0)
          ctx.lineTo(x + beamWidth / 6 - waveOffset * 0.5, canvas.height)
          ctx.lineTo(x - beamWidth / 6 - waveOffset * 0.5, canvas.height)
          ctx.closePath()
          ctx.fill()
        }
      }
    }

    const updateParticles = () => {
      particles.forEach((particle, index) => {
        // Update trail
        particle.trail.unshift({ x: particle.x, y: particle.y, opacity: particle.opacity })
        if (particle.trail.length > 8) {
          particle.trail.pop()
        }

        // Move particle
        particle.y -= particle.speed
        particle.x += Math.sin(time * 0.001 + index) * 0.5

        // Reset particle when it goes off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
        }

        // Wrap horizontally
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
      })
    }

    const drawParticles = () => {
      particles.forEach((particle) => {
        // Draw trail
        particle.trail.forEach((point, index) => {
          const trailOpacity = point.opacity * (1 - index / particle.trail.length) * 0.6
          const size = particle.size * (1 - index / particle.trail.length)

          ctx.fillStyle = `rgba(147, 197, 253, ${trailOpacity})`
          ctx.beginPath()
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
          ctx.fill()
        })

        // Draw main particle with glow
        const glowGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4,
        )
        glowGradient.addColorStop(0, `rgba(147, 197, 253, ${particle.opacity})`)
        glowGradient.addColorStop(0.5, `rgba(59, 130, 246, ${particle.opacity * 0.5})`)
        glowGradient.addColorStop(1, `rgba(59, 130, 246, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Draw core particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.8})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const drawOrbs = () => {
      const orbCount = 5
      for (let i = 0; i < orbCount; i++) {
        const x = (canvas.width / orbCount) * i + canvas.width / orbCount / 2
        const y = canvas.height / 2 + Math.sin(time * 0.0008 + i * 2) * 100
        const radius = 30 + Math.sin(time * 0.001 + i) * 10
        const opacity = 0.05 + Math.sin(time * 0.0012 + i * 0.5) * 0.03

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2)
        orbGradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
        orbGradient.addColorStop(0.7, `rgba(147, 197, 253, ${opacity * 0.5})`)
        orbGradient.addColorStop(1, `rgba(59, 130, 246, 0)`)

        ctx.fillStyle = orbGradient
        ctx.beginPath()
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, "rgba(15, 23, 42, 1)")
      bgGradient.addColorStop(0.5, "rgba(30, 41, 59, 0.95)")
      bgGradient.addColorStop(1, "rgba(15, 23, 42, 1)")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawGrid()
      drawOrbs()
      drawBeams()
      updateParticles()
      drawParticles()

      time += 16
      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: 0 }} />
}
