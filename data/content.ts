import { Language, Project, Experience, Education, Certification, SkillCategory, Profile } from '@/types'

export const projects: Record<Language, Project[]> = {
  en: [
    {
      id: "url-shortener",
      title: "URL Shortener",
      description: "A simple and efficient URL shortening service that allows users to shorten long URLs and track clicks.",
      image: "/url-shortener.jpg",
      tags: ['Java', 'Spring Boot', 'Docker'],
      github: "https://github.com/AnotherEngineerHere/UrlShortener",
      details: "URL shortener provides a straightforward interface to create shortened links. Built with Java and Spring Boot, containerized using Docker for easy deployment. Features include link tracking, user authentication, and a dashboard to manage links."
    },
    {
      id: "otp-service",
      title: "OTP Service",
      description: "A secure service for generating and validating one-time passwords (OTP) for user authentication.",
      image: "/otp-service.jpg",
      tags: ['Java', 'Spring Boot', 'WebFlux'],
      github: "https://github.com/AnotherEngineerHere/OtpService",
      details: "OTP Service generates and validates one-time passwords for secure user authentication. Implemented with Spring Boot and WebFlux for real-time processing and scalability. Includes OTP generation, validation, and expiration handling."
    },
    {
      id: "identity-guard",
      title: "Identity Guard",
      description: "A secure identity management system leveraging LocalStack for local AWS simulation.",
      image: "/identity-guard.jpg",
      tags: ['Java', 'Spring Boot', 'LocalStack', 'AWS'],
      github: "https://github.com/AnotherEngineerHere/identity-guard-localstack",
      details: "Identity Guard provides secure authentication and authorization using AWS services locally simulated with LocalStack. Features include user management, role-based access control, and integration with AWS Cognito and IAM."
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      description: "This portfolio showcases my projects and skills with a modern, responsive design.",
      image: "/portfolio-website.jpg",
      tags: ['Next.js', 'TailwindCSS', 'TypeScript'],
      github: "https://github.com/AnotherEngineerHere/portfolioreact",
      details: "Personal portfolio website built using Next.js and styled with TailwindCSS. Features responsive design, smooth scrolling animations, EN/ES i18n support, and dark mode."
    }
  ],
  es: [
    {
      id: "url-shortener",
      title: "Acortador de URLs",
      description: "Un servicio de acortamiento de URLs simple y eficiente que permite a los usuarios acortar URLs largas y rastrear clics.",
      image: "/url-shortener.jpg",
      tags: ['Java', 'Spring Boot', 'Docker'],
      github: "https://github.com/AnotherEngineerHere/UrlShortener",
      details: "Acortador de URLs con interfaz sencilla para crear enlaces acortados. Construido con Java y Spring Boot, containerizado con Docker. Incluye seguimiento de enlaces, autenticación y panel de gestión."
    },
    {
      id: "otp-service",
      title: "Servicio de OTP",
      description: "Un servicio seguro para generar y validar contraseñas de un solo uso (OTP) para autenticación.",
      image: "/otp-service.jpg",
      tags: ['Java', 'Spring Boot', 'WebFlux'],
      github: "https://github.com/AnotherEngineerHere/OtpService",
      details: "Servicio OTP que genera y valida contraseñas de un solo uso para autenticación segura. Implementado con Spring Boot y WebFlux para procesamiento en tiempo real y escalabilidad."
    },
    {
      id: "identity-guard",
      title: "Identity Guard",
      description: "Un sistema de gestión de identidad seguro que utiliza LocalStack para simulación local de AWS.",
      image: "/identity-guard.jpg",
      tags: ['Java', 'Spring Boot', 'LocalStack', 'AWS'],
      github: "https://github.com/AnotherEngineerHere/identity-guard-localstack",
      details: "Identity Guard proporciona autenticación y autorización segura usando servicios AWS simulados localmente con LocalStack. Incluye gestión de usuarios, control de acceso basado en roles e integración con AWS Cognito e IAM."
    },
    {
      id: "portfolio",
      title: "Sitio Web de Portafolio",
      description: "Este portafolio muestra mis proyectos y habilidades con un diseño moderno y responsivo.",
      image: "/portfolio-website.jpg",
      tags: ['Next.js', 'TailwindCSS', 'TypeScript'],
      github: "https://github.com/AnotherEngineerHere/portfolioreact",
      details: "Portafolio personal construido con Next.js y estilizado con TailwindCSS. Incluye diseño responsivo, animaciones suaves, soporte EN/ES y modo oscuro."
    }
  ]
}

