import Image from 'next/image'
import { Section } from './Section'
import { BaseSectionProps, Project } from '@/types'
import { translations } from '@/data/translations'
import { projects } from '@/data/content'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Code } from "lucide-react"
import toast from 'react-hot-toast'

export function Projects({ setActiveSection, language }: BaseSectionProps): JSX.Element {
  const t = translations[language]

  const showProjectDetails = (project: Project): void => {
    toast.dismiss()
    const toastId = toast.custom(
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
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
            onClick={() => toast.dismiss(toastId)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {t.close}
          </button>
        </div>
      </div>,
      { duration: 5000 }
    )
  }

  return (
    <Section id="projects" title={t.myProjects} setActiveSection={setActiveSection}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
        {projects[language].map((project, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-40 sm:h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">{project.description}</p>
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
                <Button variant="outline" onClick={() => window.open(project.github, '_blank')} className="w-full">
                  <Code className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
} 