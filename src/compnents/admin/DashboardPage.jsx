import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin/quizzes", { headers });
        if (res.data.success) setQuizzes(res.data.quizzes);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin/users", { headers });
        if (res.data.success) setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuizzes();
    fetchUsers();
  }, []);


  const totalQuizzes = quizzes.length;
  const totalQuestions = quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0);
  const totalUsers = users.length;


  const recentQuestions = quizzes
    .flatMap((quiz) =>
      quiz.questions.map((q, idx) => ({
        id: `${quiz._id}-${idx}`,
        quizTitle: quiz.title,
        q: q.q,
        opts: q.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join(", "),
        ans: String.fromCharCode(65 + q.correctIndex),
      }))
    )
    .slice(0, 5);

  return (
    <div className="overflow-x-auto text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

     
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1f1f1f] p-6 rounded-lg">
          <p>Total Quizzes</p>
          <h3 className="text-2xl font-bold">{totalQuizzes}</h3>
        </div>
        <div className="bg-[#1f1f1f] p-6 rounded-lg">
          <p>Total Questions</p>
          <h3 className="text-2xl font-bold">{totalQuestions}</h3>
        </div>
        <div className="bg-[#1f1f1f] p-6 rounded-lg">
          <p>Total Users</p>
          <h3 className="text-2xl font-bold">{totalUsers}</h3>
        </div>
      </div>

     
      <div className="bg-[#111] p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Questions</h3>
          <button
            onClick={() => navigate("/admin")}
            className="px-3 py-1 text-sm rounded-md bg-purple-700 hover:bg-purple-600"
          >
            View All
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3">Quiz</th>
              <th className="p-3">Question</th>
              <th className="p-3">Options</th>
              <th className="p-3">Correct</th>
            </tr>
          </thead>
          <tbody>
            {recentQuestions.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-gray-400 text-center">
                  No recent questions
                </td>
              </tr>
            ) : (
              recentQuestions.map((row) => (
                <tr key={row.id} className="border-b border-gray-700">
                  <td className="p-3">{row.quizTitle}</td>
                  <td className="p-3">{row.q}</td>
                  <td className="p-3">{row.opts}</td>
                  <td className="p-3">{row.ans}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
