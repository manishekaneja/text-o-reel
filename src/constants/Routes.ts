type RouteKeys =
  | "createTextOReel"
  | "publicTextOReel"
  | "listTextOReel"
  | "userTextOReel"
  | "dashboard"
  | "error";
const RouteConstants: Record<RouteKeys, string> = {
  createTextOReel: "/create",
  publicTextOReel: "/watch-text-o-reel",
  listTextOReel: "/list-text-o-reel",
  userTextOReel: "/text-o-reel",
  dashboard: "/",
  error: "/*",
};
export { RouteConstants };
