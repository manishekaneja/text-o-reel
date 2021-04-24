import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useEffect, useRef, useState } from "react";
import { projectFirestore } from "..";
import ReelMotion from "../components/ReelMotion";
import { CollectionConstants } from "../constants/Collection";

const ENDING_MESSAGE_ID = "ending-message";

export { ENDING_MESSAGE_ID };

const PublicReel: FC<{}> = () => {
  const [reelList, setReelList] = useState<Array<ReelObject>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const endingMessage = useRef<ReelObject>({
    backgroundColor: "bg-gray-900",
    textColor: "text-white",
    createdAt: "",
    createdBy: {
      email: "",
      name: "",
    },
    id: ENDING_MESSAGE_ID,
    likedBy: [],
    likes: 0,
    message:
      "Looks like you have seen all Text-o-Reels.\n Lets take you to Home for now",
    views: 0,
  }).current;
  useEffect(() => {
    setLoading(true);
    projectFirestore
      .collection(CollectionConstants.absoluteTextOReel)
      .get()
      .then((querySnapshot) => {
        const publicReel: ReelObject[] = [];
        querySnapshot.forEach((doc) => {
          publicReel.push(doc.data() as ReelObject);
        });
        publicReel.push(endingMessage);
        setReelList(publicReel);
      })
      .catch((...e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endingMessage]);
  return (
    <>
      <AnimatePresence>
        {loading && (
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
        )}
      </AnimatePresence>
      <ReelMotion reelList={reelList} />
    </>
  );
};

export default PublicReel;
