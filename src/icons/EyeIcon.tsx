import React from "react";
const EyeIcon = () => {
  return (
    <svg
      className="h-7"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#2c3e50"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 19c-4 0 -7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7c-.42 .736 -.858 1.414 -1.311 2.033" />
      <path d="M15 19l2 2l4 -4" />
    </svg>
  );
};

export default EyeIcon;
