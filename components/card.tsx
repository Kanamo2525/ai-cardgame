import { motion } from "framer-motion"
import Image from "next/image"

interface CardProps {
  question: {
    id: number
    category: string
    categoryDescription: string
    text: string
  }
  index: number
  totalCards: number
  isActive: boolean
  mode: "random" | "explore"
}

export function Card({ question, index, totalCards, isActive, mode }: CardProps) {
  const cardContent = (
    <div className="relative w-full h-full p-2 sm:p-5 flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center">
        <p className="text-black text-center text-base sm:text-2xl leading-tight font-medium">{question.text}</p>
      </div>

      <div className="mt-2 sm:mt-4 flex items-center justify-between text-[10px] sm:text-xs text-black">
        <div className="flex items-center space-x-1">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai%20cards%20v2-FdEc74m6qbAhjbk4Jjkze5d9eVIpW2.png"
            alt="AI Cards Logo"
            width={16}
            height={16}
            className="opacity-70"
          />
          <span className="opacity-50">AI Cards</span>
        </div>
        <span className="font-bold opacity-70">AI, Me, Myself and I</span>
      </div>
    </div>
  )

  if (mode === "random") {
    const angle = (index / totalCards) * 360
    const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 50 : 100
    const randomOffset = {
      x:
        Math.cos(angle * (Math.PI / 180)) * radius +
        (Math.random() - 0.5) * (typeof window !== "undefined" && window.innerWidth < 640 ? 30 : 60),
      y:
        Math.sin(angle * (Math.PI / 180)) * radius +
        (Math.random() - 0.5) * (typeof window !== "undefined" && window.innerWidth < 640 ? 30 : 60),
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
          opacity: isActive ? 1 : 0,
          y: isActive ? randomOffset.y : -200,
          x: randomOffset.x,
          rotate: randomRotation,
          scale: isActive ? 1 : 0.8,
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
        whileTap={{
          scale: 1.1,
          zIndex: 50,
        }}
        className="absolute rounded-xl cursor-pointer bg-white font-['Space_Grotesk',sans-serif] touch-none"
        style={{
          width: typeof window !== "undefined" && window.innerWidth < 640 ? "160px" : "240px",
          height: typeof window !== "undefined" && window.innerWidth < 640 ? "220px" : "340px",
          left: `calc(50% - ${typeof window !== "undefined" && window.innerWidth < 640 ? "80px" : "120px"})`,
          top: `calc(50% - ${typeof window !== "undefined" && window.innerWidth < 640 ? "110px" : "170px"})`,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: index,
        }}
      >
        {cardContent}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.8,
          },
        },
      }}
      className="w-full rounded-xl cursor-pointer bg-white font-['Space_Grotesk',sans-serif] hover:scale-105 transition-transform duration-300"
      style={{
        height: typeof window !== "undefined" && window.innerWidth < 640 ? "220px" : "340px",
      }}
    >
      {cardContent}
    </motion.div>
  )
}

