"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TextAnimationProps {
  text: string
  className?: string
  highlightColor?: string
  delay?: number
  duration?: number
  highlightIndices?: number[]
}

export default function TextAnimation({
  text,
  className = "",
  highlightColor = "#A855F7",
  delay = 0,
  duration = 0.05,
  highlightIndices = [],
}: TextAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  const letters = text.split("")

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + index * duration,
            ease: "easeOut",
          }}
          style={{
            display: "inline-block",
            color: highlightIndices.includes(index) ? highlightColor : "inherit",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  )
}

