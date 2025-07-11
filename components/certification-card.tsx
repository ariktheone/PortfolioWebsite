"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, ExternalLink } from "lucide-react"
import Image from "next/image"

interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialLink?: string;
  credentialId?: string;
  skills?: string[];
}

export default function CertificationCard({
  title,
  issuer,
  date,
  image,
  credentialLink,
  credentialId,
  skills
}: CertificationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 hover:border-white/40 h-full w-full flex flex-col"
    >
      <div className="relative h-32 rounded-xl overflow-hidden mb-3">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${title} certificate`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-2 left-2">
          <Badge className="bg-white/90 text-gray-800 font-bold px-2 py-0.5 text-xs hover:bg-white/80 transition-colors">
            {issuer}
          </Badge>
        </div>
      </div>
      
      <h3 className="text-white text-sm sm:text-base font-bold leading-tight mb-2">{title}</h3>
      
      <div className="flex items-center text-gray-300 mb-2">
        <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
        <span className="text-xs">{date}</span>
      </div>
      
      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto mb-2">
          {skills.slice(0, 2).map(skill => (
            <Badge 
              key={skill}
              variant="outline" 
              className="bg-white/5 text-gray-300 border-white/10 text-[8px] sm:text-[10px]"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 2 && (
            <Badge 
              variant="outline" 
              className="bg-white/5 text-gray-300 border-white/10 text-[8px] sm:text-[10px]"
            >
              +{skills.length - 2}
            </Badge>
          )}
        </div>
      )}
      
      {credentialLink && (
        <a 
          href={credentialLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-white/70 text-[10px] sm:text-xs hover:text-white transition-colors mt-auto"
        >
          <Award className="w-2.5 h-2.5 mr-1 flex-shrink-0" />
          Verify
          <ExternalLink className="w-2 h-2 ml-1 flex-shrink-0" />
        </a>
      )}
    </motion.div>
  )
}