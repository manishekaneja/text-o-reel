import { FC, useContext } from "react";
import Google from "../components/Google";
import LogoutButton from "../components/Logout";
import MotionLink from "../components/MotionLink";
import TextOReel from "../components/TextOReel";
import { RouteConstants } from "../constants/Routes";
import { UserContext } from "../context/UserContext";
import { useFirebaseAuthHook } from "../customHooks/useFirebaseAuthHook";
const Dashboard: FC<{}> = () => {
  const { isLoggedIn, user } = useContext(UserContext);

  const { googleLogin } = useFirebaseAuthHook();
  return (
    <>
      <LogoutButton />
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="m-3 md:m-10">
          <h1 className=" text-3xl font-medium text-center text-gray-600  md:text-5xl">
            <span>Welcome to</span>
            <TextOReel />
          </h1>
        </div>

        {isLoggedIn ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl text-gray-800 mx-2 my-3">
              Hi {user && user.name}
            </p>
            <div className=" flex-col flex md:flex-row ">
              <MotionLink
                whileHover={{ scale: 1.2 }}
                to={RouteConstants.createTextOReel}
                className=" bg-red-300 rounded py-2 px-7 shadow-md text-gray-800 font-bold text-md md:text-xl flex items-center my-2 mx-6 focus:outline-none"
              >
                Create new <TextOReel />
              </MotionLink>
              <MotionLink
                whileHover={{ scale: 1.2 }}
                to={`${RouteConstants.listTextOReel}/${user && user.email}`}
                className=" bg-green-300 rounded py-2 px-7 shadow-md text-gray-800 font-bold text-md md:text-xl flex items-center  my-2 mx-6 focus:outline-none"
              >
                Show my <TextOReel />
              </MotionLink>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg md:text-2xl text-center text-gray-800 mx-2 my-3">
              One step way from your own creation.{" "}
            </p>
            <button
              className=" bg-white rounded py-2 px-7 shadow-md text-gray-800 font-bold text-md md:text-xl flex-col md:flex-row  flex items-center m-2 focus:outline-none"
              onClick={googleLogin}
            >
              <span className="mx-1">Make that step using </span>
              <span className="mx-1">
                your
                <Google />
                account
              </span>
            </button>
          </div>
        )}

        <div className="h-20  md:h-40 flex items-center justify-center ">
          <span className="text-black font-bold opacity-70"> - OR -</span>
        </div>

        <MotionLink
          whileHover={{ scale: 1.2 }}
          to={RouteConstants.publicTextOReel}
          className=" bg-yellow-200 rounded py-2 px-7 shadow-md text-gray-800 font-bold text-md md:text-xl flex items-center m-2 focus:outline-none"
        >
          Let's Watch <TextOReel />
        </MotionLink>
      </div>
    </>
  );
};

export default Dashboard;
