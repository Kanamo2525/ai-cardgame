import { Card } from "./card"
import { motion } from "framer-motion"
import { useLanguage } from "../contexts/language-context"

interface RandomCardsProps {
  questions: any[]
}

export function RandomCards({ questions }: RandomCardsProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <motion.div
        className="text-center mb-6 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {t.randomCards.title}
        </h2>
        <p className="text-base sm:text-xl text-blue-200">{t.randomCards.subtitle}</p>
      </motion.div>

      <div className="relative w-full max-w-5xl h-[400px] sm:h-[500px]">
        {questions.map((question, index) => (
          <Card
            key={question.id}
            question={question}
            index={index}
            totalCards={questions.length}
            isActive={true}
            mode="random"
          />
        ))}
      </div>
    </div>
  )
}

