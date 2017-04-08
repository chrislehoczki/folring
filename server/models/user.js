const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, sparse: true, unique: true, lowercase: true },
  password: String,
  ownedRooms: [{ type: Schema.Types.ObjectId, ref: 'room' }],
  playingRooms: [{ type: Schema.Types.ObjectId, ref: 'room' }],
  spectatingRooms: [{ type: Schema.Types.ObjectId, ref: 'room' }],
  facebook: Object
},
{
  timestamps: true
});


// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;
  if (user.password) {
    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { return next(err); }

      // hash (encrypt) our password using the salt
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) { return next(err); }

        // overwrite plain text password with encrypted password
        user.password = hash;
        next();
      });
    });  
  } else {
    next();
  }
  
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
export default ModelClass;
