"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"

interface NavbarProps {
  activeSection: string
  onNavClick: (section: string) => void
}

export default function Navbar({ activeSection, onNavClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Projects", section: "projects" },
    { name: "Skills", section: "skills" },
    { name: "Contact", section: "contact" },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-purple-400 transition-colors flex items-center"
          onClick={() => onNavClick("home")}
        >
          <span className="text-purple-500">Portfolio</span>
          <motion.div
            className="ml-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Sparkles className="h-5 w-5 text-purple-500" />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.section}
              onClick={() => onNavClick(link.section)}
              className={`text-lg transition-colors relative ${
                activeSection === link.section ? "text-purple-500" : "text-white hover:text-purple-400"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {link.name}
              {activeSection === link.section && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <motion.button
                  key={link.section}
                  onClick={() => {
                    onNavClick(link.section)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-lg py-2 transition-colors ${
                    activeSection === link.section ? "text-purple-500" : "text-white hover:text-purple-400"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

