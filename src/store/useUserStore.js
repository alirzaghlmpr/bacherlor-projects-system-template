import { create } from "zustand";

export const useUserStore = create((set) => ({
  firstName: null,
  lastName: null,
  suid: null,
  token: null,
  role: null,
  localStorageKey: "user_state",
  setUserInfo: ({ firstName, lastName, suid, token, role }) =>
    set({
      firstName: firstName,
      lastName: lastName,
      suid: suid,
      token: token,
      role: role,
      localStorageKey: "user_state",
    }),
  resetUserInfo: () =>
    set({
      firstName: null,
      lastName: null,
      suid: null,
      token: null,
      role: null,
    }),
}));

export default useUserStore;
