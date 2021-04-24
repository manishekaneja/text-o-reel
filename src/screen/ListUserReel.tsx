import { AnimatePresence } from "framer-motion";
import moment from "moment";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projectFirestore } from "..";
import LoadingMessage from "../components/LoadingMessage";
import TextOReel from "../components/TextOReel";
import { CollectionConstants } from "../constants/Collection";
import { RouteConstants } from "../constants/Routes";
import { usePagination } from "../customHooks/usePagination";
import DownIcon from "../icons/DownIcon";
import NextIcon from "../icons/NextIcon";
import PrevIcon from "../icons/PrevIcon";
import UpIcon from "../icons/UpIcon";

const ListUserReel: FC<{}> = () => {
  const { userid } = useParams<{ userid: string }>();
  const [reelList, setReelList] = useState<Array<ReelObject>>([]);
  const initialState = useRef<ReelObject[]>([]);
  const [sortParams, setSortParams] = useState<[string, number]>(["likes", 0]);
  const [loading, setLoading] = useState<boolean>(false);
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
          setReelList(userReel);
          initialState.current = userReel;
        })
        .catch((...e) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userid]);

  const {
    hasNext,
    hasPrevious,
    nextPage,
    page,
    prePage,
    visibleList,
  } = usePagination(reelList);

  const sortList = useCallback(
    (key: "createdAt" | "views" | "likes", flag: number) => {
      setReelList((pl) => {
        if (flag !== 1 && flag !== -1) {
          return initialState.current;
        }
        let copyOfPreviousList: ReelObject[] = [...pl];
        copyOfPreviousList = copyOfPreviousList.sort(
          (object1, object2) => (object2[key] - object1[key]) * flag
        );
        return copyOfPreviousList;
      });
      setSortParams((previusParams: [string, number]) => {
        if (key === previusParams[0]) {
          return [key, flag];
        } else {
          return [key, -1];
        }
      });
    },
    []
  );

  return (
    <>
      <AnimatePresence>{loading && <LoadingMessage />}</AnimatePresence>
      <div className="flex h-14">
        <Link
          to={`${RouteConstants.dashboard}`}
          className=" bg-red-300 py-2 px-7 text-center flex-1 text-white shadow-md font-bold text-md md:text-xl flex justify-center items-center focus:outline-none"
        >
          Back
        </Link>
        {reelList.length > 0 && (
          <Link
            to={`${RouteConstants.userTextOReel}/${userid}`}
            className=" bg-green-300 py-2 px-7 text-center shadow-md flex-1 text-gray-800 font-bold text-md md:text-xl flex justify-center items-center focus:outline-none"
          >
            Watch
            <span className="hidden md:inline">
              my <TextOReel />
            </span>
          </Link>
        )}
      </div>
      <div className=" my-10 max-w-4xl px-3 lg:max-w-6xl m-auto">
        {reelList.length > 0 ? (
          <table className="w-full relative">
            <thead className="z-10 relative">
              <tr className="grid grid-cols-7 lg:grid-cols-10 divide-x divide-red-300 bg-red-100">
                {["Text", "Created", "Views", "Likes"].map((heading) => (
                  <th
                    key={heading}
                    {...(["Views", "Likes"].includes(heading)
                      ? {
                          onClick: () =>
                            sortList(
                              heading.toLowerCase() as "views" | "likes",
                              (((sortParams[1] + 3) % 3) as number) - 1
                            ),
                        }
                      : {})}
                    className={`py-4 font-bold shadow-md text-red-400 flex h-16 items-center justify-center ${
                      heading === "Created" ? " hidden lg:block " : ""
                    } ${
                      ["Views", "Likes"].includes(heading)
                        ? " col-span-2 "
                        : " col-span-3 "
                    }`}
                  >
                    <span className="flex-0 w-10" />

                    <span className="flex-1">{heading}</span>
                    <span className="flex-0 w-10">
                      {heading.toLowerCase() === sortParams[0].toLowerCase() ? (
                        sortParams[1] === 1 ? (
                          <DownIcon />
                        ) : sortParams[1] === -1 ? (
                          <UpIcon />
                        ) : null
                      ) : null}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="z-0 relative py-10 bg-grey-100 bg-blue-100 max-">
              {visibleList.map((row) => (
                <tr
                  key={row.id}
                  className="grid grid-cols-7 lg:grid-cols-10 divide-x divide-blue-300  hover:shadow-lg relative z-10 hover:z-20"
                >
                  <td className="py-6 font-bold text-blue-400  col-span-3 text-center overflow-ellipsis p-2 overflow-hidden ">
                    {row.message}
                  </td>
                  <td className="py-6 hidden lg:block font-bold text-blue-400 col-span-3 text-center ">
                    {moment(row.createdAt.toDate()).fromNow()}
                  </td>
                  <td className="py-6 font-bold text-blue-400 col-span-2 text-center ">
                    {row.views}
                  </td>
                  <td className="py-6 font-bold text-blue-400 col-span-2 text-center ">
                    {row.likes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-52">
            <h2 className="text-2xl">
              Oooops!!, No <TextOReel /> found.
            </h2>
          </div>
        )}
        {(hasNext || hasPrevious) && (
          <div className="my-4 flex items-center justify-center bg-blue-100 shadow">
            <button
              className="px-4 text-blue-600 bg-blue-100 h-10 w-14 items-center justify-center flex disabled:opacity-30"
              disabled={!hasPrevious}
              onClick={prePage}
            >
              <PrevIcon />
            </button>
            <div className="px-4 text-blue-600  bg-blue-100 h-10 w-10 items-center justify-center flex">
              {page + 1}
            </div>
            <button
              className="px-4 text-blue-600 bg-blue-100 h-10 w-14 items-center justify-center flex disabled:opacity-30 "
              disabled={!hasNext}
              onClick={nextPage}
            >
              <NextIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListUserReel;
