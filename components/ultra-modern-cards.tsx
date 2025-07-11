"use client";

import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowUpRight, Eye, Star } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

interface UltraModernCardProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

export function UltraModernCard({
	children,
	className = "",
	delay = 0,
}: UltraModernCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: delay * 0.1 }}
			viewport={{ once: true }}
			whileHover={{ y: -8, scale: 1.02 }}
			className={`h-full ${className}`}
		>
			<Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/20 backdrop-blur-2xl shadow-2xl hover:shadow-white/10 transition-all duration-700 group overflow-hidden relative rounded-xl h-full">
				<div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
				<div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
				<div className="absolute -inset-px bg-gradient-to-br from-white/20 via-transparent to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
				{children}
			</Card>
		</motion.div>
	);
}

interface ProjectCardProps {
	title: string;
	description: string;
	tech: string[];
	github: string;
	live: string;
	image: string;
	category: string;
	delay?: number;
}

export function ProjectCard({
	title,
	description,
	tech,
	github,
	live,
	image,
	category,
	delay = 0,
}: ProjectCardProps) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 480);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const getCategoryColor = (cat: string) => {
		switch (cat) {
			case "AI/ML":
				return "from-blue-500 to-purple-600";
			case "Hardware & Embedded Systems":
				return "from-gray-500 to-gray-700";
			case "Hardware":
				return "from-gray-500 to-gray-700";
			case "Web Development":
				return "from-green-500 to-emerald-600";
			case "Full-Stack Web App":
				return "from-yellow-500 to-emerald-600";
			default:
				return "from-blue-500 to-purple-600";
		}
	};

	const techSliceCount = isMobile ? 3 : 4;

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: delay * 0.15 }}
			viewport={{ once: true }}
			whileHover={{ y: -12 }}
			className="group h-full"
		>
			<Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/20 backdrop-blur-2xl shadow-2xl hover:shadow-white/10 transition-all duration-700 overflow-hidden h-full relative rounded-xl flex flex-col">
				<div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
				<div className="absolute -inset-px bg-gradient-to-br from-white/20 via-transparent to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

				{/* Responsive Image Section */}
				<div className="relative overflow-hidden h-36 sm:h-48 md:h-56 lg:h-64">
					<Image
						src={image || "/placeholder.svg"}
						alt={title}
						fill
						className="object-cover group-hover:scale-110 transition-transform duration-1000"
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

					{/* Floating Category Badge */}
					<div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4">
						<Badge
							className={`bg-gradient-to-r ${getCategoryColor(
								category
							)} text-white border-0 shadow-2xl backdrop-blur-sm px-2 py-1 text-xs sm:text-sm font-semibold whitespace-nowrap`}
						>
							{category}
						</Badge>
					</div>

					{/* Hover Overlay for Actions - Desktop Only */}
					<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 items-center justify-center hidden md:flex">
						<div className="flex space-x-4">
							<Button
								size="sm"
								variant="outline"
								className="border-white/40 text-gray-700 hover:bg-white/20 hover:text-white backdrop-blur-xl shadow-2xl"
								asChild
							>
								<a href={github} target="_blank" rel="noopener noreferrer">
									<Github className="w-4 h-4 mr-2" />
									Code
								</a>
							</Button>
							<Button
								size="sm"
								className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-xl shadow-2xl"
								asChild
							>
								<a href={live} target="_blank" rel="noopener noreferrer">
									<Eye className="w-4 h-4 mr-2" />
									Demo
								</a>
							</Button>
						</div>
					</div>

					{/* Star Rating */}
					<div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 flex space-x-1">
						{[...Array(5)].map((_, i) => (
							<Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
						))}
					</div>
				</div>

				{/* Content Section - Flexible */}
				<div className="flex flex-col flex-1">
					<CardHeader className="relative p-3 sm:p-4 md:p-6 flex-shrink-0">
						<CardTitle className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-800 group-hover:text-gray-800/90 transition-colors duration-500 flex items-start justify-between gap-2 mb-2">
							<span className="break-words line-clamp-2 flex-1">{title}</span>
							<ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
						</CardTitle>
						<CardDescription className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base break-words line-clamp-3">
							{description}
						</CardDescription>
					</CardHeader>

					<CardContent className="relative p-3 sm:p-4 md:p-6 pt-0 flex flex-col flex-1">
						{/* Tech Stack */}
						<div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-6 flex-1">
							{tech.slice(0, techSliceCount).map((item) => (
								<Badge
									key={item}
									variant="outline"
									className="border-white/30 text-gray-650 bg-white/10 hover:bg-white/20 transition-colors duration-500 text-xs font-medium px-2 py-1 whitespace-nowrap"
								>
									{item}
								</Badge>
							))}
							{tech.length > techSliceCount && (
								<Badge
									variant="outline"
									className="border-white/30 text-gray-400 bg-white/10 text-xs px-2 py-1"
								>
									+{tech.length - techSliceCount}
								</Badge>
							)}
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
							<Button
								variant="outline"
								size="sm"
								className="border-black/70 text-gray-800 hover:bg-black/90 hover:text-white hover:border-white transition-all duration-500 flex-1 text-xs sm:text-sm"
								asChild
							>
								<a href={github} target="_blank" rel="noopener noreferrer">
									<Github className="w-4 h-4 mr-2" />
									Source
								</a>
							</Button>
							<Button
								size="sm"
								className="bg-gradient-to-r from-white/20 to-white/30 hover:from-white/30 hover:to-white/40 text-white shadow-2xl transition-all duration-500 flex-1 backdrop-blur-xl text-xs sm:text-sm"
								asChild
							>
								<a href={live} target="_blank" rel="noopener noreferrer">
									<ExternalLink className="w-4 h-4 mr-2" />
									Live Demo
								</a>
							</Button>
						</div>
					</CardContent>
				</div>
			</Card>
		</motion.div>
	);
}

interface SkillCardProps {
	category: string;
	skills: string[];
	icon: ReactNode;
	delay?: number;
}

export function SkillCard({
	category,
	skills,
	icon,
	delay = 0,
}: SkillCardProps) {
	return (
		<UltraModernCard delay={delay} className="h-full">
			<div className="flex flex-col h-full">
				<CardHeader className="pb-3 sm:pb-4 md:pb-6 p-3 sm:p-4 md:p-6 flex-shrink-0">
					<CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 flex items-center">
						<div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center mr-3 sm:mr-4 md:mr-6 shadow-2xl flex-shrink-0">
							<div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8">
								{icon}
							</div>
						</div>
						<div className="min-w-0 flex-1">
							<div className="font-bold text-sm sm:text-base md:text-lg break-words">
								{category}
							</div>
							<div className="text-xs sm:text-sm text-gray-750 font-medium">
								{skills.length} technologies
							</div>
						</div>
					</CardTitle>
				</CardHeader>

				<CardContent className="p-3 sm:p-4 md:p-6 pt-0 flex-1">
					<div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
						{skills.map((skill) => (
							<Badge
								key={skill}
								variant="outline"
								className="border-white/30 text-gray-800 bg-white/10 hover:bg-gray-100 hover:text-black-250 transition duration-300 ease-in-out text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md backdrop-blur-sm whitespace-nowrap"
							>
								{skill}
							</Badge>
						))}
					</div>
				</CardContent>
			</div>
		</UltraModernCard>
	);
}
