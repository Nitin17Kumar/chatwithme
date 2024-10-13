const Message = require('../models/Message');

// Send a message
const sendMessage = async (req, res) => {
  const { receiver, content } = req.body;

  try {
    const message = await Message.create({ sender: req.user.id, receiver, content });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages between two users
const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ]
    }).populate('sender', 'name email').populate('receiver', 'name email');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
