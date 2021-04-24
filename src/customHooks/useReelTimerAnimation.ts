import { useAnimation } from "framer-motion";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { LoginPopupContext } from "../context/LoginPopupContext";

const useReelTimerAnimation = function ({
  time,
  incrementView,
  onComplete,
}: {
  time?: number;
  incrementView: () => void;
  onComplete: () => void;
}) {
  const { loginPopupFlag } = useContext(LoginPopupContext);

  const timerControl = useAnimation();
  const StartTime = useRef(Date.now());
  const isStopped = useRef(true);
  const isTriggeredByMouseClick = useRef(false);
  // const isTriggeredByTap = useRef(false);
  const RemainingTime = useRef((time || 10) * 1000);
  const canBeStoppedAndResumed = useRef(false);

  const [isStoppedRender, setIsStoppedRender] = useState(true);

  const startTimer = useCallback(() => {
    if (isStopped.current && canBeStoppedAndResumed.current) {
      isStopped.current = false;
      setIsStoppedRender(false);
      StartTime.current = Date.now();
      timerControl
        .start({
          width: "100%",
          transition: {
            duration: RemainingTime.current / 1000,
            ease: "linear",
          },
        })
        .then(() => {
          canBeStoppedAndResumed.current = false;
          incrementView();
          onComplete();
        });
    }
  }, [timerControl, setIsStoppedRender, onComplete, incrementView]);

  const stopTimer = useCallback(() => {
    if (!isStopped.current && canBeStoppedAndResumed.current) {
      isStopped.current = true;
      setIsStoppedRender(true);
      const StopTime = Date.now();
      RemainingTime.current -= StopTime - StartTime.current;
      timerControl.stop();
    }
  }, [timerControl]);
  useEffect(() => {
    canBeStoppedAndResumed.current = true;
    startTimer();
  }, [startTimer, setIsStoppedRender]);

  useEffect(() => {
    if (loginPopupFlag) {
      stopTimer();
    } else {
      startTimer();
    }
  }, [loginPopupFlag, startTimer, stopTimer]);

  return {
    timerControl,
    isTriggeredByMouseClick,
    stopTimer,
    startTimer,
    isStoppedRender,
  };
};

export { useReelTimerAnimation };
