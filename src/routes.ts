import express from 'express'
import createStudentController from './controllers/createStudent'
import healthController from './controllers/health'
import studentController from './controllers/students'

const router = express.Router()

/** HEALTH */
router.get('/ping', healthController.healthCheck)

/** STUDENTS */
router.get('/students', studentController.getAllStudents)
router.post('/create-student', createStudentController.createStudent)

export = router
