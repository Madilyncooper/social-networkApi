const { Thought, User } = require('../models');

const thoughtRoutes = {
    async getThoughts(req, res) {
        try {
            const thoughtDb = await Thought.find();

            res.json(thoughtDb);
        } catch (Error) {
            console.log(Error);
            res.status(500);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thoughtDb = await Thought.findOne({ _id: req.params.thoughtId });
            res.json(thoughtDb);
        } catch (Error) {
            console.log(Error);
            res.status(500);
        }
    },
    async createThought(req, res) {
        try {
            const thoughtDb = await Thought.create(req.body);

            const dbUserData = await User.findOneAndUpdate(
                {
                    _id: req.body._id
                },
                {
                    $push:
                        { thoughts: thoughtDb }
                },
                {
                    new: true
                });
            res.json({ message: 'A thought was created' });
            console.log(thoughtDb.thoughts)
        } catch (Error) {
            console.log(Error);
            res.status(500);
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtDb = await Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            },
                {
                    $set: req.body,
                },
                {
                    runValidators: true,
                    new: true
                });
            res.json(thoughtDb);
        } catch (Error) {
            console.log(Error);
            res.status(500);
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtDb = await Thought.findOneAndRemove(
                {
                    _id: req.params.thoughtId
                });

            const dbUserData = User.findOneAndUpdate(
                {
                    thoughts: req.params.thoughtId
                },
                {
                    $pull:
                    {
                        thoughts: req.params.thoughtId
                    }
                },
                {
                    new: true
                }
            );
            res.json({ message: 'The thought was deleted' });
        } catch (Error) {
            console.log(Error);
            res.status(500);
        }
    },
    async addReaction(req, res) {
        try {
            const thoughtDb = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            console.log(thoughtDb);
            res.json(thoughtDb);
        } catch (Error) {
            console.log(Error);
            res.status(500);
        }
    },
    async removeReaction(req, res) {
        try {
            const thoughtDb = await Thought.findOneAndUpdate(
                {
                    _id: req.params.thoughtId
                },
                {
                    $pull:
                    {
                        reactions:
                            { reactionId: req.params.reactionId }
                    }
                },
                {
                    runValidators: true, new: true
                }
            );
            return (thoughtDb ? res.json(thoughtDb) : res.status(404).json({ message: 'No thought with this id!' }));
        } catch (Error) {
            console.log(Error);
            res.status(500);
        }
    },
}



module.exports = thoughtRoutes;