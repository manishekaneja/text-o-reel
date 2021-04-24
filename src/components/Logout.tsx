import React, { FC } from "react";
import { useFirebaseAuthHook } from "../customHooks/useFirebaseAuthHook";

const LogoutButton: FC<{}> = () => {
  const { signOut } = useFirebaseAuthHook();
  return (
    <button
      onClick={signOut}
      style={{ backgroundColor: "#ffffff9c" }}
      className="absolute z-10 px-3 py-1 right-0 "
    >
      Logout
    </button>
  );
};

export default LogoutButton;
