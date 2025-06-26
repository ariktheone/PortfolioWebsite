"use client"

import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X, Home, User, GraduationCap, Code, Briefcase, FileText, Mail } from "lucide-react"

interface NavbarProps {
  scrollToSection: (sectionId: string) => void
}

export default function ModernNavbar({ scrollToSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollY } = useScroll()

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)

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
  })

  const handleMenuClick = (sectionId: string) => {
    scrollToSection(sectionId === "hero" ? "hero" : sectionId)
    setIsMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
                <div className="text-xl font-semibold text-white">Arijit Mondal</div>
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.slice(1).map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleMenuClick(item.id)}
                  className={`relative px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <span className="relative z-10 text-sm">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-blue-500/10 rounded-lg border border-blue-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm"
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
                    <X className="w-5 h-5 text-blue-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-blue-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-slate-950/98 backdrop-blur-xl border-t border-slate-800/50"
            >
              <div className="container mx-auto px-6 py-6">
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
                        className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                          activeSection === item.id
                            ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                            : "bg-slate-800/30 border-slate-700/30 text-slate-300 hover:bg-slate-700/50 hover:text-white"
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
