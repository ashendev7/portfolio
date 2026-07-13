'use client'

import React, { useState, useRef, useEffect } from "react"
import { Typewriter } from "@/components/ui/typewriter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { SpotlightHover } from "@/components/ui/spotlight-hover"
import SphereImageGrid from "@/components/ui/img-sphere"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import {
  Mail,
  ArrowRight,
  ExternalLink,
  Cpu,
  Code2,
  Sparkles,
  Send,
  MonitorSmartphone,
  Phone,
  MapPin,
  Globe,
  Palette,
  Terminal,
  Zap
} from "lucide-react"

// Dynamically load heavy 3D/canvas components to optimize bundle size & load speed
const SplineScene = dynamic(() => import("@/components/ui/splite").then(mod => mod.SplineScene), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-zinc-950/20 animate-pulse rounded-2xl" />
})

const DottedSurface = dynamic(() => import("@/components/ui/dotted-surface").then(mod => mod.DottedSurface), {
  ssr: false
})

// Custom Feather/Lucide-style Github icon
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

// Custom Feather/Lucide-style Linkedin icon
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const baseTechImages = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    alt: "Node.js",
    title: "Node.js",
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for scalable backend network applications."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React.js",
    title: "React.js",
    description: "A popular open-source JavaScript library for building interactive user interfaces."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
    title: "Next.js",
    description: "A powerful React framework enabling server-side rendering, static site generation, and optimal performance."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
    title: "TypeScript",
    description: "A strongly-typed programming language that builds on JavaScript, giving you better tooling at scale."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
    title: "JavaScript",
    description: "The core lightweight, interpreted scripting programming language of the web."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    alt: "Tailwind CSS",
    title: "Tailwind CSS",
    description: "A utility-first CSS framework for rapid and highly customizable UI styling."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    alt: "Bootstrap",
    title: "Bootstrap",
    description: "A popular front-end toolkit for designing responsive and mobile-first sites."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    alt: "Spring Boot",
    title: "Spring Boot",
    description: "An open-source Java-based framework used to create microservices and enterprise-grade backend APIs."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    alt: "MySQL",
    title: "MySQL",
    description: "A widely used open-source relational database management system (RDBMS)."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    alt: "Java",
    title: "Java",
    description: "A versatile, object-oriented programming language designed for platform-independent applications."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    alt: "HTML5",
    title: "HTML5",
    description: "The standard markup language for documents designed to be displayed in a web browser."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    alt: "CSS3",
    title: "CSS3",
    description: "Cascading Style Sheets used for describing the presentation of a document written in HTML."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    alt: "MongoDB",
    title: "MongoDB",
    description: "A source-available, NoSQL document-oriented database designed for high scalability."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    alt: "Git",
    title: "Git",
    description: "A distributed version control system to track source code changes during software development."
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    alt: "Docker",
    title: "Docker",
    description: "A platform designed to build, run, and ship applications as lightweight, self-contained containers."
  }
];

// Duplicate tech images to populate sphere nicely (35 items total)
const sphereImages = baseTechImages.map((tech, i) => ({
  id: `tech-${i + 1}`,
  ...tech
}));

