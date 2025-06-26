"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Code, Briefcase, FileText, Mail } from "lucide-react"

interface NavbarProps {
  scrollToSection: (sectionId: string) => void
}

export default function PremiumNavbar({ scrollToSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const menuItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "experience", label: "Experience", icon: FileText },
    { id: "publications", label: "Publications", icon: FileText },
    { id: "gallery", label: "Gallery", icon: User }, // Using User as placeholder, you can change to Eye if imported
    { id: "contact", label: "Contact", icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = menuItems.map((item) => item.id)
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMenuClick = (sectionId: string) => {
    scrollToSection(sectionId === "hero" ? "hero" : sectionId)
    setIsMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled ? "bg-black/80 backdrop-blur-3xl border-b border-white/10 shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-8xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            {/* Premium Logo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="cursor-pointer group"
              onClick={() => scrollToSection("hero")}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center shadow-2xl">
                    <span className="text-black text-xl font-black tracking-tight">AM</span>
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-2xl font-black text-white tracking-tight">Arijit Mondal</div>
                  <div className="text-sm text-gray-400 font-medium tracking-wide">Creative Developer</div>
                </div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              {menuItems.slice(1).map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleMenuClick(item.id)}
                  className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-500 group ${
                    activeSection === item.id
                      ? "text-black bg-white shadow-2xl"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10 text-sm tracking-wide">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-white rounded-2xl shadow-2xl"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all duration-500"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Premium Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="lg:hidden bg-black/95 backdrop-blur-3xl border-t border-white/10"
            >
              <div className="max-w-8xl mx-auto px-8 py-8">
                <div className="space-y-4">
                  {menuItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full p-6 rounded-2xl border transition-all duration-500 text-left group ${
                          activeSection === item.id
                            ? "bg-white text-black border-white shadow-2xl"
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <IconComponent className="w-6 h-6" />
                          <span className="font-semibold text-lg">{item.label}</span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
