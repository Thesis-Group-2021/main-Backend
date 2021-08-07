const Mongoose = require("mongoose")

const Schema = Mongoose.Schema

const userSchema = new Schema ({
   
    username:{
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true

    },

    role: {
        type: String,
        default: "user",
        enum: ["User", "Admin", "Superadmin","Approver"]
    },


}, {
    timestamps: true
})

const User = Mongoose.model('User', userSchema)
module.exports = User
