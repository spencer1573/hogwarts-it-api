export interface iStudentRaw {
  id: string
  studentPublicId: string
  email: string
  firstName: string
  middleName: string
  lastName: string
}

export interface iRawGrades {
  id: string
  courseId: string
  studentId: string
  semesterId: string
  grade: number
}
