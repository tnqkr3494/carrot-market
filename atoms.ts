import { atom } from "recoil";

export const pageState = atom({
  key: "pageState",
  default: 1,
});

export const nextPageState = atom({
  key: "nextPageState",
  default: 0,
});

export const maxPageState = atom({
  key: "maxPageState",
  default: -1,
});
