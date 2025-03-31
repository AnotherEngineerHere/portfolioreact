import Image from 'next/image'
import { Section } from './Section'
import { BaseSectionProps } from '@/types'
import { translations } from '@/data/translations'

export function AboutMe({ setActiveSection, language }: BaseSectionProps): JSX.Element {
  const t = translations[language]
  const content = {
    en: {
      description1: "Hello! I'm Juan Andrés Orozco Núñez, a backend developer with expertise in Java 8, 11, and 17, Spring Boot, and AWS. I focus on building scalable, high-performing solutions for mobile apps, e-commerce, and IoT systems.",
      description2: "With a strong foundation in software architecture and cloud services, I strive to create efficient solutions for complex problems. I'm committed to best practices, always eager to learn new technologies, and stay up-to-date with the latest industry trends."
    },
    es: {
      description1: "¡Hola! Soy Juan Andrés Orozco Núñez, desarrollador backend con experiencia en Java 8, 11 y 17, Spring Boot y AWS. Me enfoco en construir soluciones escalables y de alto rendimiento para aplicaciones móviles, comercio electrónico y sistemas IoT.",
      description2: "Con una sólida base en arquitectura de software y servicios en la nube, me esfuerzo por crear soluciones eficientes para problemas complejos. Estoy comprometido con las buenas prácticas, siempre dispuesto a aprender nuevas tecnologías y mantenerme actualizado con las últimas tendencias de la industria."
    }
  }

  return (
    <Section id="about" title={t.aboutMe} setActiveSection={setActiveSection}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Image
          src="/profile.jpg"
          alt="Andres Orozco"
          width={200}
          height={200}
          className="rounded-full shadow-md"
        />
        <div className="flex-1 space-y-4">
          <p className="text-lg">{content[language].description1}</p>
          <p className="text-lg">{content[language].description2}</p>
          <div className="flex flex-wrap gap-2">
            {['Java', 'Spring Boot', 'AWS','Azure', 'Docker', 'Kubernetes', 'Git','React'].map((skill) => (
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