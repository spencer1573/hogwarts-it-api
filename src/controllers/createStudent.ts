import { Request, Response, NextFunction } from 'express'
import { serialize } from '../plugins/serialize'
import pool from '../database/db'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body ?? {}

    const createNewStudentRaw = await pool.query(`
      INSERT INTO students ( email, first_name, middle_name, last_name)
      VALUES ('${newUser.email}', '${newUser.firstName}', '${newUser.middleName}', '${newUser.lastName}' )
      RETURNING *;
    `)

    const serializedResponse = serialize(req.body)

    return res.status(200).json(serializedResponse)
  } catch (err) {
    console.error('create student err', err.message)
    return res.json({
      message: err,
    })
  }
}

export default { createStudent }
