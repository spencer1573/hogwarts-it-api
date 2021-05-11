export interface iStudentRaw {
  id: string
  studentPublicId: string
  email: string
  firstName: string
  middleName: string
  lastName: string
}

export interface iRawCourse {
  id: string
  courseId: string
  studentId: string
  semesterId: string
  grade: number
}

export interface iCourse {
  id: string
  courseName: string
  semesterName: string
  firstName: string
  middleName: string
  lastName: string
  grade: number
}
