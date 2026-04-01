export const SOCIAL_LINKS = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/AnotherEngineerHere',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/andres-orozco-nunez',
  email: process.env.NEXT_PUBLIC_EMAIL || 'juan.orozcon99@gmail.com',
} as const

export type SocialLinkKey = keyof typeof SOCIAL_LINKS
