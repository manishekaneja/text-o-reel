import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { projectAuth, projectFirestore, serverTimeStamp } from ".";
import LoginPopup from "./components/LoginPopup";
import { RouteConstants } from "./constants/Routes";
import { LoginPopupContext } from "./context/LoginPopupContext";
import { UserContext } from "./context/UserContext";
import CreateReel from "./screen/CreateReel";
import Dashboard from "./screen/Dashboard";
import ListUserReel from "./screen/ListUserReel";
import PublicReel from "./screen/PublicReel";
import UserReel from "./screen/UserReel";

function App() {
  const [loginPopup, setLoginPopup] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    projectAuth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        const userRef = projectFirestore
          .collection("text-o-reel/main-stream-data/users")
          .doc(user.email);

        const { exists } = await userRef.get();
        if (!exists) {
          const userObject: User = {
            id: nanoid(),
            email: user.email,
            name: user.displayName || "",
            textoreelCount: 0,
            lastLoginAt: serverTimeStamp(),
          };
          userRef.set(
            {
              ...userObject,
            },
            {
              merge: true,
            }
          );
          setUser(userObject);
        } else {
          userRef.update({ lastLoginAt: serverTimeStamp() });
          setUser({
            email: user.email,
            id: nanoid(),
            name: user.displayName,
          } as User);
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      {/* User Information Provider */}
      <UserContext.Provider
        value={{
          user: user,
          isLoggedIn: !!user,
        }}
      >
        {/* Login Popup flag details provider */}
        <LoginPopupContext.Provider
          value={{
            loginPopupFlag: loginPopup,
            setLoginPopupFlag: (flag: boolean) => {
              setLoginPopup(flag);
            },
          }}
        >
          <div className="w-screen h-screen bg-gray-300 relative overflow-hidden">
            {/* Routing of the Application */}
            <HashRouter>
              <Switch>
                <Route
                  path={RouteConstants.publicTextOReel}
                  component={PublicReel}
                />
                <Route
                  path={RouteConstants.createTextOReel}
                  component={CreateReel}
                />
                <Route
                  path={RouteConstants.listTextOReel + "/:userid"}
                  component={ListUserReel}
                />
                <Route
                  path={RouteConstants.userTextOReel + "/:userid"}
                  component={UserReel}
                />
                <Route
                  path={RouteConstants.dashboard}
                  exact
                  strict
                  component={Dashboard}
                />
                <Route
                  path={RouteConstants.error}
                  render={() => {
                    return <p>Error</p>;
                  }}
                />
              </Switch>
            </HashRouter>
          </div>
          <LoginPopup />
        </LoginPopupContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
