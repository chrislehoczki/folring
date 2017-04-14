
import User from '../models/user';

// gets single user from db
export function getUser(req, res) {

    User
        .findOne({ _id: req.user._id }, { password: 0})
        .populate('ownedRooms playingRooms')
        .exec(function (err, userDoc) {
          if (err) { 
            res.send({error: true})
            return;
         };
          res.send(userDoc);
        });     
}

export function addWin(_id) {
    return new Promise((resolve, reject) => {

         User
        .findOneAndUpdate({ _id }, { $inc : {wins: 1, games: 1}}, { new: true})
        .populate('ownedRooms playingRooms')
        .exec(function (err, userDoc) {
          if (err) { 
            reject(err);
            return;
         };
          resolve(userDoc);
        });   

    })
}

export function addLoss(_id) {
   return new Promise((resolve, reject) => {

         User
        .findOneAndUpdate({ _id }, { $inc : {losses: 1, games: 1}}, {new: true})
        .populate('ownedRooms playingRooms')
        .exec(function (err, userDoc) {
          if (err) { 
            reject(err);
            return;
         };
          resolve(userDoc);
        });   

    })
}