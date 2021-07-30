var db = require('../models/')

class SuspendStudent {
  constructor(validatedArgs) {}

  async call(req) {
    try {
      const { student } = req;

      // Check if tutor exist already, if not create a new tutor
      const response = await db.Student.update({ isSuspended: true }, {
        where: {
          email: student
        }
      }).then(res => {

      }).catch(e => {
          console.log(e)
      })
      const res = { success: true }
      return res;
    }
    catch (e) {
      console.log(e)
      const res = { success: false, error: e }
      return res;
    }

  }
}

module.exports = SuspendStudent;
