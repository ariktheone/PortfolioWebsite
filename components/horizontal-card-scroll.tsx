"use client"

import React, { useRef } from 'react'
import { motion } from 'framer-motion'

interface HorizontalCardScrollProps {
  items: React.ReactNode[]
  itemWidth?: number
  gap?: number
}

export default function HorizontalCardScroll({ 
  items, 
  itemWidth = 280, 
  gap = 20 
}: HorizontalCardScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' 
        ? -itemWidth - gap 
        : itemWidth + gap
      
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative w-full">
      {/* Left navigation button */}
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 backdrop-blur-xl flex items-center justify-center text-white transition-all duration-300 shadow-2xl"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Right navigation button */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 backdrop-blur-xl flex items-center justify-center text-white transition-all duration-300 shadow-2xl"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-black to-transparent z-[1] pointer-events-none"></div>
      
      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-black to-transparent z-[1] pointer-events-none"></div>
      
      {/* Scroll container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="pl-16"></div>
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 snap-center"
            style={{ 
              width: itemWidth, 
              marginRight: gap 
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {item}
          </motion.div>
        ))}
        <div className="pr-16"></div>
      </div>
    </div>
  )
}