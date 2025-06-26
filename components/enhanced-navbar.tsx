"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, GraduationCap, Code, Briefcase, FileText, Mail, Sun, Moon } from "lucide-react"

interface NavbarProps {
  scrollToSection: (sectionId: string) => void
}

export default function EnhancedNavbar({ scrollToSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isDark, setIsDark] = useState(true)

  const menuItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "publications", label: "Publications", icon: FileText },
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
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-2xl border-b border-blue-500/20 shadow-2xl shadow-blue-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="cursor-pointer group"
              onClick={() => scrollToSection("hero")}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-xl">
                    A
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-white tracking-tight">Arijit Mondal</div>
                  <div className="text-xs text-gray-400 font-medium">Full-Stack Developer</div>
                </div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.slice(1).map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleMenuClick(item.id)}
                  className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-slate-300 hover:text-blue-400 hover:bg-blue-500/5"
                  }`}
                >
                  <span className="relative z-10 text-sm">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-blue-500/10 rounded-xl border border-blue-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300"
              >
                {isDark ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
              </motion.button>

              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10"
            >
              <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 gap-2">
                  {menuItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleMenuClick(item.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 text-left group ${
                          activeSection === item.id
                            ? "bg-white/10 border-white/20 text-white"
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
