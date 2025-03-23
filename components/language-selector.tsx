"use client"

import { useLanguage } from "../contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 z-50">
      <Globe className="w-4 h-4 text-gray-400" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === "en" ? "fr" : "en")}
        className="text-sm font-medium hover:text-white transition-colors"
      >
        {language === "en" ? "FR" : "EN"}
      </Button>
    </div>
  )
}

