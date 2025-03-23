import { motion } from "framer-motion"

interface CardProps {
  question: {
    id: number
    category: string
    text: string
  }
  index: number
  totalCards: number
}

export function Card({ question, index, totalCards }: CardProps) {
  const angle = (index / totalCards) * 360
  const radius = 100
  const randomOffset = {
    x: Math.cos(angle * (Math.PI / 180)) * radius + (Math.random() - 0.5) * 60,
    y: Math.sin(angle * (Math.PI / 180)) * radius + (Math.random() - 0.5) * 60,
  }

  const randomRotation = Math.random() * 30 - 15

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -200,
        x: randomOffset.x,
        rotate: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: randomOffset.y,
        x: randomOffset.x,
        rotate: randomRotation,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 0.8,
          delay: index * 0.1,
        },
      }}
      whileHover={{
        scale: 1.1,
        zIndex: 50,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="absolute rounded-xl cursor-pointer bg-white font-['Space_Grotesk',sans-serif]"
      style={{
        width: "240px",
        height: "340px",
        left: `calc(50% - 120px)`,
        top: `calc(50% - 170px)`,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: index,
      }}
    >
      <div className="relative w-full h-full p-5 flex flex-col">
        <div className="flex-1">
          <h2 className="text-black text-base font-bold mb-2">{question.category}</h2>
          <p className="text-black text-sm leading-tight">{question.text}</p>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-black">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 border-2 border-black rounded-sm rotate-12" />
            <span className="opacity-50">AI Cards</span>
          </div>
          <span className="font-bold opacity-70">AI, Me, Myself and I</span>
        </div>
      </div>
    </motion.div>
  )
}

