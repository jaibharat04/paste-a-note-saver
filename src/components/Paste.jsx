import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaClipboard,
  FaShareAlt,
} from "react-icons/fa"; // Importing Font Awesome icons

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully!");
  };

  const handleShare = async (paste) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
        });
        toast.success("Paste shared successfully!");
      } catch (error) {
        toast.error("Failed to share the paste.");
      }
    } else {
      toast.error("Sharing is not supported in this browser.");
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <div className="flex flex-col  items-center mx-auto mt-5 max-w-3xl">
      <h1 className="text-center font-bold text-3xl mb-5 text-gray-800">
        All Pastes
      </h1>

      {/* Search Input */}
      <input
        className="p-2 pl-3 rounded-md border border-slate-900 w-11/12 mb-5 shadow-md focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste List */}
      <ul className="space-y-4 w-full">
        {filteredData.map((paste) => (
          <li
            className="border border-gray-300 rounded-lg p-4 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-200 max-w-2xl mx-auto"
            key={paste._id}
          >
            <div>
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-blue-600">
                  {paste.title}
                </h3>
                <p className="text-gray-700 line-clamp-2 overflow-hidden">
                  {paste.content}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-4 space-x-4">
                {/* Edit Button */}
                <Link
                  to={`/?pasteId=${paste._id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FaEdit size={20} />
                </Link>

                {/* View Button */}
                <Link
                  to={`/pastes/${paste._id}`}
                  className="text-green-500 hover:text-green-600"
                >
                  <FaEye size={20} />
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(paste._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash size={20} />
                </button>

                {/* Copy Button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FaClipboard size={20} />
                </button>

                {/* Share Button */}
                {navigator.share && (
                  <button
                    onClick={() => handleShare(paste)}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    <FaShareAlt size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Paste Creation Date */}
            <div className="mt-3 text-sm text-gray-500">
              <span>Created on: {formatDate(paste.createAt)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paste;
