
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
  
    const quiz = await Quiz.create({ title, questions, createdBy: req.user._id });
    res.status(201).json({ success: true, quiz });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json({ success: true, quizzes });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};
