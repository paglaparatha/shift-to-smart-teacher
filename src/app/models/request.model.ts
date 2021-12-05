export interface REQUESTS {
  id: number
  reason: string
  description: string
  student: number
  school: number
  date: Date
  name: string
  "class": string
  section: string
  status: 'accepted' | 'rejected' | 'pending'
}
