import React from "react";

const Loading = ({ fullScreen = true }: { fullScreen?: boolean }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-[70vh]" : "py-16"
      }`}
      role="status"
    >
      <div className="flex items-end gap-1.5 h-8">
        {[0, 1, 2, 3].map((bar) => (
          <span
            key={bar}
            className="w-1.5 rounded-full bg-orange-500 animate-bounce"
            style={{ height: `${16 + (bar % 2) * 12}px`, animationDelay: `${bar * 0.12}s` }}
          />
        ))}
      </div>
      <p className="text-sm font-medium text-stone-500">Loading…</p>
    </div>
  );
};

export default Loading;
