"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowUpRight, Eye, Star } from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

interface UltraModernCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function UltraModernCard({ children, className = "", delay = 0 }: UltraModernCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -12, scale: 1.02 }}
      className={className}
    >
      <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/20 backdrop-blur-2xl shadow-2xl hover:shadow-white/10 transition-all duration-700 group overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="absolute -inset-px bg-gradient-to-br from-white/20 via-transparent to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        {children}
      </Card>
    </motion.div>
  )
}

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  github: string
  live: string
  image: string
  category: string
  delay?: number
}

export function ProjectCard({ title, description, tech, github, live, image, category, delay = 0 }: ProjectCardProps) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "AI/ML":
        return "from-blue-500 to-purple-600"
      case "Hardware & Embedded Systems":
        return "from-gray-500 to-gray-700"
      case "Hardware":
        return "from-gray-500 to-gray-700"
      case "Web Development":
        return "from-green-500 to-emerald-600"
        case "Full-Stack Web App":
        return "from-yellow-500 to-emerald-600"
      default:
        return "from-blue-500 to-purple-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -16 }}
      className="group"
    >
      <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/20 backdrop-blur-2xl shadow-2xl hover:shadow-white/10 transition-all duration-700 overflow-hidden h-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -inset-px bg-gradient-to-br from-white/20 via-transparent to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Premium Image Section */}
        <div className="relative overflow-hidden h-56">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={500}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating Category Badge */}
          <div className="absolute top-6 left-6">
            <Badge
              className={`bg-gradient-to-r ${getCategoryColor(category)} text-white border-0 shadow-2xl backdrop-blur-sm px-4 py-2 text-sm font-semibold`}
            >
              {category}
            </Badge>
          </div>

          {/* Premium Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <div className="flex space-x-4">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-gray-600 hover:bg-white/20 hover:text-white backdrop-blur-xl shadow-2xl"
                asChild
              >
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  Code
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-xl shadow-2xl"
                asChild
              >
                <a href={live} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-5 h-5 mr-2" />
                  Demo
                </a>
              </Button>
            </div>
          </div>

          {/* Star Rating */}
          <div className="absolute top-6 right-6 flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        <CardHeader className="relative p-8">
          <CardTitle className="text-2xl text-gray-800 group-hover:text-gray-800/90 transition-colors duration-500 flex items-center justify-between mb-3">
            {title}
            <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-2" />
          </CardTitle>
          <CardDescription className="text-gray-600 leading-relaxed text-base">{description}</CardDescription>
        </CardHeader>

        <CardContent className="relative p-8 pt-0">
          <div className="flex flex-wrap gap-3 mb-8">
            {tech.slice(0, 5).map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="border-white/30 text-gray-650 bg-white/10 hover:bg-white/20 transition-colors duration-500 text-sm font-medium px-3 py-1"
              >
                {item}
              </Badge>
            ))}
            {tech.length > 5 && (
              <Badge variant="outline" className="border-white/30 text-gray-400 bg-white/10 text-sm px-3 py-1">
                +{tech.length - 5}
              </Badge>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-black/70 text-gray-800 hover:bg-black/90 hover:text-white hover:border-white transition-all duration-500 flex-1 py-3"
              asChild
            >
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                Source
              </a>
            </Button>
            <Button
              className="bg-gradient-to-r from-white/20 to-white/30 hover:from-white/30 hover:to-white/40 text-white shadow-2xl transition-all duration-500 flex-1 backdrop-blur-xl py-3"
              asChild
            >
              <a href={live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                Live Demo
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface SkillCardProps {
  category: string
  skills: string[]
  icon: ReactNode
  delay?: number
}

export function SkillCard({ category, skills, icon, delay = 0 }: SkillCardProps) {
  return (
    <UltraModernCard delay={delay}>
      <CardHeader className="pb-6 p-8">
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center mr-6 shadow-2xl">
            {icon}
          </div>
          <div>
            <div className="font-bold text-lg">{category}</div>
            <div className="text-sm text-gray-750 font-medium">{skills.length} technologies</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="border-white/30 text-800 bg-white/10 hover:bg-white/20 hover:text-white transition duration-300 ease-in-out text-sm font-medium px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </UltraModernCard>
  )
}
