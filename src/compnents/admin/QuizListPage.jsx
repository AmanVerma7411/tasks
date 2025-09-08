import React, { useRef, useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";

export default function QuizListPage() {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const questions = [
    { id: "INV002", q: "Fastest land animal?", opts: "A. Cheetah, B. Lion, C. Tiger", ans: "A" },
    { id: "INV003", q: "Chemical symbol for Gold?", opts: "A. Au, B. Ag, C. Go", ans: "A" },
  ];

  const toggleMenu = (id) => setOpenMenu(openMenu === id ? null : id);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="text-white overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">Quiz Questions</h2>
      <div className="bg-[#111] rounded-xl p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3">Quiz ID</th>
              <th className="p-3">Questions</th>
              <th className="p-3">Options</th>
              <th className="p-3">Correct</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((row) => (
              <tr key={row.id} className="border-b border-gray-700">
                <td className="p-3">{row.id}</td>
                <td className="p-3">{row.q}</td>
                <td className="p-3">{row.opts}</td>
                <td className="p-3">{row.ans}</td>
                <td className="p-3 relative" ref={menuRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(row.id);
                    }}
                    className="p-2 rounded hover:bg-gray-700"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {openMenu === row.id && (
                    <div className="absolute right-0 mt-2 w-28 bg-[#1f1f1f] border border-gray-700 rounded-lg shadow-lg z-10">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                        Edit
                      </button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-700">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
