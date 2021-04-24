import { createContext } from "react";

export const LoginPopupContext = createContext<{
  loginPopupFlag: boolean;
  setLoginPopupFlag: (data: boolean) => void;
}>({
  loginPopupFlag: false,
  setLoginPopupFlag: () => { },
});
