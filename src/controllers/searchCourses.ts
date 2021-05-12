import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'
import { courseNameIsFound } from '../plugins/searchHelpers'

interface iCourse {
  id: string
  name: string
}

const searchCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseQuery = req.body?.courseQuery ?? ''

    const allCoursesRaw = await pool.query('SELECT * FROM courses')
    const allCoursesRows = serialize(allCoursesRaw.rows)

    let filteredCourses: Array<iCourse> = allCoursesRows
    filteredCourses = filteredCourses.filter((course: iCourse) => {
      return courseNameIsFound(course, courseQuery)
    })

    return res.status(200).json(filteredCourses)
  } catch (err) {
    console.error(err.message)
    return res.json({
      message: err,
    })
  }
}

export default { searchCourses }
