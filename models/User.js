const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  name: String,
  avatar: String,
});

UserSchema.plugin(passportLocalMongoose); 
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
