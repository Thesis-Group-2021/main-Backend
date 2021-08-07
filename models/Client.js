const Mongoose = require("mongoose")

const Schema = Mongoose.Schema;

require('mongoose-type-email');

const clientSchema = new Schema ({
   
    username:{
        type: String
    },
    password: {
        type: String
    },
    firstname:{
        type: String
    },
    lastname:{
        type:String

    },
    gender:{
        type: String

    },
    role: {
        type:String,
    },
    institute:{
       type: Mongoose.Schema.Types.ObjectId,
       ref:'Institute'

    },
    profilepicture:{
        data: Buffer,
        contentType: String
    },
    email:
         Mongoose.SchemaTypes.Email,
    academiclevel :{
        type:String
    },
    phone:{
        type:String
    },
    year :{
        type:Date
    },
    date:{
        type: Date }
}, {
    timestamps: true
})

const Client = Mongoose.model('Client', clientSchema)
module.exports = Client
