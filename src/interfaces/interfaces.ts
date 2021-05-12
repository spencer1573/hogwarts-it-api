export interface iStudentRaw {
  id: string
  studentPublicId: string
  email: string
  firstName: string
  middleName: string
  lastName: string
}

export interface iStudent {
  id: string
  studentPublicId?: string
  email?: string
  firstName: string
  middleName: string
  lastName: string
}

export interface iRawEnrolledCourse {
  id: string
  courseId: string
  studentId: string
  semesterId: string
  grade: number
}

export interface iEnrolledCourse {
  id: string
  courseName: string
  semesterName: string
  firstName: string
  middleName: string
  lastName: string
  grade: number
}

export interface iCourse {
  id?: string
  name: string
}
