export interface Question {
  id: number
  category: string
  categoryDescription: string
  text: string
}

export interface Section {
  title: string
  description: string
  questions: Question[]
}

