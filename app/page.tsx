'use client'

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { useTheme } from 'next-themes'
import toast, { Toaster, useToasterStore } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ChevronRight, Code, Linkedin, Mail, ExternalLink, Sun, Moon } from "lucide-react"

// Función para limitar las alertas a una a la vez
const useToastLimit = (limit: number) => {
  const { toasts } = useToasterStore()
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .forEach((t, i) => {
        if (i >= limit) {
          toast.dismiss(t.id)
        }
      })
  }, [toasts, limit])
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about')
  const { theme, setTheme } = useTheme()
  useToastLimit(1) // Limita las alertas a una a la vez

  const handleDownloadCV = () => {
    // Replace this URL with the actual URL of your CV PDF
    const cvUrl = '/path-to-your-cv.pdf'
    window.open(cvUrl, '_blank')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Juan Andres Orozco Nuñez</h1>
          <div className="flex items-center space-x-4">
            {/* <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button> */}
            <a href="mailto:tuemail@ejemplo.com">
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Code className="h-5 w-5" />
              </Button>
            </a>

            <Button onClick={handleDownloadCV} variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download CV
            </Button>
          </div>
        </header>

        <nav className="mb-8">
          <ul className="flex justify-center space-x-4">
            {['about', 'experience', 'projects', 'education'].map((section) => (
              <li key={section}>
                <Button
                  variant={activeSection === section ? "default" : "ghost"}
                  onClick={() => {
                    setActiveSection(section)
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="space-y-16">
          <AboutMe setActiveSection={setActiveSection} />
          <Experience setActiveSection={setActiveSection} />
          <Projects setActiveSection={setActiveSection} />
          <Education setActiveSection={setActiveSection} />
        </main>
      </div>
    </div>
  )
}

function Section({ id, title, children, setActiveSection }: { id: string; title: string; children: React.ReactNode; setActiveSection: (section: string) => void }) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView) {
      setActiveSection(id)
    }
  }, [inView, id, setActiveSection])

  return (
    <div id={id} ref={ref} className="scroll-mt-20">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

function AboutMe({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  return (
    <Section id="about" title="About Me" setActiveSection={setActiveSection}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="Juan Andrés Orozco Núñez"
          width={200}
          height={200}
          className="rounded-full shadow-md"
        />
        <div className="flex-1 space-y-4">
          <p className="text-lg">
            Hello! I'm Juan Andrés Orozco Núñez, a passionate software developer with expertise in backend technologies like .NET, Spring Boot, and Java. I enjoy creating robust and scalable solutions.
          </p>
          <p className="text-lg">
            I have experience in developing microservices and applications that optimize performance and implement strong architectural practices. I am committed to continuous learning and improvement in software development.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Java', 'Spring Boot', 'Microservices', 'Docker', 'AWS', '.NET'].map((skill) => (
              <span key={skill} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Projects({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const projects = [
    {
      title: "URL Shortener",
      description: "A service for shortening long URLs into more manageable links, built with Java and Spring Boot.",
      tags: ['Java', 'Spring Boot', 'Docker'],
      github: "https://github.com/AnotherEngineerHere/URLShortener",
      details: "This project allows users to shorten URLs and track click metrics. Built with Java and Spring Boot, it leverages Docker for deployment."
    },
    {
      title: "Portfolio",
      description: "A responsive online store built with React and Node.js, featuring real-time inventory updates and secure payment processing.",
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: "https://github.com/johndoe/ecommerce-project",
      demo: "",
      details: "My personal portfolio website, built using Next.js and styled with TailwindCSS."
    }
  ]
  const showProjectDetails = (project: { title: string; description: string; tags: string[]; github: string; details: string; demo?: undefined } | { title: string; description: string; tags: string[]; github: string; demo: string; details: string }) => {
    toast.dismiss() // Cierra cualquier alerta existente
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {project.title}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {project.details}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ), { duration: 5000 })
  }

  return (
    <Section id="projects" title="My Projects" setActiveSection={setActiveSection}>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <Button variant="outline" className="w-full mb-2" onClick={() => showProjectDetails(project)}>
                More Info
              </Button>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => window.open(project.github, '_blank')}>
                  <Code className="mr-2 h-4 w-4" /> GitHub
                </Button>
                <Button variant="outline" onClick={() => window.open(project.demo, '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" /> Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Experience({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const experiences = [
    {
      title: "Senior Developer",
      company: "Codesa",
      period: "July 2023 - Present",
      description: "Led a team of developers in creating innovative web solutions, focusing on scalable architectures and performance optimization.",
      details: [
        "Spearheaded the development of a high-traffic e-commerce platform, resulting in a 40% increase in conversion rates.",
        "Implemented CI/CD pipelines, reducing deployment time by 60% and improving overall team productivity.",
        "Mentored junior developers, conducting code reviews and organizing knowledge-sharing sessions.",
        "Introduced microservices architecture, enhancing system scalability and maintainability."
      ]
    },
    {
      title: "Software Developer",
      company: "EyS Ingeniería de Colombia",
      period: "November 2021 - July 2023",
      description: "Contributed to the development of various client projects using Java, Spring Boot, and microservices architecture.",
      details: [
        "Developed and maintained backend services for client-facing applications, improving reliability and performance.",
        "Collaborated with cross-functional teams to define project requirements and deliver solutions on time.",
        "Participated in code reviews and agile development processes, enhancing team collaboration.",
        "Utilized AWS for deploying and managing cloud infrastructure, ensuring scalability and security."
      ]
    },
    {
      title: "Freelancer",
      company: "Self-Employed",
      period: "2020 - Present",
      description: "Created virtual stores and optimized SEO for various clients using WordPress, enhancing their online presence.",
      details: [
        "Designed and developed multiple e-commerce websites using WordPress, leading to improved user experience.",
        "Implemented SEO strategies that increased organic traffic by over 50% for several client sites.",
        "Provided ongoing support and maintenance for client websites, ensuring optimal performance and security.",
        "Conducted training sessions for clients on how to manage their websites effectively."
      ]
    }
  ];


  const showExperienceDetails = (exp: { title: any; company: any; period: any; description?: string; details: any }) => {
    toast.dismiss() // Cierra cualquier alerta existente
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">

            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {exp.title} at {exp.company}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {exp.period}
              </p>
              <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400 list-disc list-inside">
                {exp.details.map((detail: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-gray-700">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ), { duration: 5000 })
  }

  return (
    <Section id="experience" title="Experience" setActiveSection={setActiveSection}>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-3 h-3 bg-primary rounded-full" />
              {index !== experiences.length - 1 && <div className="w-0.5 h-full bg-primary/30" />}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <p className="text-primary font-medium">{exp.company}</p>
              <p className="text-muted-foreground">{exp.period}</p>
              <p className="mt-2">{exp.description}</p>
              <Button variant="link" className="p-0 h-auto font-normal text-muted-foreground hover:text-primary" onClick={() => showExperienceDetails(exp)}>
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Education({ setActiveSection }: { setActiveSection: (section: string) => void }) {
  const education = [
    {
      degree: "Bachelor Degree in Software Engineering",
      school: "UNAD",
      year: "2024",
      description: "In Progress"
    },
    {
      degree: "Asociate Degree Web Development and Multimedia",
      school: "SENA",
      year: "2023",
      description: "In Course"
    },
    {
      degree: "Bachelor Degree in Software Engineering",
      school: "ICESI",
      year: "2017-2023",
      description: "Retired"
    }
  ]

  const courses = [
    "Advanced React and Redux: Building Scalable Web Apps",
    "Node.js: The Complete Guide to Building RESTful APIs",
    "Machine Learning with Python: From Linear Models to Deep Learning",
    "AWS Certified Developer - Associate"
  ]

  return (
    <Section id="education" title="Education and Courses" setActiveSection={setActiveSection}>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Formal Education</h3>
          {education.map((edu, index) => (
            <Card key={index} className="mb-4 overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h4 className="text-xl font-semibold">{edu.degree}</h4>
                <p className="text-primary font-medium">{edu.school}</p>
                <p className="text-muted-foreground">{edu.year}</p>
                <p className="mt-2">{edu.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Additional Courses</h3>
          <ul className="space-y-2">
            {courses.map((course, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                <span>{course}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}