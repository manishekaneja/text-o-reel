import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React, { FC, useContext, useRef, useState } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { incrementCount, projectFirestore, serverTimeStamp } from "..";
import { ExitButton } from "../components/ExitButton";
import { RouteConstants } from "../constants/Routes";
import { LoginPopupContext } from "../context/LoginPopupContext";
import { UserContext } from "../context/UserContext";

const CreateReel: FC<{}> = () => {
  const history = useHistory();
  const availableColor = useRef<Array<{ bg: string; text: string }>>([
    { bg: "bg-indigo-300", text: "text-white" },
    { bg: "bg-pink-300", text: "text-white" },
    { bg: "bg-purple-500", text: "text-white" },
    { bg: "bg-yellow-300", text: "text-gray-800" },
    { bg: "bg-green-300", text: "text-gray-800" },
    { bg: "bg-red-300", text: "text-white" },
    { bg: "bg-blue-300", text: "text-white" },
  ]).current;
  const [selectedColorCombo, setSelectedColorCombo] = useState(
    Math.floor(Math.random() * availableColor.length)
  );
  const [message, setMessage] = useState("");
  const { isLoggedIn, user } = useContext(UserContext);
  const { setLoginPopupFlag } = useContext(LoginPopupContext);

  if (!isLoggedIn) {
    return <Redirect to="/error" />;
  }
  return (
    <>
      <ExitButton />
      <form
        className="h-full w-full relative"
        onSubmit={(event) => {
          event.preventDefault();
          if (isLoggedIn && user) {
            const TextOReel: ReelObject = {
              id: nanoid(),
              message: message,
              backgroundColor: availableColor[selectedColorCombo].bg,
              textColor: availableColor[selectedColorCombo].text,
              views: 0,
              likes: 0,
              likedBy: [],
              createdAt: serverTimeStamp(),
              createdBy: {
                name: user.name,
                email: user.email,
              },
            };
            const batch = projectFirestore.batch();
            const reelCollection = projectFirestore.collection(
              "text-o-reel/main-stream-data/textoreels"
            );
            const userDoc = projectFirestore
              .collection("text-o-reel/main-stream-data/users")
              .doc(user.email);
            const userReelCollection = userDoc.collection("textoreels");
            batch.set(reelCollection.doc(TextOReel.id), TextOReel);
            batch.update(userDoc, {
              textoreelCount: incrementCount,
            });
            batch.set(userReelCollection.doc(TextOReel.id), TextOReel);
            batch
              .commit()
              .then(() => {
                history.replace(RouteConstants.dashboard);
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            setLoginPopupFlag(true);
          }
        }}
      >
        <div
          onClick={({ target, currentTarget }) => {
            if (target !== currentTarget) {
              return;
            }
            setSelectedColorCombo((pi) => {
              if (pi + 1 === 3) {
              }
              return (pi + 1) % availableColor.length;
            });
          }}
          className={`${availableColor[selectedColorCombo].bg} h-full w-full flex items-center flex-col justify-center text-white`}
        >
          <input
            maxLength={50}
            placeholder="Max length 50..."
            className={`bg-transparent w-full  placeholder-current cursor-pointer justify-center text-center focus:outline-none font-extrabold text-4xl md:text-5xl ${availableColor[selectedColorCombo].text} `}
            value={message}
            onChange={({ target: { value } }) =>
              value.length <= 50 && setMessage(value)
            }
          />
          <div className="w-full bg-white absolute bottom-0 left-0">
            <motion.button
              layout
              animate={message.length <= 0 ? { opacity: 0.65 } : { opacity: 1 }}
              disabled={message.length <= 0}
              type="submit"
              className="text-2xl md:text-3xl font-black p-2 bg-gray-900 w-full "
            >
              Post
            </motion.button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateReel;
