'use client'

import toast from 'react-hot-toast'
import { Section } from './Section'
import { BaseSectionProps, Experience as ExperienceType } from '@/types'
import { translations } from '@/data/translations'
import { experiences } from '@/data/content'
import { Button } from "@/components/ui/button"
import { MapPin, Building2 } from "lucide-react"

interface ExperienceToastProps {
  experience: ExperienceType
  onClose: () => void
}

function ExperienceToast({ experience, onClose }: ExperienceToastProps): JSX.Element {
  return (
    <div className="max-w-sm sm:max-w-md w-full bg-background shadow-lg rounded-lg ring-1 ring-border">
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-foreground">
              {experience.title}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Building2 className="h-3 w-3 text-primary" />
              <span className="text-xs text-primary">{experience.company}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{experience.location}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-md transition-colors flex-shrink-0"
          >
            <span className="sr-only">Close</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-3 pt-3 border-t border-border max-h-48 overflow-y-auto">
          <ul className="space-y-2">
            {experience.details.map((detail, index) => (
              <li key={index} className="text-xs sm:text-sm text-muted-foreground">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function Experience({ setActiveSection, language }: BaseSectionProps): JSX.Element {
  const t = translations[language]
  const experienceList = experiences[language]

  const showExperienceDetails = (exp: ExperienceType): void => {
    toast.dismiss()
    const toastId = toast.custom(
      <ExperienceToast experience={exp} onClose={() => toast.dismiss(toastId)} />,
      { duration: 10000 }
    )
  }

  return (
    <Section id="experience" title={t.myExperience} setActiveSection={setActiveSection}>
      <div className="space-y-6 sm:space-y-8">
        {experienceList.map((exp, index) => (
          <div key={exp.id} className="flex flex-col sm:flex-row">
            <div className="flex sm:flex-col items-center sm:items-start sm:mr-4 mb-3 sm:mb-0">
              <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
              {index !== experienceList.length - 1 && (
                <div className="w-0.5 h-8 sm:h-full sm:w-auto sm:flex-1 bg-primary/30 min-h-[2rem]" />
              )}
            </div>
            <div className="flex-1 pb-6 sm:pb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                <h3 className="text-base sm:text-lg font-semibold">{exp.title}</h3>
                <span className="text-xs sm:text-sm text-muted-foreground">{exp.period}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <div className="flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-primary" />
                  <span className="text-sm font-medium text-primary">{exp.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-muted-foreground">{exp.location}</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-3">{exp.description}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal text-muted-foreground hover:text-primary text-sm" 
                onClick={() => showExperienceDetails(exp)}
              >
                {t.viewDetails}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
