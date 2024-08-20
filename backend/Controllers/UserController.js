const Conversation = require('../Models/conversationSchema');
const User = require('../Models/UserModel');

const getUserBySearch = async (req, res) => {
    try {
        console.log("User object:", req.user);

        const curentUserID = req.user._id;

        console.log("Current User ID:", curentUserID);

        if (!curentUserID) {
            console.log("Error: User ID is undefined");
            return res.status(400).json({ message: "User ID is undefined" });
        }

        const search = req.query.search || '';

        const users = await User.find({
            $and: [
                { _id: { $ne: curentUserID } },
                {
                    $or: [
                        { username: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                    ],
                },
            ],
        }).select('-password');

        console.log("Users found:", users);

        res.status(200).send(users);
    } catch (error) {
        console.error("Internal Server Error in getUserBySearch:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

const currentUsers = async (req, res) => {
    try {
        //console.log("User object:", req.user);

        const curentUserID = req.user._id;

        //console.log("Current User ID:", curentUserID);

        if (!curentUserID) {
            //console.log("Error: User ID is undefined");
            return res.status(400).json({ message: "User ID is undefined" });
        }

        const currentUsers = await Conversation.find({
            participants: { $in: [curentUserID] },
        }).sort({ updatedAt: -1 });

        if (!currentUsers || currentUsers.length === 0) {
          //  console.log("No users found");
            return res.status(404).json({ message: "No users found" });
        }

        const participantsIDS = currentUsers.reduce((ids, conversation) => {
            const otherparticipant = conversation.participants.find(participant => participant.toString() !== curentUserID.toString());
            return otherparticipant ? [...ids, otherparticipant] : ids;
        }, []);

        //console.log("Participant IDs:", participantsIDS);

        const uniqueParticipantIDS = [...new Set(participantsIDS)];

        //console.log("Unique Participant IDs:", uniqueParticipantIDS);

        const users = await User.find({
            _id: { $in: uniqueParticipantIDS }
        }).select('-password');

        //console.log("Users found:", users);

        res.status(200).send(users);
    } catch (error) {
        console.error("Internal Server Error in currentUsers:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}

module.exports = { getUserBySearch, currentUsers };
