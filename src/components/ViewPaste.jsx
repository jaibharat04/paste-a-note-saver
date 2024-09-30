import React from "react";
import { FaClipboard } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast"; // Assuming you have toast notifications

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {/* Title Input */}
      <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-[70%] p-4">
        <input
          className="flex-grow p-2 rounded-md border-2 "
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
      </div>

      {/* Textarea with Copy Button */}
      <div className="w-full md:w-[70%] relative">
        <textarea
          className="w-full h-64 p-5 pr-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your content here"
          rows={10}
          value={paste.content}
          disabled
        />
        
        {/* Copy Button Positioned Top-Right */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
            toast.success("Copied to clipboard");
          }}
          className="absolute top-2 right-2  text-gray-700 hover:text-yellow-600"
        >
          <FaClipboard size={24} />
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
