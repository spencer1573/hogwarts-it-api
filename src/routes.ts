import express from 'express'
import createStudentController from './controllers/createStudent'
import healthController from './controllers/health'
import studentController from './controllers/students'
import enrolledCoursesController from './controllers/enrolledCourses'
import searchStudentsController from './controllers/searchStudents'
import searchCoursesController from './controllers/searchCourses'
import enrollCourseController from './controllers/enrollCourse'

const router = express.Router()

/** HEALTH */
router.get('/ping', healthController.healthCheck)

/** STUDENTS */
router.get('/students', studentController.getAllStudents)
router.post('/create-student', createStudentController.createStudent)
router.post('/search-students', searchStudentsController.searchStudents)

/** COURSES/GRADES */
router.post(
  '/enrolled-courses',
  enrolledCoursesController.getAllEnrolledCourses
)
router.post('/search-courses', searchCoursesController.searchCourses)
router.post('/enroll-in-course', enrollCourseController.enrollCourse)

export = router
