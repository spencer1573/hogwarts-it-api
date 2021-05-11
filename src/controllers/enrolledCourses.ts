import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'
import { iRawCourse, iCourse } from '../interfaces/interfaces'

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

const getAllEnrolledCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = req.body?.student ?? ''

    let QUERY = `
      SELECT enrolled_courses.id, courses.name AS course_name, semesters.name AS semester_name, students.first_name, students.middle_name, students.last_name, grade
      FROM enrolled_courses
      JOIN courses ON (enrolled_courses.course_id = courses.id)
      JOIN students ON (enrolled_courses.student_id = students.id)
      JOIN semesters ON (enrolled_courses.semester_id = semesters.id)
    `

    const allEnrolledCoursesRaw = await pool.query(QUERY)
    const allEnrolledCourses = serialize(allEnrolledCoursesRaw.rows)

    let filteredCourses = allEnrolledCourses
    if (student.length > 0) {
      filteredCourses = filteredCourses.filter((course: iCourse) => {
        const nameRaw =
          course.firstName +
          ' ' +
          (course.middleName ? course.middleName + ' ' : '') +
          course.lastName
        const nameLowerCase = nameRaw.toLowerCase()
        return nameLowerCase.includes(student)
      })
    }

    return res.status(200).json(filteredCourses)
  } catch (err) {
    console.error(err.message)
    return res.json({
      message: err,
    })
  }
}

export default { getAllEnrolledCourses }
