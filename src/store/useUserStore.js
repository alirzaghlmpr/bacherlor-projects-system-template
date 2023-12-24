import { create } from "zustand";

export const useUserStore = create((set) => ({
  firstName: "initial fname",
  lastName: "initial lname",
  suid: "initial suid",
  setUserInfo: ({ firstName, lastName, suid }) =>
    set({ firstName: firstName, lastName: lastName, suid: suid }),
  resetUserInfo: () =>
    set({
      firstName: "initial fname",
      lastName: "initial lname",
      suid: "initial suid",
    }),
}));

export default useUserStore;
