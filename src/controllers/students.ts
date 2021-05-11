import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'
import { iStudentRaw, iRawCourse } from '../interfaces/interfaces'

const getGPA = (allGrades: Array<iRawCourse>, studentId: string) => {
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

    const allStudentsRows = serialize(allStudentsRaw.rows)

    const allGradesRaw = await pool.query('SELECT * FROM enrolled_courses')
    const allGrades = serialize(allGradesRaw.rows)

    const allStudents = allStudentsRows.map((student: iStudentRaw) => {
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
