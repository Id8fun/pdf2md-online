"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"
import { languages, languageNames } from "@/i18n/settings"

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en')

  useEffect(() => {
    setCurrentLanguage(i18n.language)
  }, [i18n.language])

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language)
    setCurrentLanguage(language)
    localStorage.setItem('i18nextLng', language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 text-sm font-medium bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <Globe className="h-4 w-4 mr-2" />
          {languageNames[currentLanguage as keyof typeof languageNames] || t('language')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{languageNames[language as keyof typeof languageNames]}</span>
            {currentLanguage === language && (
              <Check className="h-4 w-4 text-green-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}