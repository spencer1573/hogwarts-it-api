import { iCourse, iEnrolledCourse, iStudent } from '../interfaces/interfaces'

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
