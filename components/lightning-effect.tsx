"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface LightningEffectProps {
  color?: string
  intensity?: number
  duration?: number
  interval?: number
}

export default function LightningEffect({
  color = "#A855F7",
  intensity = 0.7,
  duration = 0.5,
  interval = 5000,
}: LightningEffectProps) {
  const [isFlashing, setIsFlashing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Random interval for lightning
    const createLightning = () => {
      const randomDelay = Math.random() * interval + 2000

      setTimeout(() => {
        if (Math.random() > 0.3) {
          // 70% chance of lightning
          setIsFlashing(true)

          setTimeout(() => {
            setIsFlashing(false)
          }, duration * 1000)

          // Sometimes create a double flash
          if (Math.random() > 0.7) {
            setTimeout(() => {
              setIsFlashing(true)

              setTimeout(() => {
                setIsFlashing(false)
              }, duration * 500)
            }, duration * 1200)
          }
        }

        createLightning()
      }, randomDelay)
    }

    createLightning()

    return () => {
      setIsFlashing(false)
    }
  }, [duration, interval])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-75 z-10 ${isFlashing ? "opacity-" + Math.floor(intensity * 10) : "opacity-0"}`}
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          boxShadow: `0 0 40px 20px ${color}30`,
        }}
      />

      {isFlashing && (
        <>
          {/* Lightning bolts */}
          {Array.from({ length: 3 }).map((_, index) => {
            const startX = Math.random() * 100
            const startY = Math.random() * 20
            const zigzags = Math.floor(Math.random() * 3) + 2

            let path = `M${startX},${startY} `
            for (let i = 1; i <= zigzags; i++) {
              const nextX = startX + (Math.random() * 40 - 20)
              const nextY = startY + i * (100 / zigzags)
              path += `L${nextX},${nextY} `
            }

            return (
              <motion.svg
                key={index}
                className="absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.8, 0] }}
                transition={{ duration: duration, times: [0, 0.1, 0.3, 1] }}
              >
                <path
                  d={path}
                  stroke={color}
                  strokeWidth={Math.random() * 2 + 1}
                  fill="none"
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 8px ${color})` }}
                />
              </motion.svg>
            )
          })}
        </>
      )}
    </div>
  )
}

