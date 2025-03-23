"use client"

import { useState, useCallback, useRef } from "react"
import { sections } from "./sections"
import { SectionView } from "./components/section-view"
import { SectionDots } from "./components/section-dots"
import { RandomCards } from "./components/random-cards"
import { LanguageProvider, useLanguage } from "./contexts/language-context"
import { LanguageSelector } from "./components/language-selector"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shuffle, List } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function CardsGame() {
  const { t, language } = useLanguage()
  const [currentSection, setCurrentSection] = useState(-1)
  const [showRandomCards, setShowRandomCards] = useState(false)
  const [randomQuestions, setRandomQuestions] = useState<any[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const currentSections = sections[language]

  const getRandomQuestions = useCallback(() => {
    const allQuestions = currentSections.flatMap((section) => section.questions)
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2)
  }, [currentSections])

  const handleSectionIntersect = useCallback((index: number) => {
    setCurrentSection(index)
  }, [])

  const handleDotClick = useCallback((index: number) => {
    const container = containerRef.current
    if (container) {
      const sectionHeight = window.innerHeight
      container.scrollTo({
        top: index * sectionHeight,
        behavior: "smooth",
      })
    }
  }, [])

  const handleRandomCards = () => {
    setRandomQuestions(getRandomQuestions())
    setShowRandomCards(true)
    setCurrentSection(-1)
  }

  const handleDiscoverQuestions = () => {
    setShowRandomCards(false)
    setCurrentSection(0)
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  const isExploring = currentSection >= 0 && !showRandomCards

  return (
    <div className="min-h-screen bg-black text-white">
      <LanguageSelector />
      {/* Header */}
      <motion.div
        className="flex flex-col items-center px-2 sm:px-4 sticky top-0 z-30 bg-black"
        animate={{
          paddingTop: isExploring ? "4px" : "16px",
          paddingBottom: isExploring ? "4px" : "16px",
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          animate={{
            marginBottom: isExploring ? "4px" : "16px",
            scale: isExploring ? 0.8 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-2xl sm:text-6xl font-bold mb-1 sm:mb-4 neon-title tracking-wider"
            animate={{
              fontSize: isExploring ? "1.25rem" : "1.5rem",
              marginBottom: isExploring ? "0.25rem" : "0.5rem",
            }}
          >
            {t.title}
          </motion.h1>
          <motion.p
            className="text-sm sm:text-xl font-light neon-subtitle tracking-wide max-w-2xl mx-auto mb-2 sm:mb-8"
            animate={{
              fontSize: isExploring ? "0.75rem" : "0.875rem",
              marginBottom: isExploring ? "0.25rem" : "0.5rem",
            }}
          >
            {t.subtitle}
          </motion.p>
          <AnimatePresence>
            {!isExploring && (
              <motion.p
                className="text-xs sm:text-sm italic text-gray-400 max-w-3xl mx-auto leading-relaxed font-['Space_Grotesk',sans-serif]"
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {t.description}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-2 sm:gap-6 w-full sm:w-auto px-2 sm:px-4"
          animate={{
            marginBottom: isExploring ? "4px" : "24px",
            scale: isExploring ? 0.9 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={handleRandomCards}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-6"
          >
            <Shuffle className="w-4 h-4 sm:w-6 sm:h-6 mr-2" />
            {t.buttons.drawCards}
          </Button>
          <Button
            onClick={handleDiscoverQuestions}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-6"
          >
            <List className="w-4 h-4 sm:w-6 sm:h-6 mr-2" />
            {t.buttons.explore}
          </Button>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="w-full relative">
        {showRandomCards ? (
          <RandomCards questions={randomQuestions} />
        ) : (
          <div className="relative">
            <div
              ref={containerRef}
              className="h-[calc(100vh-80px)] overflow-y-auto snap-y snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style jsx global>{`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {currentSections.map((section, index) => (
                <SectionView
                  key={section.title}
                  section={section}
                  isActive={currentSection === index}
                  index={index}
                  onIntersect={handleSectionIntersect}
                />
              ))}
            </div>
            <SectionDots
              totalSections={currentSections.length}
              currentSection={currentSection}
              onDotClick={handleDotClick}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-800 py-2 sm:py-4 px-4 bg-black/80 backdrop-blur-sm z-40">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 max-w-4xl">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai%20cards%20v2-FdEc74m6qbAhjbk4Jjkze5d9eVIpW2.png"
            alt="AI Cards Game Logo"
            width={100}
            height={50}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
          <div className="text-center md:text-right text-xs sm:text-sm text-gray-400">
            <p className="flex items-center gap-1 justify-end flex-wrap">
              <a href="https://www.aicards.fr/" className="hover:text-gray-300">
                Ai Cards Game
              </a>
              {" by "}
              <a href="https://www.linkedin.com/in/kanamo/" className="hover:text-gray-300">
                Kristy Anamoutou
              </a>
              {" is licensed under "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
                target="_blank"
                rel="license noopener noreferrer"
                className="inline-flex items-center hover:text-gray-300"
              >
                CC BY-NC-SA 4.0
                <img
                  src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
                  alt="CC"
                  className="h-[18px] sm:h-[22px] ml-1"
                />
                <img
                  src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
                  alt="BY"
                  className="h-[18px] sm:h-[22px] ml-1"
                />
                <img
                  src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
                  alt="NC"
                  className="h-[18px] sm:h-[22px] ml-1"
                />
                <img
                  src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
                  alt="SA"
                  className="h-[18px] sm:h-[22px] ml-1"
                />
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function WrappedCardsGame() {
  return (
    <LanguageProvider>
      <CardsGame />
    </LanguageProvider>
  )
}

