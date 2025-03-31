import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { translations } from "@/data/translations"
import { Language } from "@/types"

interface WhatsAppButtonProps {
  language: Language
}

export function WhatsAppButton({ language }: WhatsAppButtonProps): JSX.Element {
  const t = translations[language]

  return (
    <a
      href="https://wa.me/3165796519"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="lg"
        className="rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white"
        aria-label={t.contactWhatsApp}
      >
        <MessageCircle className="h-6 w-6 mr-2" />
        {t.contactWhatsApp}
      </Button>
    </a>
  )
} 