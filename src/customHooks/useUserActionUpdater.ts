import { useCallback, useContext, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  decrementCount,
  incrementCount,
  projectFirestore,
} from "..";
import { CollectionConstants } from "../constants/Collection";
import { LoginPopupContext } from "../context/LoginPopupContext";
import { UserContext } from "../context/UserContext";

export const useUserActionUpdater = function (data: ReelObject) {
  const { user, isLoggedIn } = useContext(UserContext);
  const { setLoginPopupFlag } = useContext(LoginPopupContext);
  const [isLiked, setIsLiked] = useState<boolean>(
    !!(
      data &&
      data.likedBy &&
      data.likedBy.find((likedUser) => likedUser.email === (user && user.email))
    )
  );

  const incrementView = useCallback(() => {
    if (data && data.createdBy.email) {
      const batch = projectFirestore.batch();
      const reelRef = projectFirestore
        .collection(CollectionConstants.absoluteTextOReel)
        .doc(data.id);
      const userRef = projectFirestore
        .collection(
          CollectionConstants.absoluteUser +
            "/" +
            data.createdBy.email +
            "/" +
            CollectionConstants.relativeTextOReel
        )
        .doc(data.id);
      batch.update(reelRef, {
        views: incrementCount,
      });
      batch.update(userRef, {
        views: incrementCount,
      });
      batch.commit();
    }
  }, [data]);

  const incrementLike = useCallback(() => {
    if (isLoggedIn && user) {
      if (data.createdBy.email) {
        const batch = projectFirestore.batch();
        const reelRef = projectFirestore
          .collection(CollectionConstants.absoluteTextOReel)
          .doc(data.id);
        const userRef = projectFirestore
          .collection(
            CollectionConstants.absoluteUser +
              "/" +
              data.createdBy.email +
              "/" +
              CollectionConstants.relativeTextOReel
          )
          .doc(data.id);
        batch.update(reelRef, {
          likes: incrementCount,
          likedBy: arrayUnion({
            name: user && user.name,
            email: user && user.email,
          }),
        });
        batch.update(userRef, {
          likes: incrementCount,
          likedBy: arrayUnion({
            name: user && user.name,
            email: user && user.email,
          }),
        });
        batch.commit().then(() => setIsLiked(true));
      }
    } else {
      setLoginPopupFlag(true);
    }
  }, [data, user, isLoggedIn, setLoginPopupFlag]);

  const decrementLike = useCallback(() => {
    if (isLoggedIn && user) {
      if (data.createdBy.email) {
        const batch = projectFirestore.batch();
        const reelRef = projectFirestore
          .collection(CollectionConstants.absoluteTextOReel)
          .doc(data.id);
        const userRef = projectFirestore
          .collection(
            CollectionConstants.absoluteUser +
              "/" +
              data.createdBy.email +
              "/" +
              CollectionConstants.relativeTextOReel
          )
          .doc(data.id);
        batch.update(reelRef, {
          likes: decrementCount,
          likedBy: arrayRemove({
            name: user && user.name,
            email: user && user.email,
          }),
        });
        batch.update(userRef, {
          likes: decrementCount,
          likedBy: arrayRemove({
            name: user && user.name,
            email: user && user.email,
          }),
        });
        batch.commit().then(() => setIsLiked(false));
      }
    } else {
      setLoginPopupFlag(true);
    }
  }, [data, user, isLoggedIn, setLoginPopupFlag]);

  return {
    incrementView,
    incrementLike,
    decrementLike,
    isLiked,
  };
};
