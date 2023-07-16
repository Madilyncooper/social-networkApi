const { User } = require('../models');

const userRoutes = {
    async getUsers(req, res) {
        try {
            const userDb = await User.find().select('-__v');
            res.json(userDb)
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    },
    async getSingleUser(req, res) {
        try {
            const userDb = await User.findOne({ _id: req.params.userId })
                .select('-__v').populate('friends').populate('thoughts');
            res.json(userDb)
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    },
    async createUser(req, res) {
        try {
            const userDb = await User.create(req.body);
            res.json(userDb);
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    },
    async updateUser(req, res) {
        try {
            const userDb = await User.findOneAndUpdate(
                { _id: req.params.userId 
                },
                {
                    $set: req.body,
                },
                {
                    runValidators: true,
                    new: true,
                }
            )
            res.json(userDb);
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    },
    async deleteUser(req, res) {
        try {
            const userDb = await User.findOneAndDelete({
                _id: req.params.userId
            })
            res.json({ message: 'User deleted' });
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    },
    async addFriend(req, res) {
        try {
            const userDb = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    $addToSet:
                        { friends: req.params.friendId }
                },
                {
                    new: true
                });
            res.json(userDb);
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    },
    async removeFriend(req, res) {
        try {
            const userDb = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    $pull:
                        { friends: req.params.friendId }
                },
                {
                    new: true
                });
                res.json(userDb);
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }
}




module.exports = userRoutes;