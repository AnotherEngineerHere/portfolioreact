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

type Language = 'en' | 'es'

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo: string
  details: string
}

interface Experience {
  title: string
  company: string
  period: string
  description: string
  details: string[]
}

interface Education {
  degree: string
  school: string
  year: string
  description: string
}

const MAX_TOASTS = 1

const useToastLimit = (limit: number): void => {
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

const translations: Translations = {
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

export default function Portfolio(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('about')
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState<Language>('en')
  useToastLimit(MAX_TOASTS)

  const t = translations[language]

  const handleDownloadCV = (): void => {
    const cvUrl = '/path-to-your-cv.pdf'
    window.open(cvUrl, '_blank')
  }

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleLanguage = (): void => {
    setLanguage(prevLang => prevLang === 'en' ? 'es' : 'en')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Juan Andres Orozco Nuñez</h1>
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
          <AboutMe setActiveSection={setActiveSection} language={language} />
          <Projects setActiveSection={setActiveSection} language={language} />
          <Experience setActiveSection={setActiveSection} language={language} />
          <Education setActiveSection={setActiveSection} language={language} />
        </main>
      </div>
    </div>
  )
}

interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  setActiveSection: (section: string) => void
}

function Section({ id, title, children, setActiveSection }: SectionProps): JSX.Element {
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

interface AboutMeProps {
  setActiveSection: (section: string) => void
  language: Language
}

function AboutMe({ setActiveSection, language }: AboutMeProps): JSX.Element {
  const t = translations[language]
  const content = {
    en: {
      description1: "Hello! I'm Juan Andrés Orozco Núñez, a Senior Developer with expertise in backend development using Java, Spring Boot, and AWS. I focus on building scalable and robust microservices that optimize application performance.",
      description2: "With a strong foundation in software architecture and cloud services, I strive to create efficient solutions for complex problems. I'm committed to best practices, always eager to learn new technologies, and stay up-to-date with the latest industry trends."
    },
    es: {
      description1: "¡Hola! Soy Juan Andrés Orozco Núñez, Senior Developer con experiencia en desarrollo backend utilizando Java, Spring Boot y AWS. Me enfoco en construir microservicios escalables y robustos que optimizan el rendimiento de las aplicaciones.",
      description2: "Con una sólida base en arquitectura de software y servicios en la nube, me esfuerzo por crear soluciones eficientes para problemas complejos. Estoy comprometido con las buenas prácticas, siempre dispuesto a aprender nuevas tecnologías y mantenerme actualizado con las últimas tendencias de la industria."
    }
  }

  return (
    <Section id="about" title={t.aboutMe} setActiveSection={setActiveSection}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Image
          src="/profile.jpg"
          alt="John Doe"
          width={200}
          height={200}
          className="rounded-full shadow-md"
        />
        <div className="flex-1 space-y-4">
          <p className="text-lg">{content[language].description1}</p>
          <p className="text-lg">{content[language].description2}</p>
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

interface ProjectsProps {
  setActiveSection: (section: string) => void
  language: Language
}

function Projects({ setActiveSection, language }: ProjectsProps): JSX.Element {
  const t = translations[language]
  const projects = {
    en: [
      {
        title: "URL Shortener",
        description: "A simple and efficient URL shortening service that allows users to shorten long URLs and track clicks.",
        image: "/url-shortener.jpg",
        tags: ['Java', 'Spring Boot', 'Docker'],
        github: "https://github.com/AnotherEngineerHere/UrlShortener",
        demo: "https://github.com/AnotherEngineerHere/UrlShortener",
        details: "This URL shortener provides users with a straightforward interface to create shortened links. Built with Java and Spring Boot, the service is containerized using Docker for easy deployment. Features include link tracking, user authentication, and a simple dashboard to manage links."
      },
      {
        title: "OTP Service",
        description: "A secure service for generating and validating one-time passwords (OTP) for user authentication.",
        image: "/otp-service.jpg",
        tags: ['Java', 'Spring Boot', 'WebFlux'],
        github: "https://github.com/AnotherEngineerHere/OtpService",
        demo: "https://github.com/AnotherEngineerHere/OtpService",
        details: "The OTP Service generates and validates one-time passwords for secure user authentication. Implemented with Spring Boot and WebFlux, it ensures real-time processing and scalability. The service includes features like OTP generation, validation, and expiration handling."
      },
      {
        title: "Portfolio Website",
        description: "This single-page portfolio built with Next.js showcases my projects and skills with a modern, responsive design.",
        image: "/portfolio-website.jpg",
        tags: ['Next.js', 'TailwindCSS'],
        github: "https://github.com/AnotherEngineerHere/portfolioreact",
        demo: "https://portfolioreact-git-main-anotherengineerheres-projects.vercel.app/",
        details: "My personal portfolio website, built using Next.js and styled with TailwindCSS. It features a responsive design, smooth scrolling animations, and dynamic content loading. The site showcases my projects, skills, and professional experience in an interactive and visually appealing manner. It also includes a contact form and integrates with a headless CMS for easy content updates."
      }
    ],
    es: [
      {
        title: "Acortador de URLs",
        description: "Un servicio de acortamiento de URLs simple y eficiente que permite a los usuarios acortar URLs largas y rastrear clics.",
        image: "/url-shortener.jpg",
        tags: ['Java', 'Spring Boot', 'Docker'],
        github: "https://github.com/AnotherEngineerHere/url-shortener",
        demo: "https://url-shortener-demo.com",
        details: "Este acortador de URLs proporciona a los usuarios una interfaz sencilla para crear enlaces acortados. Construido con Java y Spring Boot, el servicio está containerizado usando Docker para facilitar el despliegue. Las características incluyen rastreo de enlaces, autenticación de usuarios y un panel de control simple para gestionar enlaces."
      },
      {
        title: "Servicio de OTP",
        description: "Un servicio seguro para generar y validar contraseñas de un solo uso (OTP) para la autenticación de usuarios.",
        image: "/otp-service.jpg",
        tags: ['Java', 'Spring Boot', 'WebFlux'],
        github: "https://github.com/AnotherEngineerHere/otp-service",
        demo: "https://otp-service-demo.com",
        details: "El Servicio de OTP genera y valida contraseñas de un solo uso para la autenticación segura de usuarios. Implementado con Spring Boot y WebFlux, asegura procesamiento en tiempo real y escalabilidad. El servicio incluye características como generación de OTP, validación y manejo de expiración."
      },
      {
        title: "Sitio Web de Portafolio",
        description: "Este portafolio de una sola página construido con Next.js, mostrando mis proyectos y habilidades con un diseño moderno y responsivo.",
        image: "/portfolio-website.jpg",
        tags: ['Next.js', 'TailwindCSS'],
        github: "https://github.com/AnotherEngineerHere/portfolio",
        demo: "https://your-portfolio-demo.com",
        details: "Mi sitio web de portafolio personal, construido usando Next.js y estilizado con TailwindCSS. Cuenta con un diseño responsivo, animaciones de desplazamiento suave impulsadas y carga de contenido dinámico. El sitio muestra mis proyectos, habilidades y experiencia profesional de una manera interactiva y visualmente atractiva. También incluye un formulario de contacto y se integra con un CMS sin cabeza para facilitar las actualizaciones de contenido."
      }
    ]
  };

  const showProjectDetails = (project: Project): void => {
    toast.dismiss()
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
            {translations[language].close}
          </button>
        </div>
      </div>
    ), { duration: 5000 })
  }

  return (
    <Section id="projects" title={t.myProjects} setActiveSection={setActiveSection}>
      <div className="grid md:grid-cols-2 gap-8">
        {projects[language].map((project, index) => (
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

interface ExperienceProps {
  setActiveSection: (section: string) => void
  language: Language
}

function Experience({ setActiveSection, language }: ExperienceProps): JSX.Element {
  const t = translations[language]
  const experiences = {
    en: [
      {
        title: "Backend Developer",
        company: "Codesa",
        period: "July 2023 - Present",
        description: "Optimized and refactored Spring Boot microservices, resulting in improved response time and a more scalable architecture.",
        details: [
          "Implemented automated testing procedures, increasing code reliability.",
          "Spearheaded the implementation of security best practices, ensuring compliance with industry standards.",
          "Collaborated with cross-functional teams to integrate third-party APIs, enhancing system functionality and user experience.",
          "Stack: Java 11, Java 8, Spring Boot, MySQL, Oracle SQL, Docker, Python, Linux"
        ]
      },
      {
        title: "Software Developer",
        company: "EyS Ingeniería de Colombia",
        period: "Nov 2021 - July 2023",
        description: "Developed and designed dashboards for tracking key metrics, improving data visualization and decision-making.",
        details: [
          "Applied microservices architecture to enhance the scalability and maintainability of the internal mobile application.",
          "Introduced and championed coding standards and code review processes, resulting in a reduction in bugs and improved code maintainability.",
          "Stack: Java 11, Java 8, Spring Boot, MySQL, Docker, Python, Mobile"
        ]
      }
    ],
    es: [
      {
        title: "Desarrollador Backend",
        company: "Codesa",
        period: "Julio 2023 - Presente",
        description: "Optimizé y refactoricé microservicios en Spring Boot, resultando en una mejora en el tiempo de respuesta y una arquitectura más escalable.",
        details: [
          "Implementé procedimientos de pruebas automatizadas, aumentando la fiabilidad del código.",
          "Encabecé la implementación de mejores prácticas de seguridad, asegurando el cumplimiento de los estándares de la industria.",
          "Colaboré con equipos multifuncionales para integrar APIs de terceros, mejorando la funcionalidad del sistema y la experiencia del usuario.",
          "Stack: Java 11, Java 8, Spring Boot, MySQL, Oracle SQL, Docker, Python, Linux"
        ]
      },
      {
        title: "Desarrollador de Software",
        company: "EyS Ingeniería de Colombia",
        period: "Nov 2021 - Julio 2023",
        description: "Desarrollé y diseñé tableros para el seguimiento de métricas clave, mejorando la visualización de datos y la toma de decisiones.",
        details: [
          "Apliqué arquitectura de microservicios para mejorar la escalabilidad y mantenibilidad de la aplicación móvil interna.",
          "Introduje y defendí estándares de codificación y procesos de revisión de código, resultando en una reducción de errores y mejor mantenibilidad del código.",
          "Stack: Java 11, Java 8, Spring Boot, MySQL, Docker, Python, Móvil"
        ]
      }
    ]
  }

  const showExperienceDetails = (exp: Experience): void => {
    toast.dismiss()
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
            {translations[language].close}
          </button>
        </div>
      </div>
    ), { duration: 5000 })
  }

  return (
    <Section id="experience" title={t.myExperience} setActiveSection={setActiveSection}>
      <div className="space-y-8">
        {experiences[language].map((exp, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className="w-3 h-3 bg-primary rounded-full" />
              {index !== experiences[language].length - 1 && <div className="w-0.5 h-full bg-primary/30" />}
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

interface EducationProps {
  setActiveSection: (section: string) => void
  language: Language
}

function Education({ setActiveSection, language }: EducationProps): JSX.Element {
  const t = translations[language]
  const education: { [key in Language]: Education[] } = {
    en: [
      {
        degree: "Associate Degree in Multimedia and Web Development",
        school: "SENA",
        year: "In progress",
        description: "Developed skills in multimedia production and web development."
      },
      {
        degree: "Engineering Degree in Software Engineering",
        school: "UNAD",
        year: "In progress",
        description: "Focused on software engineering principles and practices."
      },
      {
        degree: "Engineering Degree in Software Engineering",
        school: "Universidad Icesi",
        year: "Not completed",
        description: "Studied software engineering with a focus on advanced programming and project management."
      }
    ],
    es: [
      {
        degree: "Tecnólogo en Desarrollo Multimedia y Web",
        school: "SENA",
        year: "En Curso",
        description: "Desarrollé habilidades en producción multimedia y desarrollo web."
      },
      {
        degree: "Ingeniería en Software",
        school: "UNAD",
        year: "En curso",
        description: "Enfocado en principios y prácticas de ingeniería de software."
      },
      {
        degree: "Ingeniería en Software",
        school: "Universidad Icesi",
        year: "No completada",
        description: "Estudié ingeniería de software con un enfoque en programación avanzada y gestión de proyectos."
      }
    ]
  }

  const courses: { [key in Language]: string[] } = {
    en: [
      "Introduction to Terminal and Command Line by Platzi",
      "Fundamentals of Software Engineering by Platzi",
      "DevOps on AWS and Project Management Course",
      "AWS Cloud Foundations",
      "EF Certificate by EF"
    ],
    es: [
      "Introducción a la Terminal y Línea de Comandos de Platzi",
      "Fundamentos de Ingeniería de Software de Platzi",
      "Curso de DevOps en AWS y Gestión de Proyectos",
      "Fundamentos de la Nube de AWS",
      "Certificado EF de EF"
    ]
  }

  return (
    <Section id="education" title={t.educationAndCourses} setActiveSection={setActiveSection}>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">{t.formalEducation}</h3>
          {education[language].map((edu, index) => (
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
            {courses[language].map((course, index) => (
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