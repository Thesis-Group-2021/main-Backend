const Mongoose = require("mongoose")

const Schema = Mongoose.Schema

const superAdminSchema = new Schema ({
    id:{
        type: Number
    },
    name:{
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

const superadmin = Mongoose.model('superadmin', superAdminSchema)
module.exports = superadmin
