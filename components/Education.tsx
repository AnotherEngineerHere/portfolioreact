import { Award, GraduationCap, BookOpen } from "lucide-react"
import { Section } from './Section'
import { BaseSectionProps } from '@/types'
import { translations } from '@/data/translations'
import { education, courses, certifications } from '@/data/content'
import { Card, CardContent } from "@/components/ui/card"

export function Education({ setActiveSection, language }: BaseSectionProps): JSX.Element {
  const t = translations[language]
  const certList = certifications[language]

  return (
    <Section id="education" title={t.educationAndCourses} setActiveSection={setActiveSection}>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            {t.formalEducation}
          </h3>
          <div className="space-y-3">
            {education[language].map((edu, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-3 sm:p-4">
                  <h4 className="text-base sm:text-lg font-semibold">{edu.degree}</h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <span className="text-sm font-medium text-primary">{edu.school}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{edu.year}</span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            {t.certifications}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certList.map((cert, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-medium">{cert.name}</h4>
                      <span className="text-xs text-muted-foreground">{cert.year}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {courses[language].length > 0 && (
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t.additionalCourses}
            </h3>
            <ul className="space-y-2">
              {courses[language].map((course, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-sm sm:text-base">{course}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  )
}
