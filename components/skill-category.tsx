"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap } from "lucide-react"

interface SkillCategoryProps {
  title: string
  skills: string[]
  color: string
  delay?: number
}

export default function SkillCategory({ title, skills, color, delay = 0 }: SkillCategoryProps) {
  return (
    <motion.div
      className="bg-gray-900 rounded-lg p-6 border border-gray-800 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{
        boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
        borderColor: "rgba(168, 85, 247, 0.5)",
      }}
    >
      <motion.div
        className="absolute -right-2 -top-2 text-purple-500 opacity-70"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      >
        <Sparkles className="h-6 w-6" />
      </motion.div>

      <h3 className={`text-xl font-bold mb-4 text-${color}-400 flex items-center`}>
        {title}
        <motion.div
          className="ml-2 inline-block"
          animate={{
            textShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 10px rgba(168,85,247,0.5)", "0 0 0px rgba(168,85,247,0)"],
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <Zap className="h-4 w-4 text-purple-400" />
        </motion.div>
      </h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            className="bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: delay + index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#A855F7",
              color: "#ffffff",
              boxShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

