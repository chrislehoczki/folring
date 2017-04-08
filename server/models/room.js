const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import User from './user';

// Define our model
const roomSchema = new Schema({
  name: String,
  creator: { type: Schema.Types.ObjectId, ref: 'user' },
  messages: Array,
  game: Array,
  players: {
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }], 
    validate: [playerLimit, '{PATH} exceeds the limit of 2']
  },
  spectators: [{ type: Schema.Types.ObjectId, ref: 'user' }]
},
{
  timestamps: true
});

function playerLimit(val) {
  return val.length <= 2;
}

roomSchema.pre('save', function(next) {
   User
      .findOneAndUpdate(
        {
          _id: this.creator
        }, 
        {
          $push: { ownedRooms: this._id }
        }, 
        {
          new: true
        },
        (err, user) => {
          if (err) {
              next(new Error('Error adding room to user'));
              return;
          }
        next();
          
    });
})

roomSchema.pre('remove', function(next) {


      User
        .findOneAndUpdate({ _id: this.creator }, 
        {
          $pull: { ownedRooms: this._id }
        }, {
          new: true
        })
        .exec(function (err, user) {
          if (err) { 
            next(new Error('Error removing room from user'));
            return;
         };
           console.log('USER WITH REMOVED', user);
          next();
        });   

    
});

// Create the model class
const ModelClass = mongoose.model('room', roomSchema);

// Export the model
export default ModelClass;