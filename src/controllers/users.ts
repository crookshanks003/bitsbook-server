import { User } from '../models/users';

async function addUser(req, res) {
    const { name, studentID, email, role, clubs } = req.body;
    const newUser = new User({
        name,
        studentID,
        email,
        role,
        clubs,
    });
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const update = req.body;
    try {
        const result = await User.findOneAndUpdate({ studentID: id }, update, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const result = await User.deleteOne({ studentID: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getUsers(req, res) {
    try {
        const result = await User.find();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const result = await User.findOne({ studentID: id });
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { addUser, updateUser, deleteUser, getUsers, getUserById };
