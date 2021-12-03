export interface TEACHER_DATA {
  teacher: {
    id: number
    name: string
    email: string
    "id-number": string
    mobile: string
    "alt-mobile": string
    address: string
    "class-teacher": 1 | 0
    "class": number
    section: string
    blood: string
  }

  school: {
    description: string
    'help-line1': string
    'help-line2': string
    id: number
    logo: string
    name: string
  }
  sliders: { image: string }[]
  subjects: {subject: string, "class": number, section: string}[]
}
