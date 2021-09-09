const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const User = db.User;
const { google } = require("googleapis");
var nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const { EmailTemplate } = require('../EmailTemplate');

module.exports = {
  authenticate,
  create,
  update,
  getById,
  googleauth,
  forgetpassword,
  updatePassword
};
async function getById(id) {
  const user = await User.findById(id);
  return user;
}
async function forgetpassword(userParams) {
  const response = await User.findOne({ email: userParams.destinationAddress }).exec().then(async (userFound)=>{
    if (userFound) {
      try {
        const OAuth2Client = new google.auth.OAuth2(config.client_id, config.client_secret, config.redirect_url);
        OAuth2Client.setCredentials({ refresh_token: config.refresh_token });

        const token = await OAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
          service: config.service,
          auth: {
            type: "OAuth2",
            user: config.user,
            clientId: config.client_id,
            clientSecret: config.client_secret,
            refreshToken: config.refresh_token,
            accessToken: token
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const userOTP = generateOTP();
        var mailOptions = {
          from: config.user,
          to: userParams.destinationAddress,
          text: `Daily Reflect Activity\nHere is your otp code ${userOTP}\nDo Not Share This Otp With Anyone!`,
          html: EmailTemplate(userOTP)
        };

        const { accepted } = await transporter.sendMail(mailOptions);
        if (accepted.length > 0) {
          return userOTP;
        }
        else return "NOT ACCEPTED BY ANY CLIENT";
      }
      catch (err) {
        console.log("err = ", err);
        return "UNABLE TO COMPLETE EMAIL OTP";
      }
    }
    else return "User not found";
  }).catch(err=>{
    return "Database Error";
  });

  return response;
}
async function authenticate({ userName, password }) {
  let user = await User.findOne({ userName });
  if (!user) {
    user = await User.findOne({ email: userName });
  }
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: config.tokenExpiresIn,
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}
async function googleauth(userParam) {
  const user = await User.findOne({ userName: userParam.userName });
  if (user) {
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: config.tokenExpiresIn,
    });
    return {
      ...user.toJSON(),
      token,
    };
  } else {
    const userpassword = uuidv4();
    const user = new User(userParam);
    user.hash = bcrypt.hashSync(userpassword, 10);
    const newuser = await user.save();
    const token = jwt.sign({ sub: newuser.id }, config.secret, {
      expiresIn: config.tokenExpiresIn,
    });
    return {
      ...newuser.toJSON(),
      token,
    };
  }
}
async function create(userParam) {
  // validate
  if (await User.findOne({ userName: userParam.userName })) {
    throw 'userName "' + userParam.userName + '" is already taken';
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}
async function updatePassword(email, password) {
  const user = await User.findOne({ email: email });
  
  if (!user) throw "User not found";
  const hash = bcrypt.hashSync(password, 10);
  
  user.hash = hash;

  const response = await user.save();
  return true;
}
async function update(id, userParam) {
  const user = await User.findById(id);
  // validate
  if (!user) throw "User not found";
  if (
    user.userName !== userParam.userName &&
    (await User.findOne({ userName: userParam.userName }))
  ) {
    throw 'userName "' + userParam.userName + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}
function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
