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

export function Page(): JSX.Element {
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
      description1: "Hello! I'm John Doe, a passionate full-stack developer with expertise in React, Next.js, and Node.js. I love creating user-friendly and efficient web applications that solve real-world problems.",
      description2: "With a strong foundation in front-end development and a keen eye for design, I strive to build intuitive and visually appealing interfaces that provide an excellent user experience. I'm always eager to learn new technologies and stay up-to-date with the latest industry trends."
    },
    es: {
      description1: "¡Hola! Soy John Doe, un desarrollador full-stack apasionado con experiencia en React, Next.js y Node.js. Me encanta crear aplicaciones web eficientes y fáciles de usar que resuelven problemas del mundo real.",
      description2: "Con una sólida base en desarrollo front-end y un buen ojo para el diseño, me esfuerzo por construir interfaces intuitivas y visualmente atractivas que proporcionen una excelente experiencia de usuario. Siempre estoy ansioso por aprender nuevas tecnologías y mantenerme actualizado con las últimas tendencias de la industria."
    }
  }

  return (
    <Section id="about" title={t.aboutMe} setActiveSection={setActiveSection}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Image
          src="/profile.jpg"
          alt="Juan Andres Orozco Nuñez"
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
  const projects: { [key in Language]: Project[] } = {
    en: [
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
    ],
    es: [
      {
        title: "Sitio Web de Comercio Electrónico",
        description: "Una tienda en línea responsiva construida con React y Node.js, con actualizaciones de inventario en tiempo real y procesamiento seguro de pagos.",
        image: "/ecommerce-project.jpg",
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: "https://github.com/johndoe/ecommerce-project",
        demo: "https://ecommerce-project-demo.com",
        details: "Esta plataforma de comercio electrónico ofrece una experiencia de compra fluida con características como seguimiento de inventario en tiempo real, pagos seguros a través de Stripe y un diseño responsivo para usuarios móviles y de escritorio. El proyecto utiliza React para el frontend, Node.js y Express para el backend, y MongoDB para el almacenamiento de datos. Las características clave incluyen autenticación de usuarios, búsqueda y filtrado de productos, funcionalidad de carrito de compras y seguimiento de pedidos."
      },
      {
        title: "Aplicación de Chat en Tiempo Real",
        description: "Una aplicación de chat que utiliza WebSockets y React, permitiendo mensajería instantánea y compartir archivos entre usuarios.",
        image: "/chat-app.jpg",
        tags: ['React', 'Socket.io', 'Express', 'Redis'],
        github: "https://github.com/johndoe/realtime-chat",
        demo: "https://realtime-chat-demo.com",
        details: "Esta aplicación de chat en tiempo real permite a los usuarios comunicarse instantáneamente y compartir archivos sin problemas. Construida con React en el frontend y Express en el backend, utiliza Socket.io para la comunicación bidireccional en tiempo real basada en eventos. Redis se utiliza como intermediario de mensajes para garantizar la escalabilidad. Las características incluyen mensajería privada, chats grupales, carga de archivos, historial de mensajes y notificaciones en tiempo real."
      },
      {
        title: "Sitio Web de Portafolio",
        description: "Este portafolio de una sola página construido con Next.js, mostrando mis proyectos y habilidades con un diseño moderno y responsivo.",
        image: "/portfolio-website.jpg",
        tags: ['Next.js', 'TailwindCSS', 'Framer Motion'],
        github: "https://github.com/johndoe/portfolio",
        demo: "https://johndoe-portfolio.com",
        details: "Mi sitio web de  portafolio personal, construido usando Next.js y estilizado con TailwindCSS. Cuenta con un diseño responsivo, animaciones de desplazamiento suave impulsadas por Framer Motion y carga de contenido dinámico. El sitio muestra mis proyectos, habilidades y experiencia profesional de una manera interactiva y visualmente atractiva. También incluye un formulario de contacto y se integra con un CMS sin cabeza para facilitar las actualizaciones de contenido."
      }
    ]
  }

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
  const experiences: { [key in Language]: Experience[] } = {
    en: [
      {
        title: "Senior Developer",
        company: "Tech Co.",
        period: "2020 - Present",
        description: "Led a team of developers in creating innovative web solutions, focusing on scalable architectures and performance optimization.",
        details: [
          "Spearheaded the development of a high-traffic e-commerce platform, resulting in a 40% increase in conversion rates",
          "Implemented CI/CD pipelines, reducing deployment time by 60% and improving overall team productivity",
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
    ],
    es: [
      {
        title: "Desarrollador Senior",
        company: "Tech Co.",
        period: "2020 - Presente",
        description: "Lideré un equipo de desarrolladores en la creación de soluciones web innovadoras, enfocándome en arquitecturas escalables y optimización del rendimiento.",
        details: [
          "Encabecé el desarrollo de una plataforma de comercio electrónico de alto tráfico, resultando en un aumento del 40% en las tasas de conversión",
          "Implementé pipelines de CI/CD, reduciendo el tiempo de despliegue en un 60% y mejorando la productividad general del equipo",
          "Mentoré a desarrolladores junior, realizando revisiones de código y organizando sesiones de intercambio de conocimientos",
          "Introduje arquitectura de microservicios, mejorando la escalabilidad y mantenibilidad del sistema"
        ]
      },
      {
        title: "Desarrollador Junior",
        company: "Startup Inc.",
        period: "2018 - 2020",
        description: "Contribuí al desarrollo de varios proyectos de clientes utilizando React y Node.js, mejorando la calidad del código e implementando mejores prácticas.",
        details: [
          "Desarrollé y mantuve múltiples aplicaciones web orientadas al cliente utilizando React y Redux",
          "Colaboré con diseñadores UX/UI para implementar soluciones front-end responsivas y accesibles",
          "Optimicé consultas de base de datos y endpoints de API, mejorando el rendimiento de la aplicación en un 30%",
          "Participé en procesos de desarrollo ágil, incluyendo reuniones diarias y planificación de sprints"
        ]
      },
      {
        title: "Pasante",
        company: "Web Solutions LLC",
        period: "2017 - 2018",
        description: "Asistí en el desarrollo de sitios web responsivos y aprendí las mejores prácticas de la industria, ganando experiencia práctica con tecnologías web modernas.",
        details: [
          "Asistí en el desarrollo de sitios web responsivos para pequeñas y medianas empresas",
          "Aprendí y apliqué las mejores prácticas en HTML5, CSS3 y JavaScript",
          "Contribuí a la herramienta interna de gestión de proyectos de la empresa, construida con React",
          "Participé en revisiones de código y mejoré mis habilidades de programación a través de la retroalimentación de mentores"
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
    ],
    es: [
      {
        degree: "Maestría en Ciencias de la Computación",
        school: "Universidad Tecnológica",
        year: "2018",
        description: "Enfocado en tecnologías web avanzadas y aprendizaje automático, completando una tesis sobre procesamiento de datos en tiempo real en aplicaciones web."
      },
      {
        degree: "Licenciatura en Ingeniería de Software",
        school: "Universidad Estatal",
        year: "2016",
        description: "Obtuve una sólida base en principios y prácticas de desarrollo de software, con una especialización en Diseño de Experiencia de Usuario."
      }
    ]
  }

  const courses: { [key in Language]: string[] } = {
    en: [
      "Advanced React and Redux: Building Scalable Web Apps",
      "Node.js: The Complete Guide to Building RESTful APIs",
      "Machine Learning with Python: From Linear Models to Deep Learning",
      "AWS Certified Developer - Associate"
    ],
    es: [
      "React y Redux Avanzado: Construyendo Aplicaciones Web Escalables",
      "Node.js: La Guía Completa para Construir APIs RESTful",
      "Aprendizaje Automático con Python: De Modelos Lineales a Aprendizaje Profundo",
      "Desarrollador Certificado de AWS - Asociado"
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