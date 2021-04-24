import { AnimatePresence, motion } from "framer-motion";
import { FC, useContext } from "react";
import { LoginPopupContext } from "../context/LoginPopupContext";
import Google from "./Google";

const LoginPopup: FC<{}> = () => {
  const { setLoginPopupFlag, loginPopupFlag } = useContext(LoginPopupContext);
  return (
    <AnimatePresence>
      {loginPopupFlag && (
        <motion.div
          layout
          layoutId="parent"
          initial={{
            opacity: 0,
            translateY: "-100%",
          }}
          animate={{
            opacity: 1,
            translateY: "0%",
            backgroundColor: "#333333c3",
          }}
          transition={{
            duration: 0.3,
            type: "spring",
          }}
          exit={{
            opacity: 0,
            translateY: "50%",
          }}
          className="fixed w-screen h-screen z-50 flex justify-center items-center top-0 left-0 overflow-auto py-4 px-2"
        >
          <motion.div
            layout
            layoutId="child"
            className="m-2 py-4 px-6 bg-purple-300 flex flex-col items-center"
          >
            <p className="text-lg font-bold">
              Oops!!! Not able to identify you.
            </p>
            <p className="text-sm mb-6">
              You can can contiue without interuption just by logging in.
            </p>
            <div>
              <button
                className="bg-white border-white border-2 shadow-md text-sm  mx-2 text-gray-800 px-2 w-48 py-1 focus:outline-none"
                onClick={() => {}}
              >
                <Google /> Login
              </button>
              <button
                className="bg-red-200 border-2 text-sm shadow-md border-red-200 mx-2 text-gray-800 px-2 w-48 py-1 focus:outline-none"
                onClick={() => {
                  setLoginPopupFlag(false);
                }}
              >
                Close{" "}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;
