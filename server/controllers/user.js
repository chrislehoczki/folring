
import User from '../models/user';

// gets single user from db
export function getUser(req, res) {

    User
        .findOne({ _id: req.user._id }, { password: 0})
        .populate('decks', { data: 0 })
        .exec(function (err, userDoc) {
          if (err) { 
            res.send({error: true})
            return;
         };
          res.send(userDoc);
        });     
}
