"use client"

import type { Section } from "../types"
import { Card } from "./card"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface SectionViewProps {
  section: Section
  isActive: boolean
  index: number
  onIntersect: (index: number) => void
}

export function SectionView({ section, isActive, index, onIntersect }: SectionViewProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            onIntersect(index)
          }
        })
      },
      {
        threshold: 0.5,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [index, onIntersect])

  return (
    <div ref={sectionRef} className="min-h-screen flex flex-col items-center justify-start p-2 sm:p-8 pb-20 snap-start">
      <motion.div
        className="text-center mb-4 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isActive ? 1 : 0.3,
          y: isActive ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl sm:text-4xl font-bold mb-1 sm:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          {section.title}
        </h2>
        <p className="text-sm sm:text-xl text-blue-200">{section.description}</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 w-full max-w-6xl mx-auto"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {section.questions.map((question, index) => (
          <Card
            key={question.id}
            question={question}
            index={index}
            totalCards={section.questions.length}
            isActive={isActive}
            mode="explore"
          />
        ))}
      </motion.div>
    </div>
  )
}

