import { AnimatePresence } from "framer-motion";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Reel from "../components/Reel";
import { ExitButton } from "./ExitButton";

const ReelMotion: FC<{ reelList: ReelObject[] }> = ({ reelList }) => {
  const { goBack } = useHistory();
  const [selectedReels, setSelectedReels] = useState<number>(-1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const onComplete = useCallback(() => {
    setSelectedReels((ps) => {
      if (ps > reelList.length - 2) {
        goBack();
        return ps;
      } else {
        return ps + 1;
      }
    });
    setDirection(1);
  }, [reelList.length, goBack, setDirection]);
  useEffect(() => {
    if (reelList.length > 0) {
      setSelectedReels((ps) => (ps === -1 ? 0 : ps));
    }
  }, [reelList]);
  if (selectedReels < 0) {
    return null;
  }
  return (
    <>
      <ExitButton />
      <AnimatePresence custom={direction}>
        <Reel
          time={10}
          key={reelList[selectedReels].id}
          data={reelList[selectedReels]}
          hasNext={selectedReels < reelList.length - 1}
          hasPrevious={selectedReels > 0}
          extra={{
            direction: direction,
          }}
          moveBack={() => {
            setSelectedReels((ps) => Math.max(0, ps - 1));
            setDirection(-1);
          }}
          moveNext={() => {
            setSelectedReels((ps) => Math.min(ps + 1, reelList.length - 1));
            setDirection(1);
          }}
          onComplete={() => {
            setDirection(1);
            onComplete();
          }}
        />
      </AnimatePresence>
    </>
  );
};

export default ReelMotion;
