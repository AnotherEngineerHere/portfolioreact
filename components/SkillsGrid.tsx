import { Card, CardContent } from "@/components/ui/card"
import { translations } from '@/data/translations'
import { Language } from '@/types'

interface SkillsGridProps {
  skills: Array<{ category: string; items: string[] }>
  language: Language
}

export function SkillsGrid({ skills, language }: SkillsGridProps): JSX.Element {
  const t = translations[language]

  const getCategoryTitle = (category: string): string => {
    return t[category] || category
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skillGroup) => (
        <Card key={skillGroup.category} className="overflow-hidden">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">
              {getCategoryTitle(skillGroup.category)}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <span
                  key={skill}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs sm:text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
