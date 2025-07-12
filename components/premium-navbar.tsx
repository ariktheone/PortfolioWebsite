"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Code, Briefcase, FileText, Mail, Award, Eye } from "lucide-react"

interface NavbarProps {
  scrollToSection: (sectionId: string) => void
  menuItems?: Array<{
    id: string
    label: string
    icon: any
  }>
}

export default function PremiumNavbar({ scrollToSection, menuItems: propMenuItems }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  // Fixed order to match the actual page sections
  const defaultMenuItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "publications", label: "Publications", icon: FileText },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "gallery", label: "Gallery", icon: Eye },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const menuItems = propMenuItems || defaultMenuItems

  useEffect(() => {
    const handleScroll = () => {
      // Don't update scroll state if menu is open
      if (isMenuOpen) return
      
      const scrollTop = window.scrollY
      setScrolled(scrollTop > 50)

      // Improved section detection with proper offset for navbar height
      const sections = menuItems.map((item) => item.id)
      let currentSection = "hero"

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const navbarHeight = 80 // Account for navbar height
          const offset = navbarHeight + 50 // Additional offset for better detection
          
          if (rect.top <= offset && rect.bottom >= offset) {
            currentSection = section
          }
        }
      }

      setActiveSection(currentSection)
    }

    // Throttle scroll event for better performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", throttledHandleScroll)
  }, [menuItems, isMenuOpen])

  const handleMenuClick = (sectionId: string) => {
    // Restore scroll position if body is fixed
    if (document.body.style.position === 'fixed') {
      const scrollY = parseInt(document.body.style.top || '0', 10) * -1
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
      setTimeout(() => {
        scrollToSection(sectionId)
      }, 10) // slight delay to ensure scroll restoration
    } else {
      scrollToSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && event.target instanceof Element) {
        const navbar = document.querySelector('[data-navbar]')
        const mobileMenu = document.querySelector('[data-mobile-menu]')
        
        if (navbar && mobileMenu && 
            !navbar.contains(event.target) && 
            !mobileMenu.contains(event.target)) {
          setIsMenuOpen(false)
        }
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside, { capture: true })
    }
    
    return () => document.removeEventListener('click', handleClickOutside, { capture: true })
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open - SIMPLIFIED
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY
      
      // Apply styles to prevent background scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore original styles
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        
        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
  }, [isMenuOpen])

  return (
    <>
      <motion.nav
        data-navbar
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }} // Reduce duration for snappier feel
        className={`fixed top-0 w-full z-50 will-change-transform transition-all duration-200 ${
          scrolled 
            ? "bg-black/90 backdrop-blur-md border-b border-white/20 shadow-lg" // lighter blur/shadow
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
          <div className="flex justify-between items-center">
            {/* Premium Logo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="cursor-pointer group"
              onClick={() => handleMenuClick("hero")}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center shadow-xl">
                    <span className="text-black text-sm sm:text-lg lg:text-xl font-black tracking-tight">AM</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight">Arijit Mondal</div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide">Creative Developer</div>
                </div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center space-x-1">
              {menuItems.slice(1).map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMenuClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-black bg-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10 text-sm tracking-wide">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-white rounded-xl shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              className={`xl:hidden p-3 rounded-xl backdrop-blur-xl transition-all duration-300 ${
                isMenuOpen 
                  ? "bg-white/20 border border-white/30" 
                  : "bg-white/10 border border-white/20 hover:bg-white/20"
              }`}
              aria-label="Toggle menu"
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
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-[49] xl:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Premium Mobile Menu - FIXED BLUR ISSUE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            data-mobile-menu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="xl:hidden fixed top-[88px] left-0 right-0 z-[51] mx-4 sm:mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="space-y-1">
                  {menuItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full p-4 rounded-xl transition-all duration-200 text-left group ${
                          activeSection === item.id
                            ? "bg-white text-black shadow-lg"
                            : "bg-transparent text-gray-300 hover:bg-white/10 hover:text-white active:bg-white/20"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-5 h-5 flex-shrink-0" />
                          <span className="font-semibold">{item.label}</span>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
