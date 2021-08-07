const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const Approver = require("../models/Approver");
const Institute = require("../models/Institute");
const SuperAdmin = require("../models/Super_admin")
const Client = require("../models/Client")
// /**
  // @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 
 const userRegister = async (userDets, res) => {
   try {
     // Validate the username
     let usernameNotTaken = await validateUsername(userDets.username);
     if (!usernameNotTaken) {
       return res.status(400).json({
         message: `Username is already taken.`,
         success: false
       });
     }
   // Get the hashed password
     const password = await bcrypt.hash(userDets.password, 12);
  
    
     const firstname =req.body.firstname;
     const lastname =req.body.lastname;
     const gender =req.body.gender;
     const institute =req.body.institute;
     const profilepicture =req.body.profilepicture;
     const email =req.body.email;
     const academiclevel =req.body.academiclevel;
     const year =req.body.year;
     const date =req.body.date;
     // create a new user

     const newClient = new Client({
      username,password,firstname,lastname,gender,institute,
      profilepicture,email,academiclevel,date,year,role
     });
    await newUser.save();
     return res.status(201).json({
       message: "Hurry! now you are successfully registred. Please login.",
       success: true
     });
   } catch (err) {
     // Implement logger function (winston)
     return res.status(500).json({
       message: "Unable to create your account.",
       success: false
     });
   }
};

/**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  var userRole = "User";
  // First Check if the username is in the database
  var user = await User.findOne({ username });
  var notUser = false
  if (!user) {
    user = await Approver.findOne({username})
    if(user){
      userRole = "Approver"
    };
    if(!user){
      user = await Institute.findOne({username})
      if(user){
        userRole = "Institute"
      };

      if(!user){
        user = await SuperAdmin.findOne({username})
        console.log(user)
        if(user){
          userRole = "SuperAdmin"
        };
      }
      if(!user){
        user = await Client.findOne({username})
        if(user){
          userRole = "Client"
        };
        console.log(user.role)
      }
      if(!user){
        return res.status(404).json({
          message: "Username is not found. Invalid login credentials.",
          success: false
        });
      }
    }
    
  }
  // We will check the role
  if (user.role !== userRole) {
    console.log(role)
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false
    });
  }
  // That means user is existing and trying to signin from the right portal
  // Now check for the password
  console.log(password,user.password)
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        
      },
      'SECRET',
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      token: `${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
   
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

const validateUsername = async username => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

/**
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = user => {
  return {
    username: user.username,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};

module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister, 
  serializeUser
};

 
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.username = req.body.username || user.email;
//     user.pic = req.body.pic || user.pic;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       username: updatedUser.name,
//       pic: updatedUser.pic,
//       bio: updatedUser.bio,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("User Not Found");
//   }
// });


module.exports = {userRegister};