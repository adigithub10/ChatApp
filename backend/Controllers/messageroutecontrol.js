const Conversation = require('../Models/conversationSchema');

const Message = require("../Models/messageModel");

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: "Please enter a message" });
        }

        const senderId = req.user?._id; // Check if req.user is defined
        const reciverId = req.params.id;

        if (!senderId || !reciverId) {
            return res.status(400).json({ message: "Sender or Receiver ID is missing" });
        }

        // Log the sender and receiver IDs
        console.log(`Sender ID: ${senderId}, Receiver ID: ${reciverId}`);

        let chat = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        });

        if (!chat) {
            chat = await Conversation.create({
                participants: [senderId, reciverId]
            });
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message,
            conversationId: chat._id
        });

        chat.messages.push(newMessage._id);

        // Save the new message and update the chat document
        await Promise.all([newMessage.save(), chat.save()]);

        res.status(201).json({ message: "Message sent", data: newMessage });
    } catch (error) {
        console.error("Error in sendMessage:", error.message); // Log the error message
        res.status(500).json({ message: "Internal Server Error", error: error.message }); // Include error details in response for easier debugging
    }
}
const getMessages = async (req, res) => {
    try {
        const senderId = req.user?._id;
        const reciverId = req.params.id;

        if (!senderId || !reciverId) {
            return res.status(400).json({ message: "Sender or Receiver ID is missing" });
        }

        const chat = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        }).populate("messages");

        if (!chat) {
            return res.status(404).json({ message: "No chat found" });
        }

        res.status(200).json({ data: chat.messages });
    } catch (error) {
        console.error("Error in getMessages:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
module.exports = { sendMessage,getMessages };
