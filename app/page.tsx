'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import { Download, Code, Linkedin, Mail, Menu } from "lucide-react"
import { AboutMe } from '@/components/AboutMe'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Education } from '@/components/Education'
import { ThemeToggle } from '@/components/ThemeToggle'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Language } from '@/types'
import { translations } from '@/data/translations'
import { useToastLimit } from '@/hooks/useToastLimit'
import { downloadCV } from '@/utils/cvDownload'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MAX_TOASTS = 1

export default function Portfolio(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('about')
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState<Language>('en')
  useToastLimit(MAX_TOASTS)

  const t = translations[language]

  const toggleLanguage = (): void => {
    setLanguage(prevLang => prevLang === 'en' ? 'es' : 'en')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">Juan Andres Orozco Nuñez</h1>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button 
              variant="outline" 
              onClick={toggleLanguage}
              title={t.toggleLanguage}
              size="sm"
            >
              {language === "en" ? "EN" : "ES"}
            </Button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a href="https://github.com/AnotherEngineerHere" target="_blank" rel="noopener noreferrer">
                    <Code className="h-4 w-4 mr-2" /> GitHub
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://www.linkedin.com/in/andres-orozco-nunez" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="mailto:juan.orozcon99@gmail.com">
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:flex items-center space-x-2">
              <a href="https://github.com/AnotherEngineerHere" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Code className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/andres-orozco-nunez" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="mailto:juan.orozcon99@gmail.com">
                <Button variant="ghost" size="icon">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            </div>
            <Button onClick={() => downloadCV(language)} variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> CV
            </Button>
          </div>
        </header>

        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-2">
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

        <main className="space-y-16">
          <AboutMe setActiveSection={setActiveSection} language={language} />
          <Projects setActiveSection={setActiveSection} language={language} />
          <Experience setActiveSection={setActiveSection} language={language} />
          <Education setActiveSection={setActiveSection} language={language} />
        </main>
      </div>
      <WhatsAppButton language={language} />
    </div>
  )
}