// Add duplicates to reach 35 images
while (sphereImages.length < 35) {
  const index = sphereImages.length % baseTechImages.length;
  const tech = baseTechImages[index];
  sphereImages.push({
    id: `tech-dup-${sphereImages.length + 1}`,
    ...tech,
    alt: `${tech.alt} (${Math.floor(sphereImages.length / baseTechImages.length) + 1})`
  });
}

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const typewriterRef = useRef(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const isDownRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const isHoveredRef = useRef(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let animationFrameId: number
    const speed = 0.8 // scroll speed in pixels per frame

    const scrollLoop = () => {
      if (container) {
        if (!isDownRef.current && !isHoveredRef.current) {
          container.scrollLeft += speed
        }

        const halfWidth = container.scrollWidth / 2
        if (halfWidth > 0) {
          if (container.scrollLeft >= halfWidth) {
            container.scrollLeft -= halfWidth
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += halfWidth
          }
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop)
    }

    animationFrameId = requestAnimationFrame(scrollLoop)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current
    if (!container) return
    isDownRef.current = true
    container.style.cursor = 'grabbing'
    startXRef.current = e.pageX - container.offsetLeft
    scrollLeftRef.current = container.scrollLeft
  }

  const handleMouseUp = () => {
    isDownRef.current = false
    const container = scrollRef.current
    if (container) {
      container.style.cursor = 'grab'
    }
  }

  const handleMouseLeave = () => {
    isDownRef.current = false
    isHoveredRef.current = false
    const container = scrollRef.current
    if (container) {
      container.style.cursor = 'grab'
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return
    e.preventDefault()
    const container = scrollRef.current
    if (!container) return
    const x = e.pageX - container.offsetLeft
    const walk = (x - startXRef.current) * 1.5
    container.scrollLeft = scrollLeftRef.current - walk

    const halfWidth = container.scrollWidth / 2
    if (halfWidth > 0) {
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft += halfWidth
      }
    }
  }

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setFormSubmitted(false)
    }, 3000)
  }

  const projects = [
    {
      title: "Travique - Premium Travel & Tours",
      description: "Experience Sri Lanka with our premium transportation and tour services. Reliable, safe, and comfortable journeys tailored to your needs.",
      image: "/Travique.png",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      category: "web",
      link: "https://krish-travel.vercel.app/"
    },
    {
      title: "E-Commerce Platform",
      description: "Modern online store with seamless checkout experience.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      tags: ["Next.js", "Stripe", "Tailwind CSS"],
      category: "web",
      link: "#"
    },
    {
      title: "Fitness Mobile App",
      description: "Track workouts and nutrition with AI recommendations.",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
      tags: ["React Native", "Firebase", "TensorFlow"],
      category: "mobile",
      link: "#"
    },
    {
      title: "Brand Identity Design",
      description: "Complete branding package for a modern tech startup.",
      image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80",
      tags: ["Figma", "Illustrator", "Photoshop"],
      category: "design",
      link: "#"
    },
    {
      title: "Real Estate Dashboard",
      description: "Property management system with real-time analytics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tags: ["React", "Node.js", "MongoDB"],
      category: "web",
      link: "#"
    },
    {
      title: "Banking API System",
      description: "Secure microservices architecture for fintech.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
      tags: ["Node.js", "PostgreSQL", "Docker"],
      category: "backend",
      link: "#"
    }
  ]

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const services = [
    {
      title: "Web Development",
      description: "Building fast, responsive, and SEO-friendly websites using Next.js, React, and Tailwind CSS.",
      icon: <Globe className="w-8 h-8 text-cyan-400" />
    },
    {
      title: "UI/UX Design",
      description: "Creating visually appealing and user-centered designs that deliver seamless digital experiences.",
      icon: <Palette className="w-8 h-8 text-teal-400" />
    },
    {
      title: "Mobile App Development",
      description: "Developing smooth, performant mobile apps using React Native and modern native frameworks.",
      icon: <MonitorSmartphone className="w-8 h-8 text-emerald-400" />
    },
    {
      title: "Backend Solutions",
      description: "Crafting scalable server-side solutions with Node.js, Java, and robust database architecture.",
      icon: <Terminal className="w-8 h-8 text-cyan-400" />
    },
    {
      title: "Performance Optimization",
      description: "Improving load speeds, accessibility, and smoothness to create pixel-perfect performance.",
      icon: <Zap className="w-8 h-8 text-orange-400" />
    },
    {
      title: "Custom Integrations",
      description: "Integrating APIs, third-party tools, and automation workflows to make your systems smarter.",
      icon: <Cpu className="w-8 h-8 text-sky-400" />
    }
  ]



  const fadeInUpVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen text-slate-100 flex flex-col relative select-none bg-transparent">

      {/* Three.js Dotted Surface background */}
      <DottedSurface />

      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[1400px] right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.02),transparent_70%)] pointer-events-none z-0" />

      {/* Top Gradient Blur Fade Mask to prevent scrolling text from cutting off abruptly */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/95 via-black/30 to-transparent pointer-events-none z-40" />

      {/* Floating Pill Navbar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[98%] max-w-7xl">
        <header className="w-full px-8 py-3.5 flex justify-between items-center backdrop-blur-2xl bg-black/70 border border-zinc-800/80 hover:border-zinc-700/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.04)] transition-all duration-300">
          <a href="#" className="flex items-center gap-2.5 font-bold text-lg tracking-widest text-white hover:opacity-95 transition-opacity">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>ASHEN<span className="text-cyan-400">DEV</span></span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-400">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative px-4 py-2 rounded-xl hover:text-white transition-colors duration-150"
              >
                {hoveredItem === item.name && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-zinc-800/50 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex gap-2.5 items-center">
              <a href="https://github.com/ashendev7" target="_blank" rel="noreferrer" className="p-1.5 text-gray-400 hover:text-white transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/ashen-de-silva-8b4a30334/" target="_blank" rel="noreferrer" className="p-1.5 text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <a href="#contact" className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:scale-105 transition-all text-xs font-bold tracking-wide shadow-lg shadow-cyan-500/15 text-black">
              Hire Me
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span className={`w-5 h-0.5 bg-current rounded transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-3.5 h-0.5 bg-current rounded transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-5 h-0.5 bg-current rounded transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </header>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-black/85 backdrop-blur-xl border border-zinc-800/60 rounded-2xl flex flex-col gap-3 shadow-2xl z-40 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-zinc-900/60 transition-colors text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
            <div className="flex gap-4 px-4 pt-2 border-t border-zinc-900 justify-start">
              <a href="https://github.com/ashendev7" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/ashen-de-silva-8b4a30334/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* Hero Section */}
      <motion.section
        id="hero"
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
        className="relative w-full px-6 md:pl-36 lg:pl-44 md:pr-12 pt-16 pb-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 z-10 overflow-hidden"
      >
        {/* Cyber Cyan Spotlight background effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#06b6d4" />

        {/* Left side text contents */}
        <div className="flex-1 flex flex-col justify-center space-y-6 max-w-xl">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/30 text-xs text-cyan-300 font-medium w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Available for work</span>
          </div> */}


          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400">
            I'm a{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent block md:inline-block">
              <Typewriter ref={typewriterRef} words={['Software Engineer', 'Full-Stack Developer', 'Creative Developer', 'Problem Solver']} typeSpeed={120} deleteSpeed={60} />
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            Crafting exceptional digital experiences with modern technologies and innovative solutions. I build applications that are optimized, responsive, and scalable.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#work" className="px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:scale-105 font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25 text-black">
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="px-6 py-3.5 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 font-semibold text-sm transition-all hover:scale-105">
              Contact Me
            </a>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-900 justify-start">
            <div>
              <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">3+</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">50+</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Projects Done</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">10+</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Happy Clients</div>
            </div>
          </div>
        </div>

        {/* Right side 3D model */}
        <div className="flex-1 w-full h-[400px] md:h-[600px] relative overflow-hidden group flex items-center justify-center">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
          {/* Smooth bottom fade-out overlay to prevent harsh cutoff */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none z-10" />
        </div>


      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUpVariants}
        className="relative w-full max-w-7xl mx-auto px-6 pt-10 pb-12 z-10 overflow-hidden scroll-mt-28"
      >
        {/* Cyber Emerald Spotlight background effect */}
        {/* <Spotlight className="-top-20 left-1/3 md:left-1/2" fill="#10b981" /> */}

        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16 relative z-10">
          {/* <span className="inline-block px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/30 text-xs text-cyan-300 font-medium">Get to Know Me</span> */}
          <h2 className="text-3xl md:text-4xl font-black text-white">About Me</h2>
          <div className="w-12 h-1 bg-cyan-500 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Unified IDE Window layout */}
          <div className="w-full lg:w-[50%] bg-zinc-950/80 backdrop-blur-xl border border-zinc-850 rounded-2xl shadow-2xl shadow-cyan-500/5 overflow-hidden flex flex-col font-mono">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/40 border-b border-zinc-900 select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>workspace - ashen-de-silva</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-900 bg-zinc-900/10 text-xs text-gray-500 select-none">
              <div className="px-4 py-2 border-r border-zinc-900 bg-zinc-950/80 text-cyan-400 flex items-center gap-2 font-semibold">
                <span>profile.tsx</span>
              </div>
              <div className="px-4 py-2 border-r border-zinc-900 flex items-center gap-2 hover:bg-zinc-900/20 hover:text-gray-300 transition-colors cursor-pointer">
                <span>terminal.sh</span>
              </div>
            </div>

            {/* Editor contents split */}
            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-zinc-900/85">
              {/* Left Panel: Avatar representation inside editor */}
              <div className="w-full sm:w-[42%] p-6 flex flex-col justify-center items-center bg-zinc-950/20 relative group overflow-hidden">
                {/* Cyber grid backdrop */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:16px_16px] opacity-60" />

                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border border-zinc-805 bg-zinc-950/60 p-1 group-hover:border-cyan-500/50 transition-colors duration-500">
                  <img
                    alt="Ashen De Silva"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
                    className="object-cover w-full h-full rounded-full filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="mt-4 text-center z-10">
                  <h4 className="font-bold text-sm text-white font-sans">Ashen De Silva</h4>
                  <p className="text-[10px] text-cyan-400 font-mono mt-1 uppercase tracking-wider">Status: Active</p>
                </div>
              </div>

              {/* Right Panel: Code block */}
              <div className="w-full sm:w-[58%] p-6 text-xs sm:text-sm text-slate-300 font-mono space-y-4 overflow-x-auto text-left leading-relaxed">
                <div>
                  <span className="text-pink-400">import</span> &#123; <span className="text-cyan-400">Developer</span> &#125; <span className="text-pink-400">from</span> <span className="text-green-300">"ashen-dev"</span>
                </div>

                <div>
                  <span className="text-pink-400">const</span> <span className="text-blue-400">AboutMe</span> = () =&gt; &#123;
                  <div className="pl-4">
                    <span className="text-pink-400">return</span> (
                    <div className="pl-4">
                      &lt;<span className="text-yellow-400">Developer</span>
                      <div className="pl-4 font-mono">
                        <span className="text-purple-400">name</span>=<span className="text-green-300">"Ashen"</span>
                        <br />
                        <span className="text-purple-400">type</span>=<span className="text-green-300">"Full-Stack"</span>
                        <br />
                        <span className="text-purple-400">experience</span>=<span className="text-green-300">"3+ Years"</span>
                        <br />
                        <span className="text-purple-400">location</span>=<span className="text-green-300">"Sri Lanka"</span>
                        <br />
                        <span className="text-purple-400">focus</span>=&#123;[<span className="text-green-300">"Scalable APIs"</span>, <span className="text-green-300">"3D Web"</span>]&#125;
                      </div>
                      /&gt;
                    </div>
                    )
                  </div>
                  &#125;
                </div>

                <div className="pt-2 border-t border-zinc-900 text-[10px] text-gray-500">
                  <span className="text-cyan-400">$&nbsp;</span>npm run coding
                  <br />
                  <span className="text-emerald-400">▶ Live updates active...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biography and Grid cards */}
          <div className="flex-1 max-w-xl space-y-6">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Engineering Web Products with <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Passion & Precision</span>
            </h3>
            <p className="text-gray-400 text-base leading-relaxed">
              I’m a full-stack developer who loves turning ideas into real, functional products. Whether I’m crafting smooth, intuitive user interfaces or architecting efficient and secure backend systems, I enjoy every part of the development process.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              I work with modern tools and technologies to build applications that are optimized, responsive, and scalable, ensuring a seamless experience from end to end. Coding is my genuine passion, and I push my boundaries constantly.
            </p>

            {/* Core credentials cards layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-900">
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-900 hover:border-cyan-500/30 transition-colors duration-300 flex items-start gap-3">
                <Code2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Clean Codebase</h4>
                  <p className="text-xs text-gray-500 mt-1">Written in scalable, type-safe structures.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-900 hover:border-emerald-500/30 transition-colors duration-300 flex items-start gap-3">
                <Terminal className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Secure APIs</h4>
                  <p className="text-xs text-gray-500 mt-1">Robust architectures and secure endpoints.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-900 hover:border-cyan-500/30 transition-colors duration-300 flex items-start gap-3">
                <Globe className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Responsive Layouts</h4>
                  <p className="text-xs text-gray-500 mt-1">Optimized viewports on all screen sizes.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-900 hover:border-emerald-500/30 transition-colors duration-300 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">3D Integrations</h4>
                  <p className="text-xs text-gray-500 mt-1">Immersive Spline & Three.js canvas systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>


      {/* Services Section */}
      <motion.section
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUpVariants}
        className="relative w-full max-w-7xl mx-auto px-6 pt-12 pb-12 z-10 scroll-mt-28"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12 relative z-10">
          <h2 className="text-xs uppercase tracking-widest text-teal-400 font-semibold font-mono">Services</h2>
          <p className="text-3xl font-extrabold text-white">What I Offer</p>
          <div className="w-12 h-1 bg-teal-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {services.map((service, idx) => (
            <Card key={idx} className="relative group overflow-hidden border-zinc-900 bg-zinc-950/50 hover:border-zinc-800 flex flex-col h-full p-6 transition-all duration-300 hover:-translate-y-1">
              <SpotlightHover size={240} className="from-teal-500/10 via-teal-500/5 to-transparent" />
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 w-fit mb-5 group-hover:border-teal-500/30 group-hover:bg-zinc-900 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </motion.section>

            {/* Skills / Technologies Section */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUpVariants}
        className="relative w-full max-w-7xl mx-auto px-6 pt-12 pb-12 z-10 overflow-hidden scroll-mt-28"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12 relative z-10">
          <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold font-mono">Technologies</h2>
          <p className="text-3xl font-extrabold text-white">Stack and Frameworks</p>
          <div className="w-12 h-1 bg-cyan-500 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="flex-1 flex justify-center items-center relative h-[360px] min-[400px]:h-[400px] sm:h-[480px] w-full max-w-[480px] mx-auto overflow-hidden">
            {/* Soft backdrop glow behind sphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none" />
            
            {/* Center-aligned responsive wrapper for the 3D Sphere */}
            <div className="relative w-full max-w-[460px] aspect-square mx-auto flex justify-center items-center">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.68] min-[400px]:scale-[0.8] min-[460px]:scale-[0.9] sm:scale-100 origin-center transition-transform">
                <SphereImageGrid
                  images={sphereImages}
                  containerSize={460}
                  sphereRadius={175}
                  autoRotate={true}
                  autoRotateSpeed={0.25}
                  dragSensitivity={0.7}
                  baseImageScale={0.16}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Categorized list of technologies */}
          <div className="flex-1 w-full max-w-xl space-y-8">
            <p className="text-gray-400 text-base leading-relaxed">
              I specialize in building full-stack applications with modern frameworks, robust databases, and clean architectures. Here is a breakdown of my core competencies, which you can explore in the interactive 3D sphere.
            </p>

            <div className="space-y-6">
              {/* Frontend Category */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold mb-3">Frontend & UI</h4>
                <div className="flex flex-wrap gap-2.5">
                  {["React.js", "Next.js", "React Native", "HTML5 & CSS3", "Tailwind CSS", "Bootstrap"].map((tech) => (
                    <span key={tech} className="px-3.5 py-1.5 rounded-xl bg-zinc-950/40 border border-zinc-900 text-sm text-gray-300 font-medium hover:border-cyan-500/30 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Category */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold mb-3">Backend & Database</h4>
                <div className="flex flex-wrap gap-2.5">
                  {["Node.js", "Spring Boot", "MySQL", "MongoDB"].map((tech) => (
                    <span key={tech} className="px-3.5 py-1.5 rounded-xl bg-zinc-950/40 border border-zinc-900 text-sm text-gray-300 font-medium hover:border-emerald-500/30 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages Category */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold mb-3">Languages & Tools</h4>
                <div className="flex flex-wrap gap-2.5">
                  {["TypeScript", "JavaScript", "Java", "Git", "Docker"].map((tech) => (
                    <span key={tech} className="px-3.5 py-1.5 rounded-xl bg-zinc-950/40 border border-zinc-900 text-sm text-gray-300 font-medium hover:border-cyan-500/30 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Grid Section (with active category filter) */}
      <motion.section
        id="work"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={fadeInUpVariants}
        className="w-full max-w-7xl mx-auto px-6 pt-12 pb-12 z-10 scroll-mt-28"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
          <h2 className="text-xs uppercase tracking-widest text-emerald-400 font-semibold font-mono">Recent Work</h2>
          <p className="text-3xl font-extrabold text-white">Explore My Projects</p>
          <div className="w-12 h-1 bg-emerald-500 rounded-full" />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["all", "web", "mobile", "design", "backend"].map((filt) => (
            <button
              key={filt}
              onClick={() => setActiveFilter(filt)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${activeFilter === filt
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                : "bg-zinc-900 border border-zinc-800 text-gray-400 hover:text-white"
                }`}
            >
              {filt}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => (
            <Card key={idx} className="relative group overflow-hidden border-zinc-900 bg-zinc-950/50 hover:border-zinc-700 flex flex-col h-full">
              {/* Mouse hover tracking glow effect */}
              <SpotlightHover size={300} />

              <div className="h-48 w-full overflow-hidden relative border-b border-zinc-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
              </div>

              <CardHeader className="flex-grow p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {proj.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="text-[10px] bg-zinc-900 text-gray-300 border border-zinc-800 px-2 py-0.5 rounded-md font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-cyan-300 transition-colors">{proj.title}</CardTitle>
                <CardDescription className="text-sm text-gray-400 mt-2 leading-relaxed">
                  {proj.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="p-6 pt-0 mt-auto border-t border-zinc-900/40">
                <a href={proj.link} className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors mt-4">
                  View Case Study
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.section>



      {/* Contact Section */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={fadeInUpVariants}
        className="w-full max-w-4xl mx-auto px-6 pt-12 pb-28 z-10 scroll-mt-28"
      >
        <Card className="relative overflow-hidden border-zinc-800 bg-zinc-950/70 backdrop-blur-xl p-8 md:p-12">
          {/* Spotlight background */}
          <Spotlight className="-top-40 right-0" fill="#10b981" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Let's Connect</h2>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                Have a project in mind or just want to say hi? Let’s build something awesome together. Fill out the contact form or connect via details below.
              </p>
              <div className="space-y-4 pt-4 text-sm text-gray-300">
                <a href="mailto:contact@ashendev.com" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>contact@ashendev.com</span>
                </a>
                <a href="tel:+94763188418" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span>+94 76 318 8418</span>
                </a>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-sky-400" />
                  <span>Ja Ela, Sri Lanka</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Your message details..."
                />
              </div>
              <button
                type="submit"
                disabled={formSubmitted}
                className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800/40 text-black font-semibold text-sm tracking-wide transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                {formSubmitted ? "Sent Successfully!" : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </Card>
      </motion.section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-900 bg-black/25 py-8 text-center text-xs text-gray-500 z-10">
        <p>© 2026 Ashen De Silva. All rights reserved.</p>
      </footer>
    </div>
  )
}
