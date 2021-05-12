import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'
import { iStudentRaw } from '../interfaces/interfaces'
import { studentNameIsFound } from '../plugins/searchHelpers'

const searchStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentQuery = req.body?.studentQuery ?? ''

    const allStudentsRaw = await pool.query('SELECT * FROM students')
    const allStudentsRows = serialize(allStudentsRaw.rows)

    let filteredStudents: Array<iStudentRaw> = allStudentsRows
    filteredStudents = filteredStudents.filter((student: iStudentRaw) => {
      return studentNameIsFound(student, studentQuery)
    })

    return res.status(200).json(filteredStudents)
  } catch (err) {
    console.error(err.message)
    return res.json({
      message: err,
    })
  }
}

export default { searchStudents }
