export interface POLLS {
    text: string
    school: number
    availability: 'all' | 'student' | 'teacher'
    expire: Date
    active: 1 | 0
    oId: number
    _id: number
    opt: 1 | 0
    user: number
    opinionId: number
}