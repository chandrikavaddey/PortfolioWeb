"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

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

interface EnhancedSparkleEffectProps {
  scrollMultiplier?: number
  baseCount?: number
  maxCount?: number
  color?: string
}

export default function EnhancedSparkleEffect({
  scrollMultiplier = 1.5,
  baseCount = 10,
  maxCount = 40,
  color = "#A855F7",
}: EnhancedSparkleEffectProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)

  // Transform scrollYProgress to sparkle count
  const sparkleCount = useTransform(
    scrollYProgress,
    [0, 1],
    [baseCount, Math.min(baseCount * scrollMultiplier, maxCount)],
  )

  useEffect(() => {
    const generateSparkle = (): Sparkle => {
      return {
        id: Math.random(),
        size: Math.random() * 12 + 4,
        style: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.8 + 0.2,
          transform: `rotate(${Math.random() * 360}deg)`,
        },
      }
    }

    // Initial sparkles
    const initialSparkles = Array.from({ length: baseCount }, () => generateSparkle())
    setSparkles(initialSparkles)

    // Update sparkles based on scroll position
    const unsubscribe = sparkleCount.onChange((count) => {
      setSparkles((currentSparkles) => {
        const newCount = Math.floor(count)

        if (newCount > currentSparkles.length) {
          // Add more sparkles
          const additionalSparkles = Array.from({ length: newCount - currentSparkles.length }, () => generateSparkle())
          return [...currentSparkles, ...additionalSparkles]
        } else if (newCount < currentSparkles.length) {
          // Remove some sparkles
          return currentSparkles.slice(0, newCount)
        }

        return currentSparkles
      })
    })

    // Periodically refresh some sparkles for a dynamic effect
    const refreshInterval = setInterval(() => {
      setSparkles((currentSparkles) => {
        const newSparkles = [...currentSparkles]
        // Replace about 10% of sparkles
        const replaceCount = Math.max(1, Math.floor(newSparkles.length * 0.1))

        for (let i = 0; i < replaceCount; i++) {
          const randomIndex = Math.floor(Math.random() * newSparkles.length)
          newSparkles[randomIndex] = generateSparkle()
        }

        return newSparkles
      })
    }, 2000)

    return () => {
      unsubscribe()
      clearInterval(refreshInterval)
    }
  }, [baseCount, sparkleCount])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
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
              fill={color}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

