import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from "@/components/ui/card"
import { SectionProps } from '@/types'

export function Section({ id, title, children, setActiveSection }: SectionProps): JSX.Element {
  const { ref, inView } = useInView({
    threshold: 0.3,
  })

  useEffect(() => {
    if (inView) {
      setActiveSection(id)
    }
  }, [inView, id, setActiveSection])

  return (
    <section id={id} ref={ref} className="scroll-mt-20">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{title}</h2>
          {children}
        </CardContent>
      </Card>
    </section>
  )
}
