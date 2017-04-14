import User from '../models/user';
import Room from '../models/room';

import newGame from '../../client/js/helpers/new_game';

export function addRoom(req, res) {
  const roomName = req.body.roomName;
  const _id = req.user._id;

  const newRoom = new Room({name: roomName, creator: _id})

  newRoom.save((err, room) => {

    if (err) { 
      res.status(500).send({error: 'Error making room'}); 
      return; 
    }

    res.send({_id: room._id, name: room.name});

   
  });


}

export function getRoom(req, res) {

    Room
      .findOne({ _id: req.params.roomId })
      .populate('players spectators', { "facebook.displayName": 1, username: 1, _id: 1 })
      .exec(function (err, room) {
        if (err) { 
          res.send({error: 'Error getting room'})
          return;
       };
        res.send(room);
      }); 


}

export function deleteRoom(req, res) {

   Room
      .findOne({ _id: req.params.roomId })
      // .populate('owner', { name: 1, _id: 1 })
      .exec(function (err, room) {
        if (err) { 
          res.send({error: 'Error deleting room'})
          return;
       };

       if (!room) {
        res.send({error: 'could not find room to remove'})
       }


        room.remove((err, removed) => {
          if (err) {
            res.send({error: 'error deleting room'})
          }
          res.send({roomId: removed._id});
        });
        
      }); 

}

export function getRooms(req, res) {

  Room.find({})
    .exec((err, rooms) => {
      if (err) { 
          res.send({error: 'Error listing rooms'})
          return;
       };
        res.send(rooms);
    })

}

export function db_joinRoom({userId, role, roomId}) {

  return new Promise((resolve, reject) => {

      let modifier;
      if (role === 'player') {
        modifier = { $addToSet: { players: userId } }
      } else {
        modifier = { $addToSet: {specators: userId } }
      }

      Room
      .findOneAndUpdate({ _id: roomId }, modifier, {new: true})
      .populate('players spectators', { "facebook.displayName": 1, username: 1, _id: 1 })
      .exec(function (err, room) {
        if (err) { 
          console.log(err)
          reject({error: 'Error getting room'})
       };

        User.findOneAndUpdate({ _id: userId }, { $addToSet: { playingRooms: roomId } }, {new: true})
        .populate('playingRooms')
        .exec(function(err, user) {

           if (err) { 
              console.log(err)
              reject({error: 'error updating user playing rooms'})
           };

          resolve({room, user});
        })
      }); 


  })

}

export function db_leaveRoom({userId, role, roomId}) {

  return new Promise((resolve, reject) => {

      let modifier;
      if (role === 'player') {
        modifier = { $pull: { players: userId }, $set: { game: newGame } }
      } else {
        modifier = { $pull: {specators: userId } }
      }

      Room
      .findOneAndUpdate({ _id: roomId }, modifier, {new: true})
      .populate('players spectators', { "facebook.displayName": 1, username: 1, _id: 1 })
      .exec(function (err, room) {
        if (err) { 
          console.log(err)
          reject({error: 'Error getting room'})
       };

        User.findOneAndUpdate({ _id: userId }, { $pull: { playingRooms: roomId } }, {new: true})
        .populate('playingRooms')
        .exec(function(err, user) {

           if (err) { 
              console.log(err)
              reject({error: 'error updating user playing rooms'})
           };

          resolve({room, user});
        })
      }); 

  })

}

export function db_updateRoomGame({userId, roomId, game}) {
   console.log('roomId', roomId, 'game', game)
  return new Promise((resolve, reject) => {

      let modifier = { game: game.game }

      Room
      .findOneAndUpdate({ _id: roomId }, modifier, {new: true})
      .populate('players spectators', { "facebook.displayName": 1, username: 1, _id: 1 })
      .exec(function (err, room) {
        if (err) { 
          console.log(err)
          reject({error: 'Error getting room'})
       };
        console.log(room)
        resolve(room);
      }); 

  })

}
