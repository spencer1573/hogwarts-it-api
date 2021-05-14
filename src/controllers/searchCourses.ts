import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'

const searchCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseQuery = req.body?.courseQuery ?? ''

    let SEARCH_COURSES_QUERY = `
      SELECT * FROM courses
    `

    if (courseQuery.length > 0) {
      SEARCH_COURSES_QUERY = `
        ${SEARCH_COURSES_QUERY}
        WHERE coalesce(courses.name, '')
        ILIKE '%${courseQuery}%'
      `
    }

    const allCoursesRaw = await pool.query(SEARCH_COURSES_QUERY)
    const allCoursesRows = serialize(allCoursesRaw.rows)

    return res.status(200).json(allCoursesRows)
  } catch (err) {
    console.error(err.message)
    return res.json({
      message: err,
    })
  }
}

export default { searchCourses }
