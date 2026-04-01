export type Language = 'en' | 'es'

export interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  demo?: string
  details: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  description: string
  details: string[]
}

export interface Education {
  degree: string
  school: string
  year: string
  description: string
}

export interface Certification {
  name: string
  year: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Profile {
  title: string
  location: string
  description: string
}

export interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  setActiveSection: (section: string) => void
}

export interface BaseSectionProps {
  setActiveSection: (section: string) => void
  language: Language
} 