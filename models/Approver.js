const Mongoose = require("mongoose")

const Schema = Mongoose.Schema

const ApproverSchema = new Schema ({
  
    username:{
        type: String
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    password: {
        type: String
    },
    gender:{
        type: String
    },
    profilepicture:{
        type:Number
    },
    address:{
        type:String
    },
    department:{
        type: String
    },
    phone:{
        type:Number
    },
    
    email:{
        type:String
    },
    under :{
        type:String
    },
    date:{
        type: Date
    }

}, {
    timestamps: true
})

const Approver = Mongoose.model('Approver', ApproverSchema)
module.exports = Approver
