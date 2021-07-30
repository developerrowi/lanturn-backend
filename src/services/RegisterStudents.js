var db = require('../models/')

class RegisterStudents {
  constructor(validatedArgs) {}

  async call(req) {
    try {
      const { tutor, students } = req;

      // Check if tutor already exist, if not create a new tutor
      var tutorTemp = await db.Tutor.findOne({ where: { email: tutor } });
      if (!tutorTemp) {
        tutorTemp = await db.Tutor.create({
          email: tutor
        })
      }

      const response = await Promise.all(students.map(async (studentEmail) => {

        // Check if student already exist, if not create a new tutor
        var studentTemp = await db.Student.findOne({ where: { email: studentEmail } });
        if (!studentTemp) {
          studentTemp = await db.Student.create({
            email: studentEmail
          })
        }

        // Check if relation is already existing, if not Insert into relations table
        var tutorsStudents = await db.Tutors_Students.findOne({ where: { tutorId: tutorTemp.id, studentId: studentTemp.id } });
        if (!tutorsStudents) {
          const tutorsStudents = await db.Tutors_Students.create({
            tutorId: tutorTemp.id,
            studentId: studentTemp.id
          })
        }
        })
      );

      return response;
    }
    catch (e) {
      console.log(e)
      const res = { success: false, error: error }
      return res;
    }
  }
}

module.exports = RegisterStudents;
