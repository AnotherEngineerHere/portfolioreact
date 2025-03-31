import { Section } from './Section'
import { BaseSectionProps, Experience as ExperienceType } from '@/types'
import { translations } from '@/data/translations'
import { experiences } from '@/data/content'
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast'

export function Experience({ setActiveSection, language }: BaseSectionProps): JSX.Element {
  const t = translations[language]

  const showExperienceDetails = (exp: ExperienceType): void => {
    toast.dismiss()
    const toastId = toast.custom(
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
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
    <Section id="experience" title={t.myExperience} setActiveSection={setActiveSection}>
      <div className="space-y-8">
        {experiences[language].map((exp, index) => (
          <div key={index} className="flex flex-col sm:flex-row">
            <div className="flex sm:flex-col items-center sm:items-start sm:mr-4 mb-4 sm:mb-0">
              <div className="w-3 h-3 bg-primary rounded-full" />
              {index !== experiences[language].length - 1 && (
                <div className="w-0.5 h-full sm:h-0.5 sm:w-full bg-primary/30" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold">{exp.title}</h3>
              <p className="text-primary font-medium">{exp.company}</p>
              <p className="text-sm sm:text-base text-muted-foreground">{exp.period}</p>
              <p className="mt-2 text-sm sm:text-base">{exp.description}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal text-muted-foreground hover:text-primary text-sm sm:text-base" 
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