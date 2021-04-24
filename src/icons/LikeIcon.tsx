import React, { FC } from "react";
const LikeIcon: FC<{ filled: boolean }> = ({ filled }) => {
  return (
    <svg
      className="h-7"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={filled ? "#ff2825" : "#2c3e50"}
      fill={filled ? "#ff2825" : "none"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {filled ? (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </>
      ) : (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </>
      )}
    </svg>
  );
};

export default LikeIcon;
