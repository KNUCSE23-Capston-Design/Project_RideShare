import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});
export const showOtherComponentState = atom({
  key: "showOtherComponentState",
  default: false,
});
