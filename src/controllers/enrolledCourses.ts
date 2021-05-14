import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'
import { iEnrolledCourse } from '../interfaces/interfaces'
import { combinedStudentAndOrCourseIsFound } from '../plugins/searchHelpers'

const getAllEnrolledCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const combinedQuery = req.body?.combinedQuery ?? ''

    let COMBINED_QUERY = `
      SELECT enrolled_courses.id, courses.name AS course_name, semesters.name AS semester_name, students.first_name, students.middle_name, students.last_name, grade
      FROM enrolled_courses
      JOIN courses ON (enrolled_courses.course_id = courses.id)
      JOIN students ON (enrolled_courses.student_id = students.id)
      JOIN semesters ON (enrolled_courses.semester_id = semesters.id)
    `

    // TODO put back in
    // if (combinedQuery.length > 0) {
    //   COMBINED_QUERY = `
    //     ${COMBINED_QUERY}
    //     WHERE coalesce(students.first_name, '') || ' ' || coalesce(students.middle_name, '')  || coalesce(students.last_name, '') || ' ' || coalesce(courses.name, '')
    //     ILIKE '%${combinedQuery}%'
    //   `
    // }

    const allEnrolledCoursesRaw = await pool.query(COMBINED_QUERY)
    const allEnrolledCourses = serialize(allEnrolledCoursesRaw.rows)

    let filteredCourses = allEnrolledCourses
    if (combinedQuery.length > 0) {
      filteredCourses = filteredCourses.filter(
        (enrolledCourse: iEnrolledCourse) => {
          return combinedStudentAndOrCourseIsFound(
            enrolledCourse,
            combinedQuery
          )
        }
      )
    }

    return res.status(200).json(filteredCourses)
    // TODO put back in
    // return res.status(200).json(allEnrolledCourses)
  } catch (err) {
    console.error(err.message)
    return res.json({
      message: err,
    })
  }
}

export default { getAllEnrolledCourses }
