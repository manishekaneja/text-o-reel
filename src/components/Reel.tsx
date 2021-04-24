import { motion } from "framer-motion";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useReelTimerAnimation } from "../customHooks/useReelTimerAnimation";
import { useUserActionUpdater } from "../customHooks/useUserActionUpdater";
import EyeIcon from "../icons/EyeIcon";
import LikeIcon from "../icons/LikeIcon";
import NextIcon from "../icons/NextIcon";
import PlayPauseIcon from "../icons/PlayPauseIcon";
import PrevIcon from "../icons/PrevIcon";
import { Timer } from "./Timer";

const height = window.innerHeight;

const variant = {
  initial: (direction: -1 | 1) => ({
    y: direction * height,
    zIndex: 0,
  }),
  animate: {
    y: 0,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    y: -1 * direction * height,
    zIndex: 0,
  }),
};

const Reel: FC<{
  data: ReelObject;
  time: number;
  moveBack: () => void;
  moveNext: () => void;
  onComplete: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  extra: {
    direction: -1 | 1;
  };
}> = ({
  data,
  onComplete,
  time,
  extra,
  moveBack,
  moveNext,
  hasNext,
  hasPrevious,
}) => {
  const {
    isLiked,
    incrementLike,
    decrementLike,
    incrementView,
  } = useUserActionUpdater(data);

  const {
    isTriggeredByMouseClick,
    timerControl,
    stopTimer,
    startTimer,
    isStoppedRender,
  } = useReelTimerAnimation({
    time,
    incrementView,
    onComplete,
  });

  return (
    <motion.div
      layout
      key={data.id}
      custom={extra.direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variant}
      transition={{ duration: 1 }}
      className={`w-full top-0 left-0 h-full p-10 absolute z-0 flex flex-col justify-center items-stretch ${data.backgroundColor}`}
    >
      <Timer control={timerControl} />
      <div
        className={`flex-1 flex items-center justify-center font-extrabold text-center ${data.textColor}`}
        onMouseDown={(event) => {
          event.stopPropagation();
          if (!isTriggeredByMouseClick.current) {
            isTriggeredByMouseClick.current = true;
            stopTimer();
          }
        }}
        onMouseUp={(event) => {
          event.stopPropagation();
          if (isTriggeredByMouseClick.current) {
            isTriggeredByMouseClick.current = false;
            startTimer();
          }
        }}
      >
        <span className="text-3xl md:text-5xl">{data.message}</span>
      </div>
      <div className="justify-center items-center h-10">
        {hasNext && (
          <p className={`text-center font-bold ${data.textColor} `}>
            By {" "}
            <Link
              className="underline"
              to={`/text-o-reel/${data.createdBy.email}`}
            >
              {data.createdBy.name}
            </Link>
          </p>
        )}
      </div>

      <div className="justify-center items-center h-10 grid grid-cols-5 gap-4">
        <div className="flex items-center justify-center">
          <button
            className={`h-5 mb-2 focus:outline-none ${
              hasPrevious ? "" : " opacity-30 "
            } `}
            onClick={(event) => {
              event.stopPropagation();
              if (hasPrevious) {
                stopTimer();
                moveBack();
              }
            }}
          >
            <PrevIcon />
          </button>
        </div>
        <div className="flex items-center justify-center ">
          {hasNext && (
            <>
              <span className="h-5 mb-2">
                <EyeIcon />
              </span>
              <span className="m-1 h-5 flex items-center justify-center items-stretchs ">
                {data.views}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="h-5 mb-2 focus:outline-none"
            onClick={(event) => {
              event.stopPropagation();
              if (isStoppedRender) {
                startTimer();
              } else {
                stopTimer();
              }
            }}
          >
            <PlayPauseIcon active={isStoppedRender} />
          </button>
        </div>
        <div className="flex items-center justify-center">
          {hasNext && (
            <>
              <button
                className="h-5 mb-2 focus:outline-none"
                onClick={(event) => {
                  event.stopPropagation();
                  if (isLiked) {
                    decrementLike();
                  } else {
                    incrementLike();
                  }
                }}
              >
                <LikeIcon filled={isLiked} />
              </button>
              <span className="m-1 h-5 flex items-center justify-center items-stretchs ">
                {data.likes + (isLiked ? 1 : 0)}
              </span>
            </>
          )}
        </div>
        <div className="flex items-center justify-center">
          {hasNext && (
            <button
              className={`h-5 mb-2 focus:outline-none text-gray-900`}
              onClick={(event) => {
                event.stopPropagation();
                if (hasNext) {
                  stopTimer();
                  moveNext();
                }
              }}
            >
              <NextIcon />
            </button>
          )}
        </div>
        <div />
      </div>
    </motion.div>
  );
};

export default Reel;
