import { AnimationControls, motion } from "framer-motion";
import React, { FC } from "react";

export const Timer: FC<{ control: AnimationControls; }> = ({ control }) => (
  <div
    style={{ backgroundColor: "#ffffff88" }}
    className="w-full h-3 rounded relative overflow-hidden"
  >
    <motion.div
      animate={control}
      className="w-0 bg-white h-full absolute top-0 left-0"
    ></motion.div>
  </div>
);
