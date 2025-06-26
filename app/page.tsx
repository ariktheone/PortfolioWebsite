"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Code,
  Database,
  Globe,
  Cpu,
  Award,
  Briefcase,
  User,
  ChevronDown,
  FileText,
  Brain,
  Layers,
  ArrowRight,
  Target,
  TrendingUp,
  ExternalLink,
  Play,
  Sparkles,
  Coffee,
  Heart,
  Zap,
  Calendar,
  Eye,
} from "lucide-react"
import UltraModernBackground from "@/components/ultra-modern-background"
import PremiumNavbar from "@/components/premium-navbar"
import { UltraModernCard, ProjectCard, SkillCard } from "@/components/ultra-modern-cards"
import { AnimatedSection, CountUp } from "@/components/animated-sections"
import Image from "next/image"
import { Home } from "lucide-react"
import { useState, useRef } from "react"
import CircularGallery from "@/components/circular-gallery"

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const skills = {
    "Programming Languages": ["Python", "JavaScript", "C++", "SQL", "Verilog", "MATLAB", "SystemVerilog"],
    "Web Technologies": ["React.js", "Node.js", "Flask", "Django", "REST API", "HTML5", "CSS3", "TailwindCSS"],
    "AI/ML & Data Science": ["TensorFlow", "PyTorch", "OpenCV", "scikit-learn", "CNN", "GAN", "RNN", "Computer Vision"],
    "Semiconductor & Hardware": ["Silvaco TCAD", "SPICE", "Xilinx Vivado", "ModelSim", "FPGA", "PCB Design"],
    "Cloud & DevOps": ["Git", "GitHub Actions", "Linux", "Docker", "CI/CD"],
    Databases: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
  }

  const projects = [
    {
      title: "StayFinder - Airbnb Clone",
      description:
        "Full-featured accommodation booking platform with smart search, Stripe payments, messaging, host dashboards, and interactive maps — built using React, TypeScript, and Supabase.",
      tech: [
        "React.js",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Stripe",
        "Mapbox",
        "PostgreSQL"
      ],
      github: "https://github.com/ariktheone/stayfinder-web-home",
      live: "https://stayfinder-web-home.vercel.app",
      image: "/stayfinder-web-home.png?height=300&width=500",
      category: "Full-Stack Web App"
    },
    {
      title: "Seismic Risk Prediction Platform",
      description:
        "Predictive platform using Random Forest/SVM on 18,029 earthquake dataset achieving 87% accuracy with real-time geographical visualization.",
      tech: ["Python", "Flask", "Machine Learning", "Google Maps API", "React"],
      github: "https://github.com/ariktheone/earthquake-predction",
      live: "https://earthquake-predction-using-ml.onrender.com",
      image: "/earthquake-predction.png?height=300&width=500",
      category: "AI/ML",
    },
    {
      title: "Automated Traffic Light Controller (ATLC)",
      description:
        "DSP-enhanced urban traffic control system using VHDL and state-machine logic, implemented in Vivado to simulate dynamic traffic light management for intersection safety.",
      tech: ["VHDL", "Vivado", "Verilog", "FPGA", "Digital Signal Processing"],
      github: "https://github.com/ariktheone/ATLC-Design-DSP-driven-Urban-Traffic-Control-in-VHDL",  // Replace with actual repository link if available
      live: "#",
      image: "https://github.com/ariktheone/ATLC-Design-DSP-driven-Urban-Traffic-Control-in-VHDL/blob/main/image1.png?raw=true?height=300&width=500",
      category: "Hardware & Embedded Systems"
    },
    {
      title: "Emotion & Depression Analysis AI",
      description:
        "AI-powered emotional health analysis platform using deep learning, NLP, and real-time data visualization for mental well-being assessment.",
      tech: ["Python", "Streamlit", "TensorFlow", "NLP", "Plotly"],
      github: "https://github.com/ariktheone/emotion-depression-analysis",
      live: "https://emotion-depression-analysis.onrender.com",
      image: "/emotion-depression-analysis.png?height=300&width=500",
      category: "AI & Data Science"
    },
    {
      title: "AI-Based Deepfake Detection System",
      description:
        "Real-time video classifier using GAN encoder-decoder achieving 92% accuracy with React frontend and Flask API backend.",
      tech: ["Python", "CNN", "GAN", "Flask", "React", "Docker", "OpenCV"],
      github: "https://github.com/ariktheone",
      live: "#",
      image: "/placeholder.svg?height=300&width=500",
      category: "AI/ML",
    },
  ]

  const experiences = [
    {
      title: "Student Researcher",
      company: "IEDC, IEM Kolkata",
      duration: "May 2024 - July 2024",
      description:
        "Conducted TFET and solar cell simulations using Silvaco TCAD. Modified Pasveer Hopping Model and implemented Gaussian DOS modelling for IR-based gas sensor applications. Achieved 20% improvement in switching characteristics.",
      type: "Research",
    },
    {
      title: "Open Source Contributor",
      company: "Social Summer of Code",
      duration: "June 2024 - August 2024",
      description:
        "Contributed to React-Python projects, automated DevOps workflows improving efficiency by 40%. Refactored legacy code modules and collaborated using agile methodologies.",
      type: "Development",
    },
  ]

  const publications = [
    {
      title: "Performance Analysis of Dual Junction Solar Cell Devices utilizing Subcells of In0.51Ga0.49P and GaAs to Study Key Solar Cell Parameters via TCAD based Simulation",
      journal: "Journal of Polymer and Composites",
      year: "2024",
      authors: "Indranil Maity, Arighna Bhattacharjee, Arijit Mondal",
      doi: "XX.XXXX/TED.2024.xxxxx",
      abstract:
        "A high-efficiency In₀.₅₁Ga₀.₄₉P/GaAs dual-junction solar cell was designed using Silvaco TCAD, achieving 25.65% efficiency by optimizing lattice-matched layers and employing GaAs as a tunnel junction.",
      type: "Journal",
      status: "Published",
    },
    {
      title:
        "Customized Design and Optimization of New Materials in Silvaco TCAD Tool by Understanding Inherent Material Defining Processes and Useful Simulation Methods: An Extensive Study",
      journal: "IEEE Xplore | IEEE EDKCON 2024",
      year: "2024",
      authors: "Indranil Maity, Arijit Mondal",
      doi: "10.1109/EDKCON62339.2024.10870805",
      abstract:
        "Customized material and method definitions in Silvaco TCAD enhance simulation accuracy by overcoming limitations of default models in advanced semiconductor device design.",
      type: "Conference",
      status: "Published",
    },
    {
      title:
        "Modulation of Electronic Properties in Triple Metal Gate Vertical Tunnel Field Effect Transistors by the Variation of Gate Dielectrics",
      journal: "IEEE Xplore | IEEE Calcutta Conference (CALCON) 2024",
      year: "2024",
      authors: "Indranil Maity, Arighna Bhattacharjee, Arijit Mondal",
      doi: "10.1109/CALCON63337.2024.10914239",
      abstract:
        "The proposed TMG-VTFET leverages vertical design, narrow bandgap source, and triple metal gates, with HfO₂ enabling superior electrostatic control and enhanced device performance.",
      type: "Conference",
      status: "Published",
    },
  ]

  const galleryImages = [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Research Lab Work",
      title: "TFET Research",
      description: "Working on semiconductor device modeling",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Conference Presentation",
      title: "IEEE Conference",
      description: "Presenting research findings",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Team Collaboration",
      title: "Team Project",
      description: "Collaborative development session",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Hackathon Victory",
      title: "Hackathon Win",
      description: "National hackathon finalist",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Lab Equipment",
      title: "VLSI Lab",
      description: "Advanced semiconductor testing",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Code Review",
      title: "Development",
      description: "Full-stack development work",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Research Paper",
      title: "Publication",
      description: "Research documentation",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Innovation",
      title: "Innovation",
      description: "Creative problem solving",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const menuItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "experience", label: "Experience", icon: FileText },
    { id: "publications", label: "Publications", icon: FileText },
    { id: "gallery", label: "Gallery", icon: Eye },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0)
  const galleryControlsRef = useRef<GalleryControls | null>(null)

  interface GalleryControls {
    next: () => void;
    prev: () => void;
  }

  const handleGalleryInit = (controls: GalleryControls) => {
    galleryControlsRef.current = controls
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <UltraModernBackground />
      <PremiumNavbar scrollToSection={scrollToSection} menuItems={menuItems} />

      {/* Ultra-Modern Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-visible mt-8 pb-24">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0" />

        <div className="max-w-8xl mx-auto px-8 text-center z-20 relative mt-9">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-12"
          >
            {/* Premium Avatar */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150, damping: 25 }}
              className="relative mx-auto w-40 h-40 mb-12 mt-9"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center shadow-2xl mt-8">
                {/*<span className="text-black text-5xl font-black tracking-tight">AM</span>*/}
                <img
                  src="/image.png"
                  alt="AM Logo"
                  className=" object-cover rounded-full z-50"
                />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-xl opacity-60"></div>
            </motion.div>

            {/* Hero Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tight leading-none">
                  Arijit Mondal
                </h1>
                <div className="flex items-center justify-center space-x-3 text-2xl text-gray-300">
                  <Sparkles className="w-6 h-6" />
                  <span className="font-light tracking-wide">Electronics & Communication Engineering</span>
                  <Sparkles className="w-6 h-6" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-6"
              >
                <p className="text-3xl md:text-4xl text-gray-300 font-light max-w-5xl mx-auto leading-relaxed">
                  AI/ML Researcher • Full-Stack Developer • Semiconductor Specialist
                </p>
                <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light">
                  Crafting intelligent solutions at the intersection of artificial intelligence, web development, and
                  semiconductor innovation with published research and proven results.
                </p>
              </motion.div>
            </div>

            {/* Premium Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto"
            >
              {[
                { value: 500, suffix: "+", label: "GitHub Commits", icon: TrendingUp },
                { value: 3, suffix: "+", label: "Publications", icon: FileText },
                { value: 92, suffix: "%", label: "AI Accuracy", icon: Target },
                { value: 9.44, suffix: "/10", label: "CGPA", icon: Award },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.15 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-white/20 to-white/10 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-400 font-medium tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex flex-wrap justify-center gap-6 mt-16"
            >
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-white text-black px-10 py-6 rounded-3xl transition-all duration-500 transform hover:scale-105 shadow-2xl font-bold text-lg"
              >
                <Play className="w-6 h-6 mr-3" />
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-black hover:bg-white/10 px-10 py-6 rounded-3xl transition-all duration-500 backdrop-blur-xl font-bold text-lg shadow-2xl"
              >
                <Download className="w-6 h-6 mr-3" />
                Download Resume
              </Button>
            </motion.div>

            {/* Premium Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex justify-center space-x-8 mt-12"
            >
              {[
                { icon: Github, href: "https://github.com/ariktheone", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/arijitmondal30", label: "LinkedIn" },
                { icon: Mail, href: "mailto:arijitmondal200430@gmail.com", label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== "Email" ? "_blank" : undefined}
                  rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.15 }}
                  whileHover={{ scale: 1.15, y: -8 }}
                  className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-500 shadow-2xl"
                >
                  <social.icon className="w-7 h-7" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Premium Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
          className="absolute bottom-3 transform -translate-x-1/2 z-20 cursor-pointer"
          onClick={() => {
            const nextSection = document.getElementById("about")
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl">
            <ChevronDown className="w-7 h-7 text-white" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 relative z-10">
        <div className="max-w-8xl mx-auto px-8">
          <AnimatedSection className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 rounded-full px-8 py-4 mb-12 backdrop-blur-xl shadow-2xl">
              <User className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">About Me</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-12 text-white leading-tight">
              Crafting Digital{" "}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Excellence</span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-gray-700 to-white mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="max-w-7xl mx-auto">
            <UltraModernCard delay={2}>
              <CardContent className="p-16">
                <div className="grid lg:grid-cols-2 gap-16">
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-4xl font-black text-gray-900 mb-8 flex items-center">
                        <div className="w-4 h-12 bg-gradient-to-b from-white to-gray-900 rounded-full mr-6"></div>
                        Professional Journey
                      </h3>
                      <p className="text--gray-800 leading-relaxed text-xl mb-8 font-light">
                        Computer Science focused ECE undergraduate with expertise in full-stack development, AI/ML, and
                        software engineering. Proven track record in scalable web applications, deep learning models,
                        and open-source contributions.
                      </p>
                      <p className="text--gray-800 leading-relaxed text-xl font-light">
                        Experienced in Python, React, cloud technologies, and agile methodologies. National hackathon
                        finalist with published semiconductor research and strong foundation in VLSI design and device
                        modeling.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
                        <Sparkles className="w-6 h-6 text-gray-700 mr-4" />
                        Core Expertise
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Artificial Intelligence",
                          "Machine Learning",
                          "Full-Stack Development",
                          "Cloud Computing",
                          "Semiconductor Design",
                          "VLSI Architecture",
                        ].map((expertise) => (
                          <Badge
                            key={expertise}
                            variant="secondary"
                            className="bg-white/10 text-gray-600 border-white/20 py-3 px-5 text-base font-semibold backdrop-blur-xl shadow-lg"
                          >
                            {expertise}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-white mb-8 flex items-center">
                        <Globe className="w-6 h-6 text-white mr-4" />
                        Languages
                      </h4>
                      <div className="space-y-6">
                        {[
                          { lang: "English", level: "Fluent", width: "100%" },
                          { lang: "Hindi", level: "Fluent", width: "100%" },
                          { lang: "Bengali", level: "Native", width: "100%" },
                        ].map((language) => (
                          <div key={language.lang} className="space-y-3">
                            <div className="flex justify-between text-lg">
                              <span className="text-gray-700 font-bold">{language.lang}</span>
                              <span className="text-gray-400 font-medium">{language.level}</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-white to-gray-800 h-3 rounded-full transition-all duration-1500"
                                style={{ width: language.width }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </UltraModernCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-40 relative z-10">
        <div className="max-w-8xl mx-auto px-8">
          <AnimatedSection className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 rounded-full px-8 py-4 mb-12 backdrop-blur-xl shadow-2xl">
              <Code className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Technical Skills</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-12 text-white leading-tight">
              Technology{" "}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Stack</span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-white to-gray-300 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Object.entries(skills).map(([category, skillList], index) => (
              <SkillCard
                key={category}
                category={category}
                skills={skillList}
                delay={index}
                icon={
                  category === "Programming Languages" ? (
                    <Code className="w-7 h-7 text-gray-700" />
                  ) : category === "Web Technologies" ? (
                    <Globe className="w-7 h-7 text-gray-700" />
                  ) : category === "AI/ML & Data Science" ? (
                    <Brain className="w-7 h-7 text-gray-700" />
                  ) : category === "Semiconductor & Hardware" ? (
                    <Cpu className="w-7 h-7 text-gray-700" />
                  ) : category === "Cloud & DevOps" ? (
                    <Layers className="w-7 h-7 text-gray-700" />
                  ) : (
                    <Database className="w-7 h-7 text-gray-700" />
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-40 relative z-10">
        <div className="max-w-8xl mx-auto px-8">
          <AnimatedSection className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 rounded-full px-8 py-4 mb-12 backdrop-blur-xl shadow-2xl">
              <Briefcase className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Featured Projects</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-12 text-white leading-tight">
              Innovation{" "}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Showcase</span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-white to-gray-300 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} delay={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-40 relative z-10">
        <div className="max-w-8xl mx-auto px-8">
          <AnimatedSection className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 rounded-full px-8 py-4 mb-12 backdrop-blur-xl shadow-2xl">
              <Briefcase className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Professional Experience</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-12 text-white leading-tight">
              Career{" "}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Journey</span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-white to-gray-800 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto space-y-10">
            {experiences.map((exp, index) => (
              <UltraModernCard key={exp.title} delay={index}>
                <CardContent className="p-12">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center">
                      <div
                        className={`w-16 h-16 rounded-3xl mr-8 flex items-center justify-center shadow-2xl ${
                          exp.type === "Research"
                            ? "bg-gradient-to-br from-purple-500 to-purple-600"
                            : "bg-gradient-to-br from-green-500 to-green-600"
                        }`}
                      >
                        {exp.type === "Research" ? (
                          <Zap className="w-8 h-8 text-gray-800" />
                        ) : (
                          <Briefcase className="w-8 h-8 text-gray-800" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-3xl text-gray-800 mb-2 font-black">{exp.title}</CardTitle>
                        <p className="text-2xl text-gray-800 font-bold">{exp.company}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        exp.type === "Research"
                          ? "border-purple-500/30 text-purple-400 bg-purple-500/10"
                          : "border-green-500/30 text-green-400 bg-green-500/10"
                      } px-4 py-2 text-base font-bold`}
                    >
                      {exp.type}
                    </Badge>
                  </div>
                  <div className="flex items-center text-gray-700 mb-8 ml-24">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span className="text-lg font-medium">{exp.duration}</span>
                  </div>
                  <div className="ml-24">
                    <p className="text-gray-700 leading-relaxed text-xl font-light">{exp.description}</p>
                  </div>
                </CardContent>
              </UltraModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-40 relative z-10">
        <div className="max-w-8xl mx-auto px-8">
          <AnimatedSection className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 rounded-full px-8 py-4 mb-12 backdrop-blur-xl shadow-2xl">
              <FileText className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Research Publications</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-12 text-white leading-tight">
              Academic{" "}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Contributions
              </span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-white to-gray-300 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto space-y-8">
            {publications.map((pub, index) => (
              <UltraModernCard key={pub.title} delay={index}>
                <CardContent className="p-12">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center">
                      <div
                        className={`w-16 h-16 rounded-3xl mr-8 flex items-center justify-center shadow-2xl ${
                          pub.type === "Journal"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600"
                            : "bg-gradient-to-br from-purple-500 to-purple-600"
                        }`}
                      >
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-3xl text-gray-800 mb-2 font-black">{pub.title}</CardTitle>
                        <p className="text-xl text-gray-700 font-bold mb-2">{pub.journal}</p>
                        <p className="text-lg text-gray-600 font-medium">{pub.authors}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-3">
                      <Badge
                        variant="outline"
                        className={`${
                          pub.type === "Journal"
                            ? "border-blue-500/30 text-blue-400 bg-blue-500/10"
                            : "border-purple-500/30 text-purple-400 bg-purple-500/10"
                        } px-4 py-2 text-base font-bold`}
                      >
                        {pub.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${
                          pub.status === "Published"
                            ? "border-green-500/30 text-green-400 bg-green-500/10"
                            : "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                        } px-3 py-1 text-sm font-medium`}
                      >
                        {pub.status}
                      </Badge>
                      <span className="text-gray-500 font-bold text-lg">{pub.year}</span>
                    </div>
                  </div>

                  <div className="ml-24 space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg font-light">{pub.abstract}</p>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600/50 text-gray-700 hover:bg-gray-700/50 hover:text-white transition-all duration-300"
                        asChild
                      >
                        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          DOI: {pub.doi}
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </UltraModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-40 relative z-10">
        <div className="max-w-8xl mx-auto px-8">
          <AnimatedSection className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 rounded-full px-8 py-4 mb-12 backdrop-blur-xl shadow-2xl">
              <Eye className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Photo Gallery</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-12 text-white leading-tight">
              Journey{" "}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Highlights</span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-white to-gray-300 mx-auto rounded-full"></div>
          </AnimatedSection>

          <div className="relative max-w-6xl mx-auto">
            {/* WebGL-based circular gallery with navigation controls */}
            <div className="h-[700px] relative">
              {/* Gallery component with initialized callback */}
              <CircularGallery 
                items={galleryImages}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
                font="bold 30px Figtree"
                onInitialized={handleGalleryInit}
              />
              
              {/* Navigation buttons */}
              <div className="absolute w-full flex justify-between top-1/2 transform -translate-y-1/2 px-4 z-10 pointer-events-none">
                <motion.button
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 backdrop-blur-xl flex items-center justify-center text-white transition-all duration-300 shadow-2xl pointer-events-auto"
                  onClick={() => galleryControlsRef.current?.prev()}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 rotate-180" />
                </motion.button>
                
                <motion.button
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 backdrop-blur-xl flex items-center justify-center text-white transition-all duration-300 shadow-2xl pointer-events-auto"
                  onClick={() => galleryControlsRef.current?.next()}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                </motion.button>
              </div>
            </div>
            
            {/* Instructions */}
            <motion.div
              className="text-center mt-8 text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <p>Use navigation buttons or drag to explore the gallery</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 relative z-10">
        <div className="max-w-8xl mx-auto px-8">
          <AnimatedSection className="text-center mb-24">
            <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 rounded-full px-8 py-4 mb-12 backdrop-blur-xl shadow-2xl">
              <Mail className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Get In Touch</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black mb-12 text-white leading-tight">
              Let's{" "}
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Connect</span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-white to-gray-300 mx-auto rounded-full mb-12"></div>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              I'm always open to discussing new opportunities, research collaborations, and innovative projects that
              push the boundaries of technology.
            </p>
          </AnimatedSection>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
            <UltraModernCard delay={1}>
              <CardContent className="p-12">
                <CardTitle className="text-4xl text-gray-900 mb-12 flex items-center font-black">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center mr-6 shadow-2xl">
                    <Mail className="w-8 h-8 text-gray-800" />
                  </div>
                  Contact Information
                </CardTitle>
                <div className="space-y-10">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "arijitmondal200430@gmail.com",
                      href: "mailto:arijitmondal200430@gmail.com",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+91-75858-10789",
                      href: "tel:+917585810789",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Kolkata, West Bengal, India",
                      href: "#",
                    },
                  ].map((contact, index) => (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 8 }}
                      className="flex items-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 group backdrop-blur-xl shadow-2xl"
                    >
                      <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 mr-8 flex items-center justify-center shadow-2xl">
                        <contact.icon className="w-8 h-8 text-gray-800" />
                      </div>
                      <div>
                        <p className="text-gray-800 font-black text-2xl mb-2">{contact.label}</p>
                        <p className="text-gray-700 text-xl font-light">{contact.value}</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </UltraModernCard>

            <UltraModernCard delay={2}>
              <CardContent className="p-12">
                <CardTitle className="text-4xl text-gray-800 mb-12 flex items-center font-black">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center mr-6 shadow-2xl">
                    <Globe className="w-8 h-8 text-gray-800" />
                  </div>
                  Connect Online
                </CardTitle>
                <div className="space-y-6">
                  {[
                    {
                      icon: Github,
                      label: "GitHub Profile",
                      description: "See my repositories & contributions",
                      href: "https://github.com/ariktheone",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn Profile",
                      description: "Connect with me professionally",
                      href: "https://linkedin.com/in/arijitmondal30",
                    },
                    {
                      icon: Mail,
                      label: "Send Email",
                      description: "Drop me a message directly",
                      href: "mailto:arijitmondal200430@gmail.com",
                    },
                  ].map((social, index) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start p-8 h-auto border-white/30 text-gray-800 hover:bg-white/60 hover:border-black/70 transition-all duration-500 group backdrop-blur-xl shadow-2xl rounded-3xl"
                        asChild
                      >
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                          <div className="flex items-center w-full">
                            <social.icon className="w-8 h-8 mr-6 flex-shrink-0" />
                            <div className="text-left flex-1">
                              <div className="font-black text-xl">{social.label}</div>
                              <div className="text-base text-gray-700 group-hover:text-gray-900 font-light">
                                {social.description}
                              </div>
                            </div>
                            <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </UltraModernCard>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-16 bg-black/60 border-t border-white/10 relative z-10 backdrop-blur-2xl">
        <div className="max-w-8xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center shadow-2xl">
                <span className="text-black font-black text-lg">AM</span>
              </div>
              <div>
                <span className="text-gray-400 text-xl font-bold">© 2024 Arijit Mondal</span>
                <div className="flex items-center space-x-2 text-base text-gray-500">
                  <span>Made with</span>
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>and</span>
                  <Coffee className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-center md:text-right text-lg font-light">
              Crafted with Next.js, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
