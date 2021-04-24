import React, { FC } from "react";
const PlayPauseIcon: FC<{ active: boolean }> = ({ active }) => {
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
      {active ? (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 4v16l13 -8z" />
        </>
      ) : (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </>
      )}
    </svg>
  );
};

export default PlayPauseIcon;
