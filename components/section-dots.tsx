interface SectionDotsProps {
  totalSections: number
  currentSection: number
  onDotClick: (index: number) => void
}

export function SectionDots({ totalSections, currentSection, onDotClick }: SectionDotsProps) {
  return (
    <div className="fixed right-2 sm:right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 sm:gap-3">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
            currentSection === index ? "bg-blue-400 scale-125" : "bg-gray-600 hover:bg-gray-400"
          }`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  )
}