export const experiences: Record<Language, Experience[]> = {
  en: [
    {
      id: "globant",
      title: "Backend Developer",
      company: "Globant",
      period: "Oct 2025 - Present",
      location: "Colombia",
      description: "Scaling microservices for Tier-1 global clients using Java 21, DDD and API-First patterns. Azure Developer for Microsoft contractor projects.",
      details: [
        "Scaling microservices for Tier-1 global clients using Java 21, DDD and API-First patterns.",
        "Architected and deployed an internal Microsoft deployment service from scratch, ensuring high availability for worldwide-scale operations.",
        "Designed and optimized CI/CD pipelines using Microsoft internal services, reducing deployment lead time through automated workflows.",
        "Utilized AI-assisted development tools to streamline code reviews and troubleshoot complex cloud integration challenges.",
        "Stack: Java 21, C#, Spring Boot, Azure, Microservices, CI/CD, DevOps"
      ]
    },
    {
      id: "codesa",
      title: "Backend Developer/Technical Lead",
      company: "Codesa",
      period: "Jul 2023 - Oct 2025",
      location: "Colombia",
      description: "Directed team to resolve critical issues in a biometric central system, reducing downtime by 25% and implementing a new modular architecture.",
      details: [
        "Lead Role (Jul 2024 – May 2025): Directed team to resolve critical issues in biometric system, reducing downtime by 25% and implementing modular architecture for enhanced security.",
        "AI Integration: Refactored OCR component using AI algorithms, improving accuracy by 85% and reducing processing latency by 25%.",
        "System Optimization: Implemented Docker-based microservices that improved scalability by 30% and enhanced user experience.",
        "Stack: Java 8/11, C#, Spring Boot, Python, AWS (S3), MySQL, Docker, REST APIs, Kubernetes"
      ]
    },
    {
      id: "eys",
      title: "Software Developer",
      company: "EyS Ingeniería de Colombia",
      period: "Nov 2022 - Jul 2023",
      location: "Colombia",
      description: "Developed API-driven architectures for mobile application backends, increasing system scalability by 35%.",
      details: [
        "Built real-time analytics dashboards that reduced executive decision-making time by 25% through custom data visualizations.",
        "Stack: Java 8/11, C#, .NET, Spring Boot, MySQL, Oracle SQL, Docker, Azure, Python, Linux, REST APIs"
      ]
    }
  ],
  es: [
    {
      id: "globant",
      title: "Desarrollador Backend",
      company: "Globant",
      period: "Oct 2025 - Presente",
      location: "Colombia",
      description: "Escalando microservicios para clientes globales de primer nivel usando Java 21, DDD y patrones API-First. Desarrollador Azure para proyectos de Microsoft.",
      details: [
        "Escalando microservicios para clientes globales de primer nivel usando Java 21, DDD y patrones API-First.",
        "Arquitecturé y desplegué un servicio interno de Microsoft desde cero, asegurando alta disponibilidad para operaciones a escala mundial.",
        "Diseñé y optimicé pipelines de CI/CD usando servicios internos de Microsoft, reduciendo el tiempo de despliegue mediante flujos automatizados.",
        "Utilicé herramientas de desarrollo asistidas por IA para optimizar revisiones de código y resolver desafíos complejos de integración en la nube.",
        "Stack: Java 21, C#, Spring Boot, Azure, Microservicios, CI/CD, DevOps"
      ]
    },
    {
      id: "codesa",
      title: "Desarrollador Backend/Líder Técnico",
      company: "Codesa",
      period: "Jul 2023 - Oct 2025",
      location: "Colombia",
      description: "Dirigí equipo para resolver problemas críticos en sistema central biométrico, reduciendo tiempo de inactividad en 25% e implementando nueva arquitectura modular.",
      details: [
        "Rol de Liderazgo (Jul 2024 – May 2025): Dirigí equipo para resolver problemas críticos en sistema biométrico, reduciendo tiempo de inactividad en 25% e implementando arquitectura modular.",
        "Integración IA: Refactoricé componente OCR usando algoritmos de IA, mejorando exactitud en 85% y reduciendo latencia de procesamiento en 25%.",
        "Optimización: Implementé microservicios basados en Docker que mejoraron escalabilidad en 30%.",
        "Stack: Java 8/11, C#, Spring Boot, Python, AWS (S3), MySQL, Docker, REST APIs, Kubernetes"
      ]
    },
    {
      id: "eys",
      title: "Desarrollador de Software",
      company: "EyS Ingeniería de Colombia",
      period: "Nov 2022 - Jul 2023",
      location: "Colombia",
      description: "Desarrollé arquitecturas basadas en APIs para backends de aplicaciones móviles, aumentando escalabilidad en 35%.",
      details: [
        "Construí dashboards de análisis en tiempo real que redujeron el tiempo de toma de decisiones ejecutivas en 25%.",
        "Stack: Java 8/11, C#, .NET, Spring Boot, MySQL, Oracle SQL, Docker, Azure, Python, Linux, REST APIs"
      ]
    }
  ]
}

