"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Dot {
  id: number
  size: number
  x: number
  y: number
  duration: number
  delay: number
}

interface FloatingDotsProps {
  count?: number
  color?: string
  minSize?: number
  maxSize?: number
}

export default function FloatingDots({ count = 10, color = "#A855F7", minSize = 4, maxSize = 10 }: FloatingDotsProps) {
  const [dots, setDots] = useState<Dot[]>([])

  useEffect(() => {
    const generateDots = () => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * (maxSize - minSize) + minSize,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
      }))
    }

    setDots(generateDots())
  }, [count, minSize, maxSize])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: color,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            opacity: 0.6,
          }}
          animate={{
            x: [
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
            ],
            y: [
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
            ],
            opacity: [0.2, 0.6, 0.4, 0.7, 0.3],
          }}
          transition={{
            duration: dot.duration,
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Number.POSITIVE_INFINITY,
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  )
}

