const Mongoose = require("mongoose")

const Schema = Mongoose.Schema

const instituteSchema = new Schema ({
    id:{
        type: Number
    },
    username:{
        type: String
    },
    name:{
        type: String
    },
    file:{
        type: File
    },
    title:{
        type: String
    },
    descriptio:{
        type: String
    },
 
    department:{
        type: String
    },

    under :{
        type:String
    },
    academiclevel:{
        type:String
    },
    date:{
        type: Date
    },
    status:{
        type: Number
    }

}, {
    timestamps: true
})

const User = Mongoose.model('Institute', instituteSchema)
module.exports = Institute
