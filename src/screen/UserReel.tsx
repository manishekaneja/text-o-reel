import { AnimatePresence } from "framer-motion";
import React, { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "..";
import LoadingMessage from "../components/LoadingMessage";
import ReelMotion from "../components/ReelMotion";
import { CollectionConstants } from "../constants/Collection";
import { ENDING_MESSAGE_ID } from "./PublicReel";

const UserReel: FC<{}> = () => {
  const { userid } = useParams<{ userid: string }>();
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
    if (userid) {
      setLoading(true);
      projectFirestore
        .collection(
          CollectionConstants.absoluteUser +
            "/" +
            userid +
            "/" +
            CollectionConstants.relativeTextOReel
        )
        .get()
        .then((querySnapshot) => {
          const userReel: ReelObject[] = [];
          querySnapshot.forEach((doc) => {
            userReel.push(doc.data() as ReelObject);
          });
          userReel.push(endingMessage);
          setReelList(userReel);
        })
        .catch((...e) => {
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userid, endingMessage]);

  return (
    <>
      <AnimatePresence>{loading && <LoadingMessage />}</AnimatePresence>

      <ReelMotion reelList={reelList} />
    </>
  );
};

export default UserReel;
