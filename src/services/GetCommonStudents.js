var db = require('../models/')
var _ = require('underscore');

const { Op, QueryTypes, sequelize, where } = require("sequelize")

class GetCommonStudents {
  constructor(validatedArgs) {}

  async call(query) {
    try {
        let commonStudents = [];
        let tutorTemp = [];
        // Check if multiple params
        if (Array.isArray(query.tutor)) {

            var tutor = await db.Tutor.findAll({ 
                where: { 
                    email: {
                        [Op.or]: query.tutor
                    } 
                }
            })
            const response = await Promise.all(tutor.map(async (item) => {
                var tutorStudentTemp = await db.Tutors_Students.findAll({ where: { tutorId: item.id }, include: [db.Student]})
                .then(res=> {
                    let temp = []
                    res.map(item => {
                        temp.push(item.Student.dataValues.email)
                    })
                    console.log(temp)
                    commonStudents.push(temp)
                })
            }))
        } else {
            // Single Tutor
            var tutor = await db.Tutor.findOne({ 
                where: { 
                    email: query.tutor
                    
                }
            })
            var tutorStudentTemp = await db.Tutors_Students.findAll({ where: { tutorId: tutor.id }, include: [db.Student]})
            .then(res=> {
                let temp = []
                res.map(item => {
                    temp.push(item.Student.dataValues.email)
                })
                commonStudents.push(temp)
            })
        }


        const data = _.intersection(...commonStudents);

        return data;

    }
    catch (e) {
      console.log(e)
      const res = { success: false, error: error }
      return res;
    }
  }
}

module.exports = GetCommonStudents;
