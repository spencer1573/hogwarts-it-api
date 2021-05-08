import { Request, Response, NextFunction } from 'express'
import pool from '../database/db'

interface iStudentRaw {
  id: string
  studentPublicId: string
  email: string
  firstName: string
  middleName: string
  lastName: string
}

interface iRawGrades {
  id: string
  courseId: string
  studentId: string
  semesterId: string
  grade: number
}

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('req', req.body)

    return res.status(200).json(req.body)
  } catch (err) {
    console.error('create student err', err.message)
    return res.json({
      message: err,
    })
  }
}

export default { createStudent }
