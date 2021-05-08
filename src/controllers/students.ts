import { Request, Response, NextFunction } from 'express'
import pool from '../database/db'

interface StudentRaw {
  id: string
  studentPublicId: string
  email: string
  firstName: string
  middleName: string
  lastName: string
}

interface RawGrades {
  id: string
  courseId: string
  studentId: string
  semesterId: string
  grade: number
}

const getGPA = (allGrades: Array<RawGrades>, studentId: string) => {
  let courseCount = 0

  let gpaSum = 0

  allGrades.forEach((grade) => {
    if (studentId === grade.studentId) {
      courseCount++
      gpaSum = gpaSum + grade.grade
    }
  })

  return gpaSum / courseCount
}

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allStudentsRaw = await pool.query('SELECT * FROM students')

    const allStudentsRows = allStudentsRaw.rows

    const allGradesRaw = await pool.query('SELECT * FROM enrolled_courses')
    const allGrades = allGradesRaw.rows

    const allStudents = allStudentsRows.map((student: StudentRaw) => {
      const cummulativeGPA = getGPA(allGrades, student.id)

      return {
        studentId: student.studentPublicId,
        email: student.email,
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        gpa: cummulativeGPA,
      }
    })

    return res.status(200).json(allStudents)
  } catch (err) {
    console.error(err.message)
    return res.json({
      message: err,
    })
  }
}

export default { getAllStudents }
