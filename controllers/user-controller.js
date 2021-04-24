const { User, Thought } = require('../models');

const userController = {

    // GET all users api/users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET specific user api/users/:id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate([
                { path: 'friends', select: "-__v"},
                { path: 'thoughts', select: "-__v"}
            ])
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user with that id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })        
    },

    // POST new user api/users
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //PUT update user api/users/:id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err))
    },

    //DELETE user api/users/:id


}

module.exports = userController