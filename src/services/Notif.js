var db = require('../models/')

class Notification {
  constructor(validatedArgs) {}

  async call(req) {
    try {
        const { tutor, notification } = req;
        let recipients = [];

        // Get tutor details and all of his/her available students, To check if they are not suspended then add to recipient
        var tutorTemp = await db.Tutor.findOne({ where: { email: tutor } });
        var tutorStudentTemp = await db.Tutors_Students.findAll({ where: { tutorId: tutorTemp.id }, include: [db.Student]})
        .then(res=> {
            res.map(async (item) => { 
                if (!item.dataValues.Student.isSuspended) recipients.push(item.dataValues.Student.email)
            })
        })

        // Extract tagged emails from notification, check if email is a suspended student -> if suspended student then don't add it on the recipient 
        var taggedEmails = this.extractEmails(notification)
        let suspendedEmails = []
        await Promise.all(taggedEmails.map(async (taggedEmail) => { 
            var studentTemp = await db.Student.findOne({ where: { email: taggedEmail } });
            if (studentTemp.isSuspended) suspendedEmails.push(taggedEmail)
        }))
        taggedEmails = taggedEmails.filter( ( el ) => !suspendedEmails.includes( el ) );
        //

        // remove any duplicated emails
        recipients = [...recipients, ...taggedEmails]
        let finalRecipients = [...new Set(recipients)];
        //

        const response = await db.Notif.create({
            tutor: tutor,
            notification: notification,
            recipients: finalRecipients.toString()
        })
        
        let res = response.recipients.split(',');
        return res
    }
    catch (e) {
      console.log(e)
      const res = { success: false, error: error }
      return res;
    }
  }

  extractEmails (text){
    return text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  }
}

module.exports = Notification;
