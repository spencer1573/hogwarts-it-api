import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'
import { iCourse } from '../interfaces/interfaces'

const studentNameIsFound = (course: iCourse, studentQuery: string) => {
  const nameRaw =
    course.firstName +
    ' ' +
    (course.middleName ? course.middleName + ' ' : '') +
    course.lastName
  const nameLowerCase = nameRaw.toLowerCase()
  return nameLowerCase.includes(studentQuery)
}

const courseNameIsFound = (course: iCourse, courseQuery: string) => {
  const courseRaw = course.courseName
  const nameLowerCase = courseRaw.toLowerCase()
  return nameLowerCase.includes(courseQuery)
}

const getAllEnrolledCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentQuery = req.body?.student ?? ''
    const courseQuery = req.body?.course ?? ''

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
    if (studentQuery.length > 0 || courseQuery.length > 0) {
      filteredCourses = filteredCourses.filter((course: iCourse) => {
        return (
          studentNameIsFound(course, studentQuery) &&
          courseNameIsFound(course, courseQuery)
        )
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
