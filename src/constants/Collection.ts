type CollectionKeys =
  | "absoluteTextOReel"
  | "absoluteUser"
  | "relativeTextOReel"
  | "relativeUser";
const CollectionConstants: Record<CollectionKeys, string> = {
  absoluteTextOReel: "/text-o-reel/main-stream-data/textoreels",
  relativeTextOReel: "textoreels",
  absoluteUser: "/text-o-reel/main-stream-data/users",
  relativeUser: "users",
};
export { CollectionConstants };
