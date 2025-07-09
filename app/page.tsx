"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Instagram, Mail, MapPin, Phone, Sparkles, Zap } from "lucide-react"
import EnhancedSparkleEffect from "@/components/enhanced-sparkle-effect"
import LightningEffect from "@/components/lightning-effect"
import FloatingDots from "@/components/floating-dots"
import TextAnimation from "@/components/text-animation"
import Navbar from "@/components/navbar"
import ProjectCard from "@/components/project-card"
import SkillCategory from "@/components/skill-category"
import ContactForm from "@/components/contact-form"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      if (homeRef.current && scrollPosition < homeRef.current.offsetHeight) {
        setActiveSection("home")
      } else if (aboutRef.current && scrollPosition < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
        setActiveSection("about")
      } else if (skillsRef.current && scrollPosition < skillsRef.current.offsetTop + skillsRef.current.offsetHeight) {
        setActiveSection("skills")
      } else if (
        projectsRef.current &&
        scrollPosition < projectsRef.current.offsetTop + projectsRef.current.offsetHeight
      ) {
        setActiveSection("projects")
      } else if (contactRef.current) {
        setActiveSection("contact")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const projects = [
    {
      id: 1,
      title: "Driver Drowsiness Detection",
      description:
        "A machine learning project that identifies and categorizes objects in images using computer vision and AI.",
      image: "/projects/drowsy.jpg",
      link: "https://ai-image-recognition.example.com",
      technologies: ["Python", "TensorFlow", "Computer Vision", "ML"],
    },
    {
      id: 2,
      title: "Fake Pan Card Detection",
      description:
        "A full-stack e-commerce solution with user authentication, product management, and payment integration.",
      image: "/projects/PAN-Card.jpg",
      link: "https://ecommerce-platform.example.com",
      technologies: ["Django", "React", "PostgreSQL", "Stripe"],
    },
    {
      id: 3,
      title: "Telegram Chatbot",
      description:
        "Interactive dashboard for visualizing financial data and analyzing real-time metrics.",
      image: "/projects/chatbot.jpg",
      link: "https://financial-analytics.example.com",
      technologies: ["PHP", "MySQL", "Express", "MongoDB"],
    },
    {
      id: 4,
      title: "E-Learning Static Website",
      description:
        "A static e-learning website with intuitive navigation, video lessons, quizzes, and progress tracking for effective learning.",
      image: "/projects/Elearning.jpg",
      link: "https://chandrikavaddey.github.io/E-learning-/",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 5,
      title: "Ecommerce Fashion Store",
      description:
        "A dynamic e-commerce fashion website featuring product listing, cart, and checkout.",
      image: "/projects/ecommerce.jpg", // Ensure this matches your actual file name
      link: "https://fashions-dress.netlify.app/",
      technologies: ["React", "HTML/CSS", "JavaScript", "Express.js", "Flask", "Django", "MongoDB"],
    },
    {
      id: 6,
      title: "To-Do List App",
      description:
        "This project showcases a simple and efficient tool for task management, designed to help users stay organized and productive.",
      image: "/projects/todo-list.jpg", // Updated filename to avoid spaces
      link: "https://chandrikavaddey.github.io/To-DO-List-App/",
      technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask", "SQLite"],
    },
  ];
  

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
                className="text-purple-500"
              >
                <Sparkles className="h-16 w-16" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-30"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar
        activeSection={activeSection}
        onNavClick={(section) => {
          switch (section) {
            case "home":
              scrollToSection(homeRef)
              break
            case "about":
              scrollToSection(aboutRef)
              break
            case "projects":
              scrollToSection(projectsRef)
              break
            case "skills":
              scrollToSection(skillsRef)
              break
            case "contact":
              scrollToSection(contactRef)
              break
          }
        }}
      />

      {/* Home Section */}
      <section ref={homeRef} className="min-h-screen relative flex items-center pt-20 overflow-hidden">
        <EnhancedSparkleEffect />
        <FloatingDots count={15} />

        <motion.div
          className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between relative z-10"
          style={{ opacity, scale, y: translateY }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:w-1/2 space-y-6">
            <TextAnimation text="Hey All," className="text-xl md:text-2xl block" delay={0.5} />

            <h1 className="text-5xl md:text-7xl font-bold">
              <TextAnimation text="I am " className="inline-block" delay={0.8} />
              <TextAnimation text="Chandrika Vaddey " className="text-purple-500 inline-block" delay={1.1} />
            </h1>

            <div className="flex items-center space-x-2 text-xl md:text-2xl text-purple-400">
              <Sparkles className="h-6 w-6 animate-pulse" />
              <TextAnimation text="Full Stack Python Developer &" delay={1.4} />
            </div>

            <TextAnimation
              text="AIML Enthusiast"
              className="text-xl md:text-2xl text-purple-400 ml-8 block"
              delay={1.7}
            />

            <motion.p
              className="text-gray-300 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              A passionate Full-Stack Python Developer and Machine Learning Enthusiast with a fresh perspective as a
              recent graduate.
            </motion.p>

            <motion.div
              className="flex space-x-6 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <Link
                href="https://github.com/chandrikavaddey"
                className="hover:text-purple-400 transition-colors transform hover:scale-110 duration-200"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com/in/chandrika-vaddey"
                className="hover:text-purple-400 transition-colors transform hover:scale-110 duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com/_Chandrika_Vaddey_"
                className="hover:text-purple-400 transition-colors transform hover:scale-110 duration-200"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:chandrikavaddey9@gmail.com"
                className="hover:text-purple-400 transition-colors transform hover:scale-110 duration-200"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </motion.div>

            <motion.button
              onClick={() => scrollToSection(aboutRef)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-all transform hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              whileHover={{
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.7)",
              }}
            >
              <span>Know More</span>
              <Sparkles className="h-5 w-5" />
            </motion.button>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <LightningEffect color="#A855F7" intensity={0.5} />
              <motion.div
                className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <div className="relative rounded-full border-4 border-purple-500 overflow-hidden h-64 w-64 md:h-80 md:w-80">
                <Image src="/profile.jpg" alt="Chandrika Vaddey" fill className="object-cover" />
              </div>

              <motion.div
    className="mt-2 text-white text-xl font-semibold flex items-center justify-center gap-1 px-4 py-1 rounded-full"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.8 }}
