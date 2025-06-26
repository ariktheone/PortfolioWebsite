"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowUpRight, Eye } from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

interface ModernCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ModernCard({ children, className = "", delay = 0 }: ModernCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={className}
    >
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border-blue-500/20 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
  const getCategoryGradient = (cat: string) => {
    switch (cat) {
      case "AI/ML":
        return "from-blue-500 to-purple-600"
      case "Hardware":
        return "from-gray-500 to-gray-700"
      case "Web Development":
        return "from-green-500 to-emerald-600"
      default:
        return "from-blue-500 to-purple-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="group"
    >
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border-blue-500/20 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden h-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image Section */}
        <div className="relative overflow-hidden h-48">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              className={`bg-gradient-to-r ${getCategoryGradient(category)} text-white border-0 shadow-lg backdrop-blur-sm`}
            >
              {category}
            </Badge>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex space-x-3">
              <Button
                size="sm"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                asChild
              >
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm" asChild>
                <a href={live} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <CardHeader className="relative">
          <CardTitle className="text-xl text-white group-hover:text-white/90 transition-colors duration-300 flex items-center justify-between">
            {title}
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </CardTitle>
          <CardDescription className="text-gray-300 leading-relaxed line-clamp-2">{description}</CardDescription>
        </CardHeader>

        <CardContent className="relative">
          <div className="flex flex-wrap gap-2 mb-6">
            {tech.slice(0, 4).map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="border-white/20 text-gray-300 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-xs"
              >
                {item}
              </Badge>
            ))}
            {tech.length > 4 && (
              <Badge variant="outline" className="border-white/20 text-gray-400 bg-white/5 text-xs">
                +{tech.length - 4} more
              </Badge>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 flex-1"
              asChild
            >
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-white/20 to-white/30 hover:from-white/30 hover:to-white/40 text-white shadow-lg transition-all duration-300 flex-1 backdrop-blur-sm"
              asChild
            >
              <a href={live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
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
    <ModernCard delay={delay}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-white flex items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mr-4 shadow-lg">
            {icon}
          </div>
          <div>
            <div className="font-bold">{category}</div>
            <div className="text-sm text-gray-400 font-normal">{skills.length} technologies</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="border-white/20 text-gray-300 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-xs font-medium"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </ModernCard>
  )
}
