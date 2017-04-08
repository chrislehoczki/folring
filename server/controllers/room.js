import User from '../models/user';
import Room from '../models/room';

export function addRoom(req, res) {
  const roomName = req.body.roomName;
  const _id = req.user._id;

  const newRoom = new Room({name: roomName, creator: _id})

  newRoom.save((err, room) => {

    if (err) { 
      res.status(500).send({error: 'Error making room'}); 
      return; 
    }

    res.send({room: room});

   
  });


}

export function getRoom(req, res) {

    Room
      .findOne({ _id: req.params.roomId })
      // .populate('owner', { name: 1, _id: 1 })
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
          res.send({error: 'Error getting room'})
          return;
       };
        room.remove();
        res.send('successfully removed room');
      }); 

  // Room.findOneAndRemove({
  //       _id: req.params.roomId
  //   },
  //       function (err, room) {
  //           if (err) {
  //               console.log(err)
  //               res.send({error: 'Error removing room'});
  //               return;
  //           }

  //          res.send('removed it babay')
  //       });


}
