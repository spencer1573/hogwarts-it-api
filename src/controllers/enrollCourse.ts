import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'
import { iRawEnrolledCourse } from '../interfaces/interfaces'

interface iEnrollSubmit {
  selectedCourseId: string
  selectedStudentId: string
}

interface iEnrollResponse {
  wasAlreadyEnrolled: boolean
  data: Array<iRawEnrolledCourse>
}

// TODO - test
export const isCurrentlyEnrolled = (
  newEnroll: iEnrollSubmit,
  currentEnrolls: Array<iRawEnrolledCourse>,
  currentSemester: string
) => {
  let isCurrentlyEnrolled = false
  currentEnrolls.forEach((enroll: iRawEnrolledCourse) => {
    if (
      newEnroll.selectedCourseId === enroll.courseId &&
      newEnroll.selectedStudentId === enroll.studentId &&
      currentSemester === enroll.semesterId
    ) {
      isCurrentlyEnrolled = true
    }
  })
  return isCurrentlyEnrolled
}

const enrollCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newEnroll: iEnrollSubmit = req.body ?? {}

    // hardcoded for summer 2021
    const currentSemester = '3'

    const currentEnrollsRaw = await pool.query(`SELECT * FROM enrolled_courses`)
    const currentEnrolls = serialize(currentEnrollsRaw.rows)

    if (!isCurrentlyEnrolled(newEnroll, currentEnrolls, currentSemester)) {
      const newEnrollRaw = await pool.query(`
        INSERT INTO enrolled_courses ( course_id, student_id, semester_id)
        VALUES ('${newEnroll.selectedCourseId}', '${newEnroll.selectedStudentId}', '${currentSemester}')
        RETURNING *;
      `)

      const newEnrollRows = newEnrollRaw?.rows ?? []
      const serializedEnrollRow =
        newEnrollRows.length > 0 ? serialize(newEnrollRows[0]) : {}

      const response: iEnrollResponse = {
        wasAlreadyEnrolled: false,
        data: serializedEnrollRow ? [serializedEnrollRow] : [],
      }

      return res.status(200).json(response)
    } else {
      const alreadyEnrolledResponse: iEnrollResponse = {
        wasAlreadyEnrolled: true,
        data: [],
      }
      return res.status(200).json(alreadyEnrolledResponse)
    }
  } catch (err) {
    console.error('course enroll err', err.message)
    return res.json({
      message: err,
    })
  }
}

export default { enrollCourse }
