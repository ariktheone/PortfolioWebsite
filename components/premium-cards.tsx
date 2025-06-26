"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

interface PremiumCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function PremiumCard({ children, className = "", delay = 0 }: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={className}
    >
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-slate-700/50 transition-all duration-500 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
        return "bg-blue-600/90 text-white"
      case "Hardware":
        return "bg-slate-600/90 text-white"
      case "Web Development":
        return "bg-green-600/90 text-white"
      default:
        return "bg-blue-600/90 text-white"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-slate-700/50 transition-all duration-500 overflow-hidden h-full">
        <div className="relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge className={`${getCategoryColor(category)} backdrop-blur-sm shadow-lg border-0`}>{category}</Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300 flex items-center justify-between">
            {title}
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </CardTitle>
          <CardDescription className="text-slate-400 leading-relaxed">{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {tech.map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="border-slate-600/50 text-slate-300 bg-slate-800/30 hover:bg-slate-700/50 transition-colors duration-300"
              >
                {item}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-300 flex-1"
              asChild
            >
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 flex-1"
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
