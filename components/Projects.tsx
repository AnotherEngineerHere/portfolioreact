'use client'

import Image from 'next/image'
import toast from 'react-hot-toast'
import { Section } from './Section'
import { BaseSectionProps, Project } from '@/types'
import { translations } from '@/data/translations'
import { projects } from '@/data/content'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Code, ExternalLink, X } from "lucide-react"

interface ProjectToastProps {
  project: Project
  onClose: () => void
}

function ProjectToast({ project, onClose }: ProjectToastProps): JSX.Element {
  return (
    <div className="max-w-sm sm:max-w-md w-full bg-background shadow-lg rounded-lg ring-1 ring-border">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <Image
              src={project.image}
              alt={project.title}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              {project.title}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-3">
              {project.details}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 hover:bg-accent rounded-md transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        {project.demo && (
          <div className="mt-3 pt-3 border-t border-border">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs sm:text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              View Demo
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export function Projects({ setActiveSection, language }: BaseSectionProps): JSX.Element {
  const t = translations[language]
  const projectList = projects[language]

  const showProjectDetails = (project: Project): void => {
    toast.dismiss()
    const toastId = toast.custom(
      <ProjectToast project={project} onClose={() => toast.dismiss(toastId)} />,
      { duration: 8000 }
    )
  }

  return (
    <Section id="projects" title={t.myProjects} setActiveSection={setActiveSection}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {projectList.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-36 sm:h-44">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{project.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="text-xs text-muted-foreground">+{project.tags.length - 4}</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs sm:text-sm"
                  onClick={() => showProjectDetails(project)}
                >
                  {t.moreInfo}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  asChild
                  className="text-xs sm:text-sm"
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