export const education: Record<Language, Education[]> = {
  en: [
    {
      degree: "Bachelor of Software Engineering",
      school: "UNAD",
      year: "Expected 2028",
      description: "Focused on advanced software engineering principles and practices."
    },
    {
      degree: "Associate Degree in Multimedia and Web Development",
      school: "SENA",
      year: "2026",
      description: "Developed skills in multimedia production and web development."
    }
  ],
  es: [
    {
      degree: "Ingeniería en Software",
      school: "UNAD",
      year: "Esperado 2028",
      description: "Enfocado en principios y prácticas avanzadas de ingeniería de software."
    },
    {
      degree: "Tecnólogo en Desarrollo Multimedia y Web",
      school: "SENA",
      year: "2026",
      description: "Desarrollé habilidades en producción multimedia y desarrollo web."
    }
  ]
}

export const certifications: Record<Language, Certification[]> = {
  en: [
    {
      name: "AWS Academy Cloud Foundations",
      year: "2020"
    },
    {
      name: "SENA - General Management Systems Databases",
      year: "2020"
    }
  ],
  es: [
    {
      name: "AWS Academy Cloud Foundations",
      year: "2020"
    },
    {
      name: "SENA - Sistemas de Gestión de Bases de Datos",
      year: "2020"
    }
  ]
}

export const courses: Record<Language, string[]> = {
  en: [
    "DevOps on AWS and Project Management Course",
    "EF Certificate by EF"
  ],
  es: [
    "Curso de DevOps en AWS y Gestión de Proyectos",
    "Certificado EF de EF"
  ]
}

export const skills: Record<Language, SkillCategory[]> = {
  en: [
    {
      category: "languagesFrameworks",
      items: ["Java (8/11/17/21)", "C#", ".NET", "Python", "Spring Boot", "Maven", "WebFlux"]
    },
    {
      category: "aiAgentic",
      items: ["LLM Fundamentals", "Cursor AI", "GitHub Copilot", "Agent-based Systems"]
    },
    {
      category: "cloudDevops",
      items: ["Azure", "AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Jenkins"]
    },
    {
      category: "databases",
      items: ["PostgreSQL", "MySQL", "Oracle SQL", "MongoDB"]
    },
    {
      category: "architecture",
      items: ["Microservices", "REST APIs", "Clean Architecture", "SOLID", "Circuit Breaker", "DDD"]
    }
  ],
  es: [
    {
      category: "languagesFrameworks",
      items: ["Java (8/11/17/21)", "C#", ".NET", "Python", "Spring Boot", "Maven", "WebFlux"]
    },
    {
      category: "aiAgentic",
      items: ["Fundamentos LLM", "Cursor AI", "GitHub Copilot", "Sistemas Basados en Agentes"]
    },
    {
      category: "cloudDevops",
      items: ["Azure", "AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Jenkins"]
    },
    {
      category: "databases",
      items: ["PostgreSQL", "MySQL", "Oracle SQL", "MongoDB"]
    },
    {
      category: "architecture",
      items: ["Microservicios", "REST APIs", "Clean Architecture", "SOLID", "Circuit Breaker", "DDD"]
    }
  ]
}

export const profiles: Record<Language, Profile> = {
  en: {
    title: "Backend Developer",
    location: "Colombia",
    description: "Backend Developer and Agentic AI with 3+ years of experience, including projects for Microsoft. Expert in building scalable microservices and REST APIs using Java, C#, and Python. Specialized in integrating advanced systems with cloud-native architectures (Azure). Passionate about Agentic AI, LLM integration, and AI-assisted development."
  },
  es: {
    title: "Desarrollador Backend",
    location: "Colombia",
    description: "Desarrollador Backend y Agentic AI con más de 3 años de experiencia, incluyendo proyectos para Microsoft. Experto en construir microservicios escalables y REST APIs usando Java, C# y Python. Especializado en integrar sistemas avanzados con arquitecturas cloud-native (Azure). Apasionado por Agentic AI, integración de LLM y desarrollo asistido por IA."
  }
}
