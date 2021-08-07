const Mongoose = require("mongoose")

const Schema = Mongoose.Schema;

require('mongoose-type-email');

const instituteSchema = new Schema ({
   
    username:{
        type: String
    },
    password: {
        type: String
    },
    profilepicture:{
        type:Number
    },
    address:{
        type:String
    },
    phone:{
        type:Number
    },
    role:{
        type:String
    },    
    email:Mongoose.SchemaTypes.Email,
    under :{
        type:String
    },
    date:{
        type: Date
    }

}, {
    timestamps: true
})

const Institute = Mongoose.model('Institute', instituteSchema)
module.exports = Institute
