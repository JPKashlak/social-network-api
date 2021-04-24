const { User, Thought } = require('../models');

const thoughtController = {

    // GET all thoughts api/thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
        })
    },

    //GET a single thought api/thoughts/:id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({message: 'No thought with that id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
        })
    },

    // POST a new thought api/thoughts
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id}) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that username'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // PUT update a thought api/thoughts/:id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE a thought api/thoughts/:id
    deleteThought({ params, body}, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with that ID'})
                }
                res.json(deletedThought);
            })
            .catch(err => res.json(err));
    },

    // POST a reaction to a thought api/thoughts/:id/reactions
    addReaction ({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with that ID' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    // DELETE a reaction to a thought api/thoughts/:id/reactions
}

module.exports = thoughtController