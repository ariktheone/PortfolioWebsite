"use client"
import { useInView } from "react-intersection-observer"
import { useSpring, animated, useTrail } from "@react-spring/web"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(50px)",
    config: { tension: 300, friction: 30 },
    delay: delay * 100,
  })

  return (
    <animated.div ref={ref} style={springProps} className={className}>
      {children}
    </animated.div>
  )
}

interface StaggeredListProps {
  items: ReactNode[]
  className?: string
}

export function StaggeredList({ items, className = "" }: StaggeredListProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const trail = useTrail(items.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0px)" : "translateX(-50px)",
    config: { tension: 300, friction: 30 },
  })

  return (
    <div ref={ref} className={className}>
      {trail.map((style, index) => (
        <animated.div key={index} style={style}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
}

export function CountUp({ end, duration = 2000, suffix = "", className = "" }: CountUpProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  const { number } = useSpring({
    number: inView ? end : 0,
    config: { duration },
  })

  return (
    <animated.span ref={ref} className={className}>
      {number.to((n) => `${Math.floor(n)}${suffix}`)}
    </animated.span>
  )
}

interface FloatingElementProps {
  children: ReactNode
  intensity?: number
  speed?: number
  className?: string
}

export function FloatingElement({ children, intensity = 10, speed = 2000, className = "" }: FloatingElementProps) {
  const floatingAnimation = useSpring({
    from: { transform: "translateY(0px)" },
    to: async (next) => {
      while (true) {
        await next({ transform: `translateY(-${intensity}px)` })
        await next({ transform: `translateY(${intensity}px)` })
      }
    },
    config: { duration: speed },
  })

  return (
    <animated.div style={floatingAnimation} className={className}>
      {children}
    </animated.div>
  )
}
