import { iCourse, iEnrolledCourse, iStudent } from '../interfaces/interfaces'

export const studentNameIsFound = (course: iStudent, studentQuery: string) => {
  const nameRaw =
    course.firstName +
    ' ' +
    (course.middleName ? course.middleName + ' ' : '') +
    course.lastName
  const nameLowerCase = nameRaw.toLowerCase()
  return nameLowerCase.includes(studentQuery)
}

export const courseNameIsFound = (course: iCourse, courseQuery: string) => {
  const courseRaw = course.name
  const nameLowerCase = courseRaw.toLowerCase()
  return nameLowerCase.includes(courseQuery)
}

export const combinedStudentAndOrCourseIsFound = (
  enrolledCourse: iEnrolledCourse,
  query: string
) => {
  const splitQuery = query.split(' ')
  let contains = true
  const combinedToSearchRaw =
    enrolledCourse.courseName +
    ' ' +
    enrolledCourse.firstName +
    ' ' +
    (enrolledCourse.middleName ? enrolledCourse.middleName + ' ' : '') +
    enrolledCourse.lastName
  const combinedFormatted = combinedToSearchRaw.toLowerCase()

  const splitQueryFormatted = splitQuery.filter((query) => {
    return query.length > 0
  })

  splitQueryFormatted.forEach((queryPiece) => {
    if (!combinedFormatted.includes(queryPiece)) {
      contains = false
    }
  })
  return contains
}
