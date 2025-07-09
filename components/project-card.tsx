"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Sparkles } from "lucide-react"
import LightningEffect from "./lightning-effect"

interface Project {
  id: number
  title: string
  description: string
  image: string
  link: string
  technologies: string[]
}

interface ProjectCardProps {
  project: Project
  delay?: number
  hasLightning?: boolean
}

export default function ProjectCard({ project, delay = 0, hasLightning = false }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 h-full flex flex-col relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -10,
        boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)",
        borderColor: "rgba(168, 85, 247, 0.5)",
      }}
    >
      {hasLightning && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <LightningEffect color="#A855F7" intensity={0.3} interval={8000} />
        </div>
      )}

      <div className="absolute top-2 right-2 z-10">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          <Sparkles className="h-5 w-5 text-purple-500 opacity-70" />
        </motion.div>
      </div>

      <div className="relative h-48 overflow-hidden group">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <motion.span
              key={index}
              className="text-xs bg-gray-800 text-purple-300 px-2 py-1 rounded"
              whileHover={{
                backgroundColor: "#A855F7",
                color: "#ffffff",
                y: -2,
              }}
              transition={{ duration: 0.2 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          >
            <span>View Site</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

