import { LockIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import Loading from "../Loading";
import api from "../../api/assests";

const ChangePasswordModule = ({ open, onClose }) => {
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);

    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    try {
      const { data } = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });

      if (!data.success) {
        throw new Error(data.error || "Failed to change password");
      }

      e.target.reset();

      setMessage({
        type: "success",
        text: "Password changed successfully",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.error ||
          error.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-slate-900 flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-slate-400" />
            Change Password
          </h2>

          <button
            type="button"
            className="btn-secondary text-sm"
            onClick={onClose}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-xl text-sm flex items-start gap-3 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                message.type === "success"
                  ? "bg-emerald-500"
                  : "bg-rose-500"
              }`}
            />
            <span>{message.text}</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex justify-center items-center gap-2"
            >
              {loading && <Loading className="w-4 h-4" />}
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModule;
