import { Language } from '@/types'

export const downloadCV = (language: Language): void => {
  const cvUrlEs = `/CVJuanOrozcoDesarrollador.pdf`
  const cvUrlEn = `/CVJuanOrozcoDeveloper.pdf`
  const url = language === "en" ? cvUrlEn : cvUrlEs
  
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", url.split('/').pop() || "CV.pdf")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
} 