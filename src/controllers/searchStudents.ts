import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'

const searchStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentQuery = req.body?.studentQuery ?? ''

    let SEARCH_STUDENTS_QUERY = `
      SELECT * FROM students
    `

    if (studentQuery.length > 0) {
      SEARCH_STUDENTS_QUERY = `
        ${SEARCH_STUDENTS_QUERY}
        WHERE coalesce(students.first_name, '') || ' ' || coalesce(students.middle_name, '')  || coalesce(students.last_name, '')
        ILIKE '%${studentQuery}%'
      `
    }

    const allStudentsRaw = await pool.query(SEARCH_STUDENTS_QUERY)
    const allStudentsRows = serialize(allStudentsRaw.rows)

    return res.status(200).json(allStudentsRows)
  } catch (err) {
    console.error(err.message)
    return res.json({
      message: err,
    })
  }
}

export default { searchStudents }
