import { Language, Project, Experience, Education } from '@/types'

export const projects: Record<Language, Project[]> = {
  en: [
    {
      title: "URL Shortener",
      description: "A simple and efficient URL shortening service that allows users to shorten long URLs and track clicks.",
      image: "/url-shortener.jpg",
      tags: ['Java', 'Spring Boot', 'Docker'],
      github: "https://github.com/AnotherEngineerHere/UrlShortener",
      details: "This URL shortener provides users with a straightforward interface to create shortened links. Built with Java and Spring Boot, the service is containerized using Docker for easy deployment. Features include link tracking, user authentication, and a simple dashboard to manage links."
    },
    {
      title: "OTP Service",
      description: "A secure service for generating and validating one-time passwords (OTP) for user authentication.",
      image: "/otp-service.jpg",
      tags: ['Java', 'Spring Boot', 'WebFlux'],
      github: "https://github.com/AnotherEngineerHere/OtpService",
      details: "The OTP Service generates and validates one-time passwords for secure user authentication. Implemented with Spring Boot and WebFlux, it ensures real-time processing and scalability. The service includes features like OTP generation, validation, and expiration handling."
    },
    {
      title: "Portfolio Website",
      description: "This single-page portfolio built with Next.js showcases my projects and skills with a modern, responsive design.",
      image: "/portfolio-website.jpg",
      tags: ['Next.js', 'TailwindCSS'],
      github: "https://github.com/AnotherEngineerHere/portfolioreact",
      demo: "https://portfolioreact-git-main-anotherengineerheres-projects.vercel.app/",
      details: "My personal portfolio website, built using Next.js and styled with TailwindCSS. It features a responsive design, smooth scrolling animations, and dynamic content loading. The site showcases my projects, skills, and professional experience in an interactive and visually appealing manner."
    }
  ],
  es: [
    {
      title: "Acortador de URLs",
      description: "Un servicio de acortamiento de URLs simple y eficiente que permite a los usuarios acortar URLs largas y rastrear clics.",
      image: "/url-shortener.jpg",
      tags: ['Java', 'Spring Boot', 'Docker'],
      github: "https://github.com/AnotherEngineerHere/url-shortener",
      details: "Este acortador de URLs proporciona a los usuarios una interfaz sencilla para crear enlaces acortados. Construido con Java y Spring Boot, el servicio está containerizado usando Docker para facilitar el despliegue."
    },
    {
      title: "Servicio de OTP",
      description: "Un servicio seguro para generar y validar contraseñas de un solo uso (OTP) para la autenticación de usuarios.",
      image: "/otp-service.jpg",
      tags: ['Java', 'Spring Boot', 'WebFlux'],
      github: "https://github.com/AnotherEngineerHere/otp-service",
      details: "El Servicio de OTP genera y valida contraseñas de un solo uso para la autenticación segura de usuarios. Implementado con Spring Boot y WebFlux, asegura procesamiento en tiempo real y escalabilidad."
    },
    {
      title: "Sitio Web de Portafolio",
      description: "Este portafolio de una sola página construido con Next.js, mostrando mis proyectos y habilidades con un diseño moderno y responsivo.",
      image: "/portfolio-website.jpg",
      tags: ['Next.js', 'TailwindCSS'],
      github: "https://github.com/AnotherEngineerHere/portfolio",
      details: "Mi sitio web de portafolio personal, construido usando Next.js y estilizado con TailwindCSS. Cuenta con un diseño responsivo y animaciones de desplazamiento suave."
    }
  ]
}

export const experiences: Record<Language, Experience[]> = {
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

export const education: Record<Language, Education[]> = {
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

export const courses: Record<Language, string[]> = {
  en: [
    "DevOps on AWS and Project Management Course",
    "AWS Cloud Foundations",
    "EF Certificate by EF"
  ],
  es: [
    "Curso de DevOps en AWS y Gestión de Proyectos",
    "Fundamentos de la Nube de AWS",
    "Certificado EF de EF"
  ]
} 