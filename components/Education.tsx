import { Section } from './Section'
import { BaseSectionProps } from '@/types'
import { translations } from '@/data/translations'
import { education, courses } from '@/data/content'
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

export function Education({ setActiveSection, language }: BaseSectionProps): JSX.Element {
  const t = translations[language]

  return (
    <Section id="education" title={t.educationAndCourses} setActiveSection={setActiveSection}>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">{t.formalEducation}</h3>
          {education[language].map((edu, index) => (
            <Card key={index} className="mb-4 overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h4 className="text-xl font-semibold">{edu.degree}</h4>
                <p className="text-primary font-medium">{edu.school}</p>
                <p className="text-muted-foreground">{edu.year}</p>
                <p className="mt-2">{edu.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">{t.additionalCourses}</h3>
          <ul className="space-y-2">
            {courses[language].map((course, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                <span>{course}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
} 