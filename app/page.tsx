'use client'

import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import { Download, Code, Linkedin, Mail, Menu } from "lucide-react"
import { AboutMe } from '@/components/AboutMe'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Education } from '@/components/Education'
import { Language } from '@/types'
import { translations } from '@/data/translations'
import { useToastLimit } from '@/hooks/useToastLimit'
import { downloadCV } from '@/utils/cvDownload'
import { SOCIAL_LINKS } from '@/config/social'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MAX_TOASTS = 1

export default function Portfolio(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('about')
  const [language, setLanguage] = useState<Language>('en')
  useToastLimit(MAX_TOASTS)

  const t = translations[language]

  const toggleLanguage = (): void => {
    setLanguage(prevLang => prevLang === 'en' ? 'es' : 'en')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Juan Andres Orozco Nuñez</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Backend Developer</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button 
              variant="outline" 
              onClick={toggleLanguage}
              title={t.toggleLanguage}
              size="sm"
              className="min-w-[3rem]"
            >
              {language === "en" ? "EN" : "ES"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                    <Code className="h-4 w-4 mr-2" /> GitHub
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={`mailto:${SOCIAL_LINKS.email}`}>
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:flex items-center gap-2">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Code className="h-5 w-5" />
                </Button>
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href={`mailto:${SOCIAL_LINKS.email}`}>
                <Button variant="ghost" size="icon">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            </div>
            <Button onClick={() => downloadCV(language)} variant="outline" size="sm">
              <Download className="mr-1 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">CV</span>
            </Button>
          </div>
        </header>

        <nav className="mb-6 sm:mb-8 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <ul className="flex justify-start sm:justify-center gap-2 min-w-max">
            {['about', 'projects', 'experience', 'education'].map((section) => (
              <li key={section}>
                <Button
                  variant={activeSection === section ? "default" : "ghost"}
                  onClick={() => {
                    setActiveSection(section)
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  size="sm"
                >
                  {t[section]}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="space-y-8 sm:space-y-16">
          <AboutMe setActiveSection={setActiveSection} language={language} />
          <Projects setActiveSection={setActiveSection} language={language} />
          <Experience setActiveSection={setActiveSection} language={language} />
          <Education setActiveSection={setActiveSection} language={language} />
        </main>
      </div>
    </div>
  )
}
