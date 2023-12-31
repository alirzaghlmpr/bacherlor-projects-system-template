import { create } from "zustand";

export const useUserStore = create((set) => ({
  firstName: null,
  lastName: null,
  suid: null,
  token: null,
  setUserInfo: ({ firstName, lastName, suid, token }) =>
    set({ firstName: firstName, lastName: lastName, suid: suid, token: token }),
  resetUserInfo: () =>
    set({
      firstName: null,
      lastName: null,
      suid: null,
      token: null,
    }),
}));

export default useUserStore;
