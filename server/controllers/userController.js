const User = require("../models/user");

const registerUser = async (req, res) => {
    try {

        console.log(req.body);

        const { firebaseUserId, email, role,name} = req.body;

        const user = await User.create({
            firebaseUID:firebaseUserId,
            email,
            name,
            role,
        });

        console.log("User created:", user);

        return res.status(201).json(user);

    } catch (error) {
        console.log("ERROR:", error.message); // ✅ correct

        return res.status(500).json({
            message: error.message,
        });
    }
};

const getUserByFirebaseUID = async (req, resp) => {
    try {
        const { uid } = req.params;

        const user = await User.findOne({
            firebaseUID: uid,
        });

        if (!user) {
            return resp.status(404).json({
                message: "User not found",
            });
        }

        return resp.json(user);
    } catch (err) {
        resp.status(500).json({ message: err.message });
    }
};

module.exports = {
    registerUser,
    getUserByFirebaseUID,
};