>
    Profile <Sparkles className="h-5 w-5 text-purple-400 ml-1" />
</motion.div>

            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 bg-black relative overflow-hidden">
        <EnhancedSparkleEffect baseCount={5} scrollMultiplier={2} />
        <FloatingDots count={8} />

        <motion.div
          className="container mx-auto px-4 md:px-6 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="flex items-center justify-center mb-12"
            whileInView={{
              textShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 10px rgba(168,85,247,0.5)", "0 0 0px rgba(168,85,247,0)"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center inline-flex items-center">
              About <span className="text-purple-500 ml-2">Me</span>
              <Sparkles className="h-6 w-6 ml-2 text-purple-500" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="text-gray-300 mb-6">
                I'm a recent graduate in Artificial Intelligence and Machine Learning, I specialize in building full-stack projects that solve real-world challenges.
              </p>
              <p className="text-gray-300 mb-6">
                My focus is on developing web apps, data science applications using modern tools, and leveraging my
                technical expertise to solve real-world problems in the tech industry.
              </p>
            </motion.div>

            <div>
              <motion.h3
                className="text-2xl font-semibold mb-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                My Experience
              </motion.h3>

              <div className="space-y-8">
                <motion.div
                  className="border-l-2 border-purple-500 pl-4"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h4 className="text-xl font-medium text-purple-400">FullStack Python Developer</h4>
                  <p className="text-sm text-purple-300">Oneyes InfoTech Solutions . (2025 - Present)</p>
                  <p className="text-gray-400 mt-2">
                    Working on web development projects using Python, Django, and React.
                  </p>
                </motion.div>

                <motion.div
                  className="border-l-2 border-purple-500 pl-4"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h4 className="text-xl font-medium text-purple-400">AI&ML Graduate</h4>
                  <p className="text-sm text-purple-300">Swarnandhra College of Engineering & Technology (2021 - 2025)</p>
                  <p className="text-gray-400 mt-2">
                    Bachelor of Technology in Artificial Intelligence and Machine Learning with focus on software development.
                  </p>
                </motion.div>

                <motion.div
                  className="border-l-2 border-purple-500 pl-4"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h4 className="text-xl font-medium text-purple-400">AI Intern</h4>
                  <p className="text-sm text-purple-300">Aimers Society (Summer 2024)</p>
                  <p className="text-gray-400 mt-2">
                    Summer internship focused on Object detection, Visual Q/A Chatbots, PowerBI, talking Parrot Tasks.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-20 bg-black/90 relative overflow-hidden">
        <EnhancedSparkleEffect baseCount={8} scrollMultiplier={2} />
        <FloatingDots count={12} />
        <LightningEffect color="#A855F7" intensity={0.3} interval={8000} />

        <motion.div
          className="container mx-auto px-4 md:px-6 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="flex items-center justify-center mb-12"
            whileInView={{
              textShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 10px rgba(168,85,247,0.5)", "0 0 0px rgba(168,85,247,0)"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center inline-flex items-center">
              My <span className="text-purple-500 ml-2">Skills</span>
              <Zap className="h-6 w-6 ml-2 text-purple-500" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative">
              <LightningEffect color="#A855F7" intensity={0.4} interval={5000} />
              <SkillCategory
                title="Frontend"
                skills={["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Bootstrap"]}
                color="purple"
                delay={0.1}
              />
            </div>

            <div className="relative">
              <LightningEffect color="#A855F7" intensity={0.4} interval={7000} />
              <SkillCategory
                title="Backend"
                skills={["Python", "Django", "Flask", "Node.js", "Express"]}
                color="purple"
                delay={0.2}
              />
            </div>

            <div className="relative">
              <LightningEffect color="#A855F7" intensity={0.4} interval={6000} />
              <SkillCategory
                title="Databases"
                skills={[ "MongoDB", "MySQL","SQLite"]}
                color="purple"
                delay={0.3}
              />
            </div>

            <div className="relative">
              <LightningEffect color="#A855F7" intensity={0.4} interval={8000} />
              <SkillCategory
                title="Machine Learning"
                skills={["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Data Analysis"]}
                color="purple"
                delay={0.4}
              />
            </div>

            <div className="relative">
              <LightningEffect color="#A855F7" intensity={0.4} interval={9000} />
              <SkillCategory
                title="Tools & Others"
                skills={["Git", "VS Code", "PyCharm","Streamlit", "Google Colab","Anaconda Navigator"]}
                color="purple"
                delay={0.5}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="py-20 bg-black relative overflow-hidden">
        <EnhancedSparkleEffect baseCount={15} scrollMultiplier={2} />
        <FloatingDots count={20} />
        <LightningEffect color="#A855F7" intensity={0.4} interval={6000} />

        <motion.div
          className="container mx-auto px-4 md:px-6 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            whileInView={{
              textShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 10px rgba(168,85,247,0.5)", "0 0 0px rgba(168,85,247,0)"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center inline-flex items-center">
              My <span className="text-purple-500 ml-2">Projects</span>
              <Sparkles className="h-6 w-6 ml-2 text-purple-500" />
            </h2>
          </motion.div>

          <motion.p
            className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Here are some of my recent projects. Each project reflects my passion for creating efficient, user-friendly
            applications and my skills in various technologies.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={0.1 * index} hasLightning={index % 2 === 0} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 bg-black/90 relative overflow-hidden">
        <EnhancedSparkleEffect baseCount={10} scrollMultiplier={2} />
        <FloatingDots count={15} />

        <motion.div
          className="container mx-auto px-4 md:px-6 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="flex items-center justify-center mb-12"
            whileInView={{
              textShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 10px rgba(168,85,247,0.5)", "0 0 0px rgba(168,85,247,0)"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center inline-flex items-center">
              Get In <span className="text-purple-500 ml-2">Touch</span>
              <Sparkles className="h-6 w-6 ml-2 text-purple-500" />
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

              <div className="space-y-4">
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">Palacol, W.G.D, AP, India</span>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="h-5 w-5 text-purple-400" />
                  <a
                    href="mailto:chandrikavaddey9@gmail.com"
                    className="text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    chandrikavaddey9@gmail.com
                  </a>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="h-5 w-5 text-purple-400" />
                  <a href="tel:+91 7989193698" className="text-gray-300 hover:text-purple-400 transition-colors">
                    +91 79XX19XX98 
                  </a>
                </motion.div>
              </div>

              <h3 className="text-xl font-semibold mt-10 mb-6">Connect with me</h3>

              <div className="flex space-x-4">
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 0 15px rgba(168,85,247,0.5)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="https://github.com/chandrikavaddey"
                    className="bg-gray-800 p-3 rounded-full hover:bg-purple-500 transition-colors flex items-center justify-center"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 0 15px rgba(168,85,247,0.5)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="https://linkedin.com/in/chandrika-vaddey"
                    className="bg-gray-800 p-3 rounded-full hover:bg-purple-500 transition-colors flex items-center justify-center"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 0 15px rgba(168,85,247,0.5)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="https://instagram.com/_Chandrika_Vaddey_"
                    className="bg-gray-800 p-3 rounded-full hover:bg-purple-500 transition-colors flex items-center justify-center"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-500">Portfolio</span> © {new Date().getFullYear()} All rights reserved.
          </motion.p>

          <motion.div
            className="flex space-x-4 mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="https://github.com/chandrikavaddey"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com/in/chandrika-vaddey"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="https://instagram.com/_Chandrika_Vaddey_"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:chandrikavaddey9@gmail.com"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}

