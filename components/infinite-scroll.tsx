"use client"

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

// Register gsap plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  width?: string;
  maxHeight?: string;
  items?: InfiniteScrollItem[];
  itemWidth?: number | string;
  itemHeight?: number | string;
  gap?: number;
  direction?: "horizontal" | "vertical";
  autoplay?: boolean;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = "100%",
  maxHeight = "100%",
  items = [],
  itemWidth = 300,
  itemHeight = "auto",
  gap = 20,
  direction = "horizontal",
  autoplay = false,
  autoplaySpeed = 0.5,
  pauseOnHover = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after mounting to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (divItems.length === 0) return;

    // Reset positions
    divItems.forEach(item => {
      gsap.set(item, { clearProps: "all" });
    });

    // Set initial positions based on direction
    let totalWidth = 0;
    let totalHeight = 0;

    divItems.forEach((item, i) => {
      const itemRect = item.getBoundingClientRect();
      
      if (direction === "horizontal") {
        const actualItemWidth = typeof itemWidth === 'number' ? itemWidth : itemRect.width;
        gsap.set(item, { 
          x: totalWidth, 
          y: 0,
          position: "absolute",
          left: 0,
          top: 0,
          width: actualItemWidth
        });
        totalWidth += actualItemWidth + gap;
      } else {
        gsap.set(item, { 
          y: totalHeight, 
          x: 0,
          position: "absolute",
          left: 0, 
          top: 0
        });
        totalHeight += itemRect.height + gap;
      }
    });

    // Create wrap functions for infinite scrolling
    const wrapHorizontal = gsap.utils.wrap(-totalWidth / 2, totalWidth / 2);
    const wrapVertical = gsap.utils.wrap(-totalHeight / 2, totalHeight / 2);

    // Setup Observer for drag and scroll interactions
    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: ({ target }) => {
        (target as HTMLElement).style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        (target as HTMLElement).style.cursor = "grab";
      },
      onChange: ({ deltaX, deltaY, isDragging, event }) => {
        const multiplier = isDragging ? 2 : 5;
        
        if (direction === "horizontal") {
          // For horizontal scrolling, prioritize deltaX, but fall back to deltaY for mousewheel
          const delta = event.type === "wheel" ? deltaY : deltaX;
          const moveAmount = delta * multiplier;
          
          divItems.forEach(child => {
            gsap.to(child, {
              duration: 0.5,
              ease: "expo.out",
              x: `+=${moveAmount}`,
              modifiers: {
                x: gsap.utils.unitize(wrapHorizontal)
              }
            });
          });
        } else {
          const moveAmount = deltaY * multiplier;
          
          divItems.forEach(child => {
            gsap.to(child, {
              duration: 0.5,
              ease: "expo.out",
              y: `+=${moveAmount}`,
              modifiers: {
                y: gsap.utils.unitize(wrapVertical)
              }
            });
          });
        }
      }
    });

    // Handle autoplay if enabled
    let rafId: number | null = null;
    
    if (autoplay) {
      const speed = direction === "horizontal" 
        ? autoplaySpeed * (autoplayDirection === "up" ? -1 : 1)
        : autoplaySpeed * (autoplayDirection === "up" ? -1 : 1);
      
      const tick = () => {
        divItems.forEach(child => {
          if (direction === "horizontal") {
            gsap.set(child, {
              x: `+=${speed}`,
              modifiers: {
                x: gsap.utils.unitize(wrapHorizontal)
              }
            });
          } else {
            gsap.set(child, {
              y: `+=${speed}`,
              modifiers: {
                y: gsap.utils.unitize(wrapVertical)
              }
            });
          }
        });
        rafId = requestAnimationFrame(tick);
      };
      
      rafId = requestAnimationFrame(tick);
      
      if (pauseOnHover) {
        const stopTicker = () => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = null;
        };
        
        const startTicker = () => {
          if (!rafId) rafId = requestAnimationFrame(tick);
        };
        
        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("touchstart", stopTicker);
        container.addEventListener("mouseleave", startTicker);
        container.addEventListener("touchend", startTicker);
        
        return () => {
          observer.kill();
          if (rafId) cancelAnimationFrame(rafId);
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("touchstart", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
          container.removeEventListener("touchend", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          if (rafId) cancelAnimationFrame(rafId);
        };
      }
    }
    
    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isClient, items, itemWidth, itemHeight, gap, direction, autoplay, autoplaySpeed, pauseOnHover]);

  // For server-side rendering or initial client-side render
  if (!isClient) {
    return (
      <div 
        className="infinite-scroll-wrapper" 
        ref={wrapperRef}
        style={{ 
          width: width, 
          height: typeof itemHeight === 'number' ? `${itemHeight}px` : itemHeight,
          maxHeight: maxHeight,
          position: "relative",
          overflow: "hidden" 
        }}
      >
        <div className="animate-pulse bg-white/5 rounded-lg w-full h-full"></div>
      </div>
    );
  }

  return (
    <div 
      className="infinite-scroll-wrapper" 
      ref={wrapperRef}
      style={{ 
        width: width, 
        height: typeof itemHeight === 'number' ? `${itemHeight}px` : itemHeight,
        maxHeight: maxHeight,
        position: "relative",
        overflow: "hidden" 
      }}
    >
      <div
        className="infinite-scroll-container"
        ref={containerRef}
        style={{
          position: "relative",
          cursor: "grab",
          width: "100%",
          height: "100%"
        }}
      >
        {items.map((item, i) => (
          <div 
            className="infinite-scroll-item"
            key={i}
            style={{
              position: "absolute",
              width: typeof itemWidth === 'number' ? `${itemWidth}px` : itemWidth,
              height: typeof itemHeight === 'number' ? `${itemHeight}px` : itemHeight,
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;