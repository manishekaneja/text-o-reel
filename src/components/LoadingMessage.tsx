import { motion } from "framer-motion";
import { FC } from "react";
const LoadingMessage: FC<{}> = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        translateY: "-100%",
        transition: {
          duration: 1,
        },
      }}
      className={`flex-1 h-full flex items-center justify-center font-extrabold text-black`}
    >
      <span className="text-3xl md:text-5xl opacity-80"> Loading...</span>
    </motion.div>
  );
};

export default LoadingMessage;
