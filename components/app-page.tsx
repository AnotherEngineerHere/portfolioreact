/* eslint-disable */
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { useTheme } from 'next-themes'
import toast, { Toaster, useToasterStore } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, ChevronRight, Code, Linkedin, Mail, ExternalLink, Sun, Moon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Function to limit toasts to one at a time
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

// Language translations
const translations = {
  en: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    downloadCV: "Download CV",
    aboutMe: "About Me",
    myProjects: "My Projects",
    myExperience: "My Experience",
    educationAndCourses: "Education and Courses",
    moreInfo: "More Info",
    close: "Close",
    viewDetails: "View Details",
    formalEducation: "Formal Education",
    additionalCourses: "Additional Courses",
  },
  es: {
    about: "Sobre mí",
    projects: "Proyectos",
    experience: "Experiencia",
    education: "Educación",
    downloadCV: "Descargar CV",
    aboutMe: "Sobre mí",
    myProjects: "Mis Proyectos",
    myExperience: "Mi Experiencia",
    educationAndCourses: "Educación y Cursos",
    moreInfo: "Más Información",
    close: "Cerrar",
    viewDetails: "Ver Detalles",
    formalEducation: "Educación Formal",
    additionalCourses: "Cursos Adicionales",
  }
}

export function Page() {
  const [activeSection, setActiveSection] = useState('about')
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState('en')
  useToastLimit(1) // Limit toasts to one at a time

  /* eslint-disable */
  const t = translations[language]

  const handleDownloadCV = () => {
    // Replace this URL with the actual URL of your CV PDF
    const cvUrl = '/path-to-your-cv.pdf'
    window.open(cvUrl, '_blank')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">John Doe</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{language === 'en' ? 'EN' : 'ES'}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('es')}>Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon">
              <Code className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
            <Button onClick={handleDownloadCV} variant="outline">
              <Download className="mr-2 h-4 w-4" /> {t.downloadCV}
            </Button>
          </div>
        </header>

        <nav className="mb-8">
          <ul className="flex justify-center space-x-4">
            {['about', 'projects', 'experience', 'education'].map((section) => (
              <li key={section}>
                <Button
                  variant={activeSection === section ? "default" : "ghost"}
                  onClick={() => {
                    setActiveSection(section)
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {t[section]}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="space-y-16">
          <AboutMe setActiveSection={setActiveSection} t={t} />
          <Projects setActiveSection={setActiveSection} t={t} />
          <Experience setActiveSection={setActiveSection} t={t} />
          <Education setActiveSection={setActiveSection} t={t} />
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

function AboutMe({ setActiveSection, t }: { setActiveSection: (section: string) => void, t: any }) {
  return (
    <Section id="about" title={t.aboutMe} setActiveSection={setActiveSection}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Image
          src="/john-doe-profile.jpg"
          alt="John Doe"
          width={200}
          height={200}
          className="rounded-full shadow-md"
        />
        <div className="flex-1 space-y-4">
          <p className="text-lg">
            Hello! I'm John Doe, a passionate full-stack developer with expertise in React, Next.js, and Node.js. I love creating user-friendly and efficient web applications that solve real-world problems.
          </p>
          <p className="text-lg">
            With a strong foundation in front-end development and a keen eye for design, I strive to build intuitive and visually appealing interfaces that provide an excellent user experience. I'm always eager to learn new technologies and stay up-to-date with the latest industry trends.
          </p>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'TailwindCSS', 'GraphQL'].map((skill) => (
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

function Projects({ setActiveSection, t }: { setActiveSection: (section: string) => void, t: any }) {
  const projects = [
    {
      title: "E-commerce Website",
      description: "A responsive online store built with React and Node.js, featuring real-time inventory updates and secure payment processing.",
      image: "/ecommerce-project.jpg",
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: "https://github.com/johndoe/ecommerce-project",
      demo: "https://ecommerce-project-demo.com",
      details: "This e-commerce platform offers a seamless shopping experience with features like real-time inventory tracking, secure payments via Stripe, and a responsive design for mobile and desktop users. The project utilizes React for the frontend, Node.js and Express for the backend, and MongoDB for data storage. Key features include user authentication, product search and filtering, shopping cart functionality, and order tracking."
    },
    {
      title: "Real-time Chat App",
      description: "A chat application using WebSockets and React, allowing instant messaging and file sharing between users.",
      image: "/chat-app.jpg",
      tags: ['React', 'Socket.io', 'Express', 'Redis'],
      github: "https://github.com/johndoe/realtime-chat",
      demo: "https://realtime-chat-demo.com",
      details: "This real-time chat application enables users to communicate instantly and share files seamlessly. Built with React on the frontend and Express on the backend, it leverages Socket.io for real-time bidirectional event-based communication. Redis is used as a message broker to ensure scalability. Features include private messaging, group chats, file uploads, message history, and real-time notifications."
    },
    {
      title: "Portfolio Website",
      description: "This single-page portfolio built with Next.js, showcasing my projects and skills with a modern, responsive design.",
      image: "/portfolio-website.jpg",
      tags: ['Next.js', 'TailwindCSS', 'Framer Motion'],
      github: "https://github.com/johndoe/portfolio",
      demo: "https://johndoe-portfolio.com",
      details: "My personal portfolio website, built using Next.js and styled with TailwindCSS. It features a responsive design, smooth scrolling animations powered by Framer Motion, and dynamic content loading. The site showcases my projects, skills, and professional experience in an interactive and visually appealing manner. It also includes a contact form and integrates with a headless CMS for easy content updates."
    }
  ]
/* eslint-disable */
  const showProjectDetails = (project) => {
    toast.dismiss() // Close any existing toast
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Image
                src={project.image}
                alt={project.title}
                width={50}
                height={50}
                className="h-10 w-10 rounded-full"
              />
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
            {t.close}
          </button>
        </div>
      </div>
    ), { duration: 5000 })
  }

  return (
    <Section id="projects" title={t.myProjects} setActiveSection={setActiveSection}>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <Image
              src={project.image}
              alt={project.title}
              width={300}
              height={150}
              className="w-full object-cover h-40"
            />
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
                {t.moreInfo}
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

function Experience({ setActiveSection, t }: { setActiveSection: (section: string) => void, t: any }) {
  const experiences = [
    {
      title: "Senior Developer",
      company: "Tech Co.",
      period: "2020 - Present",
      description: "Led a team of developers in creating innovative web solutions, focusing on scalable architectures and performance optimization.",
      details: [
        "Spearheaded the development of a high-traffic e-commerce platform, resulting in a 40% increase in conversion rates",
        "Implemented CI/CD pipelines, reducing deployment time by  60% and improving overall team productivity",
        "Mentored junior developers, conducting code reviews and organizing knowledge-sharing sessions",
        "Introduced microservices architecture, enhancing system scalability and maintainability"
      ]
    },
    {
      title: "Junior Developer",
      company: "Startup Inc.",
      period: "2018 - 2020",
      description: "Contributed to the development of various client projects using React and Node.js, improving code quality and implementing best practices.",
      details: [
        "Developed and maintained multiple client-facing web applications using React and Redux",
        "Collaborated with UX/UI designers to implement responsive and accessible front-end solutions",
        "Optimized database queries and API endpoints, improving application performance by 30%",
        "Participated in agile development processes, including daily stand-ups and sprint planning"
      ]
    },
    {
      title: "Intern",
      company: "Web Solutions LLC",
      period: "2017 - 2018",
      description: "Assisted in the development of responsive websites and learned industry best practices, gaining hands-on experience with modern web technologies.",
      details: [
        "Assisted in the development of responsive websites for small to medium-sized businesses",
        "Learned and applied best practices in HTML5, CSS3, and JavaScript",
        "Contributed to the company's internal tool for project management, built with React",
        "Participated in code reviews and improved coding skills through mentor feedback"
      ]
    }
  ]

  /* eslint-disable */
  const showExperienceDetails = (exp) => {
    toast.dismiss() // Close any existing toast
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
                {exp.details.map((detail, index) => (
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
            {t.close}
          </button>
        </div>
      </div>
    ), { duration: 5000 })
  }

  return (
    <Section id="experience" title={t.myExperience} setActiveSection={setActiveSection}>
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
                {t.viewDetails}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Education({ setActiveSection, t }: { setActiveSection: (section: string) => void, t: any }) {
  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Tech University",
      year: "2018",
      description: "Focused on advanced web technologies and machine learning, completing a thesis on real-time data processing in web applications."
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "State University",
      year: "2016",
      description: "Gained a strong foundation in software development principles and practices, with a minor in User Experience Design."
    }
  ]

  const courses = [
    "Advanced React and Redux: Building Scalable Web Apps",
    "Node.js: The Complete Guide to Building RESTful APIs",
    "Machine Learning with Python: From Linear Models to Deep Learning",
    "AWS Certified Developer - Associate"
  ]

  return (
    <Section id="education" title={t.educationAndCourses} setActiveSection={setActiveSection}>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">{t.formalEducation}</h3>
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
          <h3 className="text-2xl font-semibold mb-4">{t.additionalCourses}</h3>
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