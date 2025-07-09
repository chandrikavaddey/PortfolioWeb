"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Sparkle {
  id: number
  size: number
  style: {
    top: string
    left: string
    opacity: number
    transform: string
  }
}

export default function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const generateSparkle = (): Sparkle => {
      return {
        id: Math.random(),
        size: Math.random() * 10 + 4,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.8 + 0.2,
          transform: `rotate(${Math.random() * 360}deg)`,
        },
      }
    }

    // Initial sparkles
    const initialSparkles = Array.from({ length: 15 }, () => generateSparkle())
    setSparkles(initialSparkles)

    // Add new sparkles periodically
    const interval = setInterval(() => {
      setSparkles((currentSparkles) => {
        // Remove one old sparkle and add a new one
        const newSparkles = [...currentSparkles]
        if (newSparkles.length > 20) {
          newSparkles.shift()
        }
        return [...newSparkles, generateSparkle()]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={sparkle.style}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, sparkle.style.opacity, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3,
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill="#A855F7"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

