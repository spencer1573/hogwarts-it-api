import { iStudentRaw } from '../interfaces/interfaces'
import { studentNameIsFound } from './searchHelpers'

test('if student exists it finds it', () => {
  const student: iStudentRaw = {
    id: '1',
    studentPublicId: '1',
    email: 'jimhalpert@dunder.net',
    firstName: 'jim',
    middleName: '',
    lastName: 'halpert',
  }
  expect(studentNameIsFound(student, 'jim')).toBe(true)
})
