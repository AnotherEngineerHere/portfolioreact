import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Section } from './Section'
import { BaseSectionProps } from '@/types'
import { translations } from '@/data/translations'
import { profiles, skills } from '@/data/content'
import { SkillsGrid } from './SkillsGrid'

export function AboutMe({ setActiveSection, language }: BaseSectionProps): JSX.Element {
  const t = translations[language]
  const profile = profiles[language]

  return (
    <Section id="about" title={t.aboutMe} setActiveSection={setActiveSection}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
        <div className="flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="Andres Orozco"
            width={192}
            height={192}
            priority
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full shadow-md object-cover"
          />
        </div>
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-primary">
              {profile.title}
            </h3>
            <div className="flex items-center justify-center lg:justify-start gap-1 text-sm sm:text-base text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {profile.description}
          </p>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="text-lg sm:text-xl font-semibold mb-4">{t.skills}</h4>
        <SkillsGrid skills={skills[language]} language={language} />
      </div>
    </Section>
  )
}